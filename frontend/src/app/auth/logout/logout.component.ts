import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
})

export class LogoutComponent {
  credentials = { name: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService,) { }

  onSubmit() {
    this.submitted = true;
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        this.doLogoutRoutine();
      },
      error: (error) => {
        console.error('Logout failed', error);
        this.errorMessage = 'Logout failed';
        this.successMessage = null;
        this.submitted = false;
      },
    });
  }

  private doLogoutRoutine() {
    localStorage.removeItem('token'); // Remove  when logged out
    localStorage.removeItem('user_id'); // Remove  when logged out
    localStorage.removeItem('name'); // Remove  when logged out

    this.errorMessage = null;
    this.successMessage = 'Logged out';
    // Remove the cache data as soon as user logs out.
    this.sharedService.setAllDocuments([]);

    let self = this;
    setTimeout(function () {
      self.router.navigate(['/auth/login']);
    }, 1000);
  }
}
