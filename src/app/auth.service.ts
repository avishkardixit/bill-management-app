import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
  roles: string[];
  [key: string]: unknown;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  fullName: string;
  accessLevel: 'Read' | 'Write' | 'Admin';
}

type StoredProfile = Pick<LoginResponse, 'email' | 'fullName' | 'roles'>;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly rolesKey = 'roles';
  private readonly emailKey = 'email';
  private readonly fullNameKey = 'fullName';
  private readonly authUrl = `${API_BASE_URL}/auth`;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get roles(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.rolesKey) || '[]');
    } catch {
      return [];
    }
  }

  get email(): string {
    return localStorage.getItem(this.emailKey) || '';
  }

  get fullName(): string {
    return localStorage.getItem(this.fullNameKey) || '';
  }

  get isAdmin(): boolean {
    return this.roles.includes('Admin');
  }

  get canWrite(): boolean {
    return this.isAdmin || this.roles.includes('Write');
  }

  get canRead(): boolean {
    return this.canWrite || this.roles.includes('Read');
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => this.storeSession(response))
    );
  }

  registerUser(request: RegisterUserRequest): Observable<unknown> {
    return this.http.post(`${this.authUrl}/register`, request);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.fullNameKey);
  }

  private storeSession(response: LoginResponse): void {
    if (!response.token) {
      throw new Error('Login succeeded, but no token was returned by the server.');
    }

    const profile: StoredProfile = {
      email: response.email,
      fullName: response.fullName,
      roles: response.roles || []
    };

    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.rolesKey, JSON.stringify(profile.roles));
    localStorage.setItem(this.emailKey, profile.email || '');
    localStorage.setItem(this.fullNameKey, profile.fullName || '');
  }
}
