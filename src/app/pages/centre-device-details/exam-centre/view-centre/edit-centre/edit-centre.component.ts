import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-centre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatCardModule],
  templateUrl: './edit-centre.component.html',
  styleUrl: './edit-centre.component.scss'
})
export class EditCentreComponent {
  addExamDetails: FormGroup;

  centreRegion: any[] = ['cr1', 'cr2', 'cr3']

  centreState: any[] = ['state1', 'state2', 'state3'];
  centreCity: any[] = ['city1', 'city2', 'city3'];
  centreStatus: any[] = ['status1', 'status2', 'status3'];
  rating: any[] = [1, 2, 3, 4, 5]; 
  examDetail: any[] = ['exam1', 'exam2', 'exam3'];
  



  constructor(private readonly fb: FormBuilder,  private readonly router: Router) {



   
    this.addExamDetails = this.fb.group({

      centreCode: ['', [
        Validators.required,
        Validators.pattern(/^\d{1,3}$/)
      ]],

      centreName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s_.:-]{0,50}$/)
      ]],

       centreAddress: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s_.:-]{0,250}$/)
      ]],

      centreRegion: ['', [
        Validators.required,
      ]],

      centreState: ['', [
        Validators.required,
      ]],

      centreCity: ['', [
        Validators.required,
      ]],

      centreLandmark: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s_.:-]{0,250}$/)
      ]],

      contactPersonName: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]{0,25}$/)
      ]],
      centreContactEmail: ['', [
        Validators.required,
        // Validators.email
        Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)

      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      centreSecondaryNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      centrePincode: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      centreGoogleMapUrl: ['', [
        Validators.required,
        // Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg|html|htm|pdf|json|txt|doc|docx|xls|xlsx|ppt|pptx))$/)
        // Validators.pattern(/^https?\:\/\/(www\.)?google\.[a-z]+\/maps\/?\?([^&]+&)*(ll=-?[0-9]{1,2}\.[0-9]+,-?[0-9]{1,2}\.[0-9]+|q=[^&+])+($|&)/)

      ]],
      latitude: ['', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d+)?$/) // Matches latitude format
      ]],
      longitude: ['', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d+)?$/) // Matches longitude format
      ]],

      centreStatus: ['', [
        Validators.required,
      ]],

      centreRating: ['', [
        Validators.required,
      ]],

      remark: ['', [
        // Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s_.:-]{0,250}$/)
      ]],

      centreTotalCapacity: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]],

      examDetails: ['', [
        Validators.required,
      ]],

    });
  }

  submit(){
    console.log("addExamDetails", this.addExamDetails.value);
    
  }

  resetSearchForm(){
    console.log("reset form");
    
  }

  cancleEdit(){
    // this.router.navigate(['/exam/examDetails'])
this.router.navigate(['/centreDeviceDetails/examCentre'])


  }

}
