/// <reference types="@sveltejs/kit" />
declare type id = string;

declare interface DocumentDish {
	id: id;
	name: {
		en: string;
		jp: string;
	};
	description: string;
	image: string;
	ingredients: string[];
	urlName: string;
};

declare type APIDatabase = DocumentDish[];

declare interface APIRecomendationsResponse {
	/**
	 * Amount returned from API
	 */
	amount: number,
	/**
	 * Entries count minus excludes count
	 */
	amountAvailable: number,
	excludes: string[],
	recomendations: DocumentDish[],

	/**
	 * Extra note
	 */
	note?: string,
};
