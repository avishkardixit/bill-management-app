import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingBookComponent } from './lending-book.component';

describe('LendingBookComponent', () => {
  let component: LendingBookComponent;
  let fixture: ComponentFixture<LendingBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendingBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
