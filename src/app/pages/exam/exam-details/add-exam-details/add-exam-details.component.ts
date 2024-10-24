import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import Swal from 'sweetalert2';
import { ExamDetailsService } from '../../../../services/exam-details.service';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';



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
  // maxDate: Date;
  
  minDate: Date;
  constructor(private readonly fb: FormBuilder, private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService, private readonly router: Router ) {

    const today = new Date();

    // this.maxDate = today;

    // const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Set to tomorrow
 
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
        this.dateRangeValidator('mocStartDate') 
        // this.dateRangeValidator('examStartDate')
        // Validators.pattern(/^\d+$/)
      ]],

      examStartDate: ['', [
        Validators.required,
        this.dateRangeValidator('mocEndDate') 

        // Validators.pattern(/^\d+$/)
      ]],

      examEndDate: ['', [
        Validators.required,
        this.dateRangeValidator('examStartDate')

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

    });
  }

  submit(){
    console.log("addExamDetails", this.addExamDetails.value);
    

    const params = {
      examname: this.addExamDetails.value.examName,
      clientname:  this.addExamDetails.value.clientName,
      no_of_examdays: this.addExamDetails.value.numberOfExamDay,
      no_of_regions: this.addExamDetails.value.numberOfRegion,
      no_of_examslot: this.addExamDetails.value.numberOfExamSlot,
      no_of_centers: this.addExamDetails.value.numberOfCentres,
      exam_start_date: this.addExamDetails.value.examStartDate.format('YYYY-MM-DD'),
      exam_end_date: this.addExamDetails.value.examEndDate.format('YYYY-MM-DD'),
      mock_start_date: this.addExamDetails.value.mocStartDate.format('YYYY-MM-DD'),
      mock_end_date: this.addExamDetails.value.mocEndDate.format('YYYY-MM-DD'),
      exam_hash: this.addExamDetails.value.examHash,
      examcode: this.addExamDetails.value.examCode
    }


    // const formattedDate = params.mock_start_date.format('YYYY-MM-DD');
    
    this.examDetailsService.addExamDetails(params).subscribe((res) => {
  
        if (res.api_status === true) {
          this.resetSearchForm()
          
        Swal.fire({
          // title: `${res.message}`,
          text: `${res.message}`,
          icon: 'success',
          
        })
        } else {
          Swal.fire({
            // title: `${res.message}`,
            text:`${res.message}`,
            icon: 'error',
          });
        }
      } ,
      (error) => {
        this.common.apiErrorHandler(error);
      }
    );


  }



  resetSearchForm() {
    this.addExamDetails.reset();

    // Clear validation errors for each form control
    Object.keys(this.addExamDetails.controls).forEach((controlName) => {
      const control = this.addExamDetails.get(controlName);
      if (control) {
        control.setErrors(null);
      }
    });
  }
  

 // Custom validator function for end dates
 dateRangeValidator(startDateKey: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = this.addExamDetails?.get(startDateKey)?.value;

    if (!startDate || !control.value) {
      return null; // Don't validate if either date is not set
    }

    const endDate = control.value;

    return endDate < startDate ? { dateRangeInvalid: true } : null;
  };
}

}
