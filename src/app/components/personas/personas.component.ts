import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: any[] = [];
  loading: boolean;
  error: boolean;

  constructor(public _persona: PersonasService, private alertService: AlertService) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit() {
    this._persona.getPersonas().subscribe((data: any) => {
      console.log(data);
      this.personas = data;
      this.loading = false;
    }, (error) => {
      this.error = true;
      this.loading = false;
      console.log(error);
    });
  }

  filterResults(tipoFiltro: string) {
    if (tipoFiltro == 'nac_cl') {
      this.personas = this.personas.filter(
          persona => persona.nacionalidad == 'C'
      );
    }
    if (tipoFiltro == 'nac_ext') {
      this.personas = this.personas.filter(
          persona => persona.nacionalidad == 'E'
      );
      
    }
    console.log(this.personas);
  }
  copyToClipboard(run) {

    console.log("copiando: " + run);
    //run.select();

    //document.execCommand("copy");
    //run.setSelectionRange(0, 0);
    this.alertService.success('Se ha copiado el run en el portapapeles.');
  }

}
