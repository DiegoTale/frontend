import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ListClientPageComponent } from './pages/clients/list-client-page/list-client-page.component';
import { ListUserPageComponent } from './pages/users/list-user-page/list-user-page.component';
import { MaterialModule } from '../material/material.module';
import { ListAccountPageComponent } from './pages/accounts/list-account-page/list-account-page.component';
import { UsuariosAgregarEditarComponent } from './components/usuarios-agregar-editar/usuarios-agregar-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsAgregarEditarComponent } from './components/clientes-agregar-editar/clientes-agregar-editar.component';
import { AccountsAgregarEditarComponent } from './components/accounts-agregar-editar/accounts-agregar-editar.component';
import { ListProductCardPageComponent } from './pages/products-cards/list-product-card-page/list-product-card.page.component';
import { ProductsCardAgregarEditarComponent } from './components/products-card-agregar-editar/products-card-agregar-editar.component';
import { ListTransactionPageComponent } from './pages/transactions/list-transaction-page/list-transaction.page.component';
import { TransactionAgregarEditarComponent } from './components/transactions-agregar-editar/transactions-agregar-editar.component';
import { ListReportPageComponent } from './pages/reports/list-report-page/list-report.page.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ListClientPageComponent,
    ListUserPageComponent,
    ListAccountPageComponent,
    ListProductCardPageComponent,
    ListTransactionPageComponent,
    UsuariosAgregarEditarComponent,
    ClientsAgregarEditarComponent,
    AccountsAgregarEditarComponent,
    ProductsCardAgregarEditarComponent,
    TransactionAgregarEditarComponent,
    ListReportPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
