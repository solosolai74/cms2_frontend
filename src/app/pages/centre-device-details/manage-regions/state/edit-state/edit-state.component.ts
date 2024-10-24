import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-state',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-state.component.html',
  styleUrl: './edit-state.component.scss'
})
export class EditStateComponent {


  editStateForm: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();
  regionData: any[] = ['r1', 'r2', 'r3']


  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    //  this.editData = localStorage.getItem('edit')
    //  this.editData = JSON.parse(localStorage.getItem('edit'));

    //   const retrievedDataString = localStorage.getItem('edit');
    // this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;

    console.log("edit data state", this.data);



    this.editStateForm = this.fb.group({
      state: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,30}$/) // Update regex as needed
      ]],
      region: ['', [
        Validators.required,
      ]],
    });



  }

  ngOnInit() {
    console.log("edit data state init", this.data);

    this.editStateForm.get('region')?.setValue(this.data.region);
    this.editStateForm.get('state')?.setValue(this.data.state);

  }

  submit() {
    console.log("editStateForm", this.editStateForm.value);
    //  this.dataChanged.emit(this.editStateForm.value);
    this.dataChanged.emit({ value: this.editStateForm.value, updated: true });

  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {

    //  this.dataChanged.emit('');
    this.dataChanged.emit({ value: '', updated: false });


  }

}
