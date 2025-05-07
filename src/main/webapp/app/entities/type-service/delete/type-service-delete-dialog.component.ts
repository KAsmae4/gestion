import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeService } from '../type-service.model';
import { TypeServiceService } from '../service/type-service.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './type-service-delete-dialog.component.html',
})
export class TypeServiceDeleteDialogComponent {
  typeService?: ITypeService;

  constructor(protected typeServiceService: TypeServiceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeServiceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
