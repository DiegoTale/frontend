import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';
import { ClientsAgregarEditarComponent } from '../../../components/clientes-agregar-editar/clientes-agregar-editar.component';

@Component({
  selector: 'app-list-client-page',
  templateUrl: './list-client-page.component.html',
  styleUrls: ['./list-client-page.component.css'],
})
export class ListClientPageComponent implements OnInit, AfterViewInit {
  public clients: ClientInterface[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'email',
    'phone',
    'active',
    'acciones',
  ];
  dataSource!: MatTableDataSource<ClientInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _clientService: ClientService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngOnInit(): void {
    this.getClients();
  }

  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    return values;
  }

  getClients() {
    this.loading = true;
    this._clientService.getClients().subscribe((data: any) => {
      this.clients = data;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.clients);
    });
  }

  deleteClient(id: number) {
    this.loading = true;
    this._clientService.deleteClient(id).subscribe(() => {
      this.getClients();
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

  addEditClient() {
    let oData = { type: 'client-new' };
    const dialogRef = this.dialog.open(ClientsAgregarEditarComponent, {
      width: '550px',
      disableClose: true,
      data: oData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClients();
    });
  }

  editClient(oData: any) {
    oData['type'] = 'edit-client';
    const dialogRef = this.dialog.open(ClientsAgregarEditarComponent, {
      width: '550px',
      disableClose: true,
      data: oData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClients();
      console.log('The dialog was closed');
      Swal.fire(
        'Editado',
        'El cliente ha sido modificado con exito',
        'success'
      );
    });
  }
}
