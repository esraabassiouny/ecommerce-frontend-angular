import { TestBed } from '@angular/core/testing';

// Update the import path and extension if needed
import { AdminGuard } from './admin-guard';

describe('AdminGuard', () => {
  let service: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
