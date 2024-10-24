import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly router: Router) {
    console.log("common service");
    
   }

  apiErrorHandler(error: any) {
    console.error(error);

    if (error.status === 500) {
      // Swal.alert('Server Error', 'Please contact the server administrator', 'error');
      Swal.fire({
        title: 'Server Error',
        html: 'There is some error, Try after some time.<br>If problem persists contact the administrator',
        icon: 'error',
      }).then((result) => {
        this.router.navigate(['/authentication/login']);
      });
    }
  }
  
}
