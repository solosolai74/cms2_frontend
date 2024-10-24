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
  selector: 'app-edit-city',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.scss'
})
export class EditCityComponent {


  cityForm: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();
  regionData: any[] = ['r1', 'r2', 'r3']
  stateData: any[] = ['s1', 's2', 's3']



  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    //   const retrievedDataString = localStorage.getItem('edit');
    // this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data state", this.data);



    this.cityForm = this.fb.group({
      city: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],
      state: ['', [
        Validators.required,
      ]],
      region: ['', [
        Validators.required,
      ]],

    });



  }

  ngOnInit() {
    console.log("edit data state init", this.data);

    this.cityForm.get('region')?.setValue(this.data.region);
    this.cityForm.get('state')?.setValue(this.data.state);
    this.cityForm.get('city')?.setValue(this.data.city);


  }

  submit() {
    console.log("cityForm", this.cityForm.value);
    //  this.dataChanged.emit(this.cityForm.value);
    this.dataChanged.emit({ value: this.cityForm.value, updated: true });

  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {

    //  this.dataChanged.emit('');
    this.dataChanged.emit({ value: '', updated: false });


  }

}
