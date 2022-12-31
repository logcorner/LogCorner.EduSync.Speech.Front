import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Third party imports

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SpeechListComponent } from './speech-list-component/speech-list.component';
import { SpeechService } from './services/speech.service';
import { MediatorService } from './services/mediator-service';
import { AuthService } from './services/auth.service';
import { SpeechCreateComponent } from './speech-create/speech-create.component';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { SignalRService } from './services/signalr-service';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { LogResponseInterceptor } from './interceptors/log-response.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SpeechListComponent,
    SpeechCreateComponent,
    SpeechEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    SpeechService,
    MediatorService,
    AuthService,
    SignalRService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
