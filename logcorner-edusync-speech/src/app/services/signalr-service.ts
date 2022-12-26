import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
// import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

import { protectedResources } from '../auth-config';
import { EmitEvent } from '../models/EmitEvent';
import { AuthService } from './auth.service';
import { MediatorService } from './mediator-service';


/* https://code-maze.com/netcore-signalr-angular-realtime-charts/ */

@Injectable()
export class SignalRService {
       private _hubConnection: HubConnection;

      private _hubUrl = environment.hubNotificationUrl;
      constructor(private mediatorService: MediatorService, private authService: AuthService) {
      }
 
    private  createConnection() {
       let accessToken = ''
       this.authService.getToken("POST",protectedResources.signalrServer.scopes).
      then((observable) => {
        console.log('**createConnection::setLoginDisplay:then((observable)',observable)
        accessToken = `${observable}`;
        console.log('**SignalRService::createConnection:accessToken',accessToken);
        console.log('**SignalRService::createConnection : this._hubUrl',this._hubUrl);
        this._hubConnection = new HubConnectionBuilder()
        .withUrl(this._hubUrl+'?clientName=frontend' ,
          { accessTokenFactory: () => accessToken }) 
          .withAutomaticReconnect([4 ,8, 16, 32, 64, 128 ,256,2000, 10000, 30000])
          .configureLogging(LogLevel.Debug)
          .build();

          this._hubConnection
          .start()
          .then(() => {
            console.log('**SignalRService::createConnection : connection started');
            this.subscribe();
            this.onReceived();
          })
          .catch((err) => {
            console.log('**SignalRService::createConnection : Error while establishing connection, retrying...',err);
          });
       }).catch((err) => 
       {
         console.log('**createConnection::setLoginDisplay:err',err)
       });
     }

     StartConnection() {
      console.log('**SignalRService::StartConnection.this._hubConnection',this._hubConnection);
      console.log('**SignalRService::StartConnection.HubConnectionState',this._hubConnection?.state);
      // if (this._hubConnection === undefined && this.connectionState() != HubConnectionState.Connected  ){
        this.createConnection();
      // }
     }  

    StopConnection(): void {
      if (this._hubConnection?.state === HubConnectionState.Connected) {
        this._hubConnection.stop();
      }
    }

subscribe = () => {
         this._hubConnection.invoke('Subscribe', 'ReadModelAcknowledged');
    } 

onReceived = () => {
        this._hubConnection.on('OnPublish', (topic: string,header : any, body: any ) => {
          console.log('**SignalRService::onReceived:topic : ...',topic);
          console.log('**SignalRService::onReceived:header : ...',header);
          console.log('**SignalRService::onReceived:body : ...',body);
            if (topic == 'ReadModelAcknowledged')  {
                const event: EmitEvent = {
                    name : topic,
                    value : body
                };
                this.mediatorService.emit(event);
            }
        });
    }
  connectionState() : HubConnectionState
  {
    return this._hubConnection.state 
  }

}
