import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  jwtToken?: string;
  jwt?: string;
  [key: string]: unknown;
}

type LoginResult = string | LoginResponse;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly authUrl = `${API_BASE_URL}/Auth`;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.authUrl}/login`, {
      email: username,
      username,
      password
    }).pipe(
      tap(response => this.storeToken(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private storeToken(response: LoginResult): void {
    const token = typeof response === 'string'
      ? response
      : response.token
        ?? response.accessToken
        ?? response.jwtToken
        ?? response.jwt;

    if (typeof token !== 'string' || !token) {
      throw new Error('Login succeeded, but no token was returned by the server.');
    }

    localStorage.setItem(this.tokenKey, token);
  }
}
