import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HopitalComponent } from '../list/hopital.component';
import { HopitalDetailComponent } from '../detail/hopital-detail.component';
import { HopitalUpdateComponent } from '../update/hopital-update.component';
import { HopitalRoutingResolveService } from './hopital-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const hopitalRoute: Routes = [
  {
    path: '',
    component: HopitalComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HopitalDetailComponent,
    resolve: {
      hopital: HopitalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HopitalUpdateComponent,
    resolve: {
      hopital: HopitalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HopitalUpdateComponent,
    resolve: {
      hopital: HopitalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hopitalRoute)],
  exports: [RouterModule],
})
export class HopitalRoutingModule {}
