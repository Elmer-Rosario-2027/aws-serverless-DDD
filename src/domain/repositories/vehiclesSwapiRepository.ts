import { VehiclesSwapi } from '../models/vehicles.model'

export interface VehiclesRepository {
	getByIdVehicle(idVehicle: string): Promise<VehiclesSwapi>
}