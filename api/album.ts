import type { APISimplifiedArtist } from "./artist.ts";
import type {
	APIExternalUrl,
	APIReleaseDatePrecision,
	APISpotifyImage,
	APISpotifyRestriction,
} from "./types.ts";

export interface APIAlbum {
	/** The type of the album. */
	album_type: APIAlbumType;
	/** The number of tracks in the album. */
	total_tracks: number;
	/** The markets in which the album is available */
	available_markets: string[];
	/** Known external URLs for this album. */
	external_urls: APIExternalUrl[];
	/** A link to the Web API endpoint providing full details of the album. */
	href: string;
	/** The Spotify ID for the album. */
	id: string;
	/** The cover art for the album in various sizes, widest first. */
	images: APISpotifyImage[];
	/** The name of the album. In case of an album takedown, the value may be an empty string. */
	name: string;
	/** The date the album was first released. */
	release_date: string;
	/** The precision with which release_date value is known. */
	release_date_precision: APIReleaseDatePrecision;
	/** Included in the response when a content restriction is applied. */
	restrictions: APISpotifyRestriction;
	/** The object type. */
	type: "album";
	/** The Spotify URI for the album. */
	uri: string;
	/**
	 * The artists of the album.
	 * Each artist object includes a link in href to more detailed information about the artist.
	 */
	artist: APISimplifiedArtist;
}

export type APIAlbumType = "album" | "single" | "compilation";
