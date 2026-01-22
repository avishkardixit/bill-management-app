import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesComponent } from './other-expenses.component';

describe('OtherExpensesComponent', () => {
  let component: OtherExpensesComponent;
  let fixture: ComponentFixture<OtherExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
