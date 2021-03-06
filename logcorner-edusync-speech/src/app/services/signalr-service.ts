import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { EmitEvent } from '../models/EmitEvent';
import { MediatorService } from './mediator-service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
    private _hubConnection: HubConnection;  
    private _hubUrl =environment.hubNotificationUrl;
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

      if(this._hubConnection.state === HubConnectionState.Disconnected){
      this._hubConnection  
        .start()  
        .then(() => {  
          console.log('**SignalRService::startConnection : connection started');  
          this.subscribe();
          this.onReceived();
        })  
        .catch(() => {  
          console.log('**SignalRService::startConnection : Error while establishing connection, retrying...');  
          setTimeout(function () { this.startConnection(); }, 5000);  
        });  
      }
    }  
    
    onDisconnected =() => 
    {
        this._hubConnection.on('', (error :any) => {
          if(error !== null)          {
            this.startConnection();
          }
     });
     console.log('**SignalRService::onDisconnected : connection closed');  
    }  

    subscribe =() => {
        this._hubConnection.invoke('Subscribe', 'ReadModelAcknowledged');
    }  

    onReceived =() => { 
        this._hubConnection.on('OnPublish',(topic :string, body : string ) => {
            if(topic == 'ReadModelAcknowledged')  {
                let event : EmitEvent = {
                    name : topic,
                    value : body
                }
                this.mediatorService.emit(event);
            }
        })
    }
}