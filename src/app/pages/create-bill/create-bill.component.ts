import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { finalize } from 'rxjs';
import { BillingService } from '../../services/billing.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss'],
})
export class CreateBillComponent {
  @ViewChild(FormGroupDirective) private formDirective?: FormGroupDirective;

  colors = ['Off White', 'Blue', 'Grey', 'Turkish Blue'];

  billForm: FormGroup;
  isSaving = false;
  saveStatus: 'idle' | 'saving' | 'success' | 'error' = 'idle';
  saveMessage = '';

  constructor(
    private fb: FormBuilder,
    private billingService: BillingService,
    private billService: BillService,
  ) {
    this.billForm = this.fb.group({
      date: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      buyerName: ['', Validators.required],
      billType: ['', Validators.required],

      items: this.fb.array([]),
      transport: [0, Validators.required],
      otherExpense: [0, Validators.required],
      received: [0, Validators.required],
      total: [{ value: 0, disabled: true }],
      remaining: [{ value: 0, disabled: true }],
    });

    this.addItemSection();
  }

  // ---------- ITEMS ----------
  get items() {
    return this.billForm.get('items') as FormArray;
  }

  addItemSection() {
    const item = this.fb.group({
      type: ['Sheet', Validators.required],
      color: ['', Validators.required],
      rate: [0, Validators.required],

      totalWeight: [0, Validators.required], // for Sheet / Profile Sheet
      totalQuantity: [0], // for Accessories / Screw

      amount: [{ value: 0, disabled: true }],
      rows: this.fb.array([this.createRow()]),
    });

    // Recalculate when item-level fields change
    item.get('type')!.valueChanges.subscribe(() => {
      this.updateItemValidators(item);
      this.recalculateItem(item);
    });
    item.get('rate')!.valueChanges.subscribe(() => this.recalculateItem(item));
    item
      .get('totalWeight')!
      .valueChanges.subscribe(() => this.recalculateItem(item));

    // Recalculate when first row changes
    this.updateItemValidators(item);
    this.watchRows(item);

    this.items.push(item);
  }

