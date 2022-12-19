import { Injectable } from '@angular/core';
import {   HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationScheme, InteractionRequiredAuthError } from '@azure/msal-browser';

import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  public authenticated: boolean;
  public user: User;

  constructor( private msalService: MsalService) {

  }
  async getToken(method:  string, scopes : string[], query?:string)  {
    console.log('**AuthService::getToken:isAuthenticationEnabled =',environment.isAuthenticationEnabled);
    if(!environment.isAuthenticationEnabled)
    {
      return '';
    }
    const loginRequest = {
      scopes: [...scopes],
      authenticationScheme: AuthenticationScheme.BEARER,
    }

    return this.msalService.acquireTokenSilent({
      account: this.msalService.instance.getActiveAccount() ? this.msalService.instance.getActiveAccount()! : this.msalService.instance.getAllAccounts()[0]!,
      ...loginRequest,
    }).toPromise()
      .then((result) => {
        return result.accessToken;
      })
      .catch((error) => {
       
        if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
          this.msalService.acquireTokenPopup(loginRequest).toPromise().then((result) => {
            return result.accessToken;
          });
        }
      });
  }
  
   async setHttpOptions(method :string, scopes : string[],body ?: any) {
    const accessToken = await this.getToken(method, scopes);
    console.log('**AuthService::setHttpOptions:accessToken =',accessToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }),
      body
    };
    return httpOptions;
  }
  
 }

