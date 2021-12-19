import { Injectable } from '@angular/core';
import {   HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationScheme, InteractionRequiredAuthError } from '@azure/msal-browser';

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
     
    }

    return this.msalService.acquireTokenSilent({
      account: this.msalService.instance.getActiveAccount() ? this.msalService.instance.getActiveAccount()! : this.msalService.instance.getAllAccounts()[0]!,
      ...loginRequest,
    }).toPromise()
      .then((result) => {
        return result.accessToken;
      })
      .catch((error) => {
        //console.log(error)
        if (InteractionRequiredAuthError.isInteractionRequiredError(error.errorCode)) {
          this.msalService.acquireTokenPopup(loginRequest).toPromise().then((result) => {
            return result.accessToken;
          });
        }
      });
  }
  
   async setHttpOptions(method :string, scopes : string[],body ?: any) {
    const accessToken = await this.getToken(method, scopes);
    //console.log('**SpeechService:getSpeeches:accessToken', accessToken);
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

