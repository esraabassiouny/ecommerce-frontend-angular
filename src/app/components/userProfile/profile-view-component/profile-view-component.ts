import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileService, Profile } from '@services/profile-service';

@Component({
  selector: 'app-profile-view-component',
  imports: [CommonModule],
  templateUrl: './profile-view-component.html',
  styleUrl: './profile-view-component.css'
})
export class ProfileViewComponent {

  profile: Profile | null = null;

  constructor(private profileService: ProfileService) {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      this.profile = data;
    });
  }

}
