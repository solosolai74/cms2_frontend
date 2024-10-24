import { Routes } from '@angular/router';
import { ExamCentreComponent } from './exam-centre/exam-centre.component';
import { ExamDeviceComponent } from './exam-device/exam-device.component';
import { ManageRegionsComponent } from './manage-regions/manage-regions.component';
import { EditCentreComponent } from './exam-centre/view-centre/edit-centre/edit-centre.component';

import { EditExamDeviceComponent } from './exam-device/edit-exam-device/edit-exam-device.component';




export const centreDeviceDetails: Routes = [
    {path: 'region', component: ManageRegionsComponent},

    {path: 'examCentre', component: ExamCentreComponent},
    {path: 'editExamCentre', component: EditCentreComponent},


    {path: 'examDevice', component: ExamDeviceComponent},
    {path: 'editExamDevice', component: EditExamDeviceComponent},


];
