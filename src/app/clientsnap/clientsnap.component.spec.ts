import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsnapComponent } from './clientsnap.component';

describe('ClientsnapComponent', () => {
  let component: ClientsnapComponent;
  let fixture: ComponentFixture<ClientsnapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsnapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
