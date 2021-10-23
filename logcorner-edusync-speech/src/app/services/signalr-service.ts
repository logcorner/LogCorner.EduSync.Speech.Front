import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions, LogLevel } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { protectedResources } from '../auth-config';
import { EmitEvent } from '../models/EmitEvent';
import { AuthService } from './auth.service';
import { MediatorService } from './mediator-service';

@Injectable()
export class SignalRService {
      // tslint:disable-next-line: variable-name
      private _hubConnection: HubConnection;

    // tslint:disable-next-line: variable-name
    private _hubUrl = environment.hubNotificationUrl;
    constructor(private mediatorService: MediatorService, private authService: AuthService) {

    }
 
    private async createConnection() {
      const accessToken = await this.authService.getToken("POST",protectedResources.signalrServer.scopes);
      let token = `${accessToken}`
      console.log('**SignalRService::createConnection:accessToken',accessToken);
      console.log('**SignalRService::createConnection:token',token);
      console.log('**SignalRService::createConnection:this._hubUrl',this._hubUrl);
        this._hubConnection = new HubConnectionBuilder()
        .withUrl(this._hubUrl+'?clientName=frontend' ,
          { accessTokenFactory: () => token }) 
          .configureLogging(LogLevel.Debug)
          .build();
    }

   async StartConnection() {

      await this.createConnection();

       if (this._hubConnection?.state === HubConnectionState.Disconnected){
      this._hubConnection
        .start()
        .then(() => {
          console.log('**SignalRService::startConnection : connection started');
          this.subscribe();
          this.onReceived();
        })
        .catch((err) => {
          console.log('**SignalRService::startConnection : Error while establishing connection, retrying...',err);
          setTimeout(function() { this.startConnection(); }, 5000);
        });
      }
    }

    StopConnection(): void {
      if (this._hubConnection?.state === HubConnectionState.Connected) {
        this._hubConnection.stop();
      }
    }
onDisconnected = () =>
    {
        this._hubConnection.on('', (error: any) => {
          if (error !== null)          {
            this.StartConnection();
          }
     });
        console.log('**SignalRService::onDisconnected : connection closed');
    }

subscribe = () => {
        this._hubConnection.invoke('Subscribe', 'ReadModelAcknowledged');
    }

onReceived = () => {
        this._hubConnection.on('OnPublish', (topic: string, body: string ) => {
          console.log('**SignalRService::onReceived : ...',topic, body);
            if (topic == 'ReadModelAcknowledged')  {
                const event: EmitEvent = {
                    name : topic,
                    value : body
                };
                this.mediatorService.emit(event);
            }
        });
    }
}
