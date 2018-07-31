import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Http, Headers} from "@angular/http";

@Injectable()
export class TagsGeneratorService {
  private urlEndpoint: string = 'http://localhost:8080/api/files/read';

  constructor(private http:Http){ }
 
  pushFileToStorage(file: File){
    let body: FormData = new FormData();
    body.append('file', file);
    let headers = new Headers({
     'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(this.urlEndpoint, body, { headers })
    .map( respuesta => {
      console.log(respuesta.json());
      return respuesta.json();
    }); 
  }
}
