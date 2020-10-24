import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechListComponent } from './speech-list/speech-list.component';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpeechService } from './services/speech.service';
import { HttpClientModule } from '@angular/common/http';
import { SpeechCreateComponent } from './speech-create/speech-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeechListComponent,
    SpeechEditComponent,
    SpeechCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    SpeechService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
