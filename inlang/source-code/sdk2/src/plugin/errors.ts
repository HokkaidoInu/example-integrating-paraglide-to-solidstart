import type { ValueError } from "@sinclair/typebox/errors";

export class PluginError extends Error {
	public readonly plugin: string;

	constructor(message: string, options: { plugin: string; cause?: Error }) {
		super(message);
		this.name = "PluginError";
		this.plugin = options.plugin;
		this.cause = options.cause;
	}
}

/**
 * Error when a plugin does not export any plugins or lint rules.
 */
export class PluginHasNoExportsError extends PluginError {
	constructor(options: { plugin: string; cause?: Error }) {
		super(
			`Plugin "${options.plugin}" has no exports. Every plugin must have an "export default".`,
			options
		);
		this.name = "PluginHasNoExportsError";
	}
}

/**
 * Error when a plugin cannot be imported.
 */
export class PluginImportError extends PluginError {
	constructor(options: { plugin: string; cause: Error }) {
		super(
			`Couldn't import the plugin "${options.plugin}":\n\n${options.cause}`,
			options
		);
		this.name = "PluginImportError";
	}
}

export class PluginExportIsInvalidError extends PluginError {
	constructor(options: { plugin: string; errors: ValueError[] }) {
		super(
			`The export(s) of "${options.plugin}" are invalid:\n\n${options.errors
				.map(
					(error) =>
						`"${error.path}" "${JSON.stringify(error.value, undefined, 2)}": "${
							error.message
						}"`
				)
				.join("\n")}`,
			options
		);
		this.name = "PluginExportIsInvalidError";
	}
}

export class PluginSettingsAreInvalidError extends PluginError {
	constructor(options: { plugin: string; errors: ValueError[] }) {
		super(
			`The settings of "${options.plugin}" are invalid:\n\n${options.errors
				.map(
					(error) =>
						`Path "${error.path}" with value "${JSON.stringify(
							error.value,
							undefined,
							2
						)}": "${error.message}"`
				)
				.join("\n")}`,
			options
		);
		this.name = "PluginSettingsAreInvalidError";
	}
}

/**
 * Error when a plugin does not implement a required function
 */
export class PluginDoesNotImplementFunctionError extends PluginError {
	constructor(options: { plugin: string; function: string }) {
		super(
			`The plugin "${options.plugin}" does not implement the "${options.function}" function`,
			options
		);
		this.name = "PluginDoesNotImplementFunction";
	}
}

/**
 * Error when a plugin was expected to exist, but doesn't
 */
export class PluginMissingError extends PluginError {
	constructor(options: { plugin: string }) {
		super(
			`The plugin "${options.plugin}" does not exist`,
			options
		);
		this.name = "PluginMissingError";
	}
}