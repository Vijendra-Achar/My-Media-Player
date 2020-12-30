import { TestBed } from '@angular/core/testing';

import { CreateNewVideoService } from './create-new-video.service';

describe('CreateNewVideoService', () => {
  let service: CreateNewVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
