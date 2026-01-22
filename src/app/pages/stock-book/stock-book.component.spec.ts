import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBookComponent } from './stock-book.component';

describe('StockBookComponent', () => {
  let component: StockBookComponent;
  let fixture: ComponentFixture<StockBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
