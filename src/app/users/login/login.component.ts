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

  ngOnInit() {}

  login() {
    this.userService
      .login()
      .then(res => {
        this.router.navigate(["measurements"]);
        console.log("User info is: ", res);
      })
      .catch(err => console.log(err));
  }

  logout() {
    this.userService
      .logout()
      .then(res => {
        console.log("User info is: ", res);
      })
  }
}
