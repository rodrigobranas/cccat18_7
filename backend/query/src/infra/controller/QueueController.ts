import RideAcceptedUpdateProjection from "../../application/usecase/RideAcceptedUpdateProjection";
import RideCompletedUpdateProjection from "../../application/usecase/RideCompletedUpdateProjection";
import RideRequestedUpdateProjection from "../../application/usecase/RideRequestedUpdateProjection";
import { inject } from "../di/DI";
import Queue from "../queue/Queue";

export default class QueueController {
	@inject("queue")
	queue!: Queue;
	@inject("rideRequestedUpdateProjection")
	rideRequestedUpdateProjection!: RideRequestedUpdateProjection;
	@inject("rideAcceptedUpdateProjection")
	rideAcceptedUpdateProjection!: RideAcceptedUpdateProjection;
	@inject("rideCompletedUpdateProjection")
	rideCompletedUpdateProjection!: RideCompletedUpdateProjection;

	constructor () {
		this.queue.consume("rideRequested.updateProjection", async (input: any) => {
			await this.rideRequestedUpdateProjection.execute(input);
		});
		this.queue.consume("rideAccepted.updateProjection", async (input: any) => {
			await this.rideAcceptedUpdateProjection.execute(input);
		});
		this.queue.consume("rideCompleted.updateProjection", async (input: any) => {
			await this.rideCompletedUpdateProjection.execute(input);
		});
	}
}
