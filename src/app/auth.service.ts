import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authKey = 'isLoggedIn';
  isLoggedIn = localStorage.getItem(this.authKey) === 'true';

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === 'admin@123') {
      this.isLoggedIn = true;
      localStorage.setItem(this.authKey, 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem(this.authKey);
  }
}
