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

          this.footer = $('#footer').eq(0)
          this.copy = $('<p></p>')
          this.copy.attr('tabindex',800)
          this.copy.attr('aria-label',this.copy.val())
          this.footer.append(this.copy)
          this.div2.on('mouseover',this.aemet.bind(this))
	}
     /**
      * Método para inserción de la api de la aemet en un p en el footer al hacer mouseover en el apartado de menú de equipos
      */
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
                              this.copy.val()
                              this.copy.text(response)
                         })
               }
          })
     }
     /**
      * Método para listar y crear dinámicamente las tarjetas en el apartado equipos
      */
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
                         imagen.attr('tabindex',9+i)
                         imagen.attr('aria-label','escudo equipo '+this.lista[i]['nombre'])
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
                         pNom.attr('tabindex',9+i)
                         pNom.attr('aria-label','nombre de equipo '+this.lista[i]['nombre'])
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
                         pDes.attr('tabindex',9+i)
                         pDes.attr('aria-label','descripcion de equipo '+this.lista[i]['descripcion'])
                         divDesc.append(pDes)

                         let divfecha = $('<div></div>')
                         divfecha.addClass('divsFormularios goalaverage')
                         contenedor.append(divfecha)

                         let labelfec = $('<label></label>')
                         labelfec.text('Fecha de Fundación: ')
                         divfecha.append(labelfec)

                         let pfec = $('<p></p>')
                         pfec.text(this.lista[i]['fechaCreacion'])
                         pfec.attr('tabindex',9+i)
                         pfec.attr('aria-label','fecha de fundacion '+this.lista[i]['fechaCreacion'])
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
                         pcom.attr('tabindex',9+i)
                         pcom.attr('aria-label','comunidad a la que pertenece '+this.lista[i]['comunidad'])
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
                              pra.attr('tabindex',9+i)
                              pra.attr('aria-label','equipo recien ascendido')
                         }else{
                              pra.text(this.lista[i]['ascendido'][1])
                              pra.attr('tabindex',9+i)
                              pra.attr('aria-label','equipo no recien ascendido')
                         }
                         divra.append(pra)

                         let divBot = $('<div></div>')
                         divBot.addClass('divsFormularios btnEditar')
                         contenedor.append(divBot)

                         let botEd = $('<button></button>')
                         botEd.text('Editar')
                         botEd.attr('tabindex',9+i)
                         divBot.append(botEd)

                         let botEliminar = $('<button></button>')
                         botEliminar.text('Eliminar')
                         botEliminar.attr('tabindex',9+i)
                         divBot.append(botEliminar)

                         i=i+1
                    }
               }).bind(this)
          }
     }
}