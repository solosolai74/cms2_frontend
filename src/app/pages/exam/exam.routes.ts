import { Routes } from '@angular/router';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ExamRegionComponent } from './exam-region/exam-region.component';

export const examRoutes: Routes = [
    {path: 'examDetails', component: ExamDetailsComponent},
    {path: 'examRegion', component: ExamRegionComponent}

];
