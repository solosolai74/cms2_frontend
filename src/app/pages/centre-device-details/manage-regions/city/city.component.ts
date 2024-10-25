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
import { CentreDeviceDetailsService } from '../../../../services/centre-device-details.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditCityComponent, MatSelectModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})

export class CityComponent {

  cityForm: FormGroup;
  cityData: any[] = []
  regionData: any[] = []
  stateData: any[] = []
  examName: any[] = []
  editable: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
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
      examName: ['', [
        Validators.required,
      ]],
    })
  }

  ngOnInit() {
    const retrievedDataString = localStorage.getItem('examName');
    this.examName = retrievedDataString ? JSON.parse(retrievedDataString) : [];
    this.viewCityApi()
  }

  submit() {
    console.log("cityForm", this.cityForm.value);
    const params = {
      examregion: this.cityForm.value.region,
      examcode: this.cityForm.value.examName,
      statename: this.cityForm.value.state,
      cityname: this.cityForm.value.city
    }
    this.addCityApi(params)
  }

  editInput: any = ''
  editExamMode(data: any) {
    this.editInput = data
    this.editable = true
  }

  deleteExamMode(data: any) {
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
        const params = { id: data.id }
        this.deleteCityApi(params)
      } else if (result.isDenied) {
        Swal.fire('Deleting Region Cancelled', '', 'warning');
      }
    });
  }


  onRegionChange({ value, updated }: { value: any; updated: boolean }) {
    this.editable = false;
    this.viewCityApi()
  }

  addCityApi(data: any) {
    this.centreDeviceDetailService.addExamCity(data).subscribe((res) => {
      if (res.api_status === true) {
        this.viewCityApi()
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

  viewCityApi() {
    this.centreDeviceDetailService.ViewExamCity().subscribe((res) => {
      if (res.api_status === true) {
        this.cityData = res.data
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

  deleteCityApi(data: any) {
    this.centreDeviceDetailService.deleteExamCity(data).subscribe((res) => {
      if (res.api_status === true) {
        this.cityData = this.cityData.filter(item => {
          return item.id != data.id
        })
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

  onExamSelect(event: any) {
    const params = { examcode: event.value }
    this.regionStateApi(params)
  }

  onRegionSelect(event: any) {
    const params = { examcode: this.cityForm.value.examName, regionname: event.value }
    this.examStateApi(params)
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
}
