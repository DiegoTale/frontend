import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-clientes-agregar-editar',
  templateUrl: './clientes-agregar-editar.component.html',
  styleUrls: ['./clientes-agregar-editar.component.css'],
})
export class ClientsAgregarEditarComponent implements OnInit {
  active: boolean[] = [true, false];

  public myDatUpdate: ClientInterface = {} as ClientInterface;
  public typeAction: String = '';

  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  //dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<ClientsAgregarEditarComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private _clientService: ClientService
  ) {}

  private fb = inject(FormBuilder);
  public myFormClient: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    active: ['', Validators.required],
  });

  ngOnInit(): void {
    if ((this.id! = 0)) {
      this.operacion = 'Editar ';
    }
    console.log(this.data);

    this.myDatUpdate = this.data;
    this.typeAction = this.data.type;
    console.log(this.typeAction); //edit-client

    //solo cuando el usuario hace click en editar
    if (this.typeAction == 'edit-client') {
      this.editData();
    }
  }

  // metodo para capturar el objeto dentro de la data
  objectKeys(objeto: any) {
    const values = Object.values(objeto);
    console.log(values); // echa un vistazo por consola para que veas lo que hace "Object.keys"
    return values;
  }

  editData() {
    if (this.id !== undefined) {
      this.operacion = 'Editar ';
    }

    // this.form
    this.myFormClient.get('name')?.setValue(this.myDatUpdate?.name ?? '');
    this.myFormClient
      .get('lastname')
      ?.setValue(this.myDatUpdate?.lastname ?? '');
    this.myFormClient.get('email')?.setValue(this.myDatUpdate?.email ?? '');
    this.myFormClient.get('phone')?.setValue(this.myDatUpdate?.phone ?? '');
    this.myFormClient
      .get('active')
      ?.setValue(this.myDatUpdate?.active == '1' ? true : false);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onClickAceppt() {
    if (this.typeAction == 'edit-client') {
      this.editClient();
    }
    if (this.typeAction == 'client-new') {
      this.addClient();
    }
  }

  addClient() {
    console.log('add client');

    const client = {
      name: this.myFormClient.controls['name'].value,
      lastname: this.myFormClient.controls['lastname'].value,
      email: this.myFormClient.controls['email'].value,
      phone: this.myFormClient.controls['phone'].value,
      active: this.myFormClient.controls['active'].value == true ? '1' : '0',
    };
    console.log(client);

    this.loading = true;
    this._clientService.saveClient(client).subscribe(() => {
      // this.loading = false;
      console.log('Cliente Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }

  editClient() {
    console.log('edit client');

    const client = {
      name: this.myFormClient.controls['name'].value,
      lastname: this.myFormClient.controls['lastname'].value,
      email: this.myFormClient.controls['email'].value,
      phone: this.myFormClient.controls['phone'].value,
      active: this.myFormClient.controls['active'].value == true ? '1' : '2',
    };

    console.log(client);

    this.loading = true;
    let id = this.myDatUpdate?.id?.toString() ?? '';
    if (id === undefined) {
      return;
    }

    this._clientService.updateClient(id, client).subscribe((data) => {
      console.log(data);
      console.log('Cliente Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
