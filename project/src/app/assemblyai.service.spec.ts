import { TestBed } from '@angular/core/testing';

import { AssemblyaiService } from './assemblyai.service';

describe('AssemblyaiService', () => {
  let service: AssemblyaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssemblyaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
