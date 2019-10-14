import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.user;
  }

  async loginWithGoogle(): Promise<firebase.auth.UserCredential | void> {
    try {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      console.error(error);
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}