import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { IDemande } from '../entities/demande/demande.model';
import { ActivatedRoute } from '@angular/router';
import { DemandeService } from '../entities/demande/service/demande.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  demandes?: IDemande[] = [];

  // Nbr de stagiaire par mois
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
    datasets: [
      { data: [28, 12, 19, 19, 86, 27], label: 'Rejetées' },
      { data: [65, 59, 80, 81, 120, 177], label: 'Accéptées' },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };
  // ------------------------------------------------------------------------

  // Par type formation
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Master', 'Licence', 'Doctorat', 'Technicien spécialisé', 'Technicien'],
    datasets: [
      {
        data: [46, 53, 13, 25, 21],
      },
    ],
  };

  // ------------------------------------------------------------------------

  public pieChartGenderOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };
  public pieChartGenderData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Femme', 'Homme'],
    datasets: [
      {
        data: [53, 47],
      },
    ],
  };

  // ------------------------------------------------------------------------

  // Par Formation
  // Par ville
  // Par durée

  constructor(protected activatedRoute: ActivatedRoute, protected demandeService: DemandeService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandes }) => {
      this.demandes = demandes;
    });
  }

  trackId = (_index: number, item: IDemande): number => this.demandeService.getDemandeIdentifier(item);
}
