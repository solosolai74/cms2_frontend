import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
     
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'login',
        },
      },

    ]

  }

];
