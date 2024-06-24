import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  public sidebarItems = [
    {
      label: 'Agregar usuario',
      icon: 'account_circle',
      url: './list-user',
    },
    {
      label: 'Crear Cuenta Bancaria',
      icon: 'account_balance',
      url: './list-account',
    },
    {
      label: 'Cliente',
      icon: 'person_add',
      url: './list-client',
    },
    {
      label: 'Transaccion',
      icon: 'payments',
      url: './list-transaction',
    },
  ];
}
