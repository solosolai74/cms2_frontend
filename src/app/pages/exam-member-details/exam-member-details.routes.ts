import { Routes } from '@angular/router';

import { ExamRoleComponent } from './exam-role/exam-role.component';
import { ExamMembersComponent } from './exam-members/exam-members.component';
import { EditExamRoleComponent } from './exam-role/edit-exam-role/edit-exam-role.component';
import { EditExamMemberComponent } from './exam-members/view-exam-members/edit-exam-member/edit-exam-member.component';





export const examMemberDetails: Routes = [
    {path: 'examRole', component: ExamRoleComponent},
    {path: 'editExamRole', component: EditExamRoleComponent},

    {path: 'examMembers', component: ExamMembersComponent},
    {path: 'editExamMembers', component: EditExamMemberComponent},

    

];
