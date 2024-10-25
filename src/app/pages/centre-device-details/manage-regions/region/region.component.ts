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
import { MatSelectModule } from '@angular/material/select';
// import { centreDeviceDetailService } from '../../../../services/exam-details.service';
import { CommonService } from '../../../../services/common.service';
import { CentreDeviceDetailsService } from '../../../../services/centre-device-details.service';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditRegionComponent, MatSelectModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})

export class RegionComponent {

  regionForm: FormGroup;
  regionData: any[] = []
  examName: any[] = []
  editable: boolean = false;
  editInput: any

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
    this.regionForm = this.fb.group({
      examName: ['', [
        Validators.required,
      ]],
      region: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,25}$/)
      ]],
    })
  }

  ngOnInit() {
    const retrievedDataString = localStorage.getItem('examName');
    this.examName = retrievedDataString ? JSON.parse(retrievedDataString) : [];
    this.viewRegionApi()
  }

  submit() {
    const params = { regionname: this.regionForm.value.region, examcode: this.regionForm.value.examName }
    this.addRegionApi(params)
  }

  editExamMode(data: any) {
    this.editable = true
    this.editInput = data
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
        this.deleteRegionApi(params)
      } else if (result.isDenied) {
        Swal.fire('Deleting Region Cancelled', '', 'warning');
      }
    });
  }


  onRegionChange({ value, updated }: { value: any; updated: boolean }) {
    this.viewRegionApi()
    this.editable = false;
  }


  addRegionApi(data: any) {
    this.centreDeviceDetailService.addExamRegion(data).subscribe((res) => {
      if (res.api_status === true) {
        this.viewRegionApi()
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

  viewRegionApi() {
    this.centreDeviceDetailService.viewExamRegion().subscribe((res) => {
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

  deleteRegionApi(data: any) {
    this.centreDeviceDetailService.deleteExamRegion(data).subscribe((res) => {
      if (res.api_status === true) {
        this.regionData = this.regionData.filter(item => {
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
}
