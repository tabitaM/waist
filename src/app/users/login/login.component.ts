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
    // if(this.userService.uid) {
    //   this.router.navigate(['measurements']);
    // }
    // if(firebase.auth().currentUser.uid) {
    //   this.router.navigate(['measurements']);
    // }
     console.log("User is logged in with UID: ",this.userService.uid);
  }

  login() {
    this.userService
      .login()
      .then(res => {
        this.router.navigate(['/measurements']);
        console.log("User info is: ", res);
      })
  }
}
