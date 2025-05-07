import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ServiceHospitalierComponent } from './list/service-hospitalier.component';
import { ServiceHospitalierDetailComponent } from './detail/service-hospitalier-detail.component';
import { ServiceHospitalierUpdateComponent } from './update/service-hospitalier-update.component';
import { ServiceHospitalierDeleteDialogComponent } from './delete/service-hospitalier-delete-dialog.component';
import { ServiceHospitalierRoutingModule } from './route/service-hospitalier-routing.module';

@NgModule({
  imports: [SharedModule, ServiceHospitalierRoutingModule],
  declarations: [
    ServiceHospitalierComponent,
    ServiceHospitalierDetailComponent,
    ServiceHospitalierUpdateComponent,
    ServiceHospitalierDeleteDialogComponent,
  ],
})
export class ServiceHospitalierModule {}
