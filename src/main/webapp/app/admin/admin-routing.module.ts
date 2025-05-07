import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: 'user-management',
            loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
            data: {
              pageTitle: 'userManagement.home.title',
            },
          },
          {
            path: 'docs',
            loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
          },
          {
            path: 'configuration',
            loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
          },
          {
            path: 'health',
            loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
          },
          {
            path: 'logs',
            loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
          },
          {
            path: 'metrics',
            loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
          },
        ],
      },
    ]),
  ],
})
export class AdminRoutingModule {}
