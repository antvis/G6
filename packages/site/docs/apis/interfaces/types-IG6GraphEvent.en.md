[Overview - v5.0.0-alpha.9](../README.en.md) / [Modules](../modules.en.md) / [types](../modules/types.en.md) / IG6GraphEvent

# Interface: IG6GraphEvent

[types](../modules/types.en.md).IG6GraphEvent

## Hierarchy

- `Omit`<`FederatedPointerEvent`, ``"currentTarget"``\>

  ↳ **`IG6GraphEvent`**

## Properties

### currentTarget

• **currentTarget**: [`IGraph`](types-IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Defined in

[types/event.ts:42](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/event.ts#L42)

___

### gEvent

• **gEvent**: `Event`

Original event emitted by G

#### Defined in

[types/event.ts:46](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/event.ts#L46)

___

### itemId

• **itemId**: `ID`

#### Defined in

[types/event.ts:44](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/event.ts#L44)

___

### itemType

• **itemType**: ``"node"`` \| ``"edge"`` \| ``"combo"`` \| ``"canvas"``

#### Defined in

[types/event.ts:43](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/event.ts#L43)
