import { state } from "../utilities/state.js"
import { msg } from "../utilities/messages/msg.js"
import { commands, window } from "vscode"
import { telemetry } from "../services/telemetry/index.js"
import { randomHumanId, type Message } from "@inlang/sdk"
import { CONFIGURATION } from "../configuration.js"
import { getSetting } from "../utilities/settings/index.js"

/**
 * Helps the user to create messages by prompting for the message content.
 */
export const createMessageCommand = {
	command: "sherlock.createMessage",
	title: "Sherlock: Create Message",
	register: commands.registerCommand,
	callback: async function () {
		const baseLocale = state().project.settings.get().baseLocale

		// guard
		if (baseLocale === undefined) {
			return msg(
				"The `sourceLanguageTag` is not defined in the project but required to create a message.",
				"warn",
				"notification"
			)
		}

		const messageValue = await window.showInputBox({
			title: "Enter the message content:",
		})
		if (messageValue === undefined) {
			return
		}

		// create random message id as default value
		const autoHumanId = await getSetting("extract.autoHumanId.enabled").catch(() => true)

		const messageId = await window.showInputBox({
			title: "Enter the ID:",
			value: autoHumanId ? randomHumanId() : "",
			prompt:
				autoHumanId &&
				"Tip: It's best practice to use random names for your messages. Read this [guide](https://inlang.com/documentation/concept/message#idhuman-readable) for more information.",
		})
		if (messageId === undefined) {
			return
		}

		const message: Message = {
			id: messageId,
			alias: {},
			selectors: [],
			variants: [
				{
					languageTag: baseLocale,
					match: [],
					pattern: [
						{
							type: "Text",
							value: messageValue,
						},
					],
				},
			],
		}

		// create message
		const success = state().project.query.messages.create({
			data: message,
		})

		if (!success) {
			return window.showErrorMessage(`Couldn't upsert new message with id ${messageId}.`)
		}

		// Emit event to notify that a message was created
		CONFIGURATION.EVENTS.ON_DID_CREATE_MESSAGE.fire()

		telemetry.capture({
			event: "IDE-EXTENSION command executed: Create Message",
		})
		return msg("Message created.")
	},
} as const
