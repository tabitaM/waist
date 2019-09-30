import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(authService: AuthService, router: Router) {}
  ngOnInit() {
    // if(firebase.auth().currentUser.uid) {
    // }
    // if(this.authService.uid) {
    //   this.router.navigate(['measurements']);
    // }
  }
}
