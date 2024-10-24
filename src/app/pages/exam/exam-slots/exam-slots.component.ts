import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CommonService } from '../../../services/common.service';
import { ExamDetailsService } from '../../../services/exam-details.service';
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
  selector: 'app-exam-slots',
  standalone: true,
  imports: [ FormsModule, MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './exam-slots.component.html',
  styleUrl: './exam-slots.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExamSlotsComponent {


  examSlotsFrom: FormGroup;
  examModeData: any[] = [
    {
      examSlot: 'M1',
      downloadTime: '2024-10-01', 
    },
    {
      examSlot: 'M2',
      downloadTime: '2024-10-01',
    }
  ]

  dateTime: string;


  examDate: Date | null = null; // Store the selected date
  examTime: string = '';
  
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService, private readonly fb: FormBuilder, private readonly router: Router,  private readonly examDetailsService : ExamDetailsService,  private readonly common : CommonService,) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Slots Details');
    this.dateTime = '';


    this.examSlotsFrom = this.fb.group({

      examSlot: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,2}$/)
      ]],

      downloadTime: ['', [
        Validators.required,
        // Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/) 
      ]],

      
      downloadDate: ['', [
        Validators.required,
        // Validators.pattern(/^\d+$/)
      ]],
    })
    
  }

  ngOnInit(){
    this.viewSlotDetailAPI()
  }


  submit() {
    
    const params = {
      examslot: this.examSlotsFrom.value.examSlot,
      download_time: this.examSlotsFrom.value.downloadDate.format('YYYY-MM-DD') +" " + this.examSlotsFrom.value.downloadTime
    }
    
    this.addSlotDetailAPI(params)

  }



  resetSearchForm() {
    this.examSlotsFrom.reset();

    // Clear validation errors for each form control
    Object.keys(this.examSlotsFrom.controls).forEach((controlName) => {
      const control = this.examSlotsFrom.get(controlName);
      if (control) {
        control.setErrors(null);
      }
    });
  }



  editExamMode(data: any) {
    localStorage.setItem('edit', JSON.stringify(data));

    this.router.navigate(['/exam/editExamSlot'])


  }

  deleteExamMode(data: any) {

    Swal.fire({
      icon: 'question',
      title: 'Are You Sure Want To Delete The Exam Slot?',
      // text: file.name,
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {

        // delete here

        const params = {id: data.id}
        this.delteSlotDetailAPI(params)


      } else if (result.isDenied) {
        Swal.fire('Deleting Exam Slot Cancelled', '', 'warning');
      }
    });

  }

  
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

  addSlotDetailAPI(data : any){
    // this.showTable = false
    this.examDetailsService.AddExamSlot(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {

        // Combine date and time
        const combinedDateTime = moment(`${this.examSlotsFrom.value.downloadDate.format('YYYY-MM-DD')}T${this.examSlotsFrom.value.downloadTime}:00Z`);

        // Format to the required ISO string
        const downloadTime = combinedDateTime.toISOString();


        this.resetSearchForm()
        this.viewSlotDetailAPI()
        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
        });
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



  viewSlotDetailAPI(){
    // this.showTable = false
    this.examDetailsService.viewExamSlot().subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
        // this.resetSearchForm()
        this.examModeData = res.data
       
        // Swal.fire({
        //   text:`${res.message}`,
        //   icon: 'success',
        // });
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
  

  delteSlotDetailAPI(data : any){
    // this.showTable = false
    this.examDetailsService.deleteExamSlot(data).subscribe((res) => {
      // this.showTable = true
  
      if (res.api_status === true) {
        // this.resetSearchForm()
        this.examModeData = this.examModeData.filter(item=>{
          return item.id != data.id
        })

        
        Swal.fire({
          text:`${res.message}`,
          icon: 'success',
        });
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

  


}
