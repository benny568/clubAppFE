import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyRegistrationFormComponent } from './academy-registration-form.component';

describe('AcademyRegistrationFormComponent', () => {
  let component: AcademyRegistrationFormComponent;
  let fixture: ComponentFixture<AcademyRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
