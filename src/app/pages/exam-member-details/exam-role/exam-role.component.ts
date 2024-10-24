import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-exam-role',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './exam-role.component.html',
  styleUrl: './exam-role.component.scss'
})
export class ExamRoleComponent {



  examModeDetails: FormGroup;
  examModeData: any[] = [
    {
      roleType: 'M1',
    },
    {
      roleType: 'M2',
    }
  ]

  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService, private readonly fb: FormBuilder, private readonly router: Router) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Member Details');

    this.examModeDetails = this.fb.group({

      roleType: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],

     
    })
  }

  submit() {
    console.log("examModeDetails", this.examModeDetails.value);

  }

  resetSearchForm() {
    console.log("reset form");

  }



  editExamMode(data: any) {
    console.log("edit", data);

    localStorage.setItem('edit', JSON.stringify(data));
    // localStorage.setItem('edit', data);

    this.router.navigate(['/examMembersDetails/editExamRole'])


  }

  deleteExamMode(data: any) {
    console.log("delete", data);

    Swal.fire({
      icon: 'question',
      title: 'Are You Sure Want To Delete The Exam Mode?',
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
        Swal.fire('Deleting Exam Mode Cancelled', '', 'warning');
      }
    });

  }

}
