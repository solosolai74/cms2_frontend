import { Component } from '@angular/core';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RegionComponent } from './region/region.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';

@Component({
  selector: 'app-manage-regions',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, RegionComponent,StateComponent,  CityComponent],
  templateUrl: './manage-regions.component.html',
  styleUrl: './manage-regions.component.scss'
})
export class ManageRegionsComponent {
  constructor(private readonly breadcrumbDetails: BreadcrumbDetailsService) {
    this.breadcrumbDetails.setBreadcrumbName('Region, State And City Details');
  }
}
