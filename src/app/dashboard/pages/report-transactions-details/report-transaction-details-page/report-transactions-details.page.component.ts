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
import { TransactionInterface } from '../../../interfaces/transactions.interface ';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionAgregarEditarComponent } from '../../../components/transactions-agregar-editar/transactions-agregar-editar.component';
import { ReportTransactionDetails } from '../../../interfaces/report-transaction-details.interface';

@Component({
  selector: 'app-report-transaction-details-page',
  templateUrl: './report-transactions-details.page.component.html',
  styleUrls: ['./report-transactions-details.page.component.css'],
})
export class ReportTransactionDetailsPageComponent
  implements OnInit, AfterViewInit
{
  public transaction: TransactionInterface[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'account_send',
    'product_type',
    'product_cards_id_sender',
    'product_cards_id_reciver',
    'description',
    // 'deferred_frecuency',
    'amount',
    'active',
    'acciones',
  ];
  dataSource!: MatTableDataSource<TransactionInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Aca declaramos las variables para almacenar la lista y usar combobox
  listProductsCard: Array<ProductCardsInterface> = [];

  constructor(
    private _transactionsService: TransactionService,
    public dialog: MatDialog,
    private _listProductsCards: ProductCardsService // private _listAccounts: AccountService
  ) {
    this.dataSource = new MatTableDataSource(this.transaction);
  }

  ngOnInit(): void {
    this.getTransactions();
    this.getProductsCard();
    // this.getAccounts();
  }

  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    return values;
  }

  getProductsCard() {
    this._listProductsCards
      .getProductsCard()
      .subscribe((dataPrese: ProductCardsInterface[]) => {
        console.log(dataPrese);
        this.listProductsCard = dataPrese;
        console.log(this.listProductsCard);
      });
  }

  getTransactions() {
    this.loading = true;
    this._transactionsService.getTransactions().subscribe((data: any) => {
      this.transaction = data;
      console.log(data);
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.transaction);
    });
  }

  getNumberProduct(codigo: number) {
    let numberProductCard;

    //Opcion #1
    this.listProductsCard.forEach((data) => {
      if (data.id == codigo) {
        numberProductCard = data.number;
      }
    });

    return numberProductCard;
  }

  deleteTransaction(id: number) {
    this.loading = true;
    this._transactionsService.deleteTransaction(id).subscribe(() => {
      this.getProductsCard();
      Swal.fire(
        'Eliminado',
        'La transacción ha sido eliminado con exito',
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

  addTransaction() {
    let oData = { type: 'transaction-new' };
    const dialogRef = this.dialog.open(
      TransactionAgregarEditarComponent /** Pendiente a cambiar */,
      {
        width: '550px',
        disableClose: true,
        data: oData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getTransactions();
    });
  }

  editTransaction(oData: any) {
    oData['type'] = 'edit-transaction';
    const dialogRef = this.dialog.open(
      TransactionAgregarEditarComponent /** Pendiente a cambiar */,
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
        'La transacción ha sido modificado con exito' /** Pendiente a cambiar */,
        'success'
      );
    });
  }
}
