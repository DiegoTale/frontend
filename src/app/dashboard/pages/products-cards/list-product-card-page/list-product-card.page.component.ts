import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AccountInterface } from '../../../interfaces/account.interface';
import { AccountService } from '../../../services/account.service';
import { ProductCardsInterface } from '../../../interfaces/products-cards.interface';
import { ProductCardsService } from '../../../services/product-cards.service';
import { ProductsCardAgregarEditarComponent } from '../../../components/products-card-agregar-editar/products-card-agregar-editar.component';

@Component({
  selector: 'app-list-product-card-page',
  templateUrl: './list-product-card-page.component.html',
  styleUrls: ['./list-product-card.page.component.css'],
})
export class ListProductCardPageComponent implements OnInit, AfterViewInit {
  public productsCard: ProductCardsInterface[] = [];
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
  listAccounts: Array<AccountInterface> = [];

  constructor(
    private _productsCardsService: ProductCardsService,
    public dialog: MatDialog,
    private _listAccounts: AccountService
  ) {
    this.dataSource = new MatTableDataSource(this.productsCard);
  }

  ngOnInit(): void {
    this.getProductsCard();
    this.getAccounts();
  }

  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    return values;
  }

  getAccounts() {
    this._listAccounts
      .getAccounts()
      .subscribe((dataPrese: AccountInterface[]) => {
        console.log(dataPrese);
        this.listAccounts = dataPrese;
        console.log(this.listAccounts);

        console.log(this.listAccounts);
      });
  }

  getProductsCard() {
    this.loading = true;
    this._productsCardsService.getProductsCard().subscribe((data: any) => {
      this.productsCard = data;
      console.log(data);
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.productsCard);
    });
  }

  getNumberAccount(codigo: number) {
    let numberAccount;

    //Opcion #1
    this.listAccounts.forEach((data) => {
      if (data.id == codigo) {
        numberAccount = data.number;
      }
    });

    return numberAccount;
  }

  deleteProductCard(id: number) {
    this.loading = true;
    this._productsCardsService.deleteProductCard(id).subscribe(() => {
      this.getProductsCard();
      Swal.fire(
        'Eliminado',
        'El producto ha sido eliminado con exito',
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

  addEditProductCard() {
    let oData = { type: 'product-card-new' };
    const dialogRef = this.dialog.open(
      ProductsCardAgregarEditarComponent /** Pendiente a cambiar */,
      {
        width: '550px',
        disableClose: true,
        data: oData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getProductsCard();
    });
  }

  editProductCard(oData: any) {
    oData['type'] = 'edit-product-card';
    const dialogRef = this.dialog.open(
      ProductsCardAgregarEditarComponent /** Pendiente a cambiar */,
      {
        width: '550px',
        disableClose: true,
        data: oData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getProductsCard();
      console.log('The dialog was closed');
      Swal.fire(
        'Editado',
        'El producto ha sido modificado con exito' /** Pendiente a cambiar */,
        'success'
      );
    });
  }
}
