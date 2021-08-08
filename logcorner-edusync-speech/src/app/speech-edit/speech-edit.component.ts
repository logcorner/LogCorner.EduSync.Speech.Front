import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorCode } from '../models/Error';
import { Speech } from '../models/speech-model';
import { SpeechType } from '../models/SpeechType';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech-edit',
  templateUrl: './speech-edit.component.html',
  styleUrls: ['./speech-edit.component.scss']
})
export class SpeechEditComponent implements OnInit {
  errorMessage: any;
  speechForm: FormGroup;
  speechTypes: SpeechType[];
  speech = new Speech();

  constructor(  private router: ActivatedRoute, private speechService: SpeechService,
                private fb: FormBuilder, private nav: Router, ) { }

  ngOnInit(): void {
     this.getSpeechTypes();
     this.router.params.subscribe(params => {
      this.getSpeech(params.id);
    });

     this.speechForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      url: ['', [Validators.required]],
      type: [null, [Validators.required]]
    });
  }

  getSpeechTypes(): void {
    /*this.speechService.getSpeechTypes()
    .subscribe({
      next: (values: SpeechType[]) =>
      {
        this.speechTypes = values;
      },
      error: err => this.errorMessage = err
    });*/
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
  getSpeech(id: string): void {
   /*  this.speechService.getSpeech(id)
        .subscribe({
          next: (value: Speech) => this.displaySpeech(value),
          error: err => this.errorMessage = err
        }); */
        this.speechService.getSpeech(id).then(
          (result) =>
          {
            result.subscribe({
              next: (value: Speech) =>
              {
                this.displaySpeech(value);
                console.log('**SpeechEditComponent::getSpeech:speech - ', value);
              },
              error: err => this.errorMessage = err
            });
          }
        );
  }
  displaySpeech(speech: Speech): void {
    console.log('**SpeechEditComponent::displaySpeech - ', speech);
    this.speech = speech;

    const speechType = this.speechTypes?.find(x => x.value === this.speech.type.value);

    if (this.speechForm) {
      this.speechForm.reset();
    }

    this.speechForm.patchValue(
     {
        id : speech.id,
        title : speech.title,
        description: speech.description,
        url: speech.url,
        type: speechType !== undefined ? speechType : null,
     }
   );
  }

  saveSpeech(): void {
     const p: Speech = { ...this.speech, ...this.speechForm.value };
     p.typeId = p.type !== undefined ? p.type.value : null;
     /*this.speechService.updateSpeech(p).subscribe({
      next: () =>
      {
        this.nav.navigate(['/speech']);
      },
      error: (err: ErrorCode ) => {
        this.errorMessage = err.errorMessage;
        if (err.errorCode === 5000) {
          this.getSpeech(p.id);
        }
      }
    });*/

    this.speechService.updateSpeech(p).then(
      (result) =>
      {
        result.subscribe({
          next: (value: any) =>
          {
            this.nav.navigate(['/speech']);
            console.log('**SpeechListComponent::getSpeeches:speeches - ', value);
          },
          error: err => this.errorMessage = err
        });
      }
    );
  }

  get speechType(): any {
      return this.speechForm.get('type');
	}

  onTypeChange(): void {
    const type: SpeechType = this.speechType.value;
    this.speech.type = type;
	   console.log(`onTypeChange Changed: ${type.name}`);
  }
}
