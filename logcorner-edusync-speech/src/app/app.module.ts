import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechListComponent } from './speech-list/speech-list.component';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpeechService } from './services/speech.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpeechCreateComponent } from './speech-create/speech-create.component';
//import { MsalModule } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';

import { msalConfig, msalAngularConfig } from './app-config';
import { Configuration } from 'msal';
function MSALConfigFactory(): Configuration {
  return msalConfig;
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return msalAngularConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    SpeechListComponent,
    SpeechEditComponent,
    SpeechCreateComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MsalModule
    /* MsalModule.forRoot({
      auth: {
        clientId: environment.OAuthSettings.clientId,
        redirectUri: environment.OAuthSettings.redirectUri,
        authority : environment.OAuthSettings.authority
      }
    }) */
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
    //SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
