"use strict"
import {VistaLiga} from '../vistas/vistaLiga.js'
import {VistaAlta} from '../vistas/vistaAlta.js'
import {VistaEquipos} from '../vistas/vistaEquipos.js'
import {VistaModTabla} from '../vistas/vistaModTabla.js'
import {VistaModEquipo} from '../vistas/vistaModEquipo.js'
import { VistaListado } from '../vistas/vistaListado.js'
/**
 *	Implementa una vista del menú de navegación del administrador.
 */
export class VistaNav{
	/**
	 *	Constructor de la clase.
	 *	@param {HTMLElement} nav Nav de HTML en el que se desplegará la vista.
	 *	@param {Object} controlador Controlador de la vista del administrador.
	 */
	constructor(nav, controlador) {
		this.controlador = controlador
		this.nav = nav

		/*Botones nav*/
		this.btnLogo = $('li').eq(0)
		this.btnLiga = $('li').eq(1)
		this.btnEquipos = $('li').eq(2)
		this.btnBusqueda = $('li').eq(3)
		this.btnLogo.on( "click", this.pulsarLiga.bind(this) );
		this.btnLiga.on( "click", this.pulsarLiga.bind(this))
		this.btnEquipos.on( "click", this.pulsarEquipos.bind(this))
		this.btnBusqueda.on( "click", this.pulsarNavListado.bind(this))
		
	}
	/**
	 * método para ir a la vista liga al pulsar el botón de liga del menú y el logo
	 */
	pulsarLiga() {
		this.controlador.pulsarNavLiga()
	}
	/**
	 * método para ir a la vista equipos al pulsar el botón de equipos del menú
	 */
	pulsarEquipos() {
		this.controlador.pulsarNavEquipos()
	}
	/**
	 * método para ir a la vista de la búsqueda al pulsar el botón de la lupa del menú
	 */
	pulsarNavListado() {
		this.controlador.pulsarListado()
	}
}