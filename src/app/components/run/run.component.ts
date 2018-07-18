import { Component } from '@angular/core';
import { PersonasService } from '../personas/personas.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent{
  loading = false;
  errores: string = '';
  dv: any = 'DV';
  isOkRun: boolean = false;
  persona: any[] = null;
  constructor(public _persona: PersonasService) { }

  validaRut(run: string) {
    if (run.length < 7) {
      this.errores = 'Rut incompleto o no válido.';
      this.isOkRun = false;
      this.dv = 'DV';
    } else {
      this.errores = '';
      let secuencia = [2, 3, 4, 5, 6, 7, 2, 3];
      let sum = 0;
      for (var i = run.length - 1; i >= 0; i--) {
        let d: any = run.charAt(i);
        sum += d * secuencia[run.length - (i + 1)];
      }
      let resto = 11 - (sum % 11);
      this.dv = resto === 11 ? 0 : resto === 10 ? 'K' : resto;
      this.isOkRun = true;
      if (isNaN(this.dv)) {
        this.errores = 'Rut incompleto o no válido.';
        this.isOkRun = false;
        this.dv = 'DV';
      }
    }

    if (run.length == 0) {
      this.errores = '';
      this.isOkRun = false;
      this.dv = 'DV';
    }
  }

  mostrarDatosRun(run:string) {
   
    if (this.isOkRun) {
      {
        this.loading = true;
        this.errores = '';
        this._persona.getPersonaRun(run).subscribe((data: any) => {
          console.log(data);
          this.persona = data;
          this.loading = false;
        }, (error) => {
          this.errores = 'Rut no tiene datos.';
          this.persona = null;
          this.loading = false;
          console.log(error);
        });
      }
    }
  }
}