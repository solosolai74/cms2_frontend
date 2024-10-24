import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-exam-region',
  standalone: true,
  imports: [MatTabsModule, MatCardModule],
  templateUrl: './exam-region.component.html',
  styleUrl: './exam-region.component.scss'
})
export class ExamRegionComponent {

  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Region');
  }
  
}
