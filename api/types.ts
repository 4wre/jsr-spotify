import type { APIAlbum } from "./album.ts";
import type { APIArtist } from "./artist.ts";
import type { APITrack } from "./track.ts";

export interface APISearchResult {
	tracks: APISearchResultPagination<APITrack>;
	artist: APISearchResultPagination<APIArtist>;
	albums: APISearchResultPagination<APIAlbum>;
	playlists: APISearchResultPagination<unknown>;
	shows: APISearchResultPagination<unknown>;
	episodes: APISearchResultPagination<unknown>;
	audiobooks: APISearchResultPagination<unknown>;
}
export interface APISearchResultPagination<T> {
	/** A link to the Web API endpoint returning the full result of the request */
	href: string;
	/** The maximum number of items in the response (as set in the query or by default). */
	limit: number;
	/** URL to the next page of items. ( null if none) */
	next: string;
	/** The offset of the items returned (as set in the query or by default) */
	offset: number;
	/** URL to the previous page of items. ( null if none) */
	previous: string;
	/** The total number of items available to return. */
	total: number;
	items: T[];
}
export interface APIExternalId {
	/** International Standard Recording Code */
	isrc: string;
	/** International Article Number */
	ean: string;
	/** Universal Product Code */
	upc: string;
}
export interface APIExternalUrl {
	spotify: string;
}
export interface APISpotifyImage {
	/** The source URL of the image. */
	url: string;
	/** The image height in pixels. */
	height: number;
	/** The image width in pixels. */
	width: number;
}
export interface APISpotifyRestriction {
	/**
	 * The reason for the restriction.
	 * Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
	 * Additional reasons may be added in the future.
	 */
	reason: APISpotifyRestrictionReason;
}
export interface APISpotifyFollowers {
	/** This will always be set to null, as the Web API does not support it at the moment. */
	href: null;
	/** The total number of followers. */
	total: number;
}
export type APISearchType =
	| "album"
	| "artist"
	| "playlist"
	| "track"
	| "show"
	| "episode"
	| "audiobook";
export interface APISearchOptions {
	/** An ISO 3166-1 alpha-2 country code. */
	market?: string;
	/**
	 * The maximum number of results to return in each item type.
	 * Range: 0 -50
	 */
	limit?: number;
	/**
	 * The index of the first result to return. Use with limit to get the next page of search results.
	 * Range: 0 - 1000
	 */
	offset?: number;
	/**
	 * If include_external=audio is specified it signals that the client can play externally hosted audio content, and marks the content as playable in the response.
	 */
	include_external?: "audio";
}
export type APISpotifyRestrictionReason = "market" | "product" | "explicit";
export type APIReleaseDatePrecision = "year" | "month" | "day";
