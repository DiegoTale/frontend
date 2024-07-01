import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserPageComponent } from './pages/users/list-user-page/list-user-page.component';
import { ListClientPageComponent } from './pages/clients/list-client-page/list-client-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UsuariosAgregarEditarComponent } from './components/usuarios-agregar-editar/usuarios-agregar-editar.component';
import { ClientsAgregarEditarComponent } from './components/clientes-agregar-editar/clientes-agregar-editar.component';
import { ListAccountPageComponent } from './pages/accounts/list-account-page/list-account-page.component';
import { AccountsAgregarEditarComponent } from './components/accounts-agregar-editar/accounts-agregar-editar.component';
import { ListProductCardPageComponent } from './pages/products-cards/list-product-card-page/list-product-card.page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'list-user', component: ListUserPageComponent },
      { path: 'new-user', component: UsuariosAgregarEditarComponent },
      { path: 'edit-user', component: UsuariosAgregarEditarComponent },
      { path: 'list-client', component: ListClientPageComponent },
      { path: 'new-client', component: ClientsAgregarEditarComponent },
      { path: 'edit-client', component: ClientsAgregarEditarComponent },
      { path: 'list-account', component: ListAccountPageComponent },
      { path: 'account-new', component: AccountsAgregarEditarComponent },
      { path: 'edit-account', component: AccountsAgregarEditarComponent },
      { path: 'list-product-card', component: ListProductCardPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
