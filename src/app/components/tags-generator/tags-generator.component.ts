import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../_animations/router.animations';

@Component({
  selector: 'app-tags-generator',
  templateUrl: './tags-generator.component.html',
  styleUrls: ['./tags-generator.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' }
})
export class TagsGeneratorComponent implements OnInit {

  tagRequerimiento: string;
  textoFinal: string;
  constructor() { }

  ngOnInit() {
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
    let textoFinalFormateado:string = '';
    if( (LINEA_DESCRIPCION+textoDescripcion).length > 92){

      //buscamos un espacio en el sustring
      let seguirCortandoTexto = true;
      let posicion_inicial = 0;
      let posicion_final:number = 91;
      while(seguirCortandoTexto){
        //seteamos la posicion final que sea distinta a una letra
        while(textoDescripcion.charAt(posicion_final) != ' '){
          
          posicion_final--;
          console.log("encontré un espacio vacio");
        }
        console.log("========================================");
        console.log("posicion_ini: [" + posicion_inicial + "]");
        console.log("posicion fin: ["+ posicion_final+"]");
        textoFinalFormateado = textoFinalFormateado + textoDescripcion.slice(posicion_inicial,posicion_final);
        textoFinalFormateado = this.fillWithChar(92, " ", textoFinalFormateado) + "\n*";
        console.log("Linea Formateada ["+ textoFinalFormateado +"]");
        //cmabiamos nuevas posiciones
        posicion_inicial = posicion_final;
        console.log("nueva posicion inicial: ["+posicion_inicial+"]");
        console.log("textoDescripcion.length: ["+textoDescripcion.length+"]");
        console.log("pos fin + pos fin : ["+posicion_final * 2+"]");
        if(textoDescripcion.length >  (posicion_final + 92) ){
          posicion_final = posicion_final + 92;
          console.log("Es menor... así que pos_final: ["+ posicion_final+"]");
        }else{
          posicion_final = textoDescripcion.length;
          seguirCortandoTexto = false;
        }
      }
      
    }
    return textoFinalFormateado;
  }
  validaTag(requerimientoInput) {

    const OPENTAG = "/*";
    //largo 93
    const CHAR_ASTERISCO = "*";
    const SALTO_LINEA = "\n*";
    const LINEA_REG_MANTENCION = " REGISTRO DE MANTENCION.";
    const LINEA_RESPONSABLE =  " RESPONSABLE REGISTRO   : " + requerimientoInput.value + " / REQ: " +requerimientoInput.value +" / FECHA: 27-06-2018";
    const LINEA_RESPONSABLE_NOS = " RESPONSABLE " + requerimientoInput.value + "    : " + requerimientoInput.value;
    const LINEA_DESCRIPCION = "Al ingresar un contrayente, ya sea 1 o 2 al momento de hacer eserva de AUC, sistema marca nacionalidad 'Extranjero' al	ser Nacionalizado, y en este caso debería marcarla como Chileno. Al ingresar un contrayente, ya sea 1 o 2 al momento de hacer eserva de AUC, sistema marca nacionalidad 'Extranjero' al	ser Nacionalizado, y en este caso debería marcarla como Chileno."; 
    this.textoFinal =
      OPENTAG + SALTO_LINEA +
      this.fillWithChar(92, CHAR_ASTERISCO) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_REG_MANTENCION) + SALTO_LINEA +
      this.fillWithChar(92, " ", LINEA_RESPONSABLE) + SALTO_LINEA+
      this.fillWithChar(92, " ", LINEA_RESPONSABLE_NOS) + SALTO_LINEA + 
      this.setDescriptionInLines(92,LINEA_DESCRIPCION) + SALTO_LINEA;
      
    this.tagRequerimiento =
      `
/*
*********************************************************************************************
* REGISTRO DE MANTENCION.																    *
*  RESPONSABLE REGISTRO   :	XIMENA AMARO / REQ: 0458_2018 / FECHA: 27-06-2018               *
*  RESPONSABLE ZEKE	  	  : GONZALO MUÑOZ 				                                    *
*  DESCRIPCION MANTENCION :	Al ingresar un contrayente, ya sea 1 o 2 al momento de hacer    *
*  							Reserva de AUC, sistema marca nacionalidad 'Extranjero' al      *
*  							ser Nacionalizado, y en este caso debería marcarla como 	    *
*  							Chileno.													    *
*********************************************************************************************
*/
`;
  }

}
