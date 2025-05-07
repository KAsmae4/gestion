import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EncadrantComponent } from '../list/encadrant.component';
import { EncadrantDetailComponent } from '../detail/encadrant-detail.component';
import { EncadrantUpdateComponent } from '../update/encadrant-update.component';
import { EncadrantRoutingResolveService } from './encadrant-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const encadrantRoute: Routes = [
  {
    path: '',
    component: EncadrantComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EncadrantDetailComponent,
    resolve: {
      encadrant: EncadrantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EncadrantUpdateComponent,
    resolve: {
      encadrant: EncadrantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EncadrantUpdateComponent,
    resolve: {
      encadrant: EncadrantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(encadrantRoute)],
  exports: [RouterModule],
})
export class EncadrantRoutingModule {}
