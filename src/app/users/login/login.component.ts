import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    if (this.authService.user) {
      this.router.navigate(['/measurements']);
    }
  }

  login() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(['/measurements']);
    });
  }
}