  removeItemSection(index: number) {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  // ---------- ROWS ----------
  rows(itemIndex: number) {
    return this.items.at(itemIndex).get('rows') as FormArray;
  }

  createRow() {
    return this.fb.group({
      size: ['', Validators.required],
      quantity: [0, Validators.required],
    });
  }

  addRow(itemIndex: number) {
    const item = this.items.at(itemIndex) as FormGroup;
    const rows = item.get('rows') as FormArray;

    rows.push(this.createRow());

    // 👇 VERY IMPORTANT
    this.watchRows(item);
  }
  watchRows(item: FormGroup) {
    const rows = item.get('rows') as FormArray;

    rows.controls.forEach((row) => {
      if (!(row as any)._subscribed) {
        row.valueChanges.subscribe(() => this.recalculateItem(item));
        (row as any)._subscribed = true;
      }
    });
  }

  recalculateItem(item: FormGroup) {
    const type = (item.get('type')?.value || '').toLowerCase();
    const rate = Number(item.get('rate')?.value) || 0;
    const totalWeight = Number(item.get('totalWeight')?.value) || 0;

    const rows = item.get('rows') as FormArray;

    let amount = 0;

    if (type === 'accessories' || type === 'screw') {
      const totalQty = rows.controls.reduce((sum, r) => {
        return sum + (Number(r.get('quantity')?.value) || 0);
      }, 0);

      amount = totalQty * rate;
    } else {
      amount = totalWeight * rate;
    }

    item.get('amount')?.setValue(amount, { emitEvent: false });

    this.calculateTotal();
  }

  updateItemValidators(item: FormGroup) {
    const type = (item.get('type')?.value || '').toLowerCase();
    const color = item.get('color');
    const totalWeight = item.get('totalWeight');
    const totalQuantity = item.get('totalQuantity');

    if (type === 'screw') {
      color?.clearValidators();
    } else {
      color?.setValidators(Validators.required);
    }

    if (type === 'accessories' || type === 'screw') {
      totalWeight?.clearValidators();
      totalQuantity?.setValidators(Validators.required);
    } else {
      totalWeight?.setValidators(Validators.required);
      totalQuantity?.clearValidators();
    }

    color?.updateValueAndValidity({ emitEvent: false });
    totalWeight?.updateValueAndValidity({ emitEvent: false });
    totalQuantity?.updateValueAndValidity({ emitEvent: false });
  }

  removeRow(itemIndex: number, rowIndex: number) {
    this.rows(itemIndex).removeAt(rowIndex);
    this.calculateTotal();
  }

  // ---------- CALCULATIONS ----------
  calculateItemTotal(itemIndex: number) {
    const item = this.items.at(itemIndex);
    if (!item) return;

    const type = (item.get('type')?.value || '').toLowerCase().trim();
    const rate = Number(item.get('rate')?.value) || 0;

    const totalWeight = Number(item.get('totalWeight')?.value) || 0;
    const totalQuantity = Number(item.get('totalQuantity')?.value) || 0;

    let amount = 0;

    if (type === 'accessories' || type === 'screw') {
      amount = totalQuantity * rate;
    } else {
      amount = totalWeight * rate;
    }

    item.get('amount')?.setValue(amount, { emitEvent: false });

    this.calculateTotal();
  }

  calculateTotal() {
    let itemsTotal = 0;

    this.items.controls.forEach((item) => {
      itemsTotal += +item.getRawValue().amount || 0;
    });

    const transport = +this.billForm.getRawValue().transport || 0;
    const other = +this.billForm.getRawValue().otherExpense || 0;
    const paid = +this.billForm.getRawValue().received || 0;

    const total = itemsTotal + transport + other;
    const remaining = total - paid;

    this.billForm
      .get('total')
      ?.setValue(Math.round(total * 100) / 100, { emitEvent: false });
    this.billForm
      .get('remaining')
      ?.setValue(Math.round(remaining * 100) / 100, { emitEvent: false });
  }

  saveBill() {
    if (this.isSaving) return;

    if (this.billForm.invalid) {
      this.billForm.markAllAsTouched();
      this.saveStatus = 'error';
      this.saveMessage = 'Please fill all required fields.';
      setTimeout(() => {
        this.saveStatus = 'idle';
        this.saveMessage = '';
      }, 2200);
      return;
    }

    const payload = {
      ...this.billForm.getRawValue(),
      date: this.formatDateForPayload(this.billForm.getRawValue().date),
    };
    this.isSaving = true;
    this.saveStatus = 'saving';
    this.saveMessage = 'Saving bill...';

    this.billService
      .saveBill(payload)
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.saveStatus = 'success';
          this.saveMessage = 'Bill saved successfully!';
          this.resetBillForm();
          setTimeout(() => {
            this.saveStatus = 'idle';
            this.saveMessage = '';
          }, 1400);
        },
        error: () => {
          this.saveStatus = 'error';
          this.saveMessage = 'Failed to save bill';
          setTimeout(() => {
            this.saveStatus = 'idle';
            this.saveMessage = '';
          }, 2200);
        },
      });
  }

  private formatDateForPayload(value: Date | string | null) {
    if (!value) return value;
    if (typeof value === 'string') return value;

    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private resetBillForm() {
    this.items.clear();
    this.addItemSection();

    const resetValue = {
      date: '',
      vehicleNumber: '',
      buyerName: '',
      billType: '',
      items: [
        {
          type: 'Sheet',
          color: '',
          rate: 0,
          totalWeight: 0,
          totalQuantity: 0,
          amount: 0,
          rows: [{ size: '', quantity: 0 }],
        },
      ],
      transport: 0,
      otherExpense: 0,
      received: 0,
      total: 0,
      remaining: 0,
    };

    this.formDirective?.resetForm(resetValue);
    this.billForm.markAsPristine();
    this.billForm.markAsUntouched();
  }
}
