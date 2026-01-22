import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOrdersComponent } from './sell-orders.component';

describe('SellOrdersComponent', () => {
  let component: SellOrdersComponent;
  let fixture: ComponentFixture<SellOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
