import { inject } from "../../infra/di/DI";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountGateway from "../../infra/gateway/AccountGateway";
import Queue from "../../infra/queue/Queue";


export default class AcceptRide {
	@inject("accountGateway")
	accountGateway?: AccountGateway;
	@inject("rideRepository")
	rideRepository?: RideRepository;
	@inject("queue")
	queue!: Queue;

	async execute (input: Input): Promise<void> {
		const account = await this.accountGateway?.getAccountById(input.driverId);
		if (!account) throw new Error("Account does not exist");
		if (!account.isDriver) throw new Error("Account must be from a driver");
		const ride = await this.rideRepository?.getRideById(input.rideId);
		if (!ride) throw new Error();
		ride.accept(input.driverId);
		await this.rideRepository?.updateRide(ride);
		await this.queue.publish("rideAccepted", { rideId: ride.getRideId(), driverName: account.name });
	}
}

type Input = {
	rideId: string,
	driverId: string
}
