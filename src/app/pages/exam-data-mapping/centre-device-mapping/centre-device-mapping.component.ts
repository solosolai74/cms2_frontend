import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ViewDeviceMappingComponent } from './view-device-mapping/view-device-mapping.component';
import { DeviceMappingComponent } from './device-mapping/device-mapping.component';

@Component({
  selector: 'app-centre-device-mapping',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, ViewDeviceMappingComponent , DeviceMappingComponent],
  templateUrl: './centre-device-mapping.component.html',
  styleUrl: './centre-device-mapping.component.scss'
})
export class CentreDeviceMappingComponent {
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Device Mapping');
  }
}
