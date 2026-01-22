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

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/app/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
