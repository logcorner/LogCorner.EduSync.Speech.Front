import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ErrorCode } from '../models/Error';
import { Events } from '../models/Events';
import { Speech } from '../models/speech-model';
import { MediatorService } from '../services/mediator-service';
import { SpeechService } from '../services/speech.service';
@Component({
  selector: 'app-speech-list',
  templateUrl: './speech-list.component.html',
  styleUrls: ['./speech-list.component.scss']
})
export class SpeechListComponent implements OnInit {
  eventbus : Subscription;
  speeches: Speech[];
  errorMessage: any;
   constructor(private speechService: SpeechService,
     private modal: NgbModal,
     private mediatorService : MediatorService) { }

  ngOnInit(): void {
    this.getSpeeches();
   
    this.eventbus = this.mediatorService.on(Events.topic,(data : any) => {
      console.log('received from hub: ', data)
      this.refreshSpeeches();
    })
  }
  refreshSpeeches() : void{
    console.log('**SpeechListComponent::refreshSpeeches');
    this.getSpeeches();
  }

  getSpeeches(): void {
    this.speechService.getSpeeches().then(
      (result) =>
      {
        result.subscribe({
          next: (value: Speech[]) =>
          {
            this.speeches = value;
            console.log('**SpeechListComponent::getSpeeches:speeches - ', this.speeches);
          },
          error: err => this.errorMessage = err
        });
      }
    );
  }

  deleteSpeech(id: string, version : number, deleteModal): void{
    const options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      console.log('**SpeechListComponent::deleteSpeech:result - ', result);
     /* this.speechService.deleteSpeech(id,version)
         .subscribe({
          next: (value: any) =>
          {
            this.speeches = this.speeches.filter(obj => obj.id !== id );
            console.log('**SpeechListComponent::deleteSpeech:value - ', value);
          },
          error: (err: ErrorCode) => this.errorMessage = err.errorMessage
        });*/

        this.speechService.deleteSpeech(id,version).then(
          (result) =>
          {
            result.subscribe({
              next: (value: any) =>
              {
                this.speeches = this.speeches.filter(obj => obj.id !== id );
            console.log('**SpeechListComponent::deleteSpeech:value - ', value);
              },
              error: err => this.errorMessage = err
            });
          }
        );

    }, reason =>   {
         console.log(`Dismissed: ${reason}`);
    } );
  }
}
