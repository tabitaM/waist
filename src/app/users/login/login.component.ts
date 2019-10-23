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

  // New way of writting Promise. Await
  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/measurements']);
    } catch (err) {
      console.log(err);
    }
  }

  // // VS // //
  // Old way of writting Promise. Then
  loginOldPromise() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/measurements']));
  }

  async loginWithEmailPassword(email: string, password: string) {
    try {
      await this.authService.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/measurements']);
    } catch (err) {
      alert(err);
    }
  }

  async registerWithEmailPassword(email: string, password: string) {
    try {
      await this.authService.signUpWithEmailAndPassword(email, password);
      this.router.navigate(['/measurements']);
    } catch (err) {
      console.log(err);
    }
  }

  async loginWithFacebook() {
    try {
      await this.authService.loginWithFacebook();
      this.router.navigate(['/measurements']);
    } catch (err) {
      console.log(err);
    }
  }
}
