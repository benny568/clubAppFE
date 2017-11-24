import { TestBed, inject } from '@angular/core/testing';

import { AcademyRegistrationService } from './academy-registration.service';

describe('AcademyRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcademyRegistrationService]
    });
  });

  it('should be created', inject([AcademyRegistrationService], (service: AcademyRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
