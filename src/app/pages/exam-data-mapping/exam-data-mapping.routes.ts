import { Routes } from '@angular/router';
import { CentreDeviceMappingComponent } from './centre-device-mapping/centre-device-mapping.component';
import { CentreSlotMappingComponent } from './centre-slot-mapping/centre-slot-mapping.component';
import { CentreCiMappingComponent } from './centre-ci-mapping/centre-ci-mapping.component';

export const examDataMapping: Routes = [
    {path: 'centreDeviceMapping', component: CentreDeviceMappingComponent},

    {path: 'centreSlotMapping', component: CentreSlotMappingComponent},

    {path: 'centreCiMapping', component: CentreCiMappingComponent},

];
