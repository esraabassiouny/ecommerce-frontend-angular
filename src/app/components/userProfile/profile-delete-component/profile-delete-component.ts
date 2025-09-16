import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@services/profile-service';

@Component({
  selector: 'app-profile-delete-component',
  imports: [],
  templateUrl: './profile-delete-component.html',
  styleUrl: './profile-delete-component.css'
})
export class ProfileDeleteComponent {
  constructor(private router: Router, private profileService: ProfileService) {}

  deleteProfile() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.profileService.deleteProfile().subscribe({
        next: () => {
          alert('Account deleted!');
          this.router.navigate(['/']); // redirect to home
        },
        error: (err) => alert('Error: ' + err.message),
      });
    }
  }


}
