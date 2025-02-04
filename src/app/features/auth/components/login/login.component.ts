import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email === 'admin@example.com' && this.password === '123456') {
      localStorage.setItem('token', 'dummy-jwt-token');
      this.router.navigate(['/invoice']);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre');
    }
  }
}
