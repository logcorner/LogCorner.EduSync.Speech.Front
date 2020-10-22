import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechListComponent } from './speech-list.component';

describe('SpeechListComponent', () => {
  let component: SpeechListComponent;
  let fixture: ComponentFixture<SpeechListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
