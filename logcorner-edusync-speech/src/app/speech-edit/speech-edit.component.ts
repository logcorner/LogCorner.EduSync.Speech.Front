import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.params.subscribe(params => {
      this.getSpeech(params.id);
  });

    this.speechForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
    url: ['', [Validators.required]],
    type: [null, [Validators.required]]
  });
  }
  getSpeech(id: string): void {
    this.speechService.getSpeech(id)
        .subscribe({
          next: (value: Speech) => this.displaySpeech(value),
          error: err => this.errorMessage = err
        });
  }
  displaySpeech(speech: Speech): void {
    console.log('**SpeechEditComponent::displaySpeech - ', speech);
    this.speech = speech;
    if (this.speechForm) {
      this.speechForm.reset();
    }

    this.speechForm.patchValue(
     {
        id : speech.id,
        title : speech.title,
        description: speech.description,
        url: speech.url,
        type:  speech.type,
     }
   );
  }

  saveSpeech(): void {
    this.speechService.updateSpeech(this.speech).subscribe((res) => {
      console.log('**SpeechEditComponent::save - ', res);
      this.nav.navigate(['/speech']);
    });
  }
}
