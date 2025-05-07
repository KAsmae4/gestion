import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NouvelleDemandeRoutingResolveService } from '../entities/etudiant/route/nouvelle-demande-routing-resolve.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        resolve: {
          demandes: NouvelleDemandeRoutingResolveService,
        },
      },
    ]),
  ],
})
export class DashboardModule {}
