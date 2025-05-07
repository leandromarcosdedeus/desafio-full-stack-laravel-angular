import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRegionalComponent } from './select-regional.component';

describe('SelectRegionalComponent', () => {
  let component: SelectRegionalComponent;
  let fixture: ComponentFixture<SelectRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRegionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
