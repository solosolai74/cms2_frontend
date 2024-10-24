import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exam-device',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-exam-device.component.html',
  styleUrl: './edit-exam-device.component.scss'
})
export class EditExamDeviceComponent {
  deviceForm: FormGroup;
  editData : any 

 
 constructor(private readonly fb: FormBuilder, private readonly router: Router) {

 //  this.editData = localStorage.getItem('edit')
 //  this.editData = JSON.parse(localStorage.getItem('edit'));
  
  const retrievedDataString = localStorage.getItem('edit');
this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

console.log("edit data --0", this.editData);



   this.deviceForm = this.fb.group({
     deviceName: [this.editData.deviceName, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
    ]],
    serialNumber: [this.editData.serialNo, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
    ]],

   });
   


 }

 submit() {
   console.log("deviceForm", this.deviceForm.value);

 }

 resetSearchForm() {
   console.log("reset form");

 }

 cancleEdit(){
   this.router.navigate(['/centreDeviceDetails/examDevice'])

 }

}
