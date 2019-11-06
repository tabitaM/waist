import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  register() {
    if (this.validateFields()) {
      this.registerUser();
    }
  }

  validateFields(): boolean {
    console.log(this.email);
    if (!this.email) {
      this.snackbarService.show('Email cannot be empty');
      return false;
    }

    if (!this.password) {
      this.snackbarService.show('Password cannot be empty');
      return false;
    }

    if (!this.confirmPassword) {
      this.snackbarService.show('Confirm Password cannot be empty');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.snackbarService.show('Password must match');
      return false;
    }

    return true;
  }

  async registerUser() {
    try {
      await this.authService.signUpWithEmailAndPassword(
        this.email,
        this.password
      );
      this.close();
      this.router.navigate(['/measurements']);
    } catch (err) {
      this.snackbarService.show(err);
    }
  }
}
