import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ExamDetailsService } from '../../../../../services/exam-details.service';
import { CommonService } from '../../../../../services/common.service';
import Swal from 'sweetalert2';

import moment from 'moment';

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
  selector: 'app-edit-exam-details',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './edit-exam-details.component.html',
  styleUrl: './edit-exam-details.component.scss',
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
export class EditExamDetailsComponent {
  addExamDetails: FormGroup;
  // maxDate: Date;

  minDate: Date;
  editData: any


  constructor(private readonly fb: FormBuilder , private readonly router: Router, private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService,) {

    const today = new Date();

    // this.maxDate = today;

    // const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Set to tomorrow
 
    // const currentDate = new FormControl(moment())


    const retrievedDataString = localStorage.getItem('edit');
    this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;
    

    
 
    this.addExamDetails = this.fb.group({

      examName: [this.editData.examname, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      clientName: [this.editData.clientname, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      numberOfExamDay: [this.editData.no_of_examdays, [
        Validators.required,
        // Validators.pattern(/^[0-9]{10}$/)
        Validators.pattern(/^\d+$/)
      ]],

      numberOfExamSlot: [this.editData.no_of_examslot, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      numberOfRegion: [this.editData.no_of_regions, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      numberOfCentres: [this.editData.no_of_centers, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      mocStartDate: [this.editData.mock_start_date, [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],

      mocEndDate: [this.editData.mock_end_date, [
        Validators.required,
        this.dateRangeValidator('mocStartDate') 
        // this.dateRangeValidator('examStartDate')
        // Validators.pattern(/^\d+$/)
      ]],

      examStartDate: [this.editData.exam_start_date, [
        Validators.required,
        this.dateRangeValidator('mocEndDate') 

        // Validators.pattern(/^\d+$/)
      ]],

      examEndDate: [this.editData.exam_end_date, [
        Validators.required,
        this.dateRangeValidator('examStartDate')

        // Validators.pattern(/^\d+$/)
      ]],

      examHash: [this.editData.exam_hash, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      examCode: [this.editData.examcode, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

    });

  }

  submit(){

    const params = {
      id: this.editData.id,
      examname: this.addExamDetails.value.examName,
      clientname: this.addExamDetails.value.clientName,
      no_of_examdays: this.addExamDetails.value.numberOfExamDay,
      no_of_regions: this.addExamDetails.value.numberOfRegion,
      no_of_examslot: this.addExamDetails.value.numberOfExamSlot,
      no_of_centers: this.addExamDetails.value.numberOfCentres,
      exam_start_date: this.formatDate(this.addExamDetails.value.examStartDate),
      exam_end_date: this.formatDate(this.addExamDetails.value.examEndDate),
      mock_start_date: this.formatDate(this.addExamDetails.value.mocStartDate),
      mock_end_date: this.formatDate(this.addExamDetails.value.mocEndDate),
      exam_hash: this.addExamDetails.value.examHash,
      examcode: this.addExamDetails.value.examCode
    };


    
    this.examDetailsService.editExamDetails(params).subscribe((res) => {
  
        if (res.api_status === true) {
          // this.resetSearchForm()
          
        Swal.fire({
          // title: `${res.message}`,
          text: `${res.message}`,
          icon: 'success',
          willClose: () => {
            this.router.navigate(['/exam/examDetails']);

          }
        })
        } else {
          Swal.fire({
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


  cancleEdit(){
    this.router.navigate(['/exam/examDetails'])

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



formatDate(date : any) {
  if (!date) return null; // Handle null or undefined
  if (moment.isMoment(date)) {
    // If it's a moment object
    return date.format('YYYY-MM-DD');
  } else {
    // Handle other cases (e.g., Date objects or strings)
    const parsedDate = moment(date);
    return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
  }
}

}
