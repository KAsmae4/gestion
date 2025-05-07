import { Route } from '@angular/router';

import { PasswordResetFinishComponent } from './password-reset-finish.component';
import { PublicLayoutComponent } from '../../../layouts/public-layout/public-layout.component';

export const passwordResetFinishRoute: Route = {
  path: '',
  component: PublicLayoutComponent,
  children: [
    {
      path: 'reset/finish',
      component: PasswordResetFinishComponent,
      data: {
        pageTitle: 'global.menu.account.password',
      },
    },
  ],
};
