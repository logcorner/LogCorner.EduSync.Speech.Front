import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 


import { HttpClientModule } from '@angular/common/http';

// Third party imports

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SpeechListComponent } from './speech-list-component/speech-list.component';





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SpeechListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
