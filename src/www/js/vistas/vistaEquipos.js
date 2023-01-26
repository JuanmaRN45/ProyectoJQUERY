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
          this.div2.on('mouseover',this.aemet.bind(this))
          this.div2.on('click',this.listar.bind(this))
          this.divWonder = $('.divWonder').eq(0)
	}

     aemet()
     {
          const clave = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXZpZHNhY2hlMDhAZ21haWwuY29tIiwianRpIjoiZTQ2ZDNlNWEtMjQ1Ni00ZDUyLTg0ZjYtYjc2ZjFjOThkOTAyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzQ1NzM5NjMsInVzZXJJZCI6ImU0NmQzZTVhLTI0NTYtNGQ1Mi04NGY2LWI3NmYxYzk4ZDkwMiIsInJvbGUiOiIifQ.mFEFzKjKcpHxvyinDg6iXDen6I2cdKBExm0Qb_ke5aY';
          let peticion = {
               'async': true,
               'crossDomain': true,
               'url': 'https://opendata.aemet.es/opendata/api/prediccion/provincia/hoy/06/?api_key=' + clave,
               'method': 'GET',
               'headers': {
                    'cache-control': 'no-cache'
               }
          };

          $.ajax(peticion)
          .done((response) => {
               if(response.estado == 200) {
                    // Obtener los datos de la respuesta
                    $.ajax(response.datos)
                         .done((response) => {
                              this.footer = $('#footer').eq(0)
                              console.log(this.footer)
                              this.copy = $('<p></p>')
                              this.footer.append(this.copy)
                              this.copy.text(response)
                         })
               }
          })
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