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
  loading:boolean;
  error:boolean;

  constructor(public _persona: PersonasService, private alertService: AlertService) { 
    this.loading = true;
    this.error = false;
  }

  ngOnInit() {
    this._persona.getPersonas().subscribe( (data: any) => {
      this.personas = data;
      this.loading = false;
    }, (error)=>{
      this.error = true; 
      this.loading = false;
      console.log(error);
    });
  }

  copyToClipboard(run) {
    
    console.log("copiando: " + run);
    //run.select();

    //document.execCommand("copy");
    //run.setSelectionRange(0, 0);
    this.alertService.success('Se ha copiado el run en el portapapeles.');
  }

}
