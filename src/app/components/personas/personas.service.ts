import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PersonasService {
  private urlEndpoint:string = 'http://localhost:8080/api/personas/';
  personas: any[] = [];
  constructor(private http: HttpClient) { }
  
  getPersonas() {
    return this.http.get(this.urlEndpoint)
      .pipe( map( data => {
        //acá se hacen muchos procesos
        return data['content'];
      }));
  }
}