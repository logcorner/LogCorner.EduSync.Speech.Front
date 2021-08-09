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
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig, loginRequest, protectedResources } from './auth-config';

import { Configuration } from 'msal';
import { ProfileComponent } from './profile/profile.component';
import { SpeechService } from './services/speech.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { SignalRService } from './services/signalr-service';


 export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.commandApi.endpoint, protectedResources.commandApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}


 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
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
    MsalModule
   
    ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
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
