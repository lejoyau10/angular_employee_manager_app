import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { AuthService } from './auth/auth.service';
import { firebaseConfig } from './firebase.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Manager';


  constructor(private authService: AuthService) { }

  ngOnInit() {

initializeApp(firebaseConfig)
  }
  isAuthenticated() {
    return this.authService.isAuthenticatied;
  }

  logout() {
    this.authService.logout();
  }

}

