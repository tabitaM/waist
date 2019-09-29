import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uid = null;
  constructor(private afAuth: AngularFireAuth) {}

  async login() {
    const {user} = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.uid = user.uid;
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return user;
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated(): boolean{
    if(!this.uid){
      return false;
    }
    return true;
  }
}
