import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { EmitEvent } from '../models/EmitEvent';
import { MediatorService } from './mediator-service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
    private _hubConnection: HubConnection;  
    private _hubUrl = 'http://localhost:5000/logcornerhub';
    constructor(private mediatorService : MediatorService) {  
      this.createConnection();  
      this.startConnection();  
    }  
    
    private createConnection() {  
        this._hubConnection = new HubConnectionBuilder()  
        .withUrl(this._hubUrl)  
        .build();  
    }  
    
    private startConnection(): void {  
      this._hubConnection  
        .start()  
        .then(() => {  
          console.log('Hub connection started');  
          this.subscribe();
          this.onReceived();
        })  
        .catch(() => {  
          console.log('Error while establishing connection, retrying...');  
          setTimeout(function () { this.startConnection(); }, 5000);  
        });  
    }  
    
    onDisconnected =() => 
    {
        this._hubConnection.on('', (error :any) => {
          if(error !== null)          {
            this.startConnection();
          }
     });
    }  

    subscribe =() => {
        this._hubConnection.invoke('Subscribe', 'speech');
    }  

    onReceived =() => { 
        this._hubConnection.on('OnPublish',(topic :string, body : string ) => {
            if(topic == 'speech')  {
                let event : EmitEvent = {
                    name : topic,
                    value : body
                }
                this.mediatorService.emit(event);
            }
        })
    }
}