import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LrTableComponent } from './lr-table.component';

describe('LrTableComponent', () => {
  let component: LrTableComponent;
  let fixture: ComponentFixture<LrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
