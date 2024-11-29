import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { AppModule } from './app.module';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})

export class AppComponent implements OnChanges {
  constructor(private authService: AuthService) { }
  title = 'Welcome to, DocsBot!'
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges')
  }
}
