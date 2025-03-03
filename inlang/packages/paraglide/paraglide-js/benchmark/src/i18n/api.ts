import * as paraglide from "../paraglide/runtime.js";
import { i18next, init as i18nextInit } from "./i18next.ts";

declare global {
	var setLocale: (locale: string) => void;
	var getLocale: () => string;
	var locales: string[];
	var initI18n: () => Promise<unknown>;
}

globalThis.locales = paraglide.locales as any;

globalThis.setLocale = (locale: string) => {
	if (process.env.LIBRARY === "paraglide") {
		return paraglide.setLocale(locale as any);
	} else if (process.env.LIBRARY === "i18next") {
		return i18next.changeLanguage(locale);
	}
	throw new Error("Unsupported library");
};

globalThis.getLocale = () => {
	if (process.env.LIBRARY === "paraglide") {
		return paraglide.getLocale();
	} else if (process.env.LIBRARY === "i18next") {
		return "i18next has no API for getting the current locale";
	}
	throw new Error("Unsupported library");
};

globalThis.initI18n = async () => {
	if (process.env.LIBRARY === "paraglide") {
		return;
	} else if (process.env.LIBRARY === "i18next") {
		return i18nextInit();
	}
	throw new Error("Unsupported library");
};