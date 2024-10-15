import { inject } from "../../infra/di/DI"
import AccountGateway from "../../infra/gateway/AccountGateway"
import RideGateway from "../../infra/gateway/RideGateway";

// API Composition
export default class GetRideAPIComposition {
	@inject("accountGateway")
	accountGateway!: AccountGateway;
	@inject("rideGateway")
	rideGateway!: RideGateway;

	async execute (rideId: string): Promise<Output> {
		const ride = await this.rideGateway.getRideById(rideId);
		const passenger = await this.accountGateway.getAccountById(ride.passengerId);
		let driver;
		if (ride.driverId) {
			driver = await this.accountGateway.getAccountById(ride.driverId);
		}
		return {
			rideId: ride.rideId,
			passengerName: passenger.name,
			driverName: driver?.name,
			fare: ride.fare,
			distance: ride.distance
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
