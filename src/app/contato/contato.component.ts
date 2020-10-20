import { Component, OnInit } from '@angular/core';
import { Contato } from './Contato';
import { ContatoService } from '../contato.service';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  listaDecontatos: Contato[] = [];
  colunas = ['foto','id','nome','email','favorito'];

  constructor(
    private service:ContatoService,
    private fb:FormBuilder,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
      this.configurarFormulario();
	  this.listarContatos();
  }

  favoritar(contato: Contato){
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
		let lista: Contato[] = [...this.listaDecontatos,resposta];
        this.listaDecontatos = lista;
    } )   
  }

  uploadFoto(event, contato){
	  const files = event.target.files;
	  if(files){
		  const foto = files[0];
		  const formData: FormData = new FormData();
		  formData.append("foto", foto);
		  this.service.upload(contato, formData).subscribe( resposta => {
			  this.listarContatos();
		  });
	  }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent,{
      width: '400px',
      height: '450px',
      data: contato
    })
  }

}
