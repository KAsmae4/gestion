import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HopitalComponent } from './list/hopital.component';
import { HopitalDetailComponent } from './detail/hopital-detail.component';
import { HopitalUpdateComponent } from './update/hopital-update.component';
import { HopitalDeleteDialogComponent } from './delete/hopital-delete-dialog.component';
import { HopitalRoutingModule } from './route/hopital-routing.module';

@NgModule({
  imports: [SharedModule, HopitalRoutingModule],
  declarations: [HopitalComponent, HopitalDetailComponent, HopitalUpdateComponent, HopitalDeleteDialogComponent],
})
export class HopitalModule {}
