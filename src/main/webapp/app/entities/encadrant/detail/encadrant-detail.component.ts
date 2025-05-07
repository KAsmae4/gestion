import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEncadrant } from '../encadrant.model';

@Component({
  selector: 'app-encadrant-detail',
  templateUrl: './encadrant-detail.component.html',
})
export class EncadrantDetailComponent implements OnInit {
  encadrant: IEncadrant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ encadrant }) => {
      this.encadrant = encadrant;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
