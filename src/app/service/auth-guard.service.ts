import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public userService: UserService, public router: Router) { }

  canActivate(): boolean {
    console.log('123')
    if(!this.userService.isAuthenticated()) {
      alert("You need to be logged in!");
      this.router.navigate(['']);
      return false;
    }
      return true;
  }
}
