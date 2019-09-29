import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(userService: UserService, router: Router) {}
  ngOnInit() {
    // if(firebase.auth().currentUser.uid) {
      
    // }
    // if(this.userService.uid) {
    //   this.router.navigate(['measurements']);
    // }
  }
}

 