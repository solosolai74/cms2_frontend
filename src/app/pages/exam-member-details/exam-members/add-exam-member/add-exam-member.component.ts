import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-exam-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './add-exam-member.component.html',
  styleUrl: './add-exam-member.component.scss'
})
export class AddExamMemberComponent {
  addExamDetails: FormGroup;

  memberRole: any[] = ['r1', 'r2', 'r3'];
 
  memberType: any[] = ['m1', 'm2', 'm3'];
  



  constructor(private readonly fb: FormBuilder) {



    this.addExamDetails = this.fb.group({

      memberName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]{0,25}$/)
      ]],
      memberRole: ['', [
        Validators.required,
      ]],
      emailId: ['', [
        Validators.required,
        // Validators.email
        Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      alternateNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      memberType: ['', [
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
