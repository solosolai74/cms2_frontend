import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (private readonly router: Router){

  }

  ngOnInit(){
    // this.router.navigate(['/exam/examDetails'])
  }

  logIn(){
    this.router.navigate(['/exam/examDetails'])
    
    // this.router.navigate(['/authentication/login2'])
  }
}
