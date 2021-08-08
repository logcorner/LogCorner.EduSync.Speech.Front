import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationScheme, InteractionRequiredAuthError } from '@azure/msal-browser';
import { protectedResources } from '../auth-config';

import { User } from '../models/User';

@Injectable()
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor( private msalService: MsalService) {

  }
  async getToken(method:  string, scopes : string[], query?:string)  {

    const loginRequest = {
      scopes: [...scopes],
      authenticationScheme: AuthenticationScheme.BEARER,
      //resourceRequestMethod: method,
      //resourceRequestUri: query ? protectedResources.todoListApi.endpoint + query : protectedResources.todoListApi.endpoint,
    }

    return this.msalService.acquireTokenSilent({
      account: this.msalService.instance.getActiveAccount() ? this.msalService.instance.getActiveAccount()! : this.msalService.instance.getAllAccounts()[0]!,
      ...loginRequest,
    }).toPromise()
      .then((result) => {
        return result.accessToken;
      })
      .catch((error) => {
        console.log(error)
        if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
          this.msalService.acquireTokenPopup(loginRequest).toPromise().then((result) => {
            return result.accessToken;
          });
        }
      });
  }
  
  
 }

