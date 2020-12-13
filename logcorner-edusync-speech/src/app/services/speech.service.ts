import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { environment } from 'src/environments/environment.prod';
import { SpeechType } from '../models/SpeechType';
import { ErrorCode } from '../models/Error';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private queryAPI = environment.queryAPI;
  private commandAPI = environment.commandAPI;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSpeechTypes(): Observable<SpeechType[]> {
    const url = `${this.queryAPI}/speech/types/`;
    return this.http.get<SpeechType[]>(url)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(this.handleError<SpeechType[]>('getSpeechTypes' )));
   }

  async getSpeeches(): Promise< Observable<Speech[]>> {
    let token =    await   this.authService.getAccessToken()
     .catch((reason) => {
      console.log(reason);
    });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
   console.log('token =', token);
   
    return this.http.get<Speech[]>(`${this.queryAPI}/speech`, {  headers :headers })
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

  deleteSpeech(id: string): Observable<any>{
    return this.http.delete(`${this.commandAPI}/speech/${id}`)
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
