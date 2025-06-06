[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / createSnapshot

# Function: createSnapshot()

> **createSnapshot**(`args`): `Promise`\<\{ `content`: `null` \| `Record`\<`string`, `any`\>; `id`: `string`; \}\>

Defined in: [packages/lix-sdk/src/snapshot/create-snapshot.ts:15](https://github.com/opral/monorepo/blob/985ffce1eb6542fd7d2a659b02ab83cb2ccd8d57/packages/lix-sdk/src/snapshot/create-snapshot.ts#L15)

Creates a snapshot and inserts it or retrieves the existing snapshot from the database.

Snapshots are content-addressed to avoid storing the same snapshot multiple times.
Hence, an insert might not actually insert a new snapshot but return an existing one.

## Parameters

### args

#### content?

`null` \| `Record`\<`string`, `any`\>

#### lix

`Pick`\<[`Lix`](../type-aliases/Lix.md), `"db"`\>

## Returns

`Promise`\<\{ `content`: `null` \| `Record`\<`string`, `any`\>; `id`: `string`; \}\>

## Example

```ts
  const snapshot = await createSnapshot({ lix, content });
  ```
