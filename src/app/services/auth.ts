import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private helper = new JwtHelperService();

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.loggedInSubject.next(true);
        this.usernameSubject.next(this.getUsername());
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((res: any) => {
        // Save the token locally
        localStorage.setItem('token', res.token);

        // Update reactive state
        this.loggedInSubject.next(true);
        this.usernameSubject.next(this.getUsername());
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.loggedInSubject.next(false);
        this.usernameSubject.next(null);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.helper.isTokenExpired(token);
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.helper.decodeToken(token)?.name || null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return this.helper.decodeToken(token)?.role || null;
  }
}
