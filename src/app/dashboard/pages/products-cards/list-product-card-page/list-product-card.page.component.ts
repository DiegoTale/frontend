import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';
import { ClientsAgregarEditarComponent } from '../../../components/clientes-agregar-editar/clientes-agregar-editar.component';
import { AccountInterface } from '../../../interfaces/account.interface';
import { AccountService } from '../../../services/account.service';
import { AccountsAgregarEditarComponent } from '../../../components/accounts-agregar-editar/accounts-agregar-editar.component';
import { ProductCardsInterface } from '../../../interfaces/products-cards.interface';

@Component({
  selector: 'app-list-product-card-page',
  templateUrl: './list-product-card-page.component.html',
  styleUrls: ['./list-product-card.page.component.css'],
})
export class ListProductCardPageComponent implements OnInit, AfterViewInit {
  public accounts: ProductCardsInterface[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'account_id',
    'type',
    'number',
    'expire_month',
    'expire_year',
    'cvv',
    'amount',
    'active',
    'acciones',
  ];
  dataSource!: MatTableDataSource<ProductCardsInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Aca declaramos las variables para almacenar la lista y usar combobox
  listClients: Array<ClientInterface> = [];

  constructor(
    private _accountService: AccountService,
    public dialog: MatDialog,
    private _listClients: ClientService
  ) {
    this.dataSource = new MatTableDataSource(this.accounts);
  }

  ngOnInit(): void {
    this.getAccounts();
    this.getClients();
    // this.getClientsName(2);
    // console.log(this.getClientsName(2));
  }

  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    return values;
  }

  getClients() {
    this._listClients.getClients().subscribe((dataPrese: ClientInterface[]) => {
      console.log(dataPrese);
      this.listClients = dataPrese;
      console.log(this.listClients);

      console.log(this.listClients);
    });
  }

  getAccounts() {
    this.loading = true;
    this._accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data;
      console.log(data);
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.accounts);
    });
  }

  getClientsName(codigo: number) {
    let nameClient;

    //Opcion #1
    this.listClients.forEach((data) => {
      if (data.id == codigo) {
        nameClient = data.name;
      }
    });

    return nameClient;
  }

  deleteAccount(id: number) {
    this.loading = true;
    this._accountService.deleteAccount(id).subscribe(() => {
      this.getAccounts();
      Swal.fire(
        'Eliminado',
        'El cliente ha sido eliminado con exito',
        'question'
      );
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditAccount() {
    let oData = { type: 'account-new' };
    const dialogRef = this.dialog.open(
      AccountsAgregarEditarComponent /** Pendiente a cambiar */,
      {
        width: '550px',
        disableClose: true,
        data: oData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getAccounts();
    });
  }

  editAccount(oData: any) {
    oData['type'] = 'edit-account';
    const dialogRef = this.dialog.open(
      AccountsAgregarEditarComponent /** Pendiente a cambiar */,
      {
        width: '550px',
        disableClose: true,
        data: oData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getAccounts();
      console.log('The dialog was closed');
      Swal.fire(
        'Editado',
        'El cliente ha sido modificado con exito' /** Pendiente a cambiar */,
        'success'
      );
    });
  }
}
