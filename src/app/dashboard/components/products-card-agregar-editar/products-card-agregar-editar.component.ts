import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { AccountInterface } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
import { ProductCardsInterface } from '../../interfaces/products-cards.interface';
import { ProductCardsService } from '../../services/product-cards.service';
@Component({
  selector: 'app-products-card-agregar-editar',
  templateUrl: './products-card-agregar-editar.component.html',
  styleUrls: ['./products-card-agregar-editar.component.css'],
})
export class ProductsCardAgregarEditarComponent implements OnInit {
  active: boolean[] = [true, false];
  // type: boolean[] = [debito, credito, remesa]

  public myDatUpdate: ProductCardsInterface = {} as ProductCardsInterface;
  public typeAction: String = '';

  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  //dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<ProductsCardAgregarEditarComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _productCardService: ProductCardsService,
    private _accountService: AccountService // private _clientService: ClientService
  ) {}

  private fb = inject(FormBuilder);
  public myFormProductCard: FormGroup = this.fb.group({
    account_id: ['', [Validators.required]],
    type: ['', Validators.required],
    number: ['', Validators.required],
    expire_month: ['', Validators.required],
    expire_year: ['', Validators.required],
    cvv: ['', Validators.required],
    limit: ['', Validators.required],
    amount: ['', Validators.required],
    active: ['', Validators.required],
  });

  ngOnInit(): void {
    if ((this.id! = 0)) {
      this.operacion = 'Editar ';
    }
    // console.log(this.data);

    this.getAccounts();

    this.myDatUpdate = this.data;
    this.typeAction = this.data.type;
    // console.log(this.typeAction); //edit-client

    //solo cuando el usuario hace click en editar
    if (this.typeAction == 'edit-product-card') {
      this.editData();
    }
  }

  // metodo para capturar el objeto dentro de la data
  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    // console.log(values); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return values;
  }

  listAccounts: any;
  getAccounts() {
    this._accountService.getAccounts().subscribe((data) => {
      this.listAccounts = data;
      console.log(this.listAccounts);
    });
  }

  editData() {
    if (this.id !== undefined) {
      this.operacion = 'Editar ';
    }

    // this.form
    this.myFormProductCard
      .get('account_id')
      ?.setValue(this.myDatUpdate?.account_id ?? '');
    this.myFormProductCard.get('type')?.setValue(this.myDatUpdate?.type ?? '');
    this.myFormProductCard
      .get('number')
      ?.setValue(this.myDatUpdate?.number ?? '');
    this.myFormProductCard
      .get('expire_month')
      ?.setValue(this.myDatUpdate?.expire_month ?? '');
    this.myFormProductCard
      .get('expire_year')
      ?.setValue(this.myDatUpdate?.expire_year ?? '');
    this.myFormProductCard.get('cvv')?.setValue(this.myDatUpdate?.cvv ?? '');
    this.myFormProductCard
      .get('amount')
      ?.setValue(this.myDatUpdate?.amount ?? '');
      this.myFormProductCard
      .get('limit')
      ?.setValue(this.myDatUpdate?.limit ?? '');
    this.myFormProductCard
      .get('active')
      ?.setValue(this.myDatUpdate?.active == '1' ? true : false);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onClickAceppt() {
    console.log('On-Click', this.typeAction);

    if (this.typeAction == 'edit-product-card') {
      this.editProductCard();
      console.log(this.editProductCard());
    }
    if (this.typeAction == 'product-card-new') {
      console.log('On-Click typeAction', this.typeAction);
      this.addProductCard();
      //console.log(this.addProductCard());
    }
  }

  addProductCard() {
    console.log('add product-card');

    const productsCard = {
      account_id: this.myFormProductCard.controls['account_id'].value,
      type: this.myFormProductCard.controls['type'].value,
      number: this.myFormProductCard.controls['number'].value,
      expire_month: this.myFormProductCard.controls['expire_month'].value,
      expire_year: this.myFormProductCard.controls['expire_year'].value,
      cvv: this.myFormProductCard.controls['cvv'].value,
      amount: this.myFormProductCard.controls['amount'].value,
      limit: this.myFormProductCard.controls['limit'].value,
      active:
        this.myFormProductCard.controls['active'].value == true ? '1' : '0',
    };
    console.log(productsCard);

    this.loading = true;
    this._productCardService.saveProductCard(productsCard).subscribe(() => {
      // this.loading = false;
      console.log('Product-Card Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }

  editProductCard() {
    console.log('edit product-card');

    const productsCard = {
      account_id: this.myFormProductCard.controls['account_id'].value,
      type: this.myFormProductCard.controls['type'].value,
      number: this.myFormProductCard.controls['number'].value,
      expire_month: this.myFormProductCard.controls['expire_month'].value,
      expire_year: this.myFormProductCard.controls['expire_year'].value,
      cvv: this.myFormProductCard.controls['cvv'].value,
      amount: this.myFormProductCard.controls['amount'].value,
      limit: this.myFormProductCard.controls['limit'].value,
      active:
        this.myFormProductCard.controls['active'].value == true ? '1' : '0',
    };

    console.log(productsCard);

    this.loading = true;
    let id = this.myDatUpdate?.id?.toString() ?? '';
    if (id === undefined) {
      return;
    }

    this._productCardService
      .updateProductCard(id, productsCard)
      .subscribe((data) => {
        console.log(data);
        console.log('Product-Card Agregado');
        this.loading = false;
        this.dialogRef.close();
      });
  }
}
