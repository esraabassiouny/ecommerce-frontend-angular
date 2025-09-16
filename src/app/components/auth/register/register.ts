import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@services/auth';
import { RegisterRequest } from '@models/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    const payload: RegisterRequest = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        localStorage.setItem('token', res.token);
      },
      error: (err) => console.error('Registration failed', err)
    });
  }

}
