import { TestBed } from '@angular/core/testing';

import { AuthanticationGuard } from './authantication.guard';

describe('AuthanticationGuard', () => {
  let guard: AuthanticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthanticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
