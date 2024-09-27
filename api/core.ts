import type {
	APISearchOptions,
	APISearchResult,
	APISearchType,
} from "./types.ts";
import { REST } from "../rest.ts";
import { PlaylistAPI } from "./playlist.ts";

export class API {
	rest: REST;
	playlists: PlaylistAPI;
	constructor({ token }: APIOptions) {
		this.rest = new REST({ authPrefix: "Bearer", token });

		this.playlists = new PlaylistAPI(this.rest);
	}

	async search(
		/** Your search query */
		query: string,
		/** Item types to search across. */
		type: APISearchType[],
		options?: APISearchOptions,
	) {
		const searchParams = new URLSearchParams({
			q: query,
			type: type.join(","),
		});

		if (options?.include_external) {
			searchParams.set("include_external", options.include_external);
		}
		if (options?.limit) {
			searchParams.set("limit", String(options.limit));
		}
		if (options?.market) {
			searchParams.set("market", options.market);
		}
		if (options?.offset) {
			searchParams.set("offset", String(options.offset));
		}

		const data: APISearchResult = await this.rest.request(
			`/search?${searchParams.toString()}`,
			"GET",
		);
		return data;
	}
}

export interface APIOptions {
	token: string;
}
