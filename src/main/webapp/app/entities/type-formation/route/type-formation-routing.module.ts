import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TypeFormationComponent } from '../list/type-formation.component';
import { TypeFormationDetailComponent } from '../detail/type-formation-detail.component';
import { TypeFormationUpdateComponent } from '../update/type-formation-update.component';
import { TypeFormationRoutingResolveService } from './type-formation-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const typeFormationRoute: Routes = [
  {
    path: '',
    component: TypeFormationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeFormationDetailComponent,
    resolve: {
      typeFormation: TypeFormationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeFormationUpdateComponent,
    resolve: {
      typeFormation: TypeFormationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeFormationUpdateComponent,
    resolve: {
      typeFormation: TypeFormationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(typeFormationRoute)],
  exports: [RouterModule],
})
export class TypeFormationRoutingModule {}
