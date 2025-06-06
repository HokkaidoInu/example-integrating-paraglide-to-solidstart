import { registry } from "@inlang/marketplace-registry";
import { parse } from "@opral/markdown-wc";
import type { PageContext } from "#src/renderer/types.js";
import type { PageProps } from "./+Page.jsx";
import type { MarketplaceManifest } from "@inlang/marketplace-manifest";
import fs from "node:fs/promises";
import { redirect } from "vike/abort";

const repositoryRoot = import.meta.url.slice(
	0,
	import.meta.url.lastIndexOf("inlang/packages")
);

// We don't need the return type so we dont define the return type further - this function is only used by vite internaly
export default async function onBeforeRender(
	pageContext: PageContext
): Promise<{ pageContext: any }> {
	const item = registry.find(
		(item: any) => item.uniqueID === pageContext.routeParams.uid
	) as MarketplaceManifest & { uniqueID: string };

	if (!item || item.id.split(".")[0] !== "guide") throw redirect("/not-found");

	if (
		item.id.replaceAll(".", "-").toLowerCase() !==
		pageContext.routeParams.id?.toLowerCase()
	) {
		throw redirect(
			`/g/${item.uniqueID}/${item.id.replaceAll(".", "-").toLowerCase()}`,
			301
		);
	}

	const readme = () => {
		return typeof item.readme === "object" ? item.readme.en : item.readme;
	};

	if (!readme()) throw redirect("/not-found");

	const text = await (readme()!.includes("http")
		? (await fetch(readme()!)).text()
		: await fs.readFile(new URL(readme()!, repositoryRoot), "utf-8"));

	const markdown = await parse(text);

	const recommends = item.recommends
		? registry.filter((i: any) => {
				for (const recommend of item.recommends!) {
					if (recommend.replace("m/", "") === i.uniqueID) return true;
					if (recommend.replace("g/", "") === i.uniqueID) return true;
				}
				return false;
			})
		: undefined;

	return {
		pageContext: {
			pageProps: {
				markdown: markdown.html,
				manifest: item,
				recommends: recommends,
			} satisfies PageProps,
		},
	};
}
