import { translate } from '../../aplication/cors/transalateModelVehicle'
import { VehiclesSwapi } from '../../domain/models/vehicles.model'
import { VehicleTraduction } from '../../domain/models/vehicles.model'
import { VehiclesRepository } from '../../domain/repositories/vehiclesSwapiRepository'
import { DynamoDbVehicleRepository } from '../../domain/repositories/dynamoDbRepository'
export class SwapiOperations {
	vehiclesRepository: VehiclesRepository
	dynamoDbRepository: DynamoDbVehicleRepository
	constructor(vehiclesRepository: VehiclesRepository, dynamoDbRepository: DynamoDbVehicleRepository){
		this.vehiclesRepository = vehiclesRepository
		this.dynamoDbRepository = dynamoDbRepository
	}

	async getVehiclesAndSaveModel(uuid: string): Promise<VehiclesSwapi> {
		try {
			const vehicle = await this.vehiclesRepository.getByIdVehicle(uuid)
			if(!vehicle){
				throw new Error(`car with id ${uuid} not found`)
			}
			const renombre = this.translatePropertyModel(vehicle)
			const create = await this.dynamoDbRepository.savedVehicle(renombre)
			console.log('create element  ' + create)
			return renombre
		} catch (error: any) {
			throw new Error(error.message)
		}
	}

	async getAllVehicles(): Promise<Array<VehicleTraduction>> {
		const listItems = await this.dynamoDbRepository.getAllVehicles()
		console.log(listItems)
		return listItems
	}

	translatePropertyModel (vehicle: VehiclesSwapi): VehicleTraduction | any {
		const renombre = Object.keys(vehicle).reduce((acumulate, key) => {
			const traduction = translate.find(item => item.en === key)
			if(traduction){
				acumulate[traduction.es] = vehicle[key]
				return acumulate
			} else {
				return acumulate
			}
		}, {})
		return renombre
	}
}