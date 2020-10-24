import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { environment } from 'src/environments/environment.prod';
import { SpeechType } from '../models/SpeechType';

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
        catchError(this.handleError('getSpeechTypes', [] )));
   }

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(`${this.queryAPI}/speech`)
      .pipe(
        tap(speeches => console.log(`fetched speeches`, speeches)),
        catchError(this.handleError('getSpeeches', [])));
  }

  getSpeech(id: string): Observable<Speech> {
    return this.http.get<Speech>(`${this.queryAPI}/speech/${id}`)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(this.handleError('getSpeech', new Speech() )));
  }

  updateSpeech(speech: Speech): Observable<any> {
    return this.http.put(`${this.commandAPI}/speech`, speech)
    .pipe(
      tap(result => console.log(`update speech`, result)),
      catchError(this.handleError('updateSpeech', new Speech() )));
   }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T)  {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
