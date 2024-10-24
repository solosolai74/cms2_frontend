import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-region',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-region.component.html',
  styleUrl: './edit-region.component.scss'
})
export class EditRegionComponent {
  examModeDetails: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  // @Output() dataChanged = new EventEmitter<any>();
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();


  constructor(private readonly fb: FormBuilder, private readonly router: Router) {

    this.examModeDetails = this.fb.group({
      region: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,25}$/) // Update regex as needed
      ]],
    });

  }


  ngOnInit() {
    console.log("--p", this.data);

    this.examModeDetails.get('region')?.setValue(this.data.region);

  }
  submit() {
    console.log("examModeDetails", this.examModeDetails.value);
    //  this.dataChanged.emit(this.examModeDetails.value);
    this.dataChanged.emit({ value: this.examModeDetails.value, updated: true });

  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {
    //  this.router.navigate(['/exam/region'])

    //  this.dataChanged.emit('');
    this.dataChanged.emit({ value: '', updated: false });


  }


}
