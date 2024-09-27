import type { REST } from "../rest.ts";
import { Routes } from "../routes.ts";
import type { APIEpisode } from "./episode.ts";
import type { APITrack } from "./track.ts";
import type { APISearchOptions, APISearchResultPagination } from "./types.ts";
import type { APIUser } from "./user.ts";

export class PlaylistAPI {
	rest: REST;
	constructor(rest: REST) {
		this.rest = rest;
	}

	/** Get full details of the items of a playlist owned by a Spotify user. */
	async getItems(
		/** The Spotify ID of the playlist. */
		playlistId: string,
	) {
		console.log(playlistId);
		return await this.rest.request(
			Routes.playlistItem(playlistId),
			"GET",
		) satisfies APISearchResultPagination<APIPlaylistTrack>;
	}
}

export interface APIGetPlaylistItemsOptions
	extends Omit<APISearchOptions, "include_external"> {
	/** A list of item types that your client supports besides the default track type. */
	additional_types: "episode" | "track";
}

export interface APIPlaylistTrack {
	/** The date and time the track or episode was added. */
	added_at: string;
	/** The Spotify user who added the track or episode. */
	added_by: APIUser;
	/** Whether this track or episode is a local file or not. */
	is_local: boolean;
	/** Information about the track or episode. */
	track: APITrack | APIEpisode;
}
