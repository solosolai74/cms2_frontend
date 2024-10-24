import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import moment from 'moment';
import { ExamDetailsService } from '../../../../services/exam-details.service';
import { CommonService } from '../../../../services/common.service';
import Swal from 'sweetalert2';


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
  selector: 'app-edit-exam-slots',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './edit-exam-slots.component.html',
  styleUrl: './edit-exam-slots.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditExamSlotsComponent {
  examSlotsFrom: FormGroup;
  editData: any

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly examDetailsService: ExamDetailsService, private readonly common: CommonService) {


    const retrievedDataString = localStorage.getItem('edit');
    this.editData = retrievedDataString ? JSON.parse(retrievedDataString) : null;




    // / Parse the download_time using moment
    const parsedDateTime = moment(this.editData.download_time);

    // Extract date and time separately
    const date = parsedDateTime.format('YYYY-MM-DD'); // e.g., '2025-06-04'
    const time = parsedDateTime.format('HH:mm:ss'); // e.g., '22:24:00'


    this.examSlotsFrom = this.fb.group({

      examSlot: [this.editData.examslot, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,2}$/)
      ]],

      downloadTime: [time, [
        Validators.required,
        // Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],
      downloadDate: [date, [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],
    })


  }

  submit() {

    const params = {
      id: this.editData.id,
      examslot: this.examSlotsFrom.value.examSlot,
      download_time: this.formatDate(this.examSlotsFrom.value.downloadDate) + " " + this.examSlotsFrom.value.downloadTime
    }



    this.editSlotDetailAPI(params)
  }



  cancleEdit() {
    this.router.navigate(['/exam/examSlots'])

  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }



  editSlotDetailAPI(data: any) {
    // this.showTable = false
    this.examDetailsService.editExamSlot(data).subscribe((res) => {
      // this.showTable = true

      if (res.api_status === true) {


        Swal.fire({
          text: `${res.message}`,
          icon: 'success',
          willClose: () => {
            this.router.navigate(['/exam/examSlots'])

          }
        });
      } else {
        Swal.fire({
          text: `${res.message}`,
          icon: 'error',
        });
      }
    },
      (error) => {

        this.common.apiErrorHandler(error);
      }
    );
  }


  formatDate(date: any) {
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
