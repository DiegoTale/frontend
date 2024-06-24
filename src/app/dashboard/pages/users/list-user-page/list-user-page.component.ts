import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserInterface } from '../../../interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuariosAgregarEditarComponent } from '../../../components/usuarios-agregar-editar/usuarios-agregar-editar.component';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.css'],
})
export class ListUserPageComponent implements OnInit, AfterViewInit {
  public users: UserInterface[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'email',
    'active',
    'acciones',
  ];
  dataSource!: MatTableDataSource<UserInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _usuarioService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    return values;
  }

  getUsuarios() {
    this.loading = true;
    this._usuarioService.getUsuarios().subscribe((data: any) => {
      this.users = data;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  deleteUsuario(id: number) {
    this.loading = true;
    this._usuarioService.deleteUsuario(id).subscribe(() => {
      this.getUsuarios();
      Swal.fire(
        'Eliminado',
        'El usuario ha sido eliminado con exito',
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

  addEditUsuario() {
    let oData = { type: 'user-new' };
    const dialogRef = this.dialog.open(UsuariosAgregarEditarComponent, {
      width: '550px',
      disableClose: true,
      data: oData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsuarios();
      // console.log('The dialog was closed');
    });
  }

  editUsuario(oData: any) {
    oData['type'] = 'edit-user';
    const dialogRef = this.dialog.open(UsuariosAgregarEditarComponent, {
      width: '550px',
      disableClose: true,
      data: oData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsuarios();
      console.log('The dialog was closed');
      Swal.fire(
        'Editado',
        'El usuario ha sido modificado con exito',
        'success'
      );
    });
  }
}
