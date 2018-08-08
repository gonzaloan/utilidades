import { Injectable, Inject } from '@angular/core';

import 'rxjs/Rx';
import { Http, Headers } from "@angular/http";
import { AppSettings } from '../../app.settings';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Requerimiento } from '../modelos/requerimiento';

@Injectable()
export class TagsGeneratorService {
  private urlEndpoint: string = AppSettings.API_ENDPOINT + 'files/read';

  public requerimiento: Requerimiento = {
    descripcionRequerimiento: null,
    empresaResponsable: null,
    fechaInicio: null,
    nroRequerimiento: null,
    responsable: null,
    usuarioCliente: null
  }

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: Http) { }

  pushFileToStorage(file: File) {
    let body: FormData = new FormData();
    body.append('file', file);
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(this.urlEndpoint, body, { headers })
      .map(respuesta => {
        console.log(respuesta.json());
        return respuesta.json();
      });
  }

  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);   
   }

   
  getFromLocal(key): Requerimiento {
    
    this.requerimiento= this.storage.get(key) == null ? this.requerimiento: this.storage.get(key);
    console.log(this.requerimiento);
    return this.requerimiento;
 }
}
