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
  colunas = ['id','nome','email','favorito'];

  constructor(
    private service:ContatoService,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
      this.configurarFormulario();
	  this.listarContatos();
  }

  favoritar(contato: Contato){debugger
	this.service.favorite(contato).subscribe( respostaRet =>{
		contato.favorito = !contato.favorito;
	})  
  }

  configurarFormulario(){
	this.formulario = this.fb.group({
        nome: ['', Validators.required],
        email:['',[Validators.email,Validators.required]]
	  })
  }

  listarContatos(){
	  this.service.list().subscribe( retornoRet =>{
		  this.listaDecontatos = retornoRet;
	  } )
  }

  testeValidacao(){//SOMENTE TESTE
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
