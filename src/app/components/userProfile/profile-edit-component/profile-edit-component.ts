import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '@services/profile-service';

@Component({
  selector: 'app-profile-edit-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit-component.html',
  styleUrl: './profile-edit-component.css',
})
export class ProfileEditComponent {
  user: any = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.user).subscribe(() => {
      alert('Profile updated!');
    });
  }
}
