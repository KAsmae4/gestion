import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IDemande } from '../entities/demande/demande.model';
import { ActivatedRoute } from '@angular/router';
import { differenceInMonths } from 'date-fns';

@Component({
  selector: 'app-note-stage',
  templateUrl: './note-stage.component.html',
  styleUrls: ['./note-stage.component.scss'],
})
export class NoteStageComponent implements OnInit, AfterViewInit {
  demande: IDemande | null = null;

  dureeStage = 0;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.demande = demande;
      if (this.demande && this.demande.dateFin && this.demande.dateDebut) {
        const dateFin: Date = this.demande.dateFin?.toDate();
        const dateDebut: Date = this.demande.dateDebut?.toDate();
        this.dureeStage = differenceInMonths(dateFin, dateDebut);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.print();
    }, 1000);
  }
}
