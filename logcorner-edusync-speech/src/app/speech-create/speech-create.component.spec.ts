import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCreateComponent } from './speech-create.component';

describe('SpeechCreateComponent', () => {
  let component: SpeechCreateComponent;
  let fixture: ComponentFixture<SpeechCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
