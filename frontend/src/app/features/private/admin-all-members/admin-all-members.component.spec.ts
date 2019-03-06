import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllMembersComponent } from './admin-all-members.component';

describe('AdminAllMembersComponent', () => {
  let component: AdminAllMembersComponent;
  let fixture: ComponentFixture<AdminAllMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
