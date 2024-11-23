import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true; // Allow navigation if the user is logged in
        } else {
            this.router.navigate(['/auth/login']); // Redirect to login if not authenticated
            return false;
        }
    }
    canDeactivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return false; // Allow navigation if the user is logged in
        } else {
            return true;
        }
    }
}
