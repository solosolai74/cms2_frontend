import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditRegionComponent } from '../region/edit-region/edit-region.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import { EditStateComponent } from './edit-state/edit-state.component';
import { CentreDeviceDetailsService } from '../../../../services/centre-device-details.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, EditStateComponent, MatSelectModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})

export class StateComponent {

  stateForm: FormGroup;
  stateData: any[] = []
  regionData: any[] = []
  editable: boolean = false;
  examName: any[] = []
  editInput: any = ''

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
    this.stateForm = this.fb.group({
      examName: ['', [
        Validators.required,
      ]],
      state: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s.0-9]{0,30}$/)
      ]],
      region: ['', [
        Validators.required,
      ]],
    })
  }

  ngOnInit() {
    const retrievedDataString = localStorage.getItem('examName');
    this.examName = retrievedDataString ? JSON.parse(retrievedDataString) : [];
    this.viewStateApi()
  }

  submit() {
    const params = { examregion: this.stateForm.value.region, examcode: this.stateForm.value.examName, statename: this.stateForm.value.state }
    this.addStateApi(params)
  }

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
        this.deleteStateApi(params)
      } else if (result.isDenied) {
        Swal.fire('Deleting Region Cancelled', '', 'warning');
      }
    });
  }
  
  onRegionChange({ value, updated }: { value: any; updated: boolean }) {
    this.viewStateApi()
    this.editable = false;
  }

  addStateApi(data: any) {
    this.centreDeviceDetailService.addExamState(data).subscribe((res) => {
      if (res.api_status === true) {
        this.viewStateApi()
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

  viewStateApi() {
    this.centreDeviceDetailService.viewExamState().subscribe((res) => {
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

  deleteStateApi(data: any) {
    this.centreDeviceDetailService.deleteExamState(data).subscribe((res) => {
      if (res.api_status === true) {
        this.stateData = this.stateData.filter(item => {
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
}
