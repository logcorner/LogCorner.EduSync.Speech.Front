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

  isIframe = false;
  loginDisplay = false;
  isAuthenticationEnabled =false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private signalRService : SignalRService
  ) {}


  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.isAuthenticationEnabled = environment.isAuthenticationEnabled;
    if(this.isAuthenticationEnabled)
    {
      /**
       * You can subscribe to MSAL events as shown below. For more info,
       * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
       */
      this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
      this.setLoginDisplay();
      this.signalRService.StartConnection();
      });
  }
  else
  {
    this.signalRService.StartConnection();
  }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    console.log('**NavMenuComponent::setLoginDisplay:this.loginDisplay',this.loginDisplay)
    if(this.loginDisplay)
    {
      console.log('**NavMenuComponent::setLoginDisplay:StartConnection')
      this.signalRService.StartConnection();
    }
    else
    {
      this.signalRService.StopConnection()
    }
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({...this.msalGuardConfig.authRequest, ...userFlowRequest} as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
            //console.log('**NavMenuComponent::response.account:',response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest){
        this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout() {
    this.authService.logout();
  }

  editProfile() {
    let editProfileFlowRequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.editProfile.authority,
    };

    this.login(editProfileFlowRequest);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
