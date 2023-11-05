import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Text2audioComponent } from './text2audio.component';

describe('Text2audioComponent', () => {
  let component: Text2audioComponent;
  let fixture: ComponentFixture<Text2audioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Text2audioComponent]
    });
    fixture = TestBed.createComponent(Text2audioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
