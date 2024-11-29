import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';  // for ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';   // for ngModel
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent (Standalone)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Mock AuthService
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    
    TestBed.configureTestingModule({
      imports: [LoginComponent, CommonModule, FormsModule],  // Import LoginComponent and other necessary modules
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service on form submission', () => {
    const email = 'testUser@test.com';
    const password = 'password123';
    component.credentials.email = email;
    component.credentials.password = password;

    // Simulate successful login
    authServiceMock.login.and.returnValue(of({ token: 'mockToken', user: { id: '1', name: "Tes Me"} }));

    fixture.detectChanges(); // trigger change detection

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith( {email, password});
  });

  it('should handle login error', () => {
    const email = 'testUser@test.com';
    const password = 'password123';
    component.credentials.email = email;
    component.credentials.password = password;

    // Simulate login error
    authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid username or password.')));

    fixture.detectChanges();

    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid username or password.');
  });
});
