import { Component, OnInit } from '@angular/core';
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
   constructor(private speechService: SpeechService) { }

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
}