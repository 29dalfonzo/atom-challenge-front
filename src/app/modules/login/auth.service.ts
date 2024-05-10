import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}users`;
  private headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient,) { }

  login(email: string) {
    return this.http.get(`${this.apiUrl}/${email}`, { headers: this.headers });
  }

  register(email: string) : Observable<string> {
    return this.http.post(
      `${this.apiUrl}`,
      { email },
      {
        headers: this.headers,
        responseType: 'text'
      }
    )
      .pipe(
        map((response) => response as string)
      );
  }
}
