import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechListComponent } from './speech-list/speech-list.component';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpeechCreateComponent } from './speech-create/speech-create.component';
import { MediatorService } from './services/mediator-service';
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
import { ProfileComponent } from './profile/profile.component';
import { SpeechService } from './services/speech.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { SignalRService } from './services/signalr-service';
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
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MsalModule.forRoot({
      auth: {
        clientId: 'b2eb11d2-ee05-486b-9f2c-e6daf595aea7', // Application Id of Application registered in B2C
        authority: 'https://datasynchrob2c.b2clogin.com/datasynchrob2c.onmicrosoft.com/B2C_1_SignUpIn', //signup-signin userflow
        validateAuthority: false,
        redirectUri: 'http://localhost:4200/'
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
      }
    }, {
      consentScopes: [
        'user.read', 'openid', 'profile'
      ]
    })
    ],
  providers: [
    AlertService,
    AuthService,
    MsalService,
    MediatorService,
    SpeechService,
    SignalRService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
