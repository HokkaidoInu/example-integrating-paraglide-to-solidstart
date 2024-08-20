import { getLeafChange, type Change, type LixPlugin } from "@lix-js/sdk";
import { contentFromDatabase, loadDatabaseInMemory } from "sqlite-wasm-kysely";
import { initKysely } from "../database/initKysely.js";

export const applyChanges: NonNullable<LixPlugin["applyChanges"]> = async ({
	lix,
	file,
	changes,
}) => {
	if (file.path?.endsWith("db.sqlite") === false) {
		throw new Error(
			"Unimplemented. Only the db.sqlite file can be handled for now."
		);
	}
	const sqlite = await loadDatabaseInMemory(file.data);
	const db = initKysely({ sqlite });

	const leafChanges = new Set(
		await Promise.all(
			changes.map(async (change) => {
				const leafChange = await getLeafChange({ change, lix });
				// enable string comparison and avoid duplicates
				return JSON.stringify(leafChange);
			})
		)
	);

	for (const unparsedLeafChange of leafChanges) {
		const leafChange: Change = JSON.parse(unparsedLeafChange);

		// deletion
		if (leafChange.value === undefined) {
			await db
				.deleteFrom(leafChange.type as "bundle" | "message" | "variant")
				.where("id", "=", leafChange.meta?.id)
				.execute();
			continue;
		}

		// upsert the value
		const value = jsonStringifyObjectProperties(leafChange.value) as any;
		await db
			.insertInto(leafChange.type as "bundle" | "message" | "variant")
			.values(value)
			.onConflict((c) => c.column("id").doUpdateSet(value))
			.execute();
	}
	return { fileData: contentFromDatabase(sqlite) };
};

// TODO remove after https://github.com/opral/inlang-message-sdk/issues/123
function jsonStringifyObjectProperties(value: Record<string, any>) {
	const result: Record<string, any> = {};
	for (const key in value) {
		if (typeof value[key] === "object") {
			result[key] = JSON.stringify(value[key]);
		} else {
			result[key] = value[key];
		}
	}
	return result;
}
