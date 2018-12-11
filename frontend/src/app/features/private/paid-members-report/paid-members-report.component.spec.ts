import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidMembersReportComponent } from './paid-members-report.component';

describe('PaidMembersReportComponent', () => {
  let component: PaidMembersReportComponent;
  let fixture: ComponentFixture<PaidMembersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidMembersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidMembersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
