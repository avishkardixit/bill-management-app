import { Component, } from '@angular/core';
import { CommonModule,} from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      this.snack.open('Enter username and password', 'OK', { duration: 2500 });
      return;
    }

    this.isLoading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/app/dashboard']);
      },
      error: error => {
        this.isLoading = false;
        this.snack.open(error?.error?.message ?? error?.message ?? 'Invalid username or password', 'OK', {
          duration: 3000
        });
      }
    });
  }
}
