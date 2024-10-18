import { TestBed } from '@angular/core/testing';

import { HTTPTopicService } from './http-topic.service';

describe('HTTPTopicService', () => {
  let service: HTTPTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
