import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CentreDeviceDetailsService } from '../../../../../services/centre-device-details.service';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'app-edit-state',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-state.component.html',
  styleUrl: './edit-state.component.scss'
})

export class EditStateComponent {

  editStateForm: FormGroup;
  editData: any
  @Input() data: any; // Use a more specific type if you know the structure
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();
  regionData: any[] = []
  examName: any[] = []

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
    this.editStateForm = this.fb.group({
      examName: ['', [
        Validators.required,
      ]],
      state: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,30}$/) // Update regex as needed
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
    this.editStateForm.get('region')?.setValue(this.data.examregion__regionname);
    this.editStateForm.get('state')?.setValue(this.data.statename);
    this.editStateForm.get('examName')?.setValue(this.data.examcode__examcode);
  }

  submit() {
    const params = {
      id: this.data.id,
      statename: this.editStateForm.value.state,
      examregion__regionname: this.editStateForm.value.region,
      examcode__examcode: this.editStateForm.value.examName
    }
    this.editStateApi(params)
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

  editStateApi(data: any) {
    this.centreDeviceDetailService.editExamState(data).subscribe((res) => {
      if (res.api_status === true) {
        this.dataChanged.emit({ value: this.editStateForm.value, updated: true });
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
