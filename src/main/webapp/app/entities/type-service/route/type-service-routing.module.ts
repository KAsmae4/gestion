import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeServiceComponent } from '../list/type-service.component';
import { TypeServiceDetailComponent } from '../detail/type-service-detail.component';
import { TypeServiceUpdateComponent } from '../update/type-service-update.component';
import { TypeServiceRoutingResolveService } from './type-service-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typeServiceRoute: Routes = [
  {
    path: '',
    component: TypeServiceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeServiceDetailComponent,
    resolve: {
      typeService: TypeServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeServiceUpdateComponent,
    resolve: {
      typeService: TypeServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeServiceUpdateComponent,
    resolve: {
      typeService: TypeServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeServiceRoute)],
  exports: [RouterModule],
})
export class TypeServiceRoutingModule {}
