[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / [types](../modules/types.md) / IG6GraphEvent

# Interface: IG6GraphEvent

[types](../modules/types.md).IG6GraphEvent

## Hierarchy

- `Omit`<`FederatedPointerEvent`, ``"currentTarget"``\>

  ↳ **`IG6GraphEvent`**

## Properties

### currentTarget

• **currentTarget**: [`IGraph`](types-IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Defined in

[types/event.ts:42](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/event.ts#L42)

___

### gEvent

• **gEvent**: `Event`

Original event emitted by G

#### Defined in

[types/event.ts:46](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/event.ts#L46)

___

### itemId

• **itemId**: `ID`

#### Defined in

[types/event.ts:44](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/event.ts#L44)

___

### itemType

• **itemType**: ``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``

#### Defined in

[types/event.ts:43](https://github.com/antvis/G6/blob/1eda86a093/packages/g6/src/types/event.ts#L43)
