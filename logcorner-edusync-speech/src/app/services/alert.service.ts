import { Injectable } from '@angular/core';
import { Alert } from '../models/Alert';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  addError(message: string, debug?: string): void{
      console.log(message, debug, 'danger')
  }

  addSuccess(message: string, debug?: string): void {
   
    console.log(message, debug, 'success')
  }

}

