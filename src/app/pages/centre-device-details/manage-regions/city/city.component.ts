import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditCityComponent } from './edit-city/edit-city.component';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditCityComponent,MatSelectModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent {
  cityForm: FormGroup;
  cityData: any[] = [
    {
      region: 'r1',
      state: 's1',
      city: 'c1'

    },
    {
      region: 'r2',
      state: 's2',
      city: 'c2'

    }
  ]

  regionData: any[] = ['r1', 'r2', 'r3']
  stateData: any[] = ['s1', 's2', 's3']


  editable: boolean = false;

  constructor( private readonly fb: FormBuilder, private readonly router: Router) {

    this.cityForm = this.fb.group({
      city: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,30}$/)
      ]],
      state: ['', [
        Validators.required,
      ]],
      region: ['', [
        Validators.required,
      ]],

     
    })
  }

  submit() {
    console.log("cityForm", this.cityForm.value);

  }

  resetSearchForm() {
    console.log("reset form");

  }


editInput: any = ''
  editExamMode(data: any) {
    console.log("edit", data);
    this.editInput = data
    this.editable = true
    // localStorage.setItem('edit', JSON.stringify(data));
    // // localStorage.setItem('edit', data);

    // this.router.navigate(['/exam/editExamMode'])


  }

  deleteExamMode(data: any) {
    console.log("delete", data);

    Swal.fire({
      icon: 'question',
      title: 'Are You Sure Want To Delete The Region?',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {

        // delete here
        console.log("delete confirm", data);




      } else if (result.isDenied) {
        Swal.fire('Deleting Region Cancelled', '', 'warning');
      }
    });

  }


  // onRegionChange(updatedRegion: any) {
  //   console.log('Region changed:', updatedRegion);
  // }

  onRegionChange({ value, updated }: { value: any; updated: boolean }) {
    console.log('Region changed:', value);
    console.log('Updated status:', updated);
    // Handle the updated data here, e.g., update the FormControl
    // this.cityForm.get('region')?.setValue(value);

    this.editable = false;
  
  }
}
