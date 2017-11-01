import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyRegistrationComponent } from './academy-registration.component';

describe('AcademyRegistrationComponent', () => {
  let component: AcademyRegistrationComponent;
  let fixture: ComponentFixture<AcademyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
