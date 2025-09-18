import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink ,  RouterModule ],
  templateUrl: './header.html'
})
export class Header {
  isLoggedIn = false;
  username: string | null = null;

  isHidden = false;
  private lastScrollTop = 0;
  router: any;

  constructor(private auth: AuthService) {
    this.auth.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.username = this.auth.getUsername();
    });
  }

  logout() {
  this.auth.logout().subscribe({
    next: () => {
      console.log('Logged out');
      this.router.navigate(['/']); // redirect to home
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
