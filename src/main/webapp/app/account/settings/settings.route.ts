import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SettingsComponent } from './settings.component';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

export const settingsRoute: Route = {
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'settings',
      component: SettingsComponent,
      data: {
        pageTitle: 'global.menu.account.settings',
      },
      canActivate: [UserRouteAccessService],
    },
  ],
};
