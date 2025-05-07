import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHopital } from '../hopital.model';

@Component({
  selector: 'app-hopital-detail',
  templateUrl: './hopital-detail.component.html',
})
export class HopitalDetailComponent implements OnInit {
  hopital: IHopital | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hopital }) => {
      this.hopital = hopital;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
