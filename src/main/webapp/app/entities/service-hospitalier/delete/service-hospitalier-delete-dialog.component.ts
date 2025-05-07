import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IServiceHospitalier } from '../service-hospitalier.model';
import { ServiceHospitalierService } from '../service/service-hospitalier.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './service-hospitalier-delete-dialog.component.html',
})
export class ServiceHospitalierDeleteDialogComponent {
  serviceHospitalier?: IServiceHospitalier;

  constructor(protected serviceHospitalierService: ServiceHospitalierService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceHospitalierService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
