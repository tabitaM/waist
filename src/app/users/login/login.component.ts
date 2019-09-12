import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    //const uid = firebase.auth().currentUser.uid;
    //console.log("UID:", uid);
    this.userService
      .login()
      .then(res => {
        console.log("User info is: ", res);
      })
  }

  // logout() {
  //   this.userService
  //     .logout()
  //     .then(res => {
  //       console.log("User info is: ", res);
  //     })
  // }
}
