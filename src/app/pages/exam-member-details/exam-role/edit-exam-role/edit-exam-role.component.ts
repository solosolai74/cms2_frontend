import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exam-role',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-exam-role.component.html',
  styleUrl: './edit-exam-role.component.scss'
})
export class EditExamRoleComponent {
  examModeDetails: FormGroup;
  editData: any


  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    const retrievedDataString = localStorage.getItem('edit');
    this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data", this.editData.roleType);



    this.examModeDetails = this.fb.group({
      roleType: [this.editData.roleType, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,25}$/) // Update regex as needed
      ]],
    });
  }

  submit() {
    console.log("examModeDetails", this.examModeDetails.value);

  }

  resetSearchForm() {
    console.log("reset form");

  }

  cancleEdit() {
    this.router.navigate(['/examMembersDetails/examRole'])
  }


}
