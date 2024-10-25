import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-device-mapping',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './device-mapping.component.html',
  styleUrl: './device-mapping.component.scss'
})
export class DeviceMappingComponent {
  deviceMappingForm: FormGroup;

  deviceName: any[] = [1, 2, 3];
  centreName: any[] = ['r1', 'r2', 'r3'];
  examName: any[] = ['r1', 'r2', 'r3'];
 
  constructor(private readonly fb: FormBuilder) {

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

  submit(){
    console.log("deviceMappingForm", this.deviceMappingForm.value);
    
  }

  resetSearchForm(){
    console.log("reset form");
    
  }

}
