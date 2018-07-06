import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonasService {
  private urlEndpoint:string = 'http://localhost:8080/api/personas/';
  personas: any[] = [];
  constructor(private http: HttpClient) { }
  
  getPersonas() {
    
    console.log(this.http.get(this.urlEndpoint));
    return this.http.get(this.urlEndpoint).map((respuesta:any) => {
      this.personas = respuesta;
      console.log(this.personas);
      return this.personas;
    });
  }
}