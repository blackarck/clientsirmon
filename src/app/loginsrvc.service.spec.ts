import { TestBed } from '@angular/core/testing';

import { LoginsrvcService } from './loginsrvc.service';

describe('LoginsrvcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginsrvcService = TestBed.get(LoginsrvcService);
    expect(service).toBeTruthy();
  });
});
