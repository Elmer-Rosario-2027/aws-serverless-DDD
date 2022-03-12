import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

import { VehicleTraduction } from '../../domain/models/vehicles.model'
import { DynamoDbVehicleRepository } from '../../domain/repositories/dynamoDbRepository'

export class DynamoDbRepository implements DynamoDbVehicleRepository {
	database: string
	conection: DocumentClient
	constructor() {
		this.database = process.env.AWS_DYNAMODB || 'DomainDrivenDesignDev'
		this.conection = new DocumentClient()
		//this.conection = new DocumentClient({	region: 'localhost',	endpoint: 'http://localhost:8000',	accessKeyId: 'DEFAULT_ACCESS_KEY',	secretAccessKey: 'DEFAULT_SECRET'})
	}

	async savedVehicle(vehicle: VehicleTraduction): Promise<string> {
		vehicle.id= uuidv4()
		const params = {
			TableName: this.database,
			Item: vehicle
		};
		const response = await this.conection.put(params).promise()
		return JSON.stringify(response)
	}

	async getAllVehicles(): Promise<VehicleTraduction[]> {
		try {
			let params = {
				TableName: this.database,
				Select: "ALL_ATTRIBUTES"
			}
			let response = await this.conection.scan(params).promise()
			return response.Items as VehicleTraduction[];
		} catch (error: any) {
			throw new Error(error.message)
		}
	}
}