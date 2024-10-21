import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';



export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-exam-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-exam-details.component.html',
  styleUrl: './add-exam-details.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class AddExamDetailsComponent {
  // date = new FormControl(moment());
  addExamDetails: FormGroup;
  maxDate: Date;


  constructor(private fb: FormBuilder) {

    const today = new Date();

    this.maxDate = today;

    // const currentDate = new FormControl(moment())


    this.addExamDetails = this.fb.group({

      examName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      clientName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      numberOfExamDay: ['', [
        Validators.required,
        // Validators.pattern(/^[0-9]{10}$/)
        Validators.pattern(/^\d+$/)
      ]],

      numberOfExamSlot: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      numberOfRegion: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      numberOfCentres: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      mocStartDate: ['', [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],

      mocEndDate: ['', [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],

      examStartDate: ['', [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],

      examEndDate: ['', [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],

      examHash: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      examCode: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],




      // user_name: ['', [
      //   Validators.required,
      //   Validators.pattern(/^[a-zA-Z\s.0-9]{0,20}$/) 
      // ]],
      // contact_number: ['', [
      //   Validators.required,
      //   Validators.pattern(/^[0-9]{10}$/)
      // ]],
      // contact_number: ['', Validators.required],
      // designation: ['', Validators.required],
      // designation: ['', [
        
      //   Validators.pattern(/^[\s\S]{0,200}$/)
      // ]],
      // // rank: ['', Validators.required]
      // rank: ['', [
      //   Validators.required,
      //   Validators.pattern(/^[\s\S]{0,200}$/) 
      // ]],
      // otherPurpose: ['', Validators.pattern(/^[\s\S]{0,20}$/)]
    });
  }

  submit(){
    console.log("addExamDetails", this.addExamDetails.value);
    
  }

  resetSearchForm(){
    console.log("reset form");
    
  }
  
}
