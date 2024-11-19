import { TestBed } from '@angular/core/testing';

import { TransmitDataBtwComponentsService } from './transmit-data-betw-components.service';

describe('TransmitDataBtwComponentsService', () => {
  let service: TransmitDataBtwComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmitDataBtwComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
