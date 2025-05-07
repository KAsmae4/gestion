import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NoteStageComponent } from './note-stage.component';
import { EmptyLayoutComponent } from '../layouts/empty-layout/empty-layout.component';
import { DemandeRoutingResolveService } from '../entities/demande/route/demande-routing-resolve.service';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';

@NgModule({
  declarations: [NoteStageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: EmptyLayoutComponent,
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: '',
            component: NoteStageComponent,
            resolve: {
              demande: DemandeRoutingResolveService,
            },
          },
        ],
      },
    ]),
  ],
})
export class NoteStageModule {}
