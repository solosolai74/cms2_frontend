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
  selector: 'app-edit-device-mapping',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-device-mapping.component.html',
  styleUrl: './edit-device-mapping.component.scss'
})
export class EditDeviceMappingComponent {


  deviceMappingForm: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();

  
  deviceName: any[] = [1, 2, 3];
  centreName: any[] = ['r1', 'r2', 'r3'];
  examName: any[] = ['r1', 'r2', 'r3'];



  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    //   const retrievedDataString = localStorage.getItem('edit');
    // this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data state", this.data);



    this.deviceMappingForm = this.fb.group({

      deviceName: ['', [
        Validators.required,
      ]],

      centreName: ['', [
        Validators.required,
      ]],

      examName: ['', [
        Validators.required,
      ]],
 

    });



  }

  ngOnInit() {
    console.log("edit data state init", this.data);

    this.deviceMappingForm.get('centreCode')?.setValue(this.data.centreCode);
    this.deviceMappingForm.get('memberRole')?.setValue(this.data.memberRole);
    this.deviceMappingForm.get('memberName')?.setValue(this.data.memberName);


  }

  submit() {
    console.log("deviceMappingForm", this.deviceMappingForm.value);
    //  this.dataChanged.emit(this.deviceMappingForm.value);
    this.dataChanged.emit({ value: this.deviceMappingForm.value, updated: true });

  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {

    //  this.dataChanged.emit('');
    this.dataChanged.emit({ value: '', updated: false });


  }

}
