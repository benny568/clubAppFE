import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCountComponent } from './visitor-count.component';

describe('SponsorsComponent', () => {
  let component: VisitorCountComponent;
  let fixture  : ComponentFixture<VisitorCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(VisitorCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
