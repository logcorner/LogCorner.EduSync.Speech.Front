import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { HttpClientModule } from '@angular/common/http';

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
    SignalRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
