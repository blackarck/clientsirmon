import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdtlComponent } from './clientdtl.component';

describe('ClientdtlComponent', () => {
  let component: ClientdtlComponent;
  let fixture: ComponentFixture<ClientdtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
