import { inject } from "../../infra/di/DI";
import Ride from "../../domain/entity/Ride";
import RideRepository from "../../infra/repository/RideRepository";
import AccountGateway from "../../infra/gateway/AccountGateway";
import Queue from "../../infra/queue/Queue";

// Modelo, Domain Model, Command Stack
export default class RequestRide {
	@inject("accountGateway")
	accountGateway!: AccountGateway;
	@inject("rideRepository")
	rideRepository!: RideRepository;
	@inject("queue")
	queue!: Queue;

	async execute (input: Input): Promise<Output> {
		const account = await this.accountGateway.getAccountById(input.passengerId);
		if (!account) throw new Error("Account does not exist");
		if (!account.isPassenger) throw new Error("Account must be from a passenger");
		const passengerHasActiveRide = await this.rideRepository.hasActiveRideByPassengerId(input.passengerId);
		if (passengerHasActiveRide) throw new Error("Passenger already have an active ride");
		const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);
		await this.rideRepository?.saveRide(ride);
		await this.queue.publish("rideRequested", { rideId: ride.getRideId(), passengerName: account.name });
		return {
			rideId: ride.getRideId()
		}
	}
}

type Input = {
	passengerId: string,
	fromLat: number,
	fromLong: number,
	toLat: number,
	toLong: number
}

type Output = {
	rideId: string
}
