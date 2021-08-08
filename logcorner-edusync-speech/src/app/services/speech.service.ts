import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { ErrorCode } from '../models/Error';
import { AuthService } from './auth.service';
import { protectedResources } from '../auth-config';

@Injectable()
export class SpeechService {
  constructor(private http: HttpClient,  private authService: AuthService) { }

 async getSpeechTypes(): Promise<Observable<SpeechType[]>> {
    const url = `${protectedResources.queryApi.endpoint}/speech/types`;

  const httpOptions = await this.setHttpOptions("GET",protectedResources.queryApi.scopes);

    return this.http.get<SpeechType[]>(url,httpOptions)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(this.handleError<SpeechType[]>('getSpeechTypes' )));
   }

  private async setHttpOptions(method :string, scopes : string[],body ?: any) {
    const accessToken = await this.authService.getToken(method, scopes);
    console.log('**SpeechService:getSpeeches:accessToken', accessToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }),
      body
    };
    return httpOptions;
  }

  async getSpeeches(): Promise< Observable<Speech[]>> {
  console.log('this.http.options', this.http.options);
  console.log('url', `${protectedResources.queryApi.endpoint}/speech`);

  const accessToken = await this.authService.getToken("GET",protectedResources.queryApi.scopes);
  console.log('**SpeechService:getSpeeches:accessToken', accessToken);
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + accessToken
    })
    
  };

  return this.http.get<Speech[]>(`${protectedResources.queryApi.endpoint}/speech`,httpOptions)
      .pipe(
        tap(speeches => console.log(`fetched speeches`, speeches)),
        catchError(this.handleError<Speech[]>('getSpeeches')));

  }

 async getSpeech(id: string){//: Observable<Speech> {
    const accessToken = await this.authService.getToken("GET",protectedResources.queryApi.scopes);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' + accessToken
      })
      
    };
    return this.http.get<Speech>(`${protectedResources.queryApi.endpoint}/speech/${id}`,httpOptions)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(this.handleError<Speech>('getSpeech' )));
  }

 async updateSpeech(speech: Speech): Promise< Observable<any>> {

    const httpOptions = await this.setHttpOptions("PUT",protectedResources.commandApi.scopes);
    return this.http.put(`${protectedResources.commandApi.endpoint}/speech`, speech, httpOptions)
    .pipe(
      tap(result => console.log(`update speech`, result)),
      catchError(this.handleError('updateSpeech' )));
   }

 async createSpeech(speech: Speech): Promise< Observable<any>> {

    const httpOptions = await this.setHttpOptions("POST",protectedResources.commandApi.scopes);
       return this.http.post(`${protectedResources.commandApi.endpoint}/speech`, speech,httpOptions)
       .pipe(
        tap(result => console.log(`create speech`, result)),
        catchError(this.handleError('createSpeech' )));
  }

 async deleteSpeech(id: string, version: number): Promise< Observable<any>>{

   
    const body: any = {
      id,
      version
    };
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'Bearer ' + accessToken
      }),
      body
    };*/

    const httpOptions = await this.setHttpOptions("DELETE",protectedResources.commandApi.scopes,body);
    return this.http.delete(`${protectedResources.commandApi.endpoint}/speech/`, httpOptions)
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
