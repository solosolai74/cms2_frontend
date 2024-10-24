import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { ViewCentreComponent } from './view-centre/view-centre.component';
import { AddCentreComponent } from './add-centre/add-centre.component';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';



@Component({
  selector: 'app-exam-centre',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, ViewCentreComponent, AddCentreComponent],
  templateUrl: './exam-centre.component.html',
  styleUrl: './exam-centre.component.scss'
})
export class ExamCentreComponent {
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Centre');
  }
}
