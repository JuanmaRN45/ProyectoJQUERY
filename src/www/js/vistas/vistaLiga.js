"use strict" //activo modo estricto
import {Vista} from './vista.js'

export class VistaLiga extends Vista {

	/**
     * Contructor de la clase VistaCategorias
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador

          /*Botones pantalla liga*/
		this.btnAnadir = $('#anaaaaadir')
		this.btnAnadir.on("click",this.pulsarAnadir.bind(this))
	}
     /**
      * método para ir al formulario de alta al pulsar el botón añadir equipo
      */
     pulsarAnadir(){
          this.controlador.pulsarAlta()
     }
}