import GetRide from "../../application/usecase/GetRideAPIComposition";
import { inject } from "../di/DI";
import HttpServer from "../http/HttpServer";
import Logger from "../logger/Logger";

export default class QueryController {
	@inject("httpServer")
	httpServer?: HttpServer;
	@inject("getRide")
	getRide!: GetRide;

	constructor () {
		this.httpServer?.register("get", "/rides/:rideId", async (params: any, body: any) => {
			console.log("getRide");
			const output = await this.getRide?.execute(params.rideId);
			return output;
		});
	}
}