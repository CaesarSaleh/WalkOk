import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextanalysisComponent } from './textanalysis.component';

describe('TextanalysisComponent', () => {
  let component: TextanalysisComponent;
  let fixture: ComponentFixture<TextanalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextanalysisComponent]
    });
    fixture = TestBed.createComponent(TextanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
