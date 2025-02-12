import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from '../../../../core/services/apiHttp.service';
import { JwtRefreshToken } from '../../../../core/models/auth/jwtRefreshToken.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router,
    private apiHttpService: ApiHttpService,
    private authService: AuthService
  ) { }

  onSubmit() {
    let dataToPost = {
      userName: this.email,
      password: this.password
    };

    this.apiHttpService.post<JwtRefreshToken>("auth/login", dataToPost)
      .subscribe(
        (data) => {
          this.authService.login(data.accessToken,data.refreshToken,data.expiresIn)

          
        },
        (error) => alert('Geçersiz kullanıcı adı veya şifre')
      );
  }
}
