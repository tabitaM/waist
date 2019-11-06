import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

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
    // validate
    if (!email || !password) {
      this.snackbarService.show('Email or password cannot be empty');
      return;
    }

    try {
      await this.authService.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/measurements']);
    } catch (err) {
      this.snackbarService.show(err);
    }
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, new MatDialogConfig());
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
