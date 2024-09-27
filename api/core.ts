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
		options: APISearchOptions,
	) {
		const searchParams = new URLSearchParams({
			q: query,
			type: type.join(","),
			market: options.market,
			limit: String(options.limit),
			offset: String(options.offset),
			include_external: options.include_external,
		});

		const data: APISearchResult = await this.rest.request(
			`/search${searchParams.toString()}`,
			"GET",
		);
		return data;
	}
}

export interface APIOptions {
	token: string;
}
