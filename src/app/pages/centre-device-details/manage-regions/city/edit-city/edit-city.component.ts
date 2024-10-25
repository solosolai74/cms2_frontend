import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CentreDeviceDetailsService } from '../../../../../services/centre-device-details.service';
import { CommonService } from '../../../../../services/common.service';
import Swal from 'sweetalert2';

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
  @Input() data: any;
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();
  regionData: any[] = []
  stateData: any[] = []
  examName: any[] = []

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
    this.cityForm = this.fb.group({
      examName: ['', [
        Validators.required,
      ]],
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
    const retrievedDataString = localStorage.getItem('examName');
    this.examName = retrievedDataString ? JSON.parse(retrievedDataString) : [];
    const params = { examcode: this.data.examcode__examcode }
    this.regionStateApi(params)
    const params2 = { examcode: this.data.examcode__examcode, regionname: this.data.examregion__regionname }
    this.examStateApi(params2)
    this.cityForm.get('examName')?.setValue(this.data.examcode__examcode);
    this.cityForm.get('region')?.setValue(this.data.examregion__regionname);
    this.cityForm.get('state')?.setValue(this.data.examstate__statename);
    this.cityForm.get('city')?.setValue(this.data.cityname);
  }

  submit() {
    const params = {
      id: this.data.id,
      statename: this.cityForm.value.state,
      examregion__regionname: this.cityForm.value.region,
      examcode__examcode: this.cityForm.value.examName,
      cityname: this.cityForm.value.city
    }
    this.editStateApi(params)
  }

  resetSearchForm() {
    console.log("reset form");
  }

  cancleEdit() {
    this.dataChanged.emit({ value: '', updated: false });
  }

  onExamSelect(event: any) {
    const params = { examcode: event.value }
    this.regionStateApi(params)
  }

  regionStateApi(data: any) {
    this.centreDeviceDetailService.regionLists(data).subscribe((res) => {
      if (res.api_status === true) {
        this.regionData = res.data
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

  examStateApi(data: any) {
    this.centreDeviceDetailService.stateList(data).subscribe((res) => {
      if (res.api_status === true) {
        this.stateData = res.data
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
  
  editStateApi(data: any) {
    this.centreDeviceDetailService.editExamCity(data).subscribe((res) => {
      if (res.api_status === true) {
        this.dataChanged.emit({ value: this.cityForm.value, updated: true });
        Swal.fire({
          text: `${res.message}`,
          icon: 'success',
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
}
