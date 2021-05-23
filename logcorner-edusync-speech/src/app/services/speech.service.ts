import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { ErrorCode } from '../models/Error';
import { apiConfigCommand, apiConfigQuery } from '../app-config';


@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  constructor(private http: HttpClient) { }
  
  getSpeechTypes(): Observable<SpeechType[]> {
    const url = `${apiConfigQuery.webApi}/speech/types/`;
    return this.http.get<SpeechType[]>(url)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(this.handleError<SpeechType[]>('getSpeechTypes' )));
   }

  async getSpeeches(): Promise< Observable<Speech[]>> {
  console.log('this.http.options', this.http.options);
  console.log('url', `${apiConfigQuery.webApi}/speech`);
  return this.http.get<Speech[]>(`${apiConfigQuery.webApi}/speech`)
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
