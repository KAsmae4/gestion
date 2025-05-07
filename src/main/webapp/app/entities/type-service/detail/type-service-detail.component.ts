import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeService } from '../type-service.model';

@Component({
  selector: 'app-type-service-detail',
  templateUrl: './type-service-detail.component.html',
})
export class TypeServiceDetailComponent implements OnInit {
  typeService: ITypeService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeService }) => {
      this.typeService = typeService;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
