import { inject } from "../di/DI";
import HttpClient from "../http/HttpClient";

export default class AccountGateway {
	@inject("httpClient")
	httpClient!: HttpClient;

	async getAccountById (accountId: string) {
		const response = await this.httpClient.get(`http://localhost:3001/accounts/${accountId}`);
		return response;
	}
}