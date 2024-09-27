import type { APIExternalUrl, APISpotifyFollowers } from "./types.ts";

export interface APIUser {
	/** Known public external URLs for this user. */
	external_urls: APIExternalUrl;
	/** Information about the followers of this user. */
	followers: APISpotifyFollowers;
	/** A link to the Web API endpoint for this user. */
	href: string;
	/** The Spotify user ID for this user. */
	id: string;
	/** The object type. */
	type: "user";
	/** The Spotify URI for this user. */
	uri: string;
}
