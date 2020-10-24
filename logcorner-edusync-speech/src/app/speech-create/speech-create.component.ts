import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech-create',
  templateUrl: './speech-create.component.html',
  styleUrls: ['./speech-create.component.scss']
})
export class SpeechCreateComponent implements OnInit {
  speech = new Speech();
  public speechTypes: SpeechType[];
  errorMessage: string;
  speechForm: FormGroup;
  constructor(private nav: Router,
              private speechService: SpeechService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.speechForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
      url: ['', [Validators.required]],
      type: [null, [Validators.required]]
     });

    this.getSpeechTypes();
  }

  getSpeechTypes(): void {
    this.speechService.getSpeechTypes()
    .subscribe({
      next: (values: SpeechType[]) =>
      {
        this.speechTypes = values;
      },
      error: err => this.errorMessage = err
    });
  }
  save(): void {
    if (this.speechForm.valid) {
        this.speech = this.speechForm.value ;
        console.log(' this.speech: ' + JSON.stringify( this.speech));
        this.speechService.createSpeech(this.speech)
        .subscribe({
          next: () =>
          {
            this.nav.navigate(['/speech']);
          },
          error: err => {
            this.errorMessage = err;
          }
        });
      }
    else {
      this.errorMessage = 'Please correct the validation errors.';
      console.log(' this.errorMessage: ' + JSON.stringify( this.errorMessage));
    }

    console.log(this.speechForm);
    console.log('Saved: ' + JSON.stringify(this.speechForm.value));
  }
  populateTestData(): void {
    const speechType = this.speechTypes?.find(x => x.value === 1);
    this.speechForm.patchValue({
     title: 'Event driven',
     description : 'Lorem Ipsum ',
     url : 'http://www.yahoo.fr',
     type: speechType !== undefined ? speechType : null
    });
  }
}
