import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyNewsComponent } from './academy-news.component';

describe('AcademyNewsComponent', () => {
  let component: AcademyNewsComponent;
  let fixture: ComponentFixture<AcademyNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
