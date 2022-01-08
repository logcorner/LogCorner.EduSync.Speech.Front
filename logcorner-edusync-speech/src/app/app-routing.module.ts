import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { SpeechCreateComponent } from './speech-create/speech-create.component';
import { SpeechEditComponent } from './speech-edit/speech-edit.component';
import { SpeechListComponent } from './speech-list/speech-list.component';

let isAuthenticationEnabled = environment.isAuthenticationEnabled;
let routes: Routes =[];
if(isAuthenticationEnabled)
{
  routes = [
  { path: '', redirectTo: '/speech', pathMatch: 'full' },
  { path: 'speech', component: SpeechListComponent , canActivate: [MsalGuard]},
  { path: 'speech/new', component: SpeechCreateComponent ,canActivate: [MsalGuard]} ,
  { path: 'speech/:id', component: SpeechEditComponent,canActivate: [MsalGuard] },
  { path: 'profile', component: ProfileComponent,canActivate: [MsalGuard] } ,
 ];
}
else{
   routes = [
    { path: '', redirectTo: '/speech', pathMatch: 'full' },
    { path: 'speech', component: SpeechListComponent },
    { path: 'speech/new', component: SpeechCreateComponent} ,
    { path: 'speech/:id', component: SpeechEditComponent },
    { path: 'profile', component: ProfileComponent } ,
   ];
}
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
