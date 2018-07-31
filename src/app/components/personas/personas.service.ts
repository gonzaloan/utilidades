import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PersonasService {
  private urlEndpoint:string = 'http://164.96.96.40:8080/RestAPITest/api/personas/';
  personas: any[] = [];
  constructor(private http: HttpClient) { }
  
  getPersonas() {
    return this.http.get(this.urlEndpoint)
      .pipe( map( data => {
        //acá se hacen muchos procesos
        return data['content'];
      }));
  }

  getPersonasFilter(nacionalidad:string, estadoCivil:string) {
    if(nacionalidad == undefined){
      nacionalidad = '';
    }
    if(estadoCivil == undefined){
      estadoCivil = '';
    }
    let url = `${this.urlEndpoint}filter?nacionalidad=${nacionalidad}&estado_civil=${estadoCivil}`;
    console.log(url);
    
    return this.http.get(url)
      .pipe( map( data => {
        return data;
      }));
  }

  getPersonaRun(run:string){
    let url = `${this.urlEndpoint}buscar/${run}`;
    return this.http.get(url)
    .pipe( map( data => {
      return data;
    }));
  }
}