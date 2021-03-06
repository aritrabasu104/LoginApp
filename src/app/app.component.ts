import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-app';
  constructor(private authService:AuthService){}
  checkLogin(){
    return this.authService.isLoggedIn
  }
  logout(){
    this.authService.logout()
  }
}
