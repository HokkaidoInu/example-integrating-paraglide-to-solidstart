import { assertIsLocale } from "./assert-is-locale.js";
import { baseLocale } from "./base-locale.js";
import { cookieName } from "./cookie-name.js";
import { localeInPath } from "./locale-in-path.js";
import { strategy } from "./strategy.js";

/**
 * This is a fallback to get started with a custom
 * strategy and avoid type errors.
 *
 * The implementation is overwritten
 * by \`defineGetLocale()\` and \`defineSetLocale()\`.
 *
 * @type {Locale}
 */
let _locale = baseLocale;

/**
 * Get the current locale.
 *
 * @example
 *   if (getLocale() === 'de') {
 *     console.log('Germany 🇩🇪');
 *   } else if (getLocale() === 'nl') {
 *     console.log('Netherlands 🇳🇱');
 *   }
 *
 * @type {() => Locale}
 */
export let getLocale = () => {
	/** @type {string | undefined} */
	let locale;

	for (const strat of strategy) {
		if (strat === "cookie") {
			locale = getLocaleFromCookie();
		}
		if (strat === "baseLocale") {
			locale = baseLocale;
		}
		if (strat === "pathname") {
			locale = localeInPath(window.location.pathname) ?? baseLocale;
		}
		if (strat === "variable") {
			locale = _locale;
		}
		if (strat === "custom") {
			throw new Error("Custom strategy not implemented");
		}
		// check if match, else continue loop
		if (locale !== undefined) {
			return assertIsLocale(locale);
		}
	}

	throw new Error("No locale found. There is an error in your strategy.");
};

function getLocaleFromCookie() {
	const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
	return match?.[2];
}
