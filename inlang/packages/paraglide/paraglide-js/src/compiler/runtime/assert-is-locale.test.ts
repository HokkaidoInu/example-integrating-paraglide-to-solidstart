import { test, expect } from "vitest";
import { createRuntimeForTesting } from "./create-runtime.js";

test("throws if the locale is not available", async () => {
	const runtime = await createRuntimeForTesting({
		baseLocale: "en",
		locales: ["en", "de"],
	});

	expect(() => runtime.assertIsLocale("es")).toThrow();
});

test("passes if the locale is available", async () => {
	const runtime = await createRuntimeForTesting({
		baseLocale: "en",
		locales: ["en", "de"],
	});
	expect(() => runtime.assertIsLocale("en")).not.toThrow();
});

test("the return value is a Locale", async () => {
	const runtime = await createRuntimeForTesting({
		baseLocale: "en",
		locales: ["en", "de"],
	});

	const locale = runtime.assertIsLocale("en");

	// a bit of a wacky test given that locale is `any`
	// in the ambient type definition
	locale satisfies Locale;
});
