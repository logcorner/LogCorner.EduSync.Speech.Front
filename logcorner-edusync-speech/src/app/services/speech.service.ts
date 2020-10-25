import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { environment } from 'src/environments/environment.prod';
import { SpeechType } from '../models/SpeechType';
import { ErrorCode } from '../models/Error';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private queryAPI = environment.queryAPI;
  private commandAPI = environment.commandAPI;

  constructor(private http: HttpClient) { }

  getSpeechTypes(): Observable<SpeechType[]> {
    const url = `${this.queryAPI}/speech/types/`;
    return this.http.get<SpeechType[]>(url)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(this.handleError<SpeechType[]>('getSpeechTypes' )));
   }

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(`${this.queryAPI}/speech`)
      .pipe(
        tap(speeches => console.log(`fetched speeches`, speeches)),
        catchError(this.handleError<Speech[]>('getSpeeches')));
  }

  getSpeech(id: string): Observable<Speech> {
    return this.http.get<Speech>(`${this.queryAPI}/speech/${id}`)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(this.handleError<Speech>('getSpeech' )));
  }

  updateSpeech(speech: Speech): Observable<any> {
    return this.http.put(`${this.commandAPI}/speech`, speech)
    .pipe(
      tap(result => console.log(`update speech`, result)),
      catchError(this.handleError('updateSpeech' )));
   }

   createSpeech(speech: Speech): Observable<any> {
       return this.http.post(`${this.commandAPI}/speech`, speech)
       .pipe(
        tap(result => console.log(`create speech`, result)),
        catchError(this.handleError('createSpeech' )));
  }

  private handleError<T>(operation = 'operation'): any  {
    return (httpErrorResponse: HttpErrorResponse): Observable<T> => {
      console.error(HttpErrorResponse);
      console.log(`${operation} failed: ${httpErrorResponse.message}`);
      const result: ErrorCode =
      {
        errorCode : httpErrorResponse.error.errorCode,
        errorMessage : httpErrorResponse.error.message,
        error : JSON.stringify(httpErrorResponse.error)
      };
      throw  result;
    };
  }
}
