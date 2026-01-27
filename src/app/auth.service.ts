import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === 'admin@123') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
