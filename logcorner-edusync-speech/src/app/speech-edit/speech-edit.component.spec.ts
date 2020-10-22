import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechEditComponent } from './speech-edit.component';

describe('SpeechEditComponent', () => {
  let component: SpeechEditComponent;
  let fixture: ComponentFixture<SpeechEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
