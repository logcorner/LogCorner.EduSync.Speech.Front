import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { ErrorCode } from '../models/Error';
// import { AuthService } from './auth.service';
import { apiConfigCommand, apiConfigQuery, msalAngularConfig } from '../app-config';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationParameters, InteractionRequiredAuthError } from 'msal';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  /* private queryAPI = environment.queryAPI;
  private commandAPI = environment.commandAPI; */

  constructor(private http: HttpClient, private authService: MsalService) { }

  getSpeechTypes(): Observable<SpeechType[]> {
    const url = `${apiConfigQuery.webApi}/speech/types/`;
    return this.http.get<SpeechType[]>(url)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(this.handleError<SpeechType[]>('getSpeechTypes' )));
   }

  async getSpeeches(): Promise< Observable<Speech[]>> {
    /*let token =    await   this.authService.getAccessToken()
     .catch((reason) => {
      console.log(reason);
    });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
   console.log('token =', token);
   */
  console.log('this.http.options', this.http.options);
  console.log('url', `${apiConfigQuery.webApi}/speech`);
  return this.http.get<Speech[]>(`${apiConfigQuery.webApi}/speech`/*, {  headers :headers }*/)
      .pipe(
        tap(speeches => console.log(`fetched speeches`, speeches)),
        catchError(this.handleError<Speech[]>('getSpeeches')));

  }

  getSpeech(id: string): Observable<Speech> {
    return this.http.get<Speech>(`${apiConfigQuery.webApi}/speech/${id}`)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(this.handleError<Speech>('getSpeech' )));
  }

  updateSpeech(speech: Speech): Observable<any> {
    console.log('url', `${apiConfigCommand.webApi}/speech`);
    const account = this.authService.getAccount();

    console.log('account', account);

    console.log('msalAngularConfig.consentScopes', msalAngularConfig.consentScopes);
    console.log('msalAngularConfig.protectedResourceMap', msalAngularConfig.protectedResourceMap);
    // tslint:disable-next-line: prefer-const
    let authenticationParameters: AuthenticationParameters =
    {
      // tslint:disable-next-line: no-unused-expression
        scopes :  apiConfigCommand.b2cScopes,
        account
    };

    this.authService.acquireTokenSilent(authenticationParameters).then(tokenResponse => {
     const accessToken = tokenResponse.accessToken;
     console.log('token', accessToken);
  }).catch (error => {
      if (error instanceof InteractionRequiredAuthError) {
          // fallback to interaction when silent call fails
         // return  this.authService.acquireTokenRedirect(authenticationParameters);
      } else {
          console.log(error);
      }
  });


    // console.log('authenticationParameters', authenticationParameters);
    // const token =  this.authService.acquireTokenSilent(  authenticationParameters ) ;
    // console.log('token', token);
    return this.http.put(`${apiConfigCommand.webApi}/speech`, speech)
    .pipe(
      tap(result => console.log(`update speech`, result)),
      catchError(this.handleError('updateSpeech' )));
   }

   createSpeech(speech: Speech): Observable<any> {
       return this.http.post(`${apiConfigCommand}/speech`, speech)
       .pipe(
        tap(result => console.log(`create speech`, result)),
        catchError(this.handleError('createSpeech' )));
  }

  deleteSpeech(id: string): Observable<any>{
    return this.http.delete(`${apiConfigCommand}/speech/${id}`)
      .pipe(
        tap(result => console.log(`delete speech`, id, result)),
        catchError(this.handleError('deleteSpeech' )));
  }

  private handleError<T>(operation = 'operation'): any  {
    return (httpErrorResponse: HttpErrorResponse): Observable<T> => {
      console.error(HttpErrorResponse);
      console.log(`${operation} failed: ${httpErrorResponse.message}`);
      let result: ErrorCode;
      if (httpErrorResponse.error === null)
      {
        result =
        {
          errorCode : httpErrorResponse.status,
          errorMessage : httpErrorResponse.message,
          error : JSON.stringify(httpErrorResponse)
        };
      }
      else {
        result =
        {
          errorCode : httpErrorResponse.error?.errorCode,
          errorMessage : httpErrorResponse.error.message,
          error : JSON.stringify(httpErrorResponse.error)
        };
    }
      throw  result;
    };
  }
}
