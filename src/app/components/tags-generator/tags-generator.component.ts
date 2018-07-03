import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../_animations/router.animations';

@Component({
  selector: 'app-tags-generator',
  templateUrl: './tags-generator.component.html',
  styleUrls: ['./tags-generator.component.css']
})
export class TagsGeneratorComponent implements OnInit {

  tagRequerimiento: string;
  textoFinal: string;

  constructor() { }

  ngOnInit() {

  }

  copyToClipboard(textoFinal){
    textoFinal.select();
    document.execCommand("copy");
    textoFinal.setSelectionRange(0,0);
  }
  fillWithChar(largo: number, charAdded: string, textoEntrada?: string) {
    if (!textoEntrada) { textoEntrada = ''; }
    for (let i = textoEntrada.length; i < largo; i++) {
      textoEntrada = textoEntrada.concat(charAdded);
    }
    textoEntrada = textoEntrada.concat("*");
    return textoEntrada;
  }
  setDescriptionInLines(largo: number, textoDescripcion: string) {
    const LINEA_DESCRIPCION = " DESCRIPCION MANTENCION : ";

    textoDescripcion = LINEA_DESCRIPCION + textoDescripcion;
    let textoFinalFormateado: string = '';

    if ((LINEA_DESCRIPCION + textoDescripcion).length > largo) {

      //buscamos un espacio en el sustring
      let seguirCortandoTexto = true;
      let posicion_inicial = 0;
      let posicion_final: number = 93;
      let linea_actual = '';
      while (seguirCortandoTexto) {

        if (posicion_final == textoDescripcion.length) {
          seguirCortandoTexto = false;
        }
        //Buscar ultimo espacio vacio.
        while (textoDescripcion.charAt(posicion_final) != ' ') {
          if (!seguirCortandoTexto) break;
          posicion_final--;
        }
        linea_actual = textoDescripcion.slice(posicion_inicial, posicion_final);
        linea_actual = linea_actual.replace('\t', ' ');
        linea_actual = linea_actual.replace('\n', ' ');
        linea_actual = this.fillWithChar(92, " ", linea_actual) + "\n*";
        textoFinalFormateado = textoFinalFormateado + linea_actual;
        posicion_inicial = posicion_final;
        if (textoDescripcion.length > (posicion_final + largo)) {
          posicion_final = posicion_final + largo;
        } else {
          posicion_final = textoDescripcion.length;
        }
      }
    } else {
      let linea_actual = textoDescripcion.slice(0, 93);
      linea_actual = linea_actual.replace('\t', ' ');
      linea_actual = linea_actual.replace('\n', ' ');
      linea_actual = this.fillWithChar(92, " ", linea_actual) + "\n*";
      textoFinalFormateado = textoFinalFormateado + linea_actual;
    }
    return textoFinalFormateado;
  }
  validaTag(usuarioCliente, requerimientoInput, empresaResponsable, responsable, descripcion, fechaInicio) {

    const OPENTAG = "/*";
    const CLOSETAG = "/";
    const CHAR_ASTERISCO = "*";
    const SALTO_LINEA = "\n*";
    const LINEA_REG_MANTENCION = " REGISTRO DE MANTENCION.";
    const LINEA_RESPONSABLE = " RESPONSABLE REGISTRO   : " + this.capitalizeName(usuarioCliente.value) + " / REQ: " + requerimientoInput.value.toUpperCase() + " / FECHA: " + fechaInicio.value.toLocaleString();
    const LINEA_RESPONSABLE_NOS = " RESPONSABLE " + empresaResponsable.value.toUpperCase() + "    : " + responsable.value.toUpperCase();
    this.textoFinal =
      OPENTAG + SALTO_LINEA +
      this.fillWithChar(92, CHAR_ASTERISCO) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_REG_MANTENCION) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_RESPONSABLE) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_RESPONSABLE_NOS) + SALTO_LINEA +
      this.setDescriptionInLines(92, descripcion.value) +
      this.fillWithChar(92, CHAR_ASTERISCO) + SALTO_LINEA + CLOSETAG;
  }


  capitalizeName(name) {
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  }

}
