import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TypeFormationComponent } from './list/type-formation.component';
import { TypeFormationDetailComponent } from './detail/type-formation-detail.component';
import { TypeFormationUpdateComponent } from './update/type-formation-update.component';
import { TypeFormationDeleteDialogComponent } from './delete/type-formation-delete-dialog.component';
import { TypeFormationRoutingModule } from './route/type-formation-routing.module';

@NgModule({
  imports: [SharedModule, TypeFormationRoutingModule],
  declarations: [TypeFormationComponent, TypeFormationDetailComponent, TypeFormationUpdateComponent, TypeFormationDeleteDialogComponent],
})
export class TypeFormationModule {}
