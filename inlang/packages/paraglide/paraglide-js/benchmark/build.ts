import { build } from "vite";
import fs from "node:fs/promises";
import { normalize } from "node:path";
import {
	builds,
	buildConfigToString,
	createViteConfig,
} from "./build.config.ts";
import { compile } from "@inlang/paraglide-js";
import {
	sampleMessages,
	sampleLocales,
	sampleInlangSettings,
} from "./build.samples.ts";

export const runBuilds = async () => {
	// Clean the dist directory
	await fs.rm("./dist", { recursive: true, force: true });

	// copy the message translation files in case a libary needs them
	await fs.mkdir("./dist");

	for (const [i, b] of builds.entries()) {
		// Format library name with mode for display
		const libraryDisplay = `${b.library} (${b.libraryMode})`;

		console.log(`Build ${i + 1} of ${builds.length}:`);
		console.table([
			{
				Locales: b.locales,
				Messages: b.messages,
				"Namespace Size": b.namespaceSize || b.messages,
				"% Dynamic": b.percentDynamic,
				Library: libraryDisplay,
			},
		]);
		const locales = sampleLocales.slice(0, b.locales);

		const base = buildConfigToString(b);
		const outdir = `./dist/${base}`;

		const numDynamic = Math.floor((b.percentDynamic / 100) * b.messages);

		// created generated i18n file

		const libFile = await fs.readFile(`./src/i18n/${b.library}.ts`, "utf-8");
		await fs.writeFile(
			`./src/i18n/generated.ts`,
			libFile + "\nexport const locales = " + JSON.stringify(locales) + ";"
		);

		// generate messages
		const keys = await generateMessages({
			locales,
			numMessages: b.messages,
			numDynamic,
			namespaceSize: b.namespaceSize,
		});

		if (b.library === "paraglide") {
			await compileParaglide({ locales, mode: b.libraryMode });
		}

		// generate pages

		const staticPaths = ["/"];

		if (b.generateAboutPage) {
			staticPaths.push("/about");
		}

		await generatePage({
			path: "/index.ts",
			keys,
			library: b.library,
		});

		if (b.generateAboutPage) {
			await generatePage({
				path: "/about/index.ts",
				keys,
				library: b.library,
			});
		}

		// client side build
		await build(
			createViteConfig({
				buildName: base,
				outdir,
				base,
				mode: "ssg", // Always use SSG mode
				library: b.library,
				libraryMode: b.libraryMode, // Pass libraryMode to Vite config
				generateAboutPage: b.generateAboutPage,
			})
		);

		// server side build
		process.env.BASE = base;
		process.env.LIBRARY = b.library;
		process.env.LIBRARY_MODE = b.libraryMode; // Set libraryMode in environment
		process.env.IS_CLIENT = "false";
		// const rootHtml = await fs.readFile(`./${outdir}/index.html`, "utf-8");
		const { handle } = await import(`./src/entry-server.ts`);

		// render each route
		for (const path of staticPaths) {
			const response = await handle(
				new Request(new URL(path, "http://example.com"))
			);
			const html = await response.text();
			const outputPath = normalize(`./${outdir}/${path}/index.html`);
			await fs.mkdir(normalize(`./${outdir}/${path}`), { recursive: true });
			await fs.writeFile(outputPath, html, "utf-8");
		}
		await fs.cp("./messages", `./dist/${base}/messages`, { recursive: true });
		await fs.rm("./messages", { force: true, recursive: true });
	}
};

async function generatePage(args: {
	path: string;
	keys: string[];
	library: string;
}) {
	// import library specific expressions
	const { refMessage, importExpression } = await import(
		`./src/i18n/${args.library}.ts`
	);

	let paragraphs: string[] = [];

	for (const key of args.keys) {
		if (key.endsWith("dynamic")) {
			paragraphs.push(`\`<p>\${${refMessage(key, { name: "Peter" })}}</p>\``);
		} else {
			paragraphs.push(`\`<p>\${${refMessage(key)}}</p>\``);
		}
	}

	const basePath = args.path === "/index.ts" ? ".." : "../..";

	const page = `${importExpression().replace("<src>", basePath)}

export function Page(): string {
	return shuffleArray([
		${paragraphs.join(",\n")}
	]).join("\\n");
};

// shuffle the paragraphs
// to have a visible difference when switching locales
function shuffleArray (array: any[])  {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};
`;
	await fs.mkdir(`src/pages/about`, { recursive: true });
	await fs.writeFile(`./src/pages${args.path}`, page);
}

/**
 * Generates messages for the given locales.
 *
 * @example
 *   ./
 */
async function generateMessages(args: {
	locales: string[];
	numMessages: number;
	numDynamic: number;
	namespaceSize?: number;
}) {
	// Use namespaceSize if provided, otherwise default to numMessages
	const totalMessages = args.namespaceSize || args.numMessages;

	// Validate that namespace size is not lower than the number of messages
	if (args.namespaceSize && args.namespaceSize < args.numMessages) {
		throw new Error(
			`Namespace size (${args.namespaceSize}) cannot be lower than message count (${args.numMessages})`
		);
	}

	let messages: Record<string, string> = {};
	let msgI = 0;

	// Generate all messages for the namespace
	for (let i = 0; i < totalMessages; i++) {
		if (i < args.numDynamic) {
			messages[`message${i}dynamic`] = sampleMessages[msgI] + " {{name}}";
		} else {
			messages[`message${i}`] = sampleMessages[msgI];
		}
		msgI++;
		// reset the message index to 0 to
		// loop over the samples again
		if (msgI === sampleMessages.length) {
			msgI = 0;
		}
	}

	for (const locale of args.locales) {
		await fs.mkdir(`./messages`, { recursive: true });
		await fs.writeFile(
			`./messages/${locale}.json`,
			JSON.stringify(messages, null, 2)
		);
	}

	// Return only the keys that should be rendered on the page
	// This is limited to numMessages, even if namespaceSize is larger
	return Object.keys(messages).slice(0, args.numMessages);
}

async function compileParaglide(args: { locales: string[]; mode: string }) {
	await fs.mkdir(`./project.inlang`, { recursive: true });
	await fs.writeFile(
		`./project.inlang/settings.json`,
		JSON.stringify(
			{
				...sampleInlangSettings,
				locales: args.locales,
			},
			null,
			2
		)
	);
	await compile({
		project: "./project.inlang",
		outdir: "./src/paraglide",
		isServer: "!process.env.IS_CLIENT",
		experimentalMiddlewareLocaleSplitting:
			args.mode === "experimental-middleware-locale-splitting",
	});
}

if (process.env.RUN_BUILD) {
	await runBuilds();
}
