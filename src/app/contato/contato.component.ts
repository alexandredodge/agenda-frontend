import { Component, OnInit } from '@angular/core';
import { Contato } from './Contato';
import { ContatoService } from '../contato.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  listaDecontatos: Contato[] = [];

  constructor(
    private service:ContatoService,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
      this.formulario = this.fb.group({
        nome: ['', Validators.required],
        email:['',[Validators.email,Validators.required]]
      })
  }

  testeValidacao(){
    console.log(this.formulario.value);
    const fValido = this.formulario.valid;
    if(fValido){
      console.log("form valido.");
    }else{
      console.log("form inválido.");
    }
  }

  saveContato(){
    const valoresDoForm = this.formulario.value;
    const contato: Contato = new Contato(valoresDoForm.nome,valoresDoForm.email); 
    this.service.save(contato).subscribe( resposta =>{
        this.listaDecontatos.push(resposta);
        console.log(this.listaDecontatos);
    } )   
  }

}
