import DatabaseConnection from "../../infra/database/DatabaseConnection";
import { inject } from "../../infra/di/DI";

export default class RideRequestedUpdateProjection {
	@inject("databaseConnection")
	connection!: DatabaseConnection;

	async execute (event: any) {
		console.log("create ride with passenger name");
		const rideData = await this.connection.query("select * from ccca.query where ride_id = $1", [event.rideId]);
		if (rideData.length === 0) {
			await this.connection.query("insert into ccca.query (ride_id) values ($1)", [event.rideId]);
		}
		await this.connection.query("update ccca.query set passenger_name = $1 where ride_id = $2", [event.passengerName, event.rideId]);
	}
}