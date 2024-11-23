import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
})

export class LoginComponent {
  isEnabled = true;
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token); // Save token for authentication
        localStorage.setItem('user_id', response.user.id); // Save token for authentication
        localStorage.setItem('name', response.user.name); // Save token for authentication
        this.isEnabled = false;
        this.errorMessage = null;
        this.successMessage = "Log in successful."
        let self = this;
        setTimeout(function () {
          self.router.navigate(['/docs/documents']);
        }, 1000);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid username or password.';
        this.successMessage = null;
      },
    });
  }
}
