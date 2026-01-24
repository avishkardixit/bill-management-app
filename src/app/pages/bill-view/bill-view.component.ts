import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BillService } from '../../services/bill.service';
import { NgIf,NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bill-view',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, MatButtonModule],
  templateUrl: './bill-view.component.html',
  styleUrl: './bill-view.component.scss'
})
export class BillViewComponent implements OnInit {
  bill: any;

  constructor(
    private route: ActivatedRoute,
    private billService: BillService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.billService.getBillById(id).subscribe(res => {
      this.bill = res;
    });
  }

  printBill() {
    window.print();
  }
}
