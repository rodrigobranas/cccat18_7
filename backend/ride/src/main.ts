import { Registry } from "./infra/di/DI";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import GetRide from "./application/query/GetRide";
import RideController from "./infra/controller/RideController";

const httpServer = new ExpressAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide("getRide", new GetRide());
new RideController();
httpServer.listen(3000);