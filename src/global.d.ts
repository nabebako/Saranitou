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