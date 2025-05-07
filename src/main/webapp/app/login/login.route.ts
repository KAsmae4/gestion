import { Route } from '@angular/router';

import { LoginComponent } from './login.component';
import { PublicLayoutComponent } from '../layouts/public-layout/public-layout.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  component: PublicLayoutComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
      data: {
        pageTitle: 'login.title',
      },
    },
  ],
};
