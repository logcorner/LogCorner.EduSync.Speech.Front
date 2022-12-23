import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechCreateComponent } from './speech-create/speech-create.component';
import { SpeechListComponent } from './speech-list-component/speech-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/speech', pathMatch: 'full' },
    { path: 'speech', component: SpeechListComponent },
    { path: 'speech/new', component: SpeechCreateComponent} ,
     /*{ path: 'speech/:id', component: SpeechEditComponent },
    { path: 'profile', component: ProfileComponent } , */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
