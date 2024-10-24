import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExamDetailsService } from '../../../services/exam-details.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-paper-type',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './paper-type.component.html',
  styleUrl: './paper-type.component.scss'
})
export class PaperTypeComponent {

  examModeDetails: FormGroup;
  examModeData: any[] = []
  
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService, private readonly fb: FormBuilder, private readonly router: Router, private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService) {
    this.breadcrumbDetails.setBreadcrumbName('Paper And Subject Details');


    this.examModeDetails = this.fb.group({

      paperType: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,2}$/)
      ]],

     
    })
    
  }
  

  ngOnInit(){
    this.viewPaperTypeAPI()
  }

  submit() {

    const params = {papertype : this.examModeDetails.value.paperType}
    this.addPaperTypeAPI(params)
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

    this.router.navigate(['/exam/editPaperType'])


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

        const params = {id : data.id}

        this.deltePaperTypeAPI(params)



      } else if (result.isDenied) {
        Swal.fire('Deleting Exam Mode Cancelled', '', 'warning');
      }
    });

  }
  

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.examModeDetails.get('paperType')?.setValue(input.value);
    
  }

  addPaperTypeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.addPaperType(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
          this.viewPaperTypeAPI()
        
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

  viewPaperTypeAPI(){
    // this.showTable = false
    this.examDetailsService.viewPaperType().subscribe((res) => {
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


  deltePaperTypeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.deletePaperType(data).subscribe((res) => {
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
