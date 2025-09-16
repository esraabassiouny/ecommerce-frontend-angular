import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-logout',
  imports: [CommonModule, FormsModule],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        localStorage.removeItem('token');
      },
      error: (err) => console.error('Logout failed', err)
    });
  }

}
