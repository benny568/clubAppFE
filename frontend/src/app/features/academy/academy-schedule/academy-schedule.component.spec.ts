import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyScheduleComponent } from './academy-schedule.component';

describe('AcademyScheduleComponent', () => {
  let component: AcademyScheduleComponent;
  let fixture: ComponentFixture<AcademyScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
