import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductCardsService } from '../../services/product-cards.service';
import { TransactionInterface } from '../../interfaces/transactions.interface ';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-transactions-agregar-editar',
  templateUrl: './transactions-agregar-editar.component.html',
  styleUrls: ['./transactions-agregar-editar.component.css'],
})
export class TransactionAgregarEditarComponent implements OnInit {
  active: boolean[] = [true, false];
  // type: boolean[] = [debito, credito, remesa]

  public myDatUpdate: TransactionInterface = {} as TransactionInterface;
  public typeAction: String = '';

  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  //dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<TransactionAgregarEditarComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _transactionService: TransactionService,
    private _productCardService: ProductCardsService // private _accountService: AccountService // private _clientService: ClientService
  ) {}

  private fb = inject(FormBuilder);
  public myFormTransaction: FormGroup = this.fb.group({
    product_cards_id_sender: ['', [Validators.required]],
    product_cards_id_reciver: ['', Validators.required],
    description: ['', Validators.required],
    // deferred_frecuency: ['', Validators.required],
    amount: ['', Validators.required],
    active: ['', Validators.required],
  });

  ngOnInit(): void {
    if ((this.id! = 0)) {
      this.operacion = 'Editar ';
    }
    // console.log(this.data);

    this.getProductsCard();

    this.myDatUpdate = this.data;
    this.typeAction = this.data.type;
    // console.log(this.typeAction); //edit-client

    //solo cuando el usuario hace click en editar
    if (this.typeAction == 'edit-transaction') {
      this.editData();
    }
  }

  // metodo para capturar el objeto dentro de la data
  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    // console.log(values); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return values;
  }

  listProductsCards: any = this.data;
  getProductsCard() {
    this._productCardService.getProductsCard().subscribe((data) => {
      this.listProductsCards;
      console.log('data', data);
      console.log('this.listProductsCards', this.listProductsCards);
    });
  }

  editData() {
    if (this.id !== undefined) {
      this.operacion = 'Editar ';
    }

    // this.form
    this.myFormTransaction
      .get('product_cards_id_sender')
      ?.setValue(this.myDatUpdate?.product_cards_id_sender ?? '');
    this.myFormTransaction
      .get('product_cards_id_reciver')
      ?.setValue(this.myDatUpdate?.product_cards_id_reciver ?? '');
    this.myFormTransaction
      .get('description')
      ?.setValue(this.myDatUpdate?.description ?? '');
    // this.myFormTransaction
    //   .get('deferred_frecuency')
    //   ?.setValue(this.myDatUpdate?.deferred_frecuency ?? '');
    this.myFormTransaction
      .get('amount')
      ?.setValue(this.myDatUpdate?.amount ?? '');
    this.myFormTransaction
      .get('active')
      ?.setValue(this.myDatUpdate?.active == '1' ? true : false);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onClickAceppt() {
    console.log('On-Click', this.typeAction);

    if (this.typeAction == 'edit-transaction') {
      this.editTransaction();
      console.log(this.editTransaction());
    }
    if (this.typeAction == 'transaction-new') {
      // console.log('On-Click typeAction', this.typeAction);
      this.addTransaction();
      //console.log(this.addProductCard());
    }
  }

  addTransaction() {
    console.log('add product-card');

    const transaction = {
      product_cards_id_sender:
        this.myFormTransaction.controls['product_cards_id_sender'].value,
      product_cards_id_reciver:
        this.myFormTransaction.controls['product_cards_id_reciver'].value,
      description: this.myFormTransaction.controls['description'].value,
      // deferred_frecuency: this.myFormTransaction.controls['deferred_frecuency'].value,
      expire_year: this.myFormTransaction.controls['expire_year'].value,
      amount: this.myFormTransaction.controls['amount'].value,
      active:
        this.myFormTransaction.controls['active'].value == true ? '1' : '0',
    };
    console.log(transaction);

    this.loading = true;
    this._productCardService.saveProductCard(transaction).subscribe(() => {
      // this.loading = false;
      console.log('Transaction Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }

  editTransaction() {
    console.log('edit transaction');

    const transaction = {
      product_cards_id_sender:
        this.myFormTransaction.controls['product_cards_id_sender'].value,
      product_cards_id_reciver:
        this.myFormTransaction.controls['product_cards_id_reciver'].value,
      description: this.myFormTransaction.controls['description'].value,
      // deferred_frecuency: this.myFormTransaction.controls['deferred_frecuency'].value,
      expire_year: this.myFormTransaction.controls['expire_year'].value,
      amount: this.myFormTransaction.controls['amount'].value,
      active:
        this.myFormTransaction.controls['active'].value == true ? '1' : '0',
    };

    console.log(transaction);

    this.loading = true;
    let id = this.myDatUpdate?.id?.toString() ?? '';
    if (id === undefined) {
      return;
    }

    this._transactionService
      .updateTransaction(id, transaction)
      .subscribe((data) => {
        console.log(data);
        console.log('Transaction Agregado');
        this.loading = false;
        this.dialogRef.close();
      });
  }
}
