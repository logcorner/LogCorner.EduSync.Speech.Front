import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ErrorCode } from '../models/Error';
import { Speech } from '../models/speech-model';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech-list',
  templateUrl: './speech-list.component.html',
  styleUrls: ['./speech-list.component.scss']
})
export class SpeechListComponent implements OnInit {

  speeches: Speech[];
  errorMessage: any;
   constructor(private speechService: SpeechService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getSpeeches();
  }

  getSpeeches(): void {
    this.speechService.getSpeeches()
      .subscribe({
        next: (value: Speech[]) =>
        {
          this.speeches = value;
          console.log('**SpeechListComponent::getSpeeches:speeches - ', this.speeches);
        },
        error: err => this.errorMessage = err
      });
  }

  deleteSpeech(id: string, deleteModal): void{
    const options: NgbModalOptions = { size: 'sm' };
    this.modal.open(deleteModal, options).result.then(result => {
      console.log('**SpeechListComponent::deleteSpeech:result - ', result);
      this.speechService.deleteSpeech(id)
         .subscribe({
          next: (value: any) =>
          {
            this.speeches = this.speeches.filter(obj => obj.id !== id );
            console.log('**SpeechListComponent::deleteSpeech:value - ', value);
          },
          error: (err: ErrorCode) => this.errorMessage = err.errorMessage
        });
    }, reason =>   {
         console.log(`Dismissed: ${reason}`);
    } );
  }
}
