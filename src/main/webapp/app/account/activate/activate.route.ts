import { Route } from '@angular/router';

import { ActivateComponent } from './activate.component';
import { PublicLayoutComponent } from '../../layouts/public-layout/public-layout.component';

export const activateRoute: Route = {
  path: '',
  component: PublicLayoutComponent,
  children: [
    {
      path: 'activate',
      component: ActivateComponent,
      data: {
        pageTitle: 'activate.title',
      },
    },
  ],
};
