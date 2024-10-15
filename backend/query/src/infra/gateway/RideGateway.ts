import { inject } from "../di/DI";
import HttpClient from "../http/HttpClient";

export default class RideGateway {
	@inject("httpClient")
	httpClient!: HttpClient;

	async getRideById (rideId: string) {
		const response = await this.httpClient.get(`http://localhost:3000/rides/${rideId}`);
		return response;
	}
}