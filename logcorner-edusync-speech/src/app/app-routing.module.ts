import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { SpeechListComponent } from './speech-list/speech-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/speech', pathMatch: 'full' },
  { path: 'speech', component: SpeechListComponent },
  { path: 'speech/:id', component: SpeechEditComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
