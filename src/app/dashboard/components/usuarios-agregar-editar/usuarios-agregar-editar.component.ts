import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserInterface } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios-agregar-editar',
  templateUrl: './usuarios-agregar-editar.component.html',
  styleUrls: ['./usuarios-agregar-editar.component.css'],
})
export class UsuariosAgregarEditarComponent implements OnInit {
  active: boolean[] = [true, false];

  public myDatUpdate: UserInterface = {} as UserInterface;
  public typeAction: String = '';

  loading: boolean = false;
  operacion: string = 'Agregar ';
  id: number | undefined;
  //dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<UsuariosAgregarEditarComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private _usuarioService: UserService
  ) {}

  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    active: ['', Validators.required],
  });

  ngOnInit(): void {
    if ((this.id! = 0)) {
      this.operacion = 'Editar ';
    }
    console.log(this.data);

    this.myDatUpdate = this.data;
    this.typeAction = this.data.type;
    console.log(this.typeAction); //edit-user

    // this.formGroup();
    //solo cuando el usuario hace click en editar
    if (this.typeAction == 'edit-user') {
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
    this.myForm.get('email')?.setValue(this.myDatUpdate?.email ?? '');
    this.myForm.get('password')?.setValue(this.myDatUpdate?.password ?? '');
    this.myForm
      .get('active')
      ?.setValue(this.myDatUpdate?.active == '1' ? true : false);
  }

  cancelar() {
    this.dialogRef.close();
  }

  onClickAceppt() {
    if (this.typeAction == 'edit-user') {
      this.editUsuario();
    }
    if (this.typeAction == 'user-new') {
      this.addUsuario();
    }
  }

  addUsuario() {
    console.log('add usuario');

    const usuario = {
      name: this.myForm.controls['name'].value,
      lastname: this.myForm.controls['lastname'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      active: this.myForm.controls['active'].value == true ? '1' : '0',
    };
    console.log(usuario);

    this.loading = true;
    this._usuarioService.saveUsuario(usuario).subscribe(() => {
      // this.loading = false;
      console.log('Usuario Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }

  editUsuario() {
    console.log('edit usuario');

    const usuario = {
      name: this.myForm.controls['name'].value,
      lastname: this.myForm.controls['lastname'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      active: this.myForm.controls['active'].value == true ? '1' : '2',
    };

    console.log(usuario);

    this.loading = true;
    let id = this.myDatUpdate?.id?.toString() ?? '';
    if (id === undefined) {
      return;
    }

    this._usuarioService.updateUsuario(id, usuario).subscribe((data) => {
      console.log(data);
      console.log('Usuario Agregado');
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
