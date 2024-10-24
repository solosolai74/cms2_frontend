import { Routes } from '@angular/router';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { EditExamDetailsComponent } from './exam-details/view-exam-details/edit-exam-details/edit-exam-details.component';
import { ExamModeComponent } from './exam-mode/exam-mode.component';
import { ExamSlotsComponent } from './exam-slots/exam-slots.component';
import { PaperTypeComponent } from './paper-type/paper-type.component';
import { EditExamModeComponent } from './exam-mode/edit-exam-mode/edit-exam-mode.component';
import { EditExamSlotsComponent } from './exam-slots/edit-exam-slots/edit-exam-slots.component';
import { EditPaperTypeComponent } from './paper-type/edit-paper-type/edit-paper-type.component';

export const examRoutes: Routes = [
    {path: 'examDetails', component: ExamDetailsComponent},
    {path: 'editExam', component: EditExamDetailsComponent},

    {path: 'examMode', component: ExamModeComponent},
    {path: 'editExamMode', component: EditExamModeComponent},
    
    {path: 'examSlots', component: ExamSlotsComponent},
    {path: 'editExamSlot', component: EditExamSlotsComponent},

    {path: 'paperType', component: PaperTypeComponent},
    {path: 'editPaperType', component: EditPaperTypeComponent},







];
