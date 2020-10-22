import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {


  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSpeeches(): Observable<Speech[]> {
    return this.http.get<Speech[]>(`${this.baseUrl}/speech`)
      .pipe(
        tap(speeches => console.log(`fetched speeches`, speeches)),
        catchError(this.handleError('getSpeeches', [])));
  }

  getSpeech(id: string): Observable<Speech> {
    return this.http.get<Speech>(`${this.baseUrl}/speech/${id}`)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(this.handleError('getSpeech', new Speech() )));
  }

  updateSpeech(speech: Speech): Observable<any> {
    return this.http.put(`${this.baseUrl}/speech/${speech.id}`, speech)
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
