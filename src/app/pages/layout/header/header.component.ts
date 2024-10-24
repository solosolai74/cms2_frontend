import { Component, ViewEncapsulation } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class HeaderComponent {

  constructor (private readonly router: Router){

  }
  logout(){
    this.router.navigate(['/authentication/login'])

  }


  changePassword(){
    console.log("change pass");
    
  }
}
