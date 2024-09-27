export const RouteBases = {
	api: "https://api.spotify.com/v1",
	accounts: "https://accounts.spotify.com",
};

export const Routes = {
	/**
	 * - GET /playlists/{playlist_id}
	 * - PUT /playlists/{playlist_id}
	 */
	playlist(playlistId: string) {
		return `/playlists/${playlistId}` as const;
	},
	/**
	 * - DELETE /playlists/{playlist_id}/tracks
	 * - GET /playlists/{playlist_id}/tracks
	 * - POST /playlists/{playlist_id}/tracks
	 */
	playlistItem(playlistId: string) {
		return `/playlists/${playlistId}/tracks` as const;
	},
	/**
	 * - GET /search
	 */
	search() {
		return "/search" as const;
	},
};

export const OAuth2Routes = {
	authorize() {
		return `/authorize` as const;
	},
	tokenExchange() {
		return `/api/token` as const;
	},
};

export type RouteLike = `/${string}`;
