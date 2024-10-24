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
  selector: 'app-edit-paper-type',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-paper-type.component.html',
  styleUrl: './edit-paper-type.component.scss'
})
export class EditPaperTypeComponent {

  examModeDetails: FormGroup;
  editData: any
  
  constructor(private readonly fb: FormBuilder, private readonly router: Router,  private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService) {


    const retrievedDataString = localStorage.getItem('edit');
    this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;
    

    this.examModeDetails = this.fb.group({

      paperType: [this.editData.papertype, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,2}$/) 
      ]],

    
    })


  }

  submit() {
    const params = {
      id : this.editData.id,
      papertype : this.examModeDetails.value.paperType
    }

    this.updatePaperTypeAPI(params)
  }

  cancleEdit(){
    this.router.navigate(['/exam/paperType'])

  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.examModeDetails.get('paperType')?.setValue(input.value);

  }


  updatePaperTypeAPI(data : any){
    // this.showTable = false
    this.examDetailsService.editPaperType(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
          // this.viewPaperTypeAPI()
        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
          willClose: () => {
            this.router.navigate(['/exam/paperType'])
        
        
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
