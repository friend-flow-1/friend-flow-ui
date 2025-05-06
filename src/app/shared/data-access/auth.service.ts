import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import { Credentials, RegisterCredentials, User } from '@shared/interfaces';
import {
  LoginResponseDTO,
  RefreshTokenResponseDTO,
  RegisterResponseDTO,
} from '@shared/interfaces/auth';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import {
  ACCESS_TOKEN_KEY,
  IP_KEY,
  REFRESH_TOKEN_KEY,
  USER_AGENT_KEY,
  USER_KEY,
} from '@core/constants/auth.constant';
import { Router } from '@angular/router';

export type AuthUser = User | null | undefined;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser;
  ua: string | null;
  ip: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  // state
  private state = signal<AuthState>({
    accessToken: null,
    refreshToken: null,
    user: null,
    ua: null,
    ip: null,
  });

  // selectors
  user = computed(() => this.state().user);
  accessToken = computed(() => this.state().accessToken);
  refreshToken = computed(() => this.state().refreshToken);
  ua = computed(() => this.state().ua);
  ip = computed(() => this.state().ip);

  constructor() {}

  login(credentials: Credentials) {
    return this.http
      .post<LoginResponseDTO>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((res: LoginResponseDTO) => {
          this.setSession(
            res.data.access_token,
            res.data.refresh_token,
            res.data.user,
            res.data.ua,
            res.data.ip
          );
        }),
        catchError((err) => {
          this.clearSession();
          return throwError(() => err);
        })
      );
  }

  register(credentials: RegisterCredentials) {
    return this.http
      .post<RegisterResponseDTO>(
        `${environment.apiUrl}/auth/register`,
        credentials
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout() {
    const refreshToken = this.refreshToken();

    if (!refreshToken) {
      this.clearSession();
      return;
    }

    this.http
      .post(`${environment.apiUrl}/auth/logout`, {
        refresh_token: refreshToken,
      })
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.clearSession();
      });
  }

  refresh() {
    if (!this.refreshToken()) return EMPTY;

    return this.http
      .post<RefreshTokenResponseDTO>(`${environment.apiUrl}/auth/refresh`, {
        refresh_token: this.refreshToken(),
        user_agent: this.ua(),
        ip: this.ip(),
      })
      .pipe(
        tap((res: RefreshTokenResponseDTO) => {
          this.setSession(res.data.access_token, res.data.refresh_token);
        }),
        catchError((err) => {
          this.logout();
          return EMPTY;
        })
      );
  }

  private setSession(
    accessToken: string,
    refreshToken: string,
    user?: User,
    ua?: string,
    ip?: string
  ) {
    this.storageService.set(ACCESS_TOKEN_KEY, accessToken);
    this.storageService.set(REFRESH_TOKEN_KEY, refreshToken);
    user ? this.storageService.set(USER_KEY, user) : '';
    ua ? this.storageService.set(USER_AGENT_KEY, ua) : '';
    ip ? this.storageService.set(IP_KEY, ip) : '';

    this.state.update((state) => ({
      ...state,
      accessToken,
      refreshToken,
      user,
      ua: ua ?? state.ua ?? null,
      ip: ip ?? state.ip ?? null,
    }));
  }

  restoreSession() {
    const accessToken = this.storageService.get<string>(ACCESS_TOKEN_KEY);
    const refreshToken = this.storageService.get<string>(REFRESH_TOKEN_KEY);
    const user = this.storageService.get<User>('user');

    if (accessToken && refreshToken && user) {
      this.state.update((state) => ({
        ...state,
        accessToken,
        refreshToken,
        user,
      }));
    }
  }

  private clearSession() {
    this.storageService.remove(ACCESS_TOKEN_KEY);
    this.storageService.remove(REFRESH_TOKEN_KEY);
    this.storageService.remove('user');

    this.state.update((s) => ({
      ...s,
      accessToken: null,
      refreshToken: null,
      user: null,
    }));

    this.router.navigate(['auth', 'login']);
  }

  getToken() {
    return this.accessToken();
  }
}
