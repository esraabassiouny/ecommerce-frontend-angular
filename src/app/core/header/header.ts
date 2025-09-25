import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
})


export class Header {
  isLoggedIn = false;
  name: string | null = null;
  role: string | null = null;

  isHidden = false;
  private lastScrollTop = 0;

constructor(private auth: AuthService, private router: Router) {
  this.auth.loggedIn$.subscribe((status) => {
    this.isLoggedIn = status;
  });

  this.auth.username$.subscribe((name) => {
    this.name = name;
  });
}


  logout() {
    this.auth.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Logout failed', err),
    });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isHidden = scrollTop > this.lastScrollTop && scrollTop > 50;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
