import { Component } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { NgForm } from '@angular/forms';
import { Requerimiento } from '../modelos/requerimiento';
import { TagsGeneratorService } from './tags-generator.service';


@Component({
  selector: 'app-tags-generator',
  templateUrl: './tags-generator.component.html',
  styleUrls: ['./tags-generator.component.css']
})
export class TagsGeneratorComponent {

  percentage: number;
  tagRequerimiento: string;
  textoFinal: string;
  copied: boolean = false;
  INITag: string;
  INITagCopied: boolean = false;
  private fileList: any = [];


  constructor(private alertService: AlertService, private uploadService: TagsGeneratorService) { }

  requerimiento: Requerimiento = {
    descripcionRequerimiento: null,
    empresaResponsable: "ZEKE",
    fechaInicio: null,
    nroRequerimiento: null,
    responsable: null,
    usuarioCliente: null
  }

  onFilesChange(fileList: FileList) {
    this.fileList = fileList;
    this.uploadService.pushFileToStorage( this.fileList[0] ).subscribe(
      data => {
        this.requerimiento = data;
      },error=> {
        this.alertService.danger('Ocurrió un error.');
      });

    this.fileList = null;
  }
  copyToClipboard(textoFinal) {
    textoFinal.select();
    document.execCommand("copy");
    textoFinal.setSelectionRange(0, 0);
    this.alertService.success('Se ha copiado el texto en el portapapeles.');
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
  validaTag(forma: NgForm) {

    console.log("Usuario:", this.requerimiento);

    this.copied = false;
    this.INITagCopied = false;
    const OPENTAG = "/*";
    const CLOSETAG = "/";
    const CHAR_ASTERISCO = "*";
    const SALTO_LINEA = "\n*";
    const LINEA_REG_MANTENCION = " REGISTRO DE MANTENCION.";
    const LINEA_RESPONSABLE = " RESPONSABLE REGISTRO   : " + this.capitalizeName(this.requerimiento.usuarioCliente) + " / REQ: " + this.requerimiento.nroRequerimiento.toUpperCase() + " / FECHA: " + this.requerimiento.fechaInicio.toLocaleString();
    const LINEA_RESPONSABLE_NOS = " RESPONSABLE " + this.requerimiento.empresaResponsable.toUpperCase() + "    : " + this.requerimiento.responsable.toUpperCase();
    const INICIALES = this.getIniciales(this.requerimiento.responsable).toUpperCase();
    this.textoFinal =
      OPENTAG + SALTO_LINEA +
      this.fillWithChar(92, CHAR_ASTERISCO) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_REG_MANTENCION) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_RESPONSABLE) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_RESPONSABLE_NOS) + SALTO_LINEA +
      this.setDescriptionInLines(92, this.requerimiento.descripcionRequerimiento) +
      this.fillWithChar(92, CHAR_ASTERISCO) + SALTO_LINEA + CLOSETAG;


    this.INITag = '//INI//' + 'REQ: ' + this.requerimiento.nroRequerimiento.toUpperCase() + '//' + INICIALES + '//' + this.requerimiento.fechaInicio.toLocaleString();
  }


  capitalizeName(name) {
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  }
  getIniciales(name) {
    let cuentaPalabras = name.trim().split(' ');
    name = '';
    cuentaPalabras.forEach(element => {
      name = name + element.charAt(0);
    });
    return name;

  }
}
