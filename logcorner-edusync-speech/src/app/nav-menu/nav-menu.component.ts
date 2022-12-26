import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult } from '@azure/msal-browser';
import { SignalRService } from '../services/signalr-service';
import { b2cPolicies } from '../auth-config';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit ,OnDestroy {

  
  isAuthenticationEnabled =false;
  loginDisplay = false;

  constructor(
    private signalRService : SignalRService
  ) {}
  ngOnDestroy(): void {
    
  }


  ngOnInit(): void {
    
    this.signalRService.StartConnection();
  }

  

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
   
  }

  logout() {
   
  }

  editProfile() {
    
  }

 
}
