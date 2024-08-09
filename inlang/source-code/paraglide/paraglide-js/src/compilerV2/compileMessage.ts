import type { MessageNested } from "@inlang/sdk2"
import { compilePattern } from "./compilePattern.js"
import { escapeForDoubleQuoteString } from "../services/codegen/escape.js"
import { compileExpression } from "./compileExpression.js"
import { mergeTypeRestrictions, type Compilation } from "./types.js"

/**
 * Returns the compiled message as a string
 *
 * @example
 * @param message The message to compile
 * @returns (inputs) => string
 */
export const compileMessage = (message: MessageNested): Compilation => {
	// return empty string instead?
	if (message.variants.length == 0) throw new Error("Message must have at least one variant")
	const hasMultipleVariants = message.variants.length > 1
	return hasMultipleVariants
		? compileMessageWithMultipleVariants(message)
		: compileMessageWithOneVariant(message)
}

function compileMessageWithOneVariant(message: MessageNested): Compilation {
	const variant = message.variants[0]
	if (!variant || message.variants.length !== 1)
		throw new Error("Message must have exactly one variant")
	const hasInputs = message.declarations.some((decl) => decl.type === "input")
	const compiledPattern = compilePattern(message.locale, variant.pattern)
	const code = `(${hasInputs ? "inputs" : ""}) => ${compiledPattern.code}`
	return { code, typeRestrictions: compiledPattern.typeRestrictions }
}

function compileMessageWithMultipleVariants(message: MessageNested): Compilation {
	if (message.variants.length <= 1) throw new Error("Message must have more than one variant")
	const hasInputs = message.declarations.some((decl) => decl.type === "input")

	const compiledSelectors = message.selectors.map((selector) =>
		compileExpression(message.locale, selector)
	)

	const selectorCode = `const selectors = [ ${compiledSelectors
		.map((sel) => sel.code)
		.join(", ")} ]`

	const compiledVariants = message.variants.map((variant): Compilation => {
		const compiledPattern = compilePattern(message.locale, variant.pattern)
		const typeRestrictions = compiledPattern.typeRestrictions

		const allWildcards: boolean = variant.match.every((m: string) => m === "*")
		if (allWildcards) return { code: `return ${compiledPattern.code}`, typeRestrictions }

		const conditions: string[] = []
		for (let i = 0; i < variant.match.length; i++) {
			if (variant.match[i] == "*") continue
			conditions.push(`selectors[${i}] === "${escapeForDoubleQuoteString(variant.match[i])}"`)
		}

		return {
			code: `if (${conditions.join(" && ")}) return ${compiledPattern.code}`,
			typeRestrictions,
		}
	})

	const tr = [
		...compiledVariants.map((v) => v.typeRestrictions),
		...compiledSelectors.map((v) => v.typeRestrictions),
	].reduce(mergeTypeRestrictions, {})

	const code = `(${hasInputs ? "inputs" : ""}) => {
	${selectorCode}
	${compiledVariants.map((l) => `\t${l.code}`).join("\n")}
}`

	return { code, typeRestrictions: tr }
}
