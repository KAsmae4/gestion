import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'demande',
        pathMatch: 'full',
      },
      {
        path: 'etudiant',
        data: { pageTitle: 'intershipManagementApp.etudiant.home.title' },
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule),
      },
      {
        path: 'demande',
        data: { pageTitle: 'intershipManagementApp.demande.home.title' },
        loadChildren: () => import('./demande/demande.module').then(m => m.DemandeModule),
      },
      {
        path: 'chef-service',
        data: { pageTitle: 'intershipManagementApp.chefService.home.title' },
        loadChildren: () => import('./chef-service/chef-service.module').then(m => m.ChefServiceModule),
      },
      {
        path: 'encadrant',
        data: { pageTitle: 'intershipManagementApp.encadrant.home.title' },
        loadChildren: () => import('./encadrant/encadrant.module').then(m => m.EncadrantModule),
      },
      {
        path: 'formation',
        data: { pageTitle: 'intershipManagementApp.formation.home.title' },
        loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule),
      },
      {
        path: 'type-formation',
        data: { pageTitle: 'intershipManagementApp.typeFormation.home.title' },
        loadChildren: () => import('./type-formation/type-formation.module').then(m => m.TypeFormationModule),
      },
      {
        path: 'hopital',
        data: { pageTitle: 'intershipManagementApp.hopital.home.title' },
        loadChildren: () => import('./hopital/hopital.module').then(m => m.HopitalModule),
      },
      {
        path: 'service-hospitalier',
        data: { pageTitle: 'intershipManagementApp.serviceHospitalier.home.title' },
        loadChildren: () => import('./service-hospitalier/service-hospitalier.module').then(m => m.ServiceHospitalierModule),
      },
      {
        path: 'type-service',
        data: { pageTitle: 'intershipManagementApp.typeService.home.title' },
        loadChildren: () => import('./type-service/type-service.module').then(m => m.TypeServiceModule),
      },
      {
        path: 'documents',
        data: { pageTitle: 'intershipManagementApp.documents.home.title' },
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
