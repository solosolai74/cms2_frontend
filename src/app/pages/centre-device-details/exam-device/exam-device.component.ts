import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';

@Component({
  selector: 'app-exam-device',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './exam-device.component.html',
  styleUrl: './exam-device.component.scss'
})
export class ExamDeviceComponent {

  deviceForm: FormGroup;
  deviceData: any[] = [
    {
      deviceName: 'M1',
      serialNo: 's1',

    },
    {
      deviceName: 'M2',
      serialNo: 's2',

    }
  ]

  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService, private readonly fb: FormBuilder, private readonly router: Router) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Device Details');

    this.deviceForm = this.fb.group({

      deviceName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],
      serialNumber: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],

     
    })
  }

  submit() {
    console.log("deviceForm", this.deviceForm.value);

  }

  resetSearchForm() {
    console.log("reset form");

  }



  editExamMode(data: any) {
    console.log("edit", data);

    localStorage.setItem('edit', JSON.stringify(data));
    // localStorage.setItem('edit', data);

    this.router.navigate(['/centreDeviceDetails/editExamDevice'])


  }

  deleteExamMode(data: any) {
    console.log("delete", data);

    Swal.fire({
      icon: 'question',
      title: 'Are You Sure Want To Delete The Exam Device?',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {

        // delete here
        console.log("delete confirm", data);




      } else if (result.isDenied) {
        Swal.fire('Deleting Exam Device Cancelled', '', 'warning');
      }
    });

  }

}
