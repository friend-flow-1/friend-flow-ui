import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '@core/constants/token.constant';
import { environment } from '@env/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  login(data: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}auth/login`, data)
      .pipe(
        tap((res: any) =>
          localStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.token)
        )
      );
  }

  register(data: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}auth/register`, data)
      .pipe(
        tap((res: any) =>
          localStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.token)
        )
      );
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  }
}
