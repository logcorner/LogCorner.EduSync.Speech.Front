import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import { User } from '../models/User';

@Injectable()
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor(private msalService: MsalService )
  {
    this.authenticated = this.msalService.getAccount() != null;
  }
   getAccessToken(scopes: string[]): string {
    this.msalService
    .acquireTokenSilent({
      scopes,
    })
    .then((result: any) => {
      console.log('**AuthService::getAccessToken : token ', result.accessToken);
     return result.accessToken;
    });
    return null;
  }
 }

