import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        },
        {
          path: 'dashboard',
          component: MainLayoutComponent,
          data: {
            authorities: [Authority.USER],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: 'formulaire-demande',
          data: {
            pageTitle: 'Faire une nouvelle demande de stage',
          },
          loadChildren: () => import('./formulaire-demande/formulaire-demande.module').then(m => m.FormulaireDemandeModule),
        },
        {
          path: 'gestion',
          component: MainLayoutComponent,
          loadChildren: () => import(`./entities/entity.module`).then(m => m.EntityModule),
        },
        {
          path: '',
          loadChildren: () => import('./formulaire-demande/formulaire-demande.module').then(m => m.FormulaireDemandeModule),
        },
        {
          path: 'imprimer-note-stage',
          loadChildren: () => import('./note-stage/note-stage.module').then(m => m.NoteStageModule),
        },
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
