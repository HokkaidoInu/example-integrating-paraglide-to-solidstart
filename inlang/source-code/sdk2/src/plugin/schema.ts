import type { TObject } from "@sinclair/typebox";
import type { BundleNested } from "../schema/schemaV2.js";
import type { MessageV1 } from "../schema/schemaV1.js";
import type { ProjectSettings } from "../schema/settings.js";
import type { ResourceFile } from "../project/api.js";

export type InlangPlugin<
	ExternalSettings extends Record<string, any> | unknown = unknown
> = {
	/**
	 * @deprecated Use `key` instead.
	 */
	id?: string;
	/**
	 * The key of the plugin.
	 */
	key: string;
	settingsSchema?: TObject;
	/**
	 * @deprecated Use `importFiles` instead.
	 */
	loadMessages?: (args: {
		settings: ProjectSettings;
		nodeishFs: NodeFsPromisesSubsetLegacy;
	}) => Promise<MessageV1[]> | MessageV1[];
	/**
	 * @deprecated Use `exportFiles` instead.
	 */
	saveMessages?: (args: {
		messages: MessageV1[];
		settings: ProjectSettings;
		nodeishFs: NodeFsPromisesSubsetLegacy;
	}) => Promise<void> | void;
	/**
	 * Import / Export files.
	 * see https://linear.app/opral/issue/MESDK-157/sdk-v2-release-on-sqlite
	 */
	toBeImportedFiles?: (args: {
		settings: ProjectSettings & ExternalSettings;
		nodeFs: NodeFsPromisesSubset;
	}) => Promise<Array<ResourceFile>> | Array<ResourceFile>;
	importFiles?: (args: {
		files: Array<ResourceFile>;
		settings: ProjectSettings & ExternalSettings; // we expose the settings in case the importFunction needs to access the plugin config
	}) => {
		bundles: BundleNested[];
	};
	exportFiles?: (args: {
		bundles: BundleNested[];
		settings: ProjectSettings & ExternalSettings;
	}) => Array<ResourceFile>;
	/**
	 * Define app specific APIs.
	 *
	 * @example
	 * addCustomApi: () => ({
	 *   "app.inlang.ide-extension": {
	 *     messageReferenceMatcher: () => {}
	 *   }
	 *  })
	 */
	addCustomApi?: (args: {
		settings: ProjectSettings & ExternalSettings;
	}) => Record<string, unknown>;
};

/**
 * Exposing only a subset to ease mapping of fs functions.
 *
 * https://github.com/opral/inlang-sdk/issues/136
 */
type NodeFsPromisesSubsetLegacy = {
	readFile: (path: string) => Promise<Buffer>;
	readdir: (path: string) => Promise<string[]>;
	writeFile: (path: string, data: Buffer) => Promise<void>;
	mkdir: (path: string) => Promise<void>;
};

/**
 * Exposing only a subset to ease mapping of fs functions.
 *
 * https://github.com/opral/inlang-sdk/issues/136
 */
type NodeFsPromisesSubset = {
	readFile: (path: string) => Promise<Buffer>;
	readdir: (path: string) => Promise<string[]>;
};