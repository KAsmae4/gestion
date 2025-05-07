import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ServiceHospitalierComponent } from '../list/service-hospitalier.component';
import { ServiceHospitalierDetailComponent } from '../detail/service-hospitalier-detail.component';
import { ServiceHospitalierUpdateComponent } from '../update/service-hospitalier-update.component';
import { ServiceHospitalierRoutingResolveService } from './service-hospitalier-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const serviceHospitalierRoute: Routes = [
  {
    path: '',
    component: ServiceHospitalierComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceHospitalierDetailComponent,
    resolve: {
      serviceHospitalier: ServiceHospitalierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceHospitalierUpdateComponent,
    resolve: {
      serviceHospitalier: ServiceHospitalierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceHospitalierUpdateComponent,
    resolve: {
      serviceHospitalier: ServiceHospitalierRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(serviceHospitalierRoute)],
  exports: [RouterModule],
})
export class ServiceHospitalierRoutingModule {}
