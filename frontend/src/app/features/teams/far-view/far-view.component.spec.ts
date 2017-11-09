import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarViewComponent } from './far-view.component';

describe('FarViewComponent', () => {
  let component: FarViewComponent;
  let fixture: ComponentFixture<FarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
