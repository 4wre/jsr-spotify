import { STATUS_CODE } from "@std/http/status";
import { API, APIOAuth2Scopes, OAuthApp } from "./mod.ts";

const app = new OAuthApp({
	clientId: Deno.env.get("CLIENT_ID")!,
	clientSecret: Deno.env.get("CLIENT_SECRET")!,
});
const redirectUri = Deno.env.get("REDIRECT_URI")!;

Deno.serve(async (req) => {
	const url = new URL(req.url);

	switch (url.pathname) {
		case "/": {
			return Response.redirect(
				app.authorizationURL({
					state: crypto.randomUUID(),
					redirectUri,
					scopes: [APIOAuth2Scopes.PlaylistModifyPublic],
				}),
			);
		}
		case "/callback": {
			console.log("masuk callback");
			const code = url.searchParams.get("code")!;
			const data = await app.tokenExchange({ code, redirectUri });
			console.log("berhasil authorize");
			const user = new API({ token: data.access_token });
			const playlistItems = await user.playlists.getItems(
				Deno.env.get("PLAYLIST_ID")!,
			);
			console.log(playlistItems);

			return new Response("OK");
		}
		default: {
			return new Response(null, { status: STATUS_CODE.NotFound });
		}
	}
});
