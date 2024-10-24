import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-slot-mapping',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule],
  templateUrl: './add-slot-mapping.component.html',
  styleUrl: './add-slot-mapping.component.scss'
})
export class AddSlotMappingComponent {
  addExamDetails: FormGroup;

  examCentre: any[] = [1, 2, 3];
  examSlot: any[] = ['r1', 'r2', 'r3'];

 
  paperType: any[] = ['m1', 'm2', 'm3'];
  



  constructor(private readonly fb: FormBuilder) {



    this.addExamDetails = this.fb.group({

      examCentre: ['', [
        Validators.required,
      ]],

      examSlot: ['', [
        Validators.required,
      ]],
      
      paperType: ['', [
        Validators.required,
      ]],

      TotalCount: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)

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
