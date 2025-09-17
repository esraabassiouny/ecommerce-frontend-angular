import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  name: string;
  email: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = '/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>(this.apiUrl, profile);
  }

  deleteProfile(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.apiUrl);
  }

  changePassword(data: { currentPassword: string; newPassword: string }): Observable<any> {
  return this.http.patch(`${this.apiUrl}/password`, data);
  }
}
