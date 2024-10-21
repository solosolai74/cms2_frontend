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
    ],
  },
];
