import GetRideCQRS from "./application/usecase/GetRideCQRS";
import RideAcceptedUpdateProjection from "./application/usecase/RideAcceptedUpdateProjection";
import RideCompletedUpdateProjection from "./application/usecase/RideCompletedUpdateProjection";
import RideRequestedUpdateProjection from "./application/usecase/RideRequestedUpdateProjection";
import QueryController from "./infra/controller/QueryController";
import QueueController from "./infra/controller/QueueController";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { Registry } from "./infra/di/DI";
import AccountGateway from "./infra/gateway/AccountGateway";
import RideGateway from "./infra/gateway/RideGateway";
import { AxiosAdapter } from "./infra/http/HttpClient";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { RabbitMQAdapter } from "./infra/queue/Queue";


async function main () {
	const httpServer = new ExpressAdapter();
	const databaseConnection = new PgPromiseAdapter();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	Registry.getInstance().provide("httpServer", httpServer);
	Registry.getInstance().provide("queue", queue);
	Registry.getInstance().provide("databaseConnection", databaseConnection);
	Registry.getInstance().provide("httpClient", new AxiosAdapter());
	Registry.getInstance().provide("accountGateway", new AccountGateway());
	Registry.getInstance().provide("rideGateway", new RideGateway());
	Registry.getInstance().provide("getRide", new GetRideCQRS());
	Registry.getInstance().provide("rideRequestedUpdateProjection", new RideRequestedUpdateProjection());
	Registry.getInstance().provide("rideAcceptedUpdateProjection", new RideAcceptedUpdateProjection());
	Registry.getInstance().provide("rideCompletedUpdateProjection", new RideCompletedUpdateProjection());
	new QueryController()
	new QueueController();
	httpServer.listen(3003);
}

main();
