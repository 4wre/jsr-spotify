import { encodeBase64 } from "@std/encoding/base64";
import { REST } from "../rest.ts";
import { OAuth2Routes, RouteBases } from "../routes.ts";

export class OAuthApp {
	clientId: string;
	rest: REST;

	constructor({ clientId, clientSecret }: OAuth2Options) {
		this.clientId = clientId;

		this.rest = new REST({
			authPrefix: "Basic",
			token: encodeBase64(`${clientId}:${clientSecret}`),
		});
	}

	authorizationURL(options: OAuth2UrlGenerateOptions) {
		const authorizationUrl = new URL(
			RouteBases.accounts + OAuth2Routes.authorize(),
		);

		authorizationUrl.searchParams.set("client_id", this.clientId);
		authorizationUrl.searchParams.set("response_type", "code");
		authorizationUrl.searchParams.set("redirect_uri", options.redirectUri);

		if (options.state) {
			authorizationUrl.searchParams.set("state", options.state);
		}
		if (options.scopes) {
			authorizationUrl.searchParams.set(
				"scope",
				options.scopes.join(" "),
			);
		}
		if (options.showDialog) {
			authorizationUrl.searchParams.set(
				"show_dialog",
				String(options.showDialog),
			);
		}

		return authorizationUrl.toString();
	}

	async tokenExchange(
		{ code, redirectUri }: OAuth2TokenExchangeOptions,
	) {
		const body = new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
		});

		return await this.rest.request<OAuth2TokenExchangeResult<false>>(
			OAuth2Routes.tokenExchange(),
			"POST",
			{ overrideBaseUrl: RouteBases.accounts, body },
		);
	}

	async refreshToken(
		/** The refresh token returned from the authorization token request. */
		refreshToken: string,
	) {
		const body = new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
			client_id: this.clientId,
		});

		return await this.rest.request<OAuth2TokenExchangeResult<true>>(
			OAuth2Routes.tokenExchange(),
			"POST",
			{ overrideBaseUrl: RouteBases.accounts, body },
		);
	}
}

export interface OAuth2UrlGenerateOptions {
	/** The URI to redirect to after the user grants or denies permission. */
	redirectUri: string;
	/** This provide protection against such attacks such as cross-site request forgery. */
	state?: string;
	/** A list of scopes */
	scopes?: APIOAuth2Scopes[];
	/** Whether or not to force the user to approve the app again if they've already done so. */
	showDialog?: boolean;
}

export interface OAuth2Options {
	/** The unique identifier of your app. */
	clientId: string;
	/** The key you will use to authorize your Web API */
	clientSecret: string;
}
export enum APIOAuth2Scopes {
	PlaylistModifyPublic = "playlist-modify-public",
	PlaylistModifyPrivate = "playlist-modify-private",
}
export interface OAuth2TokenExchangeOptions {
	/** The authorization code returned from the previous request. */
	code: string;
	/** The value of this parameter must exactly match the value of `redirect_uri` supplied when requesting the authorization code. */
	redirectUri: string;
}
export interface OAuth2TokenExchangeResult<FromRefreshToken extends boolean> {
	/** An access token that can be provided in subsequent calls. */
	access_token: string;
	/** How the access token may be used. */
	token_type: "Bearer";
	/** A space-separated list of scopes which have been granted for this access token. */
	scope: string;
	/** The time period (in seconds) for which the access token is valid. */
	expires_in: number;
	refresh_token: FromRefreshToken extends true ? string | undefined : string;
}
