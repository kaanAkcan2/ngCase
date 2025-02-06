import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from '../../../../core/services/apiHttp.service';
import { JwtRefreshToken } from '../../../../core/models/auth/jwtRefreshToken.model';

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
  ) { }

  onSubmit() {
    let dataToPost = {
      userName: this.email,
      password: this.password
    };

    this.apiHttpService.post<JwtRefreshToken>("auth/login", dataToPost)
      .subscribe(
        (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('expiresIn', data.expiresIn.toString());

          this.router.navigate(['/invoice']);
        },
        (error) => alert('Geçersiz kullanıcı adı veya şifre')
      );
  }
}
