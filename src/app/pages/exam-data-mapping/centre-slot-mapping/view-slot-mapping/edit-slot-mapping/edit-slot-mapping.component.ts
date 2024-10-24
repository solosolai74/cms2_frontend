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
  selector: 'app-edit-slot-mapping',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-slot-mapping.component.html',
  styleUrl: './edit-slot-mapping.component.scss'
})
export class EditSlotMappingComponent {

  addExamDetails: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();

  
  examCentre: any[] = [1, 2, 3];
  examSlot: any[] = ['r1', 'r2', 'r3'];

 
  paperType: any[] = ['m1', 'm2', 'm3'];



  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    //   const retrievedDataString = localStorage.getItem('edit');
    // this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data state", this.data);



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

  ngOnInit() {
    console.log("edit data state init", this.data);

    this.addExamDetails.get('examCentre')?.setValue(this.data.examCentre);
    this.addExamDetails.get('examSlot')?.setValue(this.data.examSlot);
    this.addExamDetails.get('paperType')?.setValue(this.data.paperType);
    this.addExamDetails.get('TotalCount')?.setValue(this.data.TotalCount);



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
