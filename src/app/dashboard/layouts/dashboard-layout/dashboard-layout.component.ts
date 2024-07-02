import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  public sidebarItems = [
    {
      label: 'Usuarios',
      icon: 'account_circle',
      url: './list-user',
    },
    {
      label: 'Clientes',
      icon: 'person_add',
      url: './list-client',
    },
    {
      label: 'Cuentas Bancarias',
      icon: 'account_balance',
      url: './list-account',
    },
    {
      label: 'Productos',
      icon: 'category',
      url: './list-product-card',
    },
    {
      label: 'Transacciones',
      icon: 'payments',
      url: './list-transaction',
    },
    {
      label: 'Reportes',
      icon: 'partner_reports',
      url: './list-report',
    },
  ];
}
