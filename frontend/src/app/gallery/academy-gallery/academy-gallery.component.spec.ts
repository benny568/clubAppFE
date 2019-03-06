import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyGalleryComponent } from './academy-gallery.component';

describe('AcademyGalleryComponent', () => {
  let component: AcademyGalleryComponent;
  let fixture: ComponentFixture<AcademyGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
