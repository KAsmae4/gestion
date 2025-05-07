import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EncadrantComponent } from './list/encadrant.component';
import { EncadrantDetailComponent } from './detail/encadrant-detail.component';
import { EncadrantUpdateComponent } from './update/encadrant-update.component';
import { EncadrantDeleteDialogComponent } from './delete/encadrant-delete-dialog.component';
import { EncadrantRoutingModule } from './route/encadrant-routing.module';

@NgModule({
  imports: [SharedModule, EncadrantRoutingModule],
  declarations: [EncadrantComponent, EncadrantDetailComponent, EncadrantUpdateComponent, EncadrantDeleteDialogComponent],
})
export class EncadrantModule {}
