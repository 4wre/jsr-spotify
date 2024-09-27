import type { APIAlbum } from "./album.ts";
import type { APISimplifiedArtist } from "./artist.ts";
import type {
	APIExternalId,
	APIExternalUrl,
	APISpotifyRestriction,
} from "./types.ts";

export interface APITrack {
	/**
	 * The album on which the track appears.
	 * The album object includes a link in href to full information about the album.
	 */
	album: APIAlbum;
	/**
	 * The artists who performed the track.
	 * Each artist object includes a link in href to more detailed information about the artist.
	 */
	artist: APISimplifiedArtist;
	/** A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code. */
	available_markets: string[];
	/** The disc number (usually 1 unless the album consists of more than one disc). */
	disc_number: number;
	/** The track length in milliseconds. */
	duration_ms: number;
	/** Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). */
	explicit: boolean;
	/** Known external IDs for the track. */
	external_ids: APIExternalId;
	/** Known external URLs for this track. */
	external_urls: APIExternalUrl;
	/** A link to the Web API endpoint providing full details of the track. */
	href: string;
	/** The Spotify ID for the track. */
	id: string;
	/**
	 * Part of the response when Track Relinking is applied.
	 * If true, the track is playable in the given market. Otherwise false.
	 */
	is_playable: boolean;
	/**
	 * Part of the response when Track Relinking is applied, and the requested track has been replaced with different track.
	 * The track in the linked_from object contains information about the originally requested track.
	 */
	linked_from: unknown;
	/** Included in the response when a content restriction is applied. */
	restrictions: APISpotifyRestriction;
	/** The name of the track. */
	name: string;
	/**
	 * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
	 */
	popularity: number;
	/** A link to a 30 second preview (MP3 format) of the track. Can be null */
	preview_url: string | null;
	/** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
	track_number: number;
	/** The object type: "track". */
	type: "track";
	/** The Spotify URI for the track. */
	uri: string;
	/** Whether or not the track is from a local file. */
	is_local: boolean;
}
