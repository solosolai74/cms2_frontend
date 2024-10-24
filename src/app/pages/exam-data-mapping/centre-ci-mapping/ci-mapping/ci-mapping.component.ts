import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ci-mapping',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './ci-mapping.component.html',
  styleUrl: './ci-mapping.component.scss'
})
export class CiMappingComponent {
  addExamDetails: FormGroup;

  centreCode: any[] = [1, 2, 3];
  memberRole: any[] = ['r1', 'r2', 'r3'];

 
  memberName: any[] = ['m1', 'm2', 'm3'];
  



  constructor(private readonly fb: FormBuilder) {



    this.addExamDetails = this.fb.group({

      centreCode: ['', [
        Validators.required,
      ]],

      memberRole: ['', [
        Validators.required,
      ]],
      
      memberName: ['', [
        Validators.required,
      ]],
 

    });
  }

  submit(){
    console.log("addExamDetails", this.addExamDetails.value);
    
  }

  resetSearchForm(){
    console.log("reset form");
    
  }

}
