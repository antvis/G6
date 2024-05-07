[Overview - v5.0.0-alpha.9](../../README.md) / [Modules](../../modules.md) / [behaviors](../../modules/behaviors.md) / ZoomCanvasOptions

[behaviors](../../modules/behaviors.md).ZoomCanvasOptions

## Properties

### enableOptimize

• `Optional` **enableOptimize**: `boolean`

Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while zooming.
TODO: optimize when trigger is upDownKeys

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:10](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L10)

___

### eventName

• `Optional` **eventName**: `string`

The event name to trigger when zoom end.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:34](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L34)

___

### maxZoom

• `Optional` **maxZoom**: `number`

The max value of zoom ratio to constrain the zoom-canvas-3d behavior

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:42](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L42)

___

### minZoom

• `Optional` **minZoom**: `number`

The min value of zoom ratio to constrain the zoom-canvas-3d behavior

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:38](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L38)

___

### secondaryKey

• `Optional` **secondaryKey**: `string`

The assistant secondary key on keyboard. If it is not assigned, the behavior will be triggered when trigger happens.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:22](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L22)

___

### sensitivity

• `Optional` **sensitivity**: `number`

The sensitivity / speed of zooming.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:30](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L30)

___

### shouldBegin

• `Optional` **shouldBegin**: (`event`: [`IG6GraphEvent`](IG6GraphEvent.md)) => `boolean`

#### Type declaration

▸ (`event`): `boolean`

Whether allow the behavior happen on the current item.

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IG6GraphEvent`](IG6GraphEvent.md) |

##### Returns

`boolean`

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:46](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L46)

___

### speedUpKey

• `Optional` **speedUpKey**: `string`

The key on keyboard to speed up translating while pressing and zoom-canvas by direction keys. The trigger should be 'directionKeys' for this option.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:26](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L26)

___

### trigger

• `Optional` **trigger**: ``"wheel"`` \| ``"upDownKeys"``

The trigger for the behavior, 'wheel' by default. 'upDownKeys' means trigger this behavior by up / down keys on keyboard.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:18](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L18)

___

### triggerOnItems

• `Optional` **triggerOnItems**: `boolean`

Whether allow trigger this behavior when wheeling start on nodes / edges / combos.

#### Defined in

[packages/g6/src/stdlib/behavior/zoom-canvas.ts:14](https://github.com/antvis/G6/blob/4b803837a5/packages/g6/src/stdlib/behavior/zoom-canvas.ts#L14)
