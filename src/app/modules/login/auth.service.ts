import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}users`;
  private headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient,) { }

  login(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`, { headers: this.headers });
  }

  register(email: string) : Observable<any> {
    return this.http.post(
      `${this.apiUrl}`,
      { email },
      {
        headers: this.headers,
      }
    );
  }

  validateLogin(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
