import { isSuccessfulStatus } from "@std/http/status";
import { RouteBases, type RouteLike } from "./routes.ts";
import type { APISpotifyError } from "./api/error.ts";

/** Represents the class that manages handlers for endpoints */
export class REST {
	authPrefix: RESTAuthPrefix;
	#token: string;
	constructor(options: RESTOptions) {
		this.authPrefix = options.authPrefix;
		this.#token = options.token;
	}

	async request<T>(
		route: RouteLike,
		method: "DELETE" | "GET" | "POST" | "PUT",
		options?: RequestOptions,
	) {
		const response = await fetch(
			(options?.overrideBaseUrl ?? RouteBases.api) + route,
			{
				headers: {
					authorization: `${this.authPrefix} ${this.#token}`,
				},
				method,
				body: options?.body,
			},
		);
		console.log(response.url);

		if (isSuccessfulStatus(response.status)) {
			return await response.json() as T;
		} else {
			const error: APISpotifyError = await response.json();
			console.log(error);
			throw new Error(`SpotifyAPIError: ${error.message}`);
		}
	}
}

export interface RequestOptions {
	overrideBaseUrl?: string;
	body?: BodyInit;
}

/** Options to be passed when creating the REST instance */
interface RESTOptions {
	/** The authorization prefix to use for requests, useful if you want to use bearer tokens */
	authPrefix: RESTAuthPrefix;
	/** The toke used for requests */
	token: string;
}
export type RESTAuthPrefix = "Basic" | "Bearer";
