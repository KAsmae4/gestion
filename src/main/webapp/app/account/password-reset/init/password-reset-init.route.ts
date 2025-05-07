import { Route } from '@angular/router';

import { PasswordResetInitComponent } from './password-reset-init.component';
import { PublicLayoutComponent } from '../../../layouts/public-layout/public-layout.component';

export const passwordResetInitRoute: Route = {
  path: '',
  component: PublicLayoutComponent,
  children: [
    {
      path: 'reset/request',
      component: PasswordResetInitComponent,
      data: {
        pageTitle: 'global.menu.account.password',
      },
    },
  ],
};
