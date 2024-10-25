import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CentreDeviceDetailsService } from '../../../services/centre-device-details.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet,ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatCardModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor (private readonly router: Router, private readonly fb: FormBuilder, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService ){
    this.loginForm = this.fb.group({

      userName: ['', [
        // Validators.required,
      ]],
      password: ['', [
        // Validators.required,
      ]],
      

    });
  }

  ngOnInit(){
    // this.router.navigate(['/exam/examDetails'])
  }

  logIn(){
    this.router.navigate(['/exam/examDetails'])
    
    // this.router.navigate(['/authentication/login2'])
  }

  submit(){
console.log("login", this.loginForm.value);
this.logIn()
this.examNameAPI() 

  }

  examNameAPI() {
    this.centreDeviceDetailService.examName().subscribe((res) => {
      if (res.api_status === true) {
        localStorage.setItem('examName', JSON.stringify(res.data));
      } else {
        // Swal.fire({
        //   text: `${res.message}`,
        //   icon: 'error',
        // });
      }
    },
      (error) => {
        this.common.apiErrorHandler(error);
      }
    );
  }

}
