import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClinicSpecialtyComponent } from './select-clinic-specialty.component';

describe('SelectClinicSpecialtyComponent', () => {
  let component: SelectClinicSpecialtyComponent;
  let fixture: ComponentFixture<SelectClinicSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectClinicSpecialtyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectClinicSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
