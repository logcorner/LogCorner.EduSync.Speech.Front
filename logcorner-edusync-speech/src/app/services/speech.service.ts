import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { environment } from 'src/environments/environment';

export class TrackerError {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
}

@Injectable()
export class SpeechService {
  constructor(private http: HttpClient) { }

 async getSpeechTypes(): Promise<Observable<SpeechType[] | TrackerError>> {
    const url = `${environment.queryAPI}/speech/types`;

  

    return this.http.get<SpeechType[]>(url)
      .pipe(
        tap(data => console.log('getSpeechTypes: ' + JSON.stringify(data))),
        catchError(err => this.handleError('getSpeechTypes' ,err)));
   }

  

  async getSpeeches(): Promise< Observable<Speech[] | TrackerError>> {
    return this.http.get<Speech[]>(`${environment.queryAPI}/speech`)
        .pipe(
          tap(speeches => console.log(`fetched speeches`, speeches)) ,
          catchError(err => this.handleError(`getSpeeches (${environment.queryAPI}/speech)`, err))
          );
  }

 async getSpeech(id: string): Promise< Observable<Speech | TrackerError>> {

   
    return this.http.get<Speech>(`${environment.queryAPI}/speech/${id}`)
      .pipe(
        tap(speeches => console.log(`fetched speech`, id, speeches)),
        catchError(err => this.handleError('getSpeech',err )));
  }

 async updateSpeech(speech: Speech): Promise< Observable<any>> {

   
    return this.http.put(`${ environment.commandAPI}/speech`, speech)
    .pipe(
      tap(result => console.log(`update speech`, result)),
      catchError(err => this.handleError('updateSpeech' ,err)));
   }

 async createSpeech(speech: Speech): Promise< Observable<any>> {

   
       return this.http.post(`${ environment.commandAPI}/speech`, speech)
       .pipe(
        tap(result => console.log(`create speech`, result)),
        catchError(err => this.handleError('createSpeech' ,err)));
  }

 async deleteSpeech(id: string, version: number): Promise< Observable<any>>{
  
    const body: any = {
      id,
      version
    };

   
    return this.http.delete(`${ environment.commandAPI}/speech/`)
      .pipe(
        tap(result => console.log(`delete speech`, id, result)),
        catchError(err => this.handleError('deleteSpeech',err)));
  }

  private handleError( name: string,error: HttpErrorResponse): Observable<TrackerError> {
    console.log(`error `, error)
    let dataError = new TrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = `An error occurred while calling ${name}`;
    return throwError(dataError);    
  }
}
