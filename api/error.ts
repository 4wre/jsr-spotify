import type { StatusCode } from "@std/http/status";

export interface APISpotifyError {
	/**
	 * The HTTP status code (also returned in the response header; see Response Status Codes for more information).
	 * Range: 400 - 599
	 */
	status: StatusCode;
	/** A short description of the cause of the error. */
	message: string;
}
