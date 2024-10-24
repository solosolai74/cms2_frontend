import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { CiMappingComponent } from './ci-mapping/ci-mapping.component';
import { ViewCiMappingComponent } from './view-ci-mapping/view-ci-mapping.component';

@Component({
  selector: 'app-centre-ci-mapping',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, CiMappingComponent, ViewCiMappingComponent],
  templateUrl: './centre-ci-mapping.component.html',
  styleUrl: './centre-ci-mapping.component.scss'
})
export class CentreCiMappingComponent {
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('CI Mapping');
  }
}
