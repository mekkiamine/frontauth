import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService:AuthService,
    private router:Router,
  ){}
  goSignUp() {
    console.log('Clicked Sign In with Google button'); // Add this line for debugging
    this.authService.authenticateGoogle().subscribe(
      (data) => {
        console.log('Authentication response:', data); // Add this line for debugging
      },
      (error) => {
        console.error('Authentication error:', error); // Add this line for debugging
      }
    );
  }
 
}
