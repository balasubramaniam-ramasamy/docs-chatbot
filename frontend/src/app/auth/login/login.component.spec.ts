// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';

// import { LoginComponent } from './login.component';
// import { AuthService } from '../services/auth.service';

// describe('LoginComponent', () => {
//     let component: LoginComponent;
//     let fixture: ComponentFixture<LoginComponent>;
//     let authServiceSpy: jasmine.SpyObj<AuthService>;
//     let routerSpy: jasmine.SpyObj<Router>;

//     beforeEach(async () => {
//         const authSpy = jasmine.createSpyObj('AuthService', ['login']);
//         const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

//         await TestBed.configureTestingModule({
//             declarations: [LoginComponent],
//             imports: [FormsModule],
//             providers: [
//                 { provide: AuthService, useValue: authSpy },
//                 { provide: Router, useValue: routerSpyObj },
//             ],
//         }).compileComponents();

//         fixture = TestBed.createComponent(LoginComponent);
//         component = fixture.componentInstance;
//         authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//         routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//         fixture.detectChanges();
//     });

//     it('should create the component', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should call AuthService.login on submit', () => {
//         // Arrange
//         const loginCredentials = { username: 'testuser', password: 'testpass' };
//         component.username = loginCredentials.username;
//         component.password = loginCredentials.password;
//         authServiceSpy.login.and.returnValue(of({ token: 'testtoken' }));

//         // Act
//         component.onSubmit();

//         // Assert
//         expect(authServiceSpy.login).toHaveBeenCalledOnceWith(loginCredentials);
//         expect(routerSpy.navigate).toHaveBeenCalledWith(['/documents']);
//     });

//     it('should not call AuthService.login if credentials are empty', () => {
//         // Arrange
//         component.username = '';
//         component.password = '';

//         // Act
//         component.onSubmit();

//         // Assert
//         expect(authServiceSpy.login).not.toHaveBeenCalled();
//     });

//     it('should show an error message on login failure', () => {
//         // Arrange
//         const errorMessage = 'Invalid credentials';
//         authServiceSpy.login.and.returnValue(of({ error: errorMessage }));

//         // Act
//         component.onSubmit();

//         // Assert
//         expect(component.errorMessage).toBe(errorMessage);
//     });
// });
