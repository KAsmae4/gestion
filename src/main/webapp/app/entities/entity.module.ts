import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntityRoutingModule } from './entity-routing.module';

@NgModule({
  imports: [SharedModule, EntityRoutingModule],
  bootstrap: [],
  providers: [],
})
export class EntityModule {}
