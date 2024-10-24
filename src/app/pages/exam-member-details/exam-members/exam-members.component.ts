import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { AddExamMemberComponent } from './add-exam-member/add-exam-member.component';
import { ViewExamMembersComponent } from './view-exam-members/view-exam-members.component';


@Component({
  selector: 'app-exam-members',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, AddExamMemberComponent, ViewExamMembersComponent],
  templateUrl: './exam-members.component.html',
  styleUrl: './exam-members.component.scss'
})
export class ExamMembersComponent {

  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Exam Member Details');
  }
  
}
