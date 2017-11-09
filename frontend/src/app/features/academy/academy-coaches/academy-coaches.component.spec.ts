import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyCoachesComponent } from './academy-coaches.component';

describe('AcademyCoachesComponent', () => {
  let component: AcademyCoachesComponent;
  let fixture: ComponentFixture<AcademyCoachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyCoachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
