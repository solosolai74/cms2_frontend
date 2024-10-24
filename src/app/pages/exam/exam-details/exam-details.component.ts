import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { AddExamDetailsComponent } from './add-exam-details/add-exam-details.component';
import { ViewExamDetailsComponent } from './view-exam-details/view-exam-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, AddExamDetailsComponent, ViewExamDetailsComponent, CommonModule],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.scss'
})
export class ExamDetailsComponent {


  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Details');
  }

  selectedTab: any = 0;
  tabChanged(event: any) {
    this.selectedTab = event
  }
  
}
