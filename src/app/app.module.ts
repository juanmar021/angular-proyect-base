import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Material
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { environment } from '../environments/environment';

//translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


/// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// store
import { generalReducer } from './store/reducers/general.reducers';
import { GeneralEffects } from './store/effects/general.effects';

import { appRoutes } from './app.routing';
import { CoachesModule } from './pages/coaches/coaches.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from './services/TokenInterceptor';

// COMPONENTS
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AlertModalComponent } from './modals/alerts-modal/alerts-modal.component';
import { MainComponent } from './pages/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HeaderComponent } from './components/header/header.component';

// services
import { AuthenticationService } from './services/authentication.service';
import { MainConfigService } from './pages/main-config.service';
import { ModalService } from './services/modal.service';

//guards
import { ValidateAdminRoleGuard } from './guards/ValidateAdminRole.guard';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

 
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AlertModalComponent,
    MainComponent,
    HomeComponent,
    AuthenticationComponent,
    HeaderComponent
   ],
  imports: [
    // MainModule,
    BrowserModule,
    appRoutes,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule ,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule    ,
    FormsModule,
    HttpClientModule,
    CoachesModule,
    NgxSpinnerModule,
    TranslateModule,

    StoreModule.forRoot( {
      generals: generalReducer
    }),
    EffectsModule.forRoot(
      [
        GeneralEffects,
      ]
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ModalService,
    AuthenticationService,
    MainConfigService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ValidateAdminRoleGuard
  ]
})
export class AppModule { }
