import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PasswordComponent } from './password.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

export const passwordRoute: Route = {
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'password',
      component: PasswordComponent,
      data: {
        pageTitle: 'global.menu.account.password',
      },
      canActivate: [UserRouteAccessService],
    },
  ],
};
