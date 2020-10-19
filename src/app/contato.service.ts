import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from './contato/Contato';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiBaseUrl;
  ur:string;
  constructor(
    private http: HttpClient) { }

  save(contato: Contato):Observable<Contato>{
    return this.http.post<Contato>(this.url,contato);
  }

  list():Observable<Contato[]>{
	return this.http.get<any>(this.url);
  }

  favorite(contato:Contato):Observable<any>{
	//console.log(`${this.url}/${contato.id}/${contato.favorito}`);
	return this.http.patch(`${this.url}/${contato.id}/favorito`,null);
  }
    
}
