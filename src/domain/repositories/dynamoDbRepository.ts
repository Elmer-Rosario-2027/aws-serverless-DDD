import { VehicleTraduction } from '../models/vehicles.model'

export interface DynamoDbVehicleRepository {
	savedVehicle(vehicle: VehicleTraduction): Promise<string>
	getAllVehicles(): Promise<Array<VehicleTraduction>>
}