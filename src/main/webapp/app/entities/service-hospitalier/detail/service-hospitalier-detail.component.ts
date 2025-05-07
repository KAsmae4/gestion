import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServiceHospitalier } from '../service-hospitalier.model';

@Component({
  selector: 'app-service-hospitalier-detail',
  templateUrl: './service-hospitalier-detail.component.html',
})
export class ServiceHospitalierDetailComponent implements OnInit {
  serviceHospitalier: IServiceHospitalier | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceHospitalier }) => {
      this.serviceHospitalier = serviceHospitalier;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
