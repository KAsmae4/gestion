import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { TranslationModule } from 'app/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { FormulaireLayoutComponent } from './layouts/formulaire-layout/formulaire-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-', caseSensitive: true }),
    TranslationModule,
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    PublicLayoutComponent,
    FormulaireLayoutComponent,
    EmptyLayoutComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    applicationConfigService: ApplicationConfigService,
    iconLibrary: FaIconLibrary,
    dpConfig: NgbDatepickerConfig,
    translateService: TranslateService
  ) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
    translateService.use('fr');
    dayjs.locale('fr');
  }
}
