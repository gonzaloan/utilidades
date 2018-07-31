import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TagsGeneratorService {
  private urlEndpoint: string = 'http://localhost:8080/api/files/read';
  private progress$: Observable<number>;
  private progress: number = 0;

  private progressObserver: any;

  constructor(private http: HttpClient) {
    this.progress$ = new Observable(observer => {
      this.progressObserver = observer
    });
  }

  public getObserver(): Observable<number> {
    return this.progress$;
  }


  /*
    pushFileToStorage(file: File) {
      let formdata: FormData = new FormData();
  
      formdata.append('file', file);
      const req = new HttpRequest('POST', this.urlEndpoint, formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.post(this.urlEndpoint, formdata).subscribe(resp => {
        console.log(resp);
      });
    }
    */

  pushFileToStorage(file: File) {

    return new Promise((resolve, reject) => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();
      formData.append('file', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.urlEndpoint, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send(formData);
    });
  }
}
