import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

import { SwapiOperations } from '../infraestructure/controller/swapiController'
import { VehiclesSwapiImplements } from '../infraestructure/swapi/vehiclesSwapi'
import { DynamoDbRepository } from '../infraestructure/dynamoDb/dynamoDbRepository'


const dynamoDbRepository = new DynamoDbRepository()
const VehiclesSwapi = new VehiclesSwapiImplements()
const swapiImplements = new SwapiOperations(VehiclesSwapi, dynamoDbRepository)

export const handlerPost = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
		const uuid = JSON.parse(event.body).uuid
		if(!uuid){
			throw new Error('Error: not found by parrameter uuid') 
		}
		console.log(typeof  uuid)
		let reponse = await swapiImplements.getVehiclesAndSaveModel(uuid)
    return asyncResponse(reponse, true)
  } catch (err: any) {
    return asyncResponse(err.message, false)
  }
}

export const handlerGet = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
		let reponse = await swapiImplements.getAllVehicles()
    return asyncResponse(reponse, true)
  } catch (err: any) {
    return asyncResponse(err.message, false)
  }
}

function asyncResponse(information: any, status: boolean): any {
	return {
		statusCode: status? 200: 500,
		body:JSON.stringify(
			{
				status: status? true: false,
				payload: status? information: null,
				error: status? null: information,
			},null,	2
		)
	}
}
