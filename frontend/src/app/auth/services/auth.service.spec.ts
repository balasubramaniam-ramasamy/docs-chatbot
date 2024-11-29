import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';



describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call login API with credentials', () => {
        const mockResponse = { token: '12345' };
        const credentials = { email: 'test', password: 'test' };

        service.login(credentials).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:5000/api/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(credentials);
        req.flush(mockResponse);
    });

    it('should call register API with user data', () => {
        const mockResponse = { success: true };
        const user = { name: 'test', email: 'test@example.com', password: 'test' };

        service.register(user).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('http://localhost:5000/api/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(user);
        req.flush(mockResponse);
    });
});
