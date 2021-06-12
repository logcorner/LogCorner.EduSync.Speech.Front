import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
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

 options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
       const token = this.authService.getAccessToken(['https://datasynchrob2c.onmicrosoft.com/query/api/Speech.List']);
       console.log('**SignalRService::startConnection : token ', token);
       return token;
      }
    };

    private createConnection(): void {
        this._hubConnection = new HubConnectionBuilder()
        .withUrl(this._hubUrl, this.options  )
        .build();
    }

    StartConnection(): void {

       this.createConnection();

       if (this._hubConnection.state === HubConnectionState.Disconnected){
      this._hubConnection
        .start()
        .then(() => {
          console.log('**SignalRService::startConnection : connection started');
          this.subscribe();
          this.onReceived();
        })
        .catch(() => {
          console.log('**SignalRService::startConnection : Error while establishing connection, retrying...');
          setTimeout(function() { this.startConnection(); }, 5000);
        });
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
