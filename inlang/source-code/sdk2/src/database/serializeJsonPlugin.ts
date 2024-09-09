import {
	OperationNodeTransformer,
	sql,
	ValueListNode,
	ValueNode,
	ValuesNode,
	type KyselyPlugin,
	type PluginTransformQueryArgs,
	type PluginTransformResultArgs,
	type QueryResult,
	type RootOperationNode,
	type UnknownRow,
} from "kysely";

export class SerializeJsonPlugin implements KyselyPlugin {
	#parseJsonTransformer = new ParseJsonTransformer();

	transformQuery(args: PluginTransformQueryArgs): RootOperationNode {
		if (
			args.node.kind === "InsertQueryNode" ||
			args.node.kind === "UpdateQueryNode"
		) {
			const result = this.#parseJsonTransformer.transformNode(args.node);

			return result;
		}
		return args.node;
	}

	async transformResult(
		args: PluginTransformResultArgs
	): Promise<QueryResult<UnknownRow>> {
		return args.result;
	}
}

class ParseJsonTransformer extends OperationNodeTransformer {
	protected override transformValueList(node: ValueListNode): ValueListNode {
		return super.transformValueList({
			...node,
			values: node.values.map((listNodeItem) => {
				if (listNodeItem.kind !== "ValueNode") {
					return listNodeItem;
				}

				// @ts-ignore
				const { value } = listNodeItem;

				const serializedValue = maybeSerializeJson(value);

				if (value === serializedValue) {
					return listNodeItem;
				}

				// TODO use jsonb. depends on parsing again
				// https://github.com/opral/inlang-sdk/issues/132
				return sql`json(${serializedValue})`.toOperationNode();
			}),
		});
	}

	/**
	 * Directly transform the value to a json value.
	 *
	 * Input: { value: { a: 1 } }
	 * Output: { value: "{ a: 1 }"" }
	 */
	protected override transformValue(node: ValueNode): ValueNode {
		const { value } = node;

		const serializedValue = maybeSerializeJson(value);

		if (value === serializedValue) {
			return node;
		}
		return { ...node, value: serializedValue };
	}

	override transformValues(node: ValuesNode): ValuesNode {
		return super.transformValues({
			...node,
			values: node.values.map((valueItemNode) => {
				if (valueItemNode.kind !== "PrimitiveValueListNode") {
					return valueItemNode;
				}

				return {
					kind: "ValueListNode",
					values: valueItemNode.values.map(
						(value) =>
							({
								kind: "ValueNode",
								value,
							} as ValueNode)
					),
				} as ValueListNode;
			}),
		});
	}
}

function maybeSerializeJson(value: any): any {
	if (
		// binary data
		value instanceof ArrayBuffer ||
		// uint8array, etc
		ArrayBuffer.isView(value) ||
		value === null ||
		value === undefined
	) {
		return value;
	} else if (typeof value === "object" || Array.isArray(value)) {
		return JSON.stringify(value);
	}
	return value;
}
