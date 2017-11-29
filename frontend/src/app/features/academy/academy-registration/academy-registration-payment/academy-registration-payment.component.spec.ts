import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyRegistrationPaymentComponent } from './academy-registration-payment.component';

describe('AcademyRegistrationPaymentComponent', () => {
  let component: AcademyRegistrationPaymentComponent;
  let fixture: ComponentFixture<AcademyRegistrationPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyRegistrationPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyRegistrationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
