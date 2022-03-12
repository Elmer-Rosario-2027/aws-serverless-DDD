export interface VehiclesSwapi {
	id: string,
	name: string, 
	model: string, 
	manufacturer: string, 
	cost_in_credits: string, 
	length: string, 
	max_atmosphering_speed: string, 
	crew: string, 
	passengers: string, 
	cargo_capacity: string, 
	consumables: string, 
	vehicle_class: string,
	pilots: string[], 
	films: string[], 
	created: string, 
	edited: string, 
	url: string
}

export interface VehicleTraduction {
	id: string,
	nombre: string,
	modelo: string,
	fabricante: string,
	costo_en_credito: string,
	longitud: string,
	velocidad_máxima_de_atmósfera: string,
	tripulacion: string,
	pasajeros: string,
	capacidad_cargo: string,
	consumibles: string,
	clase_de_vehiculo: string,
	pilotos: string[],
	películas: string[],
	creado: string,
	editado: string,
	URL: string
}





let response = await services.SwapiPlanetById(IdPlanet)
let status = response.status === 200;
var SwapiPlanet= {}
if(status){
  var swapiObj = response.data;
  /** proceso que mapea las claves del objeto de ingles a español :  desde una lista simulada*/
  Object.keys(swapiObj).forEach(item => {
    listName.forEach(element => {
          if(item === element.en)
          swapiObj.renameProperty(item, element.es);
    })
  })
  SwapiPlanet.status = 200;
  SwapiPlanet.data = swapiObj;
} else {
  SwapiPlanet.status = 404;
  returnSwapiPlanet.data = "no existe data";
}
return SwapiPlanet;