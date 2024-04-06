import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRoleComponent } from './signup-role.component';

describe('SignupRoleComponent', () => {
  let component: SignupRoleComponent;
  let fixture: ComponentFixture<SignupRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
