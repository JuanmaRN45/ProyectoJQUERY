"use strict" //activo modo estricto
import {Vista} from './vista.js'

export class VistaEquipos extends Vista {

	/**
     * Contructor de la clase VistaEquipos
     * @param {HTMLDivElement} div Div de la vista
     * @param {Object} controlador Controlador de la vista
     */
	constructor(div, controlador) {
		super(div)
          this.controlador = controlador
          this.div2 = $('#liEquipos');
          this.div2.on('click',this.listar.bind(this))
          this.divWonder = $('.divWonder').eq(0)
	}

     listar(){
          this.divWonder.empty()
          const peticion =window.indexedDB.open("WonderLeague")
          peticion.onsuccess= (evento) =>{
               this.bd=evento.target.result;	
               console.log('Base de datos cargada.')
               const objectStore =this.bd.transaction('Equipos', 'readonly').objectStore('Equipos')
               const peticion = objectStore.getAll()
               peticion.onsuccess= (function(){
                    this.lista= peticion.result
                    console.log(this.lista)
                    let i=0
                    for(let listas of this.lista){
                         let contenedor = $('<div></div>')
                         contenedor.addClass('contenedor')
                         this.divWonder.append(contenedor)

                         let imagen = $('<img></img>')
                         imagen.attr('src',this.lista[i]['escudo'])
                         imagen.addClass('imgEscudo')
                         contenedor.append(imagen)

                         let divNombre = $('<div></div>')
                         divNombre.addClass('divsFormularios partidos')
                         contenedor.append(divNombre)

                         let labelNom = $('<label></label>')
                         labelNom.text('Nombre: ')
                         divNombre.append(labelNom)

                         let pNom = $('<p></p>')
                         pNom.text(this.lista[i]['nombre'])
                         divNombre.append(pNom)

                         let divDesc = $('<div></div>')
                         divDesc.addClass('divsFormularios puntos')
                         contenedor.append(divDesc)

                         let labelDes = $('<label></label>')
                         labelDes.text('Descripción: ')
                         divDesc.append(labelDes)

                         let pDes = $('<p></p>')
                         pDes.addClass('descripcion')
                         pDes.text(this.lista[i]['descripcion'])
                         divDesc.append(pDes)

                         let divfecha = $('<div></div>')
                         divfecha.addClass('divsFormularios goalaverage')
                         contenedor.append(divfecha)

                         let labelfec = $('<label></label>')
                         labelfec.text('Fecha de Fundación: ')
                         divfecha.append(labelfec)

                         let pfec = $('<p></p>')
                         pfec.text(this.lista[i]['fechaCreacion'])
                         divfecha.append(pfec)

                         let divcom = $('<div></div>')
                         divcom.addClass('divsFormularios golesaf')
                         contenedor.append(divcom)

                         let labelcom = $('<label></label>')
                         labelcom.text('Comunidad Autónoma: ')
                         divcom.append(labelcom)

                         let pcom = $('<p></p>')
                         pcom.addClass('titulos')
                         pcom.text(this.lista[i]['comunidad'])
                         divcom.append(pcom)

                         let divra = $('<div></div>')
                         divra.addClass('divsFormularios golesec')
                         contenedor.append(divra)

                         let labelra = $('<label></label>')
                         labelra.text('Recién Ascendido: ')
                         divra.append(labelra)

                         let pra = $('<p></p>')
                         if(this.lista[i]['ascendido'][0]=='Si'){
                              pra.text(this.lista[i]['ascendido'][0])
                         }else{
                              pra.text(this.lista[i]['ascendido'][1])
                         }
                         divra.append(pra)

                         let divBot = $('<div></div>')
                         divBot.addClass('divsFormularios btnEditar')
                         contenedor.append(divBot)

                         let botEd = $('<button></button>')
                         botEd.text('Editar')
                         divBot.append(botEd)

                         let botEliminar = $('<button></button>')
                         botEliminar.text('Eliminar')
                         divBot.append(botEliminar)

                         i=i+1
                    }
               }).bind(this)
          }
     }
}