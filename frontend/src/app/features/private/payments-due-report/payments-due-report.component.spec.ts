import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsDueReportComponent } from './payments-due-report.component';

describe('PaymentsDueReportComponent', () => {
  let component: PaymentsDueReportComponent;
  let fixture: ComponentFixture<PaymentsDueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsDueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsDueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
