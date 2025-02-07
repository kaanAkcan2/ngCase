import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {   

  isUserLogin$!: Observable<boolean>;

  constructor(private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isUserLogin$ = this.authService.isUserLogin$();

    console.log(this.isUserLogin$);
  }

  logout () {
    this.authService.logout();
  }
  
}
