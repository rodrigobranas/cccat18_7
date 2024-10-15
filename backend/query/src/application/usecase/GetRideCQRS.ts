import DatabaseConnection from "../../infra/database/DatabaseConnection";
import { inject } from "../../infra/di/DI"
import AccountGateway from "../../infra/gateway/AccountGateway"
import RideGateway from "../../infra/gateway/RideGateway";

// CQRS
export default class GetRideCQRS {
	@inject("databaseConnection")
	connection!: DatabaseConnection;

	async execute (rideId: string): Promise<Output> {
		const [rideData] = await this.connection.query("select * from ccca.query where ride_id = $1", [rideId]);
		return {
			rideId: rideData.ride_id,
			passengerName: rideData.passenger_name + "CQRS",
			driverName: rideData?.driver_name + "CQRS",
			fare: rideData.fare,
			distance: rideData.distance
		}
	}
}

type Output = {
	rideId: string,
	passengerName: string,
	driverName: string,
	fare: number,
	distance: number
}
