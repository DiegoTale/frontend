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
import { ReportsInterface } from '../../../interfaces/reports.interface ';
import { ReportService } from '../../../services/report.service';
import { ClientInterface } from '../../../interfaces/client.interface';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-list-report-page',
  templateUrl: './list-report-page.component.html',
  styleUrls: ['./list-report.page.component.css'],
})
export class ListReportPageComponent implements OnInit, AfterViewInit {
  public report: ReportsInterface[] = [];
  loading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'sender_account_id',
    'reciver_account_id',
    'sender_client_id',
    'reciver_client_id',
    'description',
    'amount',
    'active',
    'acciones',
  ];
  dataSource!: MatTableDataSource<ReportsInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Aca declaramos las variables para almacenar la lista y usar combobox
  listReports: Array<ReportsInterface> = [];
  listTransactions: Array<TransactionInterface> = [];
  listProductsCard: Array<ProductCardsInterface> = [];
  listAccounts: Array<AccountInterface> = [];
  listClients: Array<ClientInterface> = [];

  constructor(
    private _reportService: ReportService,
    public dialog: MatDialog,
    private _listProductsCards: ProductCardsService,
    private _listAccounts: AccountService,
    private _listTransactions: TransactionService,
    private _listClients: ClientService
  ) {
    this.dataSource = new MatTableDataSource(this.listReports);
  }

  ngOnInit(): void {
    this.getReports();
    this.getTransactions();
    this.getProductsCard();
    this.getAccounts();
    this.getClients();
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

  getClients() {
    this._listClients.getClients().subscribe((dataPrese: ClientInterface[]) => {
      console.log(dataPrese);
      this.listClients = dataPrese;
      console.log(this.listClients);

      console.log(this.listClients);
    });
  }

  getTransactions() {
    this._listTransactions
      .getTransactions()
      .subscribe((dataPrese: TransactionInterface[]) => {
        console.log(dataPrese);
        this.listTransactions = dataPrese;
        console.log(this.listTransactions);
      });
  }

  //////////////
  getReports() {
    this.loading = true;
    this._reportService.getReports().subscribe((data: any) => {
      this.report = data;
      console.log(data);
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.report);
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

  getTransactionName(codigo: number) {
    let transactionName;

    //Opcion #1
    this.listTransactions.forEach((data) => {
      if (data.id == codigo) {
        transactionName = data.id;
      }
    });

    return transactionName;
  }

  deleteReport(id: number) {
    this.loading = true;
    this._reportService.deleteReport(id).subscribe(() => {
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

  addReport() {
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

  editReport(oData: any) {
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
