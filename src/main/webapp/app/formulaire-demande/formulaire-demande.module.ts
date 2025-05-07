import { NgModule } from '@angular/core';
import { FormulaireDemandeComponent } from './formulaire-demande.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormulaireLayoutComponent } from '../layouts/formulaire-layout/formulaire-layout.component';

@NgModule({
  declarations: [FormulaireDemandeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormulaireLayoutComponent,
        children: [
          {
            path: '',
            component: FormulaireDemandeComponent,
          },
        ],
      },
    ]),
  ],
})
export class FormulaireDemandeModule {}
