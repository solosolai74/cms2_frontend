import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbDetailsService } from '../../../breadcrumb-details.service';
import { AddSlotMappingComponent } from './add-slot-mapping/add-slot-mapping.component';
import { ViewSlotMappingComponent } from './view-slot-mapping/view-slot-mapping.component';

@Component({
  selector: 'app-centre-slot-mapping',
  standalone: true,
  imports: [MatTabsModule, MatCardModule,AddSlotMappingComponent, ViewSlotMappingComponent ],
  templateUrl: './centre-slot-mapping.component.html',
  styleUrl: './centre-slot-mapping.component.scss'
})
export class CentreSlotMappingComponent {

}
