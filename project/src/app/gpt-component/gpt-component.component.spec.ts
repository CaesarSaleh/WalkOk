import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptComponentComponent } from './gpt-component.component';

describe('GptComponentComponent', () => {
  let component: GptComponentComponent;
  let fixture: ComponentFixture<GptComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GptComponentComponent]
    });
    fixture = TestBed.createComponent(GptComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
