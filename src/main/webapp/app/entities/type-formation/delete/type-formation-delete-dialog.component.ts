import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeFormation } from '../type-formation.model';
import { TypeFormationService } from '../service/type-formation.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './type-formation-delete-dialog.component.html',
})
export class TypeFormationDeleteDialogComponent {
  typeFormation?: ITypeFormation;

  constructor(protected typeFormationService: TypeFormationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeFormationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
