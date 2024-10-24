import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ci-mapping',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-ci-mapping.component.html',
  styleUrl: './edit-ci-mapping.component.scss'
})
export class EditCiMappingComponent {

  addExamDetails: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();

  
  centreCode: any[] = [1, 2, 3];
  memberRole: any[] = ['r1', 'r2', 'r3'];

 
  memberName: any[] = ['m1', 'm2', 'm3'];



  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    //   const retrievedDataString = localStorage.getItem('edit');
    // this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data state", this.data);



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

  ngOnInit() {
    console.log("edit data state init", this.data);

    this.addExamDetails.get('centreCode')?.setValue(this.data.centreCode);
    this.addExamDetails.get('memberRole')?.setValue(this.data.memberRole);
    this.addExamDetails.get('memberName')?.setValue(this.data.memberName);


  }

  submit() {
    console.log("addExamDetails", this.addExamDetails.value);
    //  this.dataChanged.emit(this.addExamDetails.value);
    this.dataChanged.emit({ value: this.addExamDetails.value, updated: true });

  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {

    //  this.dataChanged.emit('');
    this.dataChanged.emit({ value: '', updated: false });


  }
}
