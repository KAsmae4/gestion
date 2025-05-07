import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEncadrant } from '../encadrant.model';
import { EncadrantService } from '../service/encadrant.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './encadrant-delete-dialog.component.html',
})
export class EncadrantDeleteDialogComponent {
  encadrant?: IEncadrant;

  constructor(protected encadrantService: EncadrantService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.encadrantService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
