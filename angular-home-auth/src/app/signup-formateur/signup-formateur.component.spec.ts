import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormateurComponent } from './signup-formateur.component';

describe('SignupFormateurComponent', () => {
  let component: SignupFormateurComponent;
  let fixture: ComponentFixture<SignupFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFormateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
