import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditRegionComponent } from './edit-region/edit-region.component';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditRegionComponent],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent {
  regionForm: FormGroup;
  regionData: any[] = [
    {
      region: 'M1',
    },
    {
      region: 'M2',
    }
  ]

  editable: boolean = false;

  constructor( private readonly fb: FormBuilder, private readonly router: Router) {

    this.regionForm = this.fb.group({

      region: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],

     
    })
  }

  submit() {
    console.log("regionForm", this.regionForm.value);

  }

  resetSearchForm() {
    console.log("reset form");

  }


  editInput : any
  editExamMode(data: any) {
    console.log("edit", data);
    this.editable = true

    this.editInput = data

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
    // this.regionForm.get('region')?.setValue(value);

    this.editable = false;
  
  }
  

}
