import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, RegisterUserRequest } from '../../auth.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
  accessLevels: RegisterUserRequest['accessLevel'][] = ['Read', 'Write', 'Admin'];
  isSaving = false;
  submitted = false;

  user: RegisterUserRequest = {
    email: '',
    password: '',
    fullName: '',
    accessLevel: 'Read'
  };

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar
  ) {}

  register() {
    if (this.isSaving) return;

    this.submitted = true;
    if (!this.isValid) {
      this.snack.open('Please complete the required fields', 'OK', { duration: 2500 });
      return;
    }

    this.isSaving = true;
    this.auth.registerUser(this.user).subscribe({
      next: () => {
        this.snack.open('User created successfully', 'OK', { duration: 2500 });
        this.user = {
          email: '',
          password: '',
          fullName: '',
          accessLevel: 'Read'
        };
        this.submitted = false;
        this.isSaving = false;
      },
      error: error => {
        this.snack.open(error?.error?.message ?? 'Failed to create user', 'OK', { duration: 3000 });
        this.isSaving = false;
      }
    });
  }

  get isValid(): boolean {
    return !!this.user.fullName.trim()
      && this.isValidEmail(this.user.email)
      && this.user.password.length >= 8
      && !!this.user.accessLevel;
  }

  isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
