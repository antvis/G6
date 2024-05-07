[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [plugins](../../modules/plugins.md) / MenuConfig

[plugins](../../modules/plugins.md).MenuConfig

The `MenuConfig` interface contains the following properties:

- `handleMenuClick`: An optional function for handling menu click events. It takes two arguments: `target` (of type HTMLElement) and `item` (of type Item), and has no return value.
- `getContent`: An optional function for getting the content of the menu. It takes an optional argument of type `IG6GraphEvent`, and returns a value of type HTMLDivElement, string, or Promise (resolving to HTMLDivElement or string).
- `offsetX`: An optional number representing the offset of the menu in the X direction.
- `offsetY`: An optional number representing the offset of the menu in the Y direction.
- `shouldBegin`: An optional function for determining whether the menu should be displayed. It takes an optional argument of type `IG6GraphEvent`, and returns a boolean value.
- `itemTypes`: An optional array of strings representing the types of items for which the menu is allowed to be displayed.
- `trigger`: An optional string, either 'click' or 'contextmenu', representing the event type that triggers the display of the menu.
- `onHide`: An optional function to be executed when the menu is hidden. It takes no arguments and returns a boolean value.
- `loadingContent`: An optional HTMLDivElement or string representing the loading DOM.
- `liHoverStyle`: An optional object representing the style of li elements when hovered over. It can contain any number of key-value pairs, where the key is a style name and the value is a string.

## Hierarchy

- `IPluginBaseConfig`

  ↳ **`MenuConfig`**

## Properties

### className

• `Optional` **className**: `string`

#### Inherited from

IPluginBaseConfig.className

#### Defined in

[packages/g6/src/types/plugin.ts:6](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L6)

___

### container

• `Optional` **container**: `string` \| `HTMLDivElement`

#### Inherited from

IPluginBaseConfig.container

#### Defined in

[packages/g6/src/types/plugin.ts:5](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L5)

___

### getContent

• `Optional` **getContent**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.md)) => `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Type declaration

▸ (`evt?`): `string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.md) |

##### Returns

`string` \| `HTMLDivElement` \| `Promise`<`string` \| `HTMLDivElement`\>

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:55](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L55)

___

### graph

• `Optional` **graph**: [`IGraph`](../graph/IGraph.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Inherited from

IPluginBaseConfig.graph

#### Defined in

[packages/g6/src/types/plugin.ts:7](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/types/plugin.ts#L7)

___

### handleMenuClick

• `Optional` **handleMenuClick**: (`target`: `HTMLElement`, `item`: `default`) => `void`

#### Type declaration

▸ (`target`, `item`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `HTMLElement` |
| `item` | `default` |

##### Returns

`void`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:53](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L53)

___

### itemTypes

• `Optional` **itemTypes**: `string`[]

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:61](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L61)

___

### liHoverStyle

• `Optional` **liHoverStyle**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:66](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L66)

___

### loadingContent

• `Optional` **loadingContent**: `string` \| `HTMLDivElement`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:65](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L65)

___

### offsetX

• `Optional` **offsetX**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:58](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L58)

___

### offsetY

• `Optional` **offsetY**: `number`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:59](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L59)

___

### onHide

• `Optional` **onHide**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:63](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L63)

___

### shouldBegin

• `Optional` **shouldBegin**: (`evt?`: [`IG6GraphEvent`](../behaviors/IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`evt?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | [`IG6GraphEvent`](../behaviors/IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:60](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L60)

___

### trigger

• `Optional` **trigger**: ``"contextmenu"`` \| ``"click"``

#### Defined in

[packages/g6/src/stdlib/plugin/menu/index.ts:62](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/plugin/menu/index.ts#L62)
