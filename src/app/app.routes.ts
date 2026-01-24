import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SellOrdersComponent } from './pages/sell-orders/sell-orders.component';
import { PurchaseOrdersComponent } from './pages/purchase-orders/purchase-orders.component';
import { StockBookComponent } from './pages/stock-book/stock-book.component';
import { AccountBookComponent } from './pages/account-book/account-book.component';
import { LendingBookComponent } from './pages/lending-book/lending-book.component';
import { OtherExpensesComponent } from './pages/other-expenses/other-expenses.component';
import { authGuard } from './auth.guard';
import { CreateBillComponent } from './pages/create-bill/create-bill.component';
import { BillViewComponent } from './pages/bill-view/bill-view.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sell-orders', component: SellOrdersComponent },
      { path: 'purchase-orders', component: PurchaseOrdersComponent },
      { path: 'stock-book', component: StockBookComponent },
      { path: 'account-book', component: AccountBookComponent },
      { path: 'lending-book', component: LendingBookComponent },
      { path: 'other-expenses', component: OtherExpensesComponent },
      { path: 'billing', component: CreateBillComponent },
      { path: 'bill/:id', component: BillViewComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
