import DatabaseConnection from "../../infra/database/DatabaseConnection";
import { inject } from "../../infra/di/DI";

// Modelo, aqui não usamos Domain Model, Query Stack, DAO + DTO
export default class GetRide {
	@inject("databaseConnection")
	connection!: DatabaseConnection;

	async execute (rideId: string) {
		const [rideData] = await this.connection.query("select * from ccca.ride r where ride_id = $1", [rideId]);
		return {
			rideId: rideData.ride_id,
			passengerId: rideData.passenger_id,
			driverId: rideData.driver_id,
			fare: parseFloat(rideData.fare),
			distance: parseFloat(rideData.distance)
		}
	}

}
