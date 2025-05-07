import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeServiceComponent } from './list/type-service.component';
import { TypeServiceDetailComponent } from './detail/type-service-detail.component';
import { TypeServiceUpdateComponent } from './update/type-service-update.component';
import { TypeServiceDeleteDialogComponent } from './delete/type-service-delete-dialog.component';
import { TypeServiceRoutingModule } from './route/type-service-routing.module';

@NgModule({
  imports: [SharedModule, TypeServiceRoutingModule],
  declarations: [TypeServiceComponent, TypeServiceDetailComponent, TypeServiceUpdateComponent, TypeServiceDeleteDialogComponent],
})
export class TypeServiceModule {}
