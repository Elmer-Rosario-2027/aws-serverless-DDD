import axios from 'axios'
import { to } from 'await-to-js'

import { VehiclesSwapi } from '../../domain/models/vehicles.model';
import { VehiclesRepository } from '../../domain/repositories/vehiclesSwapiRepository'

export class VehiclesSwapiImplements implements VehiclesRepository {

	urlSwapi: string
	constructor() {
		this.urlSwapi = 'https://swapi.dev/api'
	}

	async getByIdVehicle(idVehicle: string): Promise<VehiclesSwapi> {
		const [error, response] = await to(axios.get(`${this.urlSwapi}/vehicles/${idVehicle}`))
		if(error) {
			throw new Error(error.message);
		}
		return response.data
	}
}