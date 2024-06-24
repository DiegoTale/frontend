import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ListClientPageComponent } from './pages/clients/list-client-page/list-client-page.component';
import { ListUserPageComponent } from './pages/users/list-user-page/list-user-page.component';
import { MaterialModule } from '../material/material.module';
import { NewAccountPageComponent } from './pages/accounts/new-account-page/new-account-page.component';
import { ListAccountPageComponent } from './pages/accounts/list-account-page/list-account-page.component';
import { UsuariosAgregarEditarComponent } from './components/usuarios-agregar-editar/usuarios-agregar-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsAgregarEditarComponent } from './components/clientes-agregar-editar/clientes-agregar-editar.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ListClientPageComponent,
    ListUserPageComponent,
    NewAccountPageComponent,
    ListAccountPageComponent,
    UsuariosAgregarEditarComponent,
    ClientsAgregarEditarComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
