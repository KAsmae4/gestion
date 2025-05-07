import { Route } from '@angular/router';

import { RegisterComponent } from './register.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

export const registerRoute: Route = {
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'register',
      component: RegisterComponent,
      data: {
        pageTitle: 'register.title',
      },
    },
  ],
};
