import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule, TableModule, ListboxModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

  readonly CLIENTES_KEY: string = 'CLIENTES'
  form!: FormGroup;
  clientes!: Cliente[]
  selectedCliente: any
  sidebarVisible: boolean = false;
  id!: number

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.clientes = []
    const storedClientes = localStorage.getItem(this.CLIENTES_KEY) || '[]';
    this.clientes = JSON.parse(storedClientes)
    this.id = this.clientes.length + 1
    this.buildForm()

  }


  buildForm() {
    this.form = this.fb.group({
      id: [],
      nombre: ['', [Validators.required]],
      direccion: [''],
      telefono: []
    });
  }

  add() {
    console.log(this.form.value);
    // if (this.form.valid)
    this.form.get('id')?.setValue(this.id)
    this.clientes.push(this.form?.value)
    console.log(this.clientes)
    this.save()
    this.form.patchValue({
      nombre: null,
      direccion: null,
      telefono: null
    })

    this.id++
  }

  delete(row: any) {
    const index = this.clientes.findIndex(cliente => cliente.id == row.id)
    console.log('eliminando', index);
    this.clientes.splice(index, 1)
    this.save()
  }

  save() {
    localStorage.setItem(this.CLIENTES_KEY, JSON.stringify(this.clientes))
  }
}


interface Cliente {
  id: number
  nombre: string;
  direccion: string;
  telefono: number
}