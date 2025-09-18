import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class Logout {

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Logout failed', err),
    });
  }
}
