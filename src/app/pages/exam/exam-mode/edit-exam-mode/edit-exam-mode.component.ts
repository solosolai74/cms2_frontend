import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ExamDetailsService } from '../../../../services/exam-details.service';
import { CommonService } from '../../../../services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exam-mode',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-exam-mode.component.html',
  styleUrl: './edit-exam-mode.component.scss'
})
export class EditExamModeComponent {
  examModeDetails: FormGroup;
   editData : any 

  
  constructor(private readonly fb: FormBuilder, private readonly router: Router,  private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService) {

  //  this.editData = localStorage.getItem('edit')
  //  this.editData = JSON.parse(localStorage.getItem('edit'));
   
   const retrievedDataString = localStorage.getItem('edit');
this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;




    this.examModeDetails = this.fb.group({
      examMode: [this.editData.exammode, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,25}$/) // Update regex as needed
      ]],
    });
    
 

  }

  submit() {

    const params = {
      id : this.editData.id,
      exammode : this.examModeDetails.value.examMode
    }

    

    this.updateExamModeAPI(params)

  }

  // resetSearchForm() {
  //   console.log("reset form");

  // }

  cancleEdit(){
    this.router.navigate(['/exam/examMode'])

  }
  updateExamModeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.editExamMode(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
          // this.viewPaperTypeAPI()
        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
          willClose: () => {
            this.router.navigate(['/exam/examMode'])
        
        
                  }
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
