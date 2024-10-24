import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.authenticationRoutes
          ),
      },
      {
        path: 'exam',
        loadChildren: () =>
          import('./pages/exam/exam.routes').then(
            (m) => m.examRoutes
          ),
      },

      {
        path: 'centreDeviceDetails',
        loadChildren: () =>
          import('./pages/centre-device-details/centre-device-detail.routes').then(
            (m) => m.centreDeviceDetails
          ),
      },

      {
        path: 'examMembersDetails',
        loadChildren: () =>
          import('./pages/exam-member-details/exam-member-details.routes').then(
            (m) => m.examMemberDetails
          ),
      },

      {
        path: 'examDataMapping',
        loadChildren: () =>
          import('./pages/exam-data-mapping/exam-data-mapping.routes').then(
            (m) => m.examDataMapping
          ),
      },

    ],
  },
];
