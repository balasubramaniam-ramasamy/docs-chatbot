import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
})

export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.submitted = true;
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.successMessage = 'Registration successful';
        this.errorMessage = null;
        let self = this;
        setTimeout(function () {
          self.router.navigate(['/auth/login']); // Navigate to login page after successful registration
        }, 1000);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error.message;
        this.successMessage = null;
        this.submitted = false;
      },
    });
  }
}
