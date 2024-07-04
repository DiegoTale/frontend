import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { AccountInterface } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-accounts-agregar-editar',
  templateUrl: './accounts-agregar-editar.component.html',
  styleUrls: ['./accounts-agregar-editar.component.css'],
})
export class AccountsAgregarEditarComponent implements OnInit {
  active: boolean[] = [true, false];

  public myDatUpdate: AccountInterface = {} as AccountInterface;
  public typeAction: String = '';
  // public clientId : number;
  // public client;

  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  //dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<AccountsAgregarEditarComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _accountService: AccountService,
    private _clientService: ClientService
  ) {}

  private fb = inject(FormBuilder);
  public myFormAccount: FormGroup = this.fb.group({
    client_id: ['', [Validators.required]],
    number: ['', Validators.required],
    //ammount_initial: ['', Validators.required],
    // status: ['', Validators.required],
    active: ['', Validators.required],
  });

  ngOnInit(): void {
    if ((this.id! = 0)) {
      this.operacion = 'Editar ';
    }
    // console.log(this.data);

    this.getClients();

    this.myDatUpdate = this.data;
    this.typeAction = this.data.type;
    // console.log(this.typeAction); //edit-client

    //solo cuando el usuario hace click en editar
    if (this.typeAction == 'edit-account') {
      this.editData();
    }
  }

  // metodo para capturar el objeto dentro de la data
  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    // console.log(values); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return values;
  }

  listClients: any;
  getClients() {
    this._clientService.getClients().subscribe((data) => {
      this.listClients = data;
      console.log(this.listClients);
    });
  }

  editData() {
    if (this.id !== undefined) {
      this.operacion = 'Editar ';
    }

    // this.form
    this.myFormAccount
      .get('client_id')
      ?.setValue(this.myDatUpdate?.client_id ?? '');
    this.myFormAccount.get('number')?.setValue(this.myDatUpdate?.number ?? '');
    //this.myFormAccount
    //  .get('ammount_initial')
    //  ?.setValue(this.myDatUpdate?.ammount_initial ?? '');
    this.myFormAccount
      .get('active')
      ?.setValue(this.myDatUpdate?.active == '1' ? true : false);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onClickAceppt() {
    if (this.typeAction == 'edit-account') {
      this.editAccount();
    }
    if (this.typeAction == 'account-new') {
      this.addAccount();
    }
  }

  addAccount() {
    console.log('add account');

    const account = {
      client_id: this.myFormAccount.controls['client_id'].value,
      number: this.myFormAccount.controls['number'].value,
      //ammount_initial: this.myFormAccount.controls['ammount_initial'].value,
      active: this.myFormAccount.controls['active'].value == true ? '1' : '0',
    };
    console.log(account);

    this.loading = true;
    this._accountService.saveAccount(account).subscribe(() => {
      // this.loading = false;
      console.log('Account Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }

  editAccount() {
    console.log('edit account');

    const account = {
      client_id: this.myFormAccount.controls['client_id'].value,
      number: this.myFormAccount.controls['number'].value,
      //ammount_initial: this.myFormAccount.controls['ammount_initial'].value,
      active: this.myFormAccount.controls['active'].value == true ? '1' : '0',
    };

    console.log(account);

    this.loading = true;
    let id = this.myDatUpdate?.id?.toString() ?? '';
    if (id === undefined) {
      return;
    }

    this._accountService.updateAccount(id, account).subscribe((data) => {
      console.log(data);
      console.log('Cuenta Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
