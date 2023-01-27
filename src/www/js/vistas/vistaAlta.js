"use strict" //activo modo estricto
import { Equipos } from '../modelos/equipos.js'
import {Vista} from './vista.js'

export class VistaAlta extends Vista {

	/**
     * Contructor de la clase VistaAlta
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          
          this.fechaa = $('#fechaaa')
          this.fechaa.datepicker()

          this.seleect = $('#comunidad')
          this.seleect.selectmenu()

          this.nombreLista = [
               "Real Madrid",
               "FC Barcelona",
               "Real Sociedad",
               "Betis",
               "Atlético de Madrid",
               "Villareal",
               "Sevilla",
               "Celta de Vigo",
               "Osasusna",
               "Rayo Vallecano",
               "Athletic Club de Bilbao",
               "Valencia",
               "Elche"
          ]
          this.nombreee = $('#nombreee')
          this.nombreee.autocomplete({source: this.nombreLista})


          this.ascenso1 = $('#ascendido1')
          this.ascenso1.checkboxradio()
          this.ascenso2 = $('#ascendido2')
          this.ascenso2.checkboxradio()

          this.div = $('#alta')
          this.escudo =  $('#inputfile')
          this.valorescudo = null
          this.escudo.on('change', e => {

               const archivo = this.escudo[0].files[0]
               const lector = new FileReader()
               lector.addEventListener('load',() => {
                    this.valorescudo = lector.result
               })
               lector.readAsDataURL(archivo)
          })
          /*Botones pantalla liga*/
		this.btnEnviar = this.div.find('button').eq(0)
          this.btnEnviar.button()
		this.btnEnviar.on( "click", this.insertarIndex.bind(this) ); 
	}
     /**
      * Método para inserción en IndexedDB de los datos del formulario de alta equipos
      */
     insertarIndex(){
          
          let nombre = this.div.find('input').eq(1)
          let valornombre = nombre.val()
          
          let descripcion = this.div.find('textarea').eq(0)
          let valordescripcion = descripcion.val()
          
          let fecha = this.div.find('input').eq(2)
          let valorfecha = fecha.val()

          let ligas = this.div.find('input').eq(3)
          let valorligas = ligas.val()

          let colores1 = $('#coloreees1')
          let colores2 = $('#coloreees2')
          let colores3 = $('#coloreees3')
          let colores4 = $('#coloreees4')
          let colores5 = $('#coloreees5')
          let colores6 = $('#coloreees6')

          let colores = []
          colores.push(colores1.is(':checked'))
          colores.push(colores2.is(':checked'))
          colores.push(colores3.is(':checked'))
          colores.push(colores4.is(':checked'))
          colores.push(colores5.is(':checked'))
          colores.push(colores6.is(':checked'))
          if(colores[0]==true){colores[0]='Blanco'}
          if(colores[1]==true){colores[1]='Negro'}
          if(colores[2]==true){colores[2]='Rojo'}
          if(colores[3]==true){colores[3]='Azul'}
          if(colores[4]==true){colores[4]='Verde'}
          if(colores[5]==true){colores[5]='Amarillo'}
               
          let valorascenso=[]
          let ascendido1 = $('#ascendido1')
          let ascendido2 = $('#ascendido2')
          valorascenso.push(ascendido1.is(':checked'))
          valorascenso.push(ascendido2.is(':checked'))
          if(valorascenso[0]==true){valorascenso[0]='Si'}
          if(valorascenso[1]==true){valorascenso[1]='No'}
          
          let comunidad = this.div.find('select').eq(0)
          let valorcomunidad = comunidad.val()
          let objeto = new Equipos(this.valorescudo,valornombre,valordescripcion,valorfecha,valorligas,colores,valorascenso,valorcomunidad)
          this.controlador.insertar(objeto)
     }

     
}