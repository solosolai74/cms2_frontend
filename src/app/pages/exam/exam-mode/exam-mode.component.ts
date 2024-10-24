import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExamDetailsService } from '../../../services/exam-details.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-exam-mode',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.scss'
})
export class ExamModeComponent {

  examModeDetails: FormGroup;
  examModeData: any[] = [
    {
      examMode: 'M1',
    },
    {
      examMode: 'M2',
    }
  ]

  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService, private readonly fb: FormBuilder, private readonly router: Router, private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Mode Details');

    this.examModeDetails = this.fb.group({

      examMode: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],

     
    })
  }

  ngOnInit(){
    this.viewExamModeAPI()
  }

  submit() {

    const params = {exammode : this.examModeDetails.value.examMode}

    this.addExamModeAPI(params)
  }

  resetSearchForm() {
    this.examModeDetails.reset();

    // Clear validation errors for each form control
    Object.keys(this.examModeDetails.controls).forEach((controlName) => {
      const control = this.examModeDetails.get(controlName);
      if (control) {
        control.setErrors(null);
      }
    });
  }



  editExamMode(data: any) {

    localStorage.setItem('edit', JSON.stringify(data));
    // localStorage.setItem('edit', data);

    this.router.navigate(['/exam/editExamMode'])


  }

  deleteExamMode(data: any) {

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

        const params = {
           id: data.id,
      exammode:  data.exammode
        }

        this.delteExamModeAPI(params)


      } else if (result.isDenied) {
        Swal.fire('Deleting Exam Mode Cancelled', '', 'warning');
      }
    });

  }


  addExamModeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.addExamMode(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
          this.viewExamModeAPI()
        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
        });
      } else {
        Swal.fire({
          text:`${res.message}`,
          icon: 'error',
        });
      }
    } ,
    (error) => {

      this.common.apiErrorHandler(error);
    }
  );
  }

  viewExamModeAPI(){
    // this.showTable = false
    this.examDetailsService.viewExamMode().subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
        // this.resetSearchForm()
        this.examModeData = res.data
        this.resetSearchForm()
        
        // Swal.fire({
        //   text:`${res.message}`,
        //   icon: 'success',
        // });
      } else {
        Swal.fire({
          text:`${res.message}`,
          icon: 'error',
        });
      }
    } ,
    (error) => {

      this.common.apiErrorHandler(error);
    }
  );
  }


  delteExamModeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.deleteExamMode(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
        // this.resetSearchForm()
        this.examModeData = this.examModeData.filter(item=>{
          return item.id != data.id
        })

        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
        });
      } else {
        Swal.fire({
          text:`${res.message}`,
          icon: 'error',
        });
      }
    } ,
    (error) => {

      this.common.apiErrorHandler(error);
    }
  );
  }



}
