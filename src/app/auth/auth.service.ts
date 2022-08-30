import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from '../auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 isAuthenticatied: boolean = false;
  isLoading: boolean = false;
  passwordMatched: boolean = true;


  constructor(private router: Router) { }

  login(form: LoginForm) {
    if (this.isLoading) return;

    this.isLoading = true;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticatied = true;
        this.router.navigate(['employees'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.isAuthenticatied = false;
      }).finally(() => (this.isLoading = false));

  }

  register(form: RegisterForm) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (form.password !== form.confirm_password) {
      this.passwordMatched = false;
      return;

    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticatied = true;

      })
      .catch((error) => {
        this.isAuthenticatied = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }).finally(() => (this.isLoading = false));

  }
  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['login']);
      this.isAuthenticatied = false;
    }).catch((error) => {
      // An error happened.
    });
  }

}
