import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyRegistrationSuccessComponent } from './academy-registration-success.component';

describe('AcademyRegistrationSuccessComponent', () => {
  let component: AcademyRegistrationSuccessComponent;
  let fixture: ComponentFixture<AcademyRegistrationSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyRegistrationSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyRegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
