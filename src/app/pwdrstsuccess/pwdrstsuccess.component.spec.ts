import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdrstsuccessComponent } from './pwdrstsuccess.component';

describe('PwdrstsuccessComponent', () => {
  let component: PwdrstsuccessComponent;
  let fixture: ComponentFixture<PwdrstsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwdrstsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdrstsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
