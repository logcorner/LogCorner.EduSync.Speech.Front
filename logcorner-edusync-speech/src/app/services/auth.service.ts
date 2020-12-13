import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { User } from '../models/User';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(private msalService: MsalService, private alertService : AlertService ) 
  {
    this.authenticated = this.msalService.getAccount() != null;
  }
 
  async signIn(): Promise<void> {
    const result = await this.msalService.loginPopup(environment.OAuthSettings)
      .catch((reason) => {
       this.alertService.addError('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
     }
  }

  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(environment.OAuthSettings)
      .catch((reason) => {
       this.alertService.addError('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      return result.accessToken;
    }
    this.authenticated = false;
    return null;
  }
}
