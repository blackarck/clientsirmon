import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewpassComponent } from './reviewpass.component';

describe('ReviewpassComponent', () => {
  let component: ReviewpassComponent;
  let fixture: ComponentFixture<ReviewpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
