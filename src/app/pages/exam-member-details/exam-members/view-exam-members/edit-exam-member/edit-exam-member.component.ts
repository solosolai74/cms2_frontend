import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-exam-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatCardModule],
  templateUrl: './edit-exam-member.component.html',
  styleUrl: './edit-exam-member.component.scss'
})
export class EditExamMemberComponent {
  editExamDetails: FormGroup;


  memberRole: any[] = ['role1', 'role2', 'role3'];
 
  memberType: any[] = ['type1', 'type2', 'type3'];

  editData: any

  constructor(private readonly fb: FormBuilder,  private readonly router: Router) {

    const retrievedDataString = localStorage.getItem('edit');
    this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;
    
    console.log("edit data --0", this.editData);

   
    this.editExamDetails = this.fb.group({

      memberName: [this.editData.memberName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]{0,25}$/)
      ]],
      memberRole: [this.editData.memberRole, [
        Validators.required,
      ]],
      emailId: [this.editData.emailId, [
        Validators.required,
        // Validators.email
        Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
      ]],
      contactNumber: [this.editData.contactNumber, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      alternateNumber: [this.editData.alternateNumber, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      memberType: [this.editData.memberType, [
        Validators.required,
      ]],
 

    });
  }

  submit(){
    console.log("editExamDetails", this.editExamDetails.value);
    
  }

  resetSearchForm(){
    console.log("reset form");
    
  }

  cancleEdit(){
    // this.router.navigate(['/exam/examDetails'])
// this.router.navigate(['/centreDeviceDetails/examCentre'])

this.router.navigate(['/examMembersDetails/examMembers'])

  }

}
