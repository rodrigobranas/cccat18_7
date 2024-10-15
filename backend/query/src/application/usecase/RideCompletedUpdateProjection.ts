import DatabaseConnection from "../../infra/database/DatabaseConnection";
import { inject } from "../../infra/di/DI";

export default class RideCompletedUpdateProjection {
	@inject("databaseConnection")
	connection!: DatabaseConnection;

	async execute (event: any) {
		console.log("update fare and distance");
		const rideData = await this.connection.query("select * from ccca.query where ride_id = $1", [event.rideId]);
		if (rideData.length === 0) {
			await this.connection.query("insert into ccca.query (ride_id) values ($1)", [event.rideId]);
		}
		await this.connection.query("update ccca.query set fare = $1, distance = $2 where ride_id = $3", [event.amount, event.distance, event.rideId]);
	}
}