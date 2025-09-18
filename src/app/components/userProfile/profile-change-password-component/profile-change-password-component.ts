import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@services/profile-service';

@Component({
  selector: 'app-profile-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: './profile-change-password-component.html',
  styleUrls: ['./profile-change-password-component.css']
})
export class ProfileChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  message = '';
  error = '';

  constructor(private profileService: ProfileService) {}

  onSubmit() {
    this.profileService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        this.message = res.message || 'Password updated successfully!';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to change password';
        this.message = '';
      }
    });
  }
}
