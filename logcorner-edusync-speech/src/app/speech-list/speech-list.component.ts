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
   constructor(private speechService: SpeechService) { }

  ngOnInit(): void {
    this.getSpeeches();
  }

  getSpeeches(): void {
    this.speechService.get()
    .subscribe(item =>
      {
        this.speeches = item;
        console.log('**SpeechListComponent::getSpeeches:speeches - ', this.speeches);
      });
  }
}
