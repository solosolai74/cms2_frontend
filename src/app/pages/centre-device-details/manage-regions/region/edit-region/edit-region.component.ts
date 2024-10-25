import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
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
  selector: 'app-edit-region',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-region.component.html',
  styleUrl: './edit-region.component.scss'
})

export class EditRegionComponent {
  examModeDetails: FormGroup;
  editData: any
  @Input() data: any; 
  @Output() dataChanged = new EventEmitter<{ value: any; updated: boolean }>();
  examName: any[] = []

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly centreDeviceDetailService: CentreDeviceDetailsService, private readonly common: CommonService) {
   
    this.examModeDetails = this.fb.group({
      examName: ['', [
        Validators.required,
      ]],
      region: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{1,25}$/) // Update regex as needed
      ]],
    });

    const retrievedDataString = localStorage.getItem('examName');
    this.examName = retrievedDataString ? JSON.parse(retrievedDataString) : [];
  }

  ngOnInit() {
    this.examModeDetails.get('examName')?.setValue(this.data.examcode__examcode);
    this.examModeDetails.get('region')?.setValue(this.data.regionname);
  }

  submit() {
    const params = {
      id: this.data.id,
      regionname: this.examModeDetails.value.region,
      examcode__examcode: this.examModeDetails.value.examName
    }
    this.editRegionApi(params)
  }

  cancleEdit() {
    this.dataChanged.emit({ value: '', updated: false });
  }

  editRegionApi(data: any) {
    this.centreDeviceDetailService.editExamRegion(data).subscribe((res) => {
      if (res.api_status === true) {
        this.dataChanged.emit({ value: this.examModeDetails.value, updated: true });
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
