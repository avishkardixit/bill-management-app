import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDialogComponent } from './purchase-order-dialog.component';

describe('PurchaseOrderDialogComponent', () => {
  let component: PurchaseOrderDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
