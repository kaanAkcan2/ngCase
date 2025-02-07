import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {   

  isUserLogin: boolean = false ;

  constructor(private router: Router,
    private authService: AuthService,
  ) { }

  ngAfterViewInit(): void {
    this.isUserLogin = this.authService.isUserLogin();
  }

  logout () {
    this.authService.logout();

    this.router.navigate(['/']);
  }
  
}
