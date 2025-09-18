import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth';
import { LoginRequest } from '@models/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {

  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    const payload = { email: this.email, password: this.password };
    this.authService.login(payload).subscribe({
      next: () => console.log('Login successful'),
      error: (err) => console.error('Login failed', err),
    });
  }


}
