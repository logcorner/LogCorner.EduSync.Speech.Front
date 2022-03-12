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
    this.speechService.getSpeechTypes().then(
      (result) =>
      {
        result.subscribe({
          next: (value: SpeechType[]) =>
          {
            this.speechTypes = value
            console.log('**SpeechEditComponent::getSpeechTypes:SpeechType - ', value);
          },
          error: err => this.errorMessage = err
        });
      }
    );
  }
  save(): void {
    if (this.speechForm.valid) {
        this.speech = this.speechForm.value ;

        this.speech.typeId = this.speech.type !== undefined ? this.speech.type.value : null;
        //console.log(' this.speech: ' + JSON.stringify( this.speech));
       
        this.speechService.createSpeech(this.speech).then(
          (result) =>
          {
            result.subscribe({
              next: (value: Speech[]) =>
              {
                this.nav.navigate(['/speech']);
                //console.log('**SpeechListComponent::createSpeech:speech - ',value);
              },
              error: err => this.errorMessage = err
            });
          }
        );
      }
    else {
      this.errorMessage = 'Please correct the validation errors.';
      //console.log(' this.errorMessage: ' + JSON.stringify( this.errorMessage));
    }

    //console.log(this.speechForm);
    //console.log('Saved: ' + JSON.stringify(this.speechForm.value));
  }
  populateTestData(): void {
    const speechType = this.speechTypes?.find(x => x.value === 1);
    this.speechForm.patchValue({
     title: 'Le Lorem Ipsum est simplement du faux texte',
     description : 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte',
     url : 'http://www.yahoo.fr',
     type: speechType !== undefined ? speechType : null
    });
  }
}
