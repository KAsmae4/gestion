import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  bootstrap: [],
  providers: [],
})
export class AdminModule {}
