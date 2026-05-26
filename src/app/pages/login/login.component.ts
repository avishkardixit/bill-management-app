import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  submitted = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  login() {
    if (this.isLoading) return;

    this.submitted = true;

    if (!this.email.trim() || !this.password) {
      this.showError('Enter username and password');
      return;
    }

    this.isLoading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/app/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;

        let message = 'Invalid username or password';

        // 🔐 Controlled error messages (no API leakage)
        if (error.status === 0) {
          message = 'Server not reachable';
        } else if (error.status === 500) {
          message = 'Something went wrong. Please try again later';
        } else if (error.status === 401) {
          message = 'Invalid username or password';
        } else if (error.status === 403) {
          message = 'Access denied';
        }

        this.showError(message);
      }
    });
  }

  private showError(message: string) {
    this.snack.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}