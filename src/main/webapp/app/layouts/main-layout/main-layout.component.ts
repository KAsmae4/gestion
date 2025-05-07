import { Component, OnDestroy, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/core/auth/account.service';
import { EtudiantService } from '../../entities/etudiant/service/etudiant.service';
import { concat, debounceTime, distinctUntilChanged, Observable, of, Subject } from 'rxjs';
import { IEtudiant } from '../../entities/etudiant/etudiant.model';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main-layout.component.html',
  styles: [
    `
      .sidebar .nav-link {
        font-weight: 500;
        color: var(--bs-dark);
      }
      .sidebar .nav-link:hover {
        background: var(--bs-light);
        color: var(--bs-primary);
      }

      .ng-select ::ng-deep .ng-select-container {
        height: 50px;
      }
    `,
  ],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  private renderer: Renderer2;

  etudiants$: Observable<IEtudiant[]> = new Observable<IEtudiant[]>(observer => observer.next([]));
  etudiantsLoading = false;
  etudiantInput$ = new Subject<string>();
  etudiant: IEtudiant | null = null;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    private etudiantService: EtudiantService,
    rootRenderer: RendererFactory2
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });

    this.loadPatient();
  }

  trackEtudiantsById(index: number, item: IEtudiant | undefined | null): number | string {
    return item?.id ?? '';
  }

  handleEtudiantSelect(etudiant: IEtudiant | null): void {
    if (etudiant) {
      this.router.navigate(['/gestion/etudiant', etudiant.id, 'view']);
    }
  }

  clear(): void {
    this.etudiantInput$.next('');
    this.loadPatient();
  }

  ngOnDestroy(): void {
    this.etudiantInput$.unsubscribe();
  }

  protected loadPatient(): void {
    this.etudiants$ = concat(
      of([]), // default items
      this.etudiantInput$.pipe(
        debounceTime(800),
        distinctUntilChanged(),
        tap(() => (this.etudiantsLoading = true)),
        switchMap(name =>
          this.etudiantService.search(name).pipe(
            map((value: HttpResponse<IEtudiant[]>) => value.body as IEtudiant[]),
            catchError(() => of([])), // empty list on error
            tap(() => (this.etudiantsLoading = false))
          )
        )
      )
    );
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    const title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      return this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
