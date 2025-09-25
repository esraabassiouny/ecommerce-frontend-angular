import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService, Profile } from '@services/profile-service';
import { AuthService } from '@services/auth';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})  
export class UserProfile {

  profile: Profile | null = null;
  userForEdit: any = {};
  currentPassword = '';
  newPassword = '';
  message = '';
  error = '';
  currentView: 'view' | 'edit' | 'changePassword' = 'view';

  constructor(private profileService: ProfileService, private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.loadProfile();
  }

loadProfile() {
  this.profileService.getProfile().subscribe((user) => {
    this.profile = user;
    this.userForEdit = { ...user };
  });
}


updateProfile() {
  this.profileService.updateProfile(this.userForEdit).subscribe((res) => {
    this.profile = res;
    this.userForEdit = { ...res };
    this.currentView = 'view';

    this.auth.setUsername(res.name); 

    alert('Profile updated!');
  });
}


changePassword() {
    this.profileService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        this.message = res.message || 'Password updated successfully!';
        this.error = '';
        this.currentPassword = '';
        this.newPassword = '';
        setTimeout(() => {
          this.message = '';
          this.currentView = 'view';
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to change password';
        this.message = '';
      }
    });
  }

  deleteProfile() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.profileService.deleteProfile().subscribe({
        next: () => {
          alert('Account deleted!');
          this.router.navigate(['/']); 
        },
        error: (err) => alert('Error: ' + err.message),
      });
    }
  }

  setView(view: 'view' | 'edit' | 'changePassword') {
    this.currentView = view;
  }

}
