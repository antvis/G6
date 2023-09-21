---
title: IG6GraphEvent
---

[Overview - v5.0.0-beta.10](../../README.en.md) / [Modules](../../modules.en.md) / [behaviors](../../modules/behaviors.en.md) / IG6GraphEvent

[behaviors](../../modules/behaviors.en.md).IG6GraphEvent

## Hierarchy

- `Omit`<`FederatedPointerEvent`, `"currentTarget"`\>

  ↳ **`IG6GraphEvent`**

## Methods

### clone

▸ **clone**(): `FederatedPointerEvent`

#### Returns

`FederatedPointerEvent`

**`See`**

https://github.com/antvis/G/issues/1115
We currently reuses event objects in the event system,
avoiding the creation of a large number of event objects.
Reused objects are only used to carry different data,
such as coordinate information, native event objects,
and therefore the lifecycle is limited to the event handler,
which can lead to unintended consequences if an attempt is made to cache the entire event object.

Therefore, while keeping the above performance considerations in mind, it is possible to provide a clone method that creates a new object when the user really wants to cache it, e.g.

#### Inherited from

Omit.clone

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:86

---

### composedPath

▸ **composedPath**(): `IEventTarget`[]

The propagation path for this event

#### Returns

`IEventTarget`[]

**`See`**

- https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composedPath

So composedPath()[0] represents the original target.

- https://polymer-library.polymer-project.org/3.0/docs/devguide/events#retargeting

#### Inherited from

Omit.composedPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:110

---

### getCoalescedEvents

▸ **getCoalescedEvents**(): `PointerEvent`[]

#### Returns

`PointerEvent`[]

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents

#### Inherited from

Omit.getCoalescedEvents

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:70

---

### getModifierState

▸ **getModifierState**(`key`): `boolean`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `key` | `string` |

#### Returns

`boolean`

#### Inherited from

Omit.getModifierState

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:50

---

### getPredictedEvents

▸ **getPredictedEvents**(): `PointerEvent`[]

#### Returns

`PointerEvent`[]

**`See`**

https://chromestatus.com/feature/5765569655603200

#### Inherited from

Omit.getPredictedEvents

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:74

---

### initEvent

▸ **initEvent**(): `void`

added for compatibility with DOM Event,
deprecated props and methods

#### Returns

`void`

#### Inherited from

Omit.initEvent

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:135

---

### initMouseEvent

▸ **initMouseEvent**(): `void`

#### Returns

`void`

#### Inherited from

Omit.initMouseEvent

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:51

---

### initUIEvent

▸ **initUIEvent**(): `void`

#### Returns

`void`

#### Inherited from

Omit.initUIEvent

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:136

---

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault

#### Inherited from

Omit.preventDefault

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:118

---

### stopImmediatePropagation

▸ **stopImmediatePropagation**(): `void`

#### Returns

`void`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation

#### Inherited from

Omit.stopImmediatePropagation

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:122

---

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation

#### Inherited from

Omit.stopPropagation

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:126

## Properties

### AT_TARGET

• **AT_TARGET**: `number`

#### Inherited from

Omit.AT_TARGET

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:145

---

### BUBBLING_PHASE

• **BUBBLING_PHASE**: `number`

#### Inherited from

Omit.BUBBLING_PHASE

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:146

---

### CAPTURING_PHASE

• **CAPTURING_PHASE**: `number`

#### Inherited from

Omit.CAPTURING_PHASE

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:144

---

### NONE

• **NONE**: `number`

#### Inherited from

Omit.NONE

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:143

---

### altKey

• **altKey**: `boolean`

Whether the "alt" key was pressed when this mouse event occurred.

#### Inherited from

Omit.altKey

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:6

---

### bubbles

• **bubbles**: `boolean`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles

#### Inherited from

Omit.bubbles

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:36

---

### button

• **button**: `number`

The specific button that was pressed in this mouse event.

#### Inherited from

Omit.button

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:8

---

### buttons

• **buttons**: `number`

The button depressed when this event occurred.

#### Inherited from

Omit.buttons

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:10

---

### cancelBubble

• **cancelBubble**: `boolean`

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelBubble

#### Inherited from

Omit.cancelBubble

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:40

---

### cancelable

• `Readonly` **cancelable**: `false`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable

#### Inherited from

Omit.cancelable

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:44

---

### canvas

• **canvas**: `Point`

relative to Canvas, origin is left-top

#### Inherited from

Omit.canvas

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:86

---

### canvasX

• **canvasX**: `number`

#### Inherited from

Omit.canvasX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:89

---

### canvasY

• **canvasY**: `number`

#### Inherited from

Omit.canvasY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:90

---

### client

• **client**: `Point`

The coordinates of the mouse event relative to the canvas.

#### Inherited from

Omit.client

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:22

---

### clientX

• **clientX**: `number`

#### Inherited from

Omit.clientX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:23

---

### clientY

• **clientY**: `number`

#### Inherited from

Omit.clientY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:24

---

### composed

• `Readonly` **composed**: `false`

#### Inherited from

Omit.composed

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:140

---

### ctrlKey

• **ctrlKey**: `boolean`

Whether the "control" key was pressed when this mouse event occurred.

#### Inherited from

Omit.ctrlKey

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:12

---

### currentTarget

• **currentTarget**: [`IGraph`](../graph/IGraph.en.md)<`BehaviorRegistry`, `ThemeRegistry`\>

#### Defined in

[packages/g6/src/types/event.ts:42](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/event.ts#L42)

---

### defaultPrevented

• **defaultPrevented**: `boolean`

Flags whether the default response of the user agent was prevent through this event.

#### Inherited from

Omit.defaultPrevented

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:48

---

### detail

• **detail**: `any`

Event-specific detail

#### Inherited from

Omit.detail

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:66

---

### eventPhase

• **eventPhase**: `number`

The propagation phase.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase

#### Inherited from

Omit.eventPhase

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:27

---

### gEvent

• **gEvent**: `Event`

Original event emitted by G

#### Defined in

[packages/g6/src/types/event.ts:46](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/event.ts#L46)

---

### global

• **global**: `Point`

The pointer coordinates in world space.

#### Inherited from

Omit.global

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:41

---

### globalX

• **globalX**: `number`

#### Inherited from

Omit.globalX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:42

---

### globalY

• **globalY**: `number`

#### Inherited from

Omit.globalY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:43

---

### height

• **height**: `number`

The height of the pointer's contact along the y-axis, measured in CSS pixels.
radiusY of TouchEvents will be represented by this value.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height

#### Inherited from

Omit.height

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:22

---

### isPrimary

• **isPrimary**: `boolean`

Indicates whether or not the pointer device that created the event is the primary pointer.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary

#### Inherited from

Omit.isPrimary

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:28

---

### isTrusted

• **isTrusted**: `boolean`

#### Inherited from

Omit.isTrusted

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:141

---

### itemId

• **itemId**: `ID`

#### Defined in

[packages/g6/src/types/event.ts:44](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/event.ts#L44)

---

### itemType

• **itemType**: `"node"` \| `"edge"` \| `"combo"` \| `"canvas"`

#### Defined in

[packages/g6/src/types/event.ts:43](https://github.com/antvis/G6/blob/61e525e59b/packages/g6/src/types/event.ts#L43)

---

### layer

• **layer**: `Point`

The coordinates of the evnet relative to the nearest DOM layer.
This is a non-standard property.

#### Inherited from

Omit.layer

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:71

---

### layerX

• **layerX**: `number`

#### Inherited from

Omit.layerX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:72

---

### layerY

• **layerY**: `number`

#### Inherited from

Omit.layerY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:73

---

### manager

• **manager**: `EventService`

#### Inherited from

Omit.manager

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:64

---

### metaKey

• **metaKey**: `boolean`

Whether the "meta" key was pressed when this mouse event occurred.

#### Inherited from

Omit.metaKey

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:14

---

### movement

• **movement**: `Point`

The movement in this pointer relative to the last `mousemove` event.

#### Inherited from

Omit.movement

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:28

---

### movementX

• **movementX**: `number`

#### Inherited from

Omit.movementX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:29

---

### movementY

• **movementY**: `number`

#### Inherited from

Omit.movementY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:30

---

### name

• **name**: `string`

#### Inherited from

Omit.name

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:22

---

### nativeEvent

• **nativeEvent**: `MouseEvent` \| `PointerEvent` \| `TouchEvent`

the original event.

#### Inherited from

Omit.nativeEvent

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:57

---

### offset

• **offset**: `Point`

The offset of the pointer coordinates w.r.t. target DisplayObject in world space. This is
not supported at the moment.

#### Inherited from

Omit.offset

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:35

---

### offsetX

• **offsetX**: `number`

#### Inherited from

Omit.offsetX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:36

---

### offsetY

• **offsetY**: `number`

#### Inherited from

Omit.offsetY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:37

---

### originalEvent

• **originalEvent**: `FederatedEvent`<`MouseEvent` \| `PointerEvent` \| `TouchEvent`, `any`\>

The original event that caused this event, if any.

#### Inherited from

Omit.originalEvent

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:59

---

### page

• **page**: `Point`

The coordinates of the event relative to the DOM document.
This is a non-standard property.
relative to the DOM document.

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX

#### Inherited from

Omit.page

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:80

---

### pageX

• **pageX**: `number`

#### Inherited from

Omit.pageX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:81

---

### pageY

• **pageY**: `number`

#### Inherited from

Omit.pageY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:82

---

### path

• **path**: `IEventTarget`[]

#### Inherited from

Omit.path

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:102

---

### pointerId

• **pointerId**: `number`

The unique identifier of the pointer.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId

#### Inherited from

Omit.pointerId

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:8

---

### pointerType

• **pointerType**: `string`

The type of pointer that triggered the event.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType

#### Inherited from

Omit.pointerType

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:34

---

### pressure

• **pressure**: `number`

Pressure applied by the pointing device during the event.
s
A Touch's force property will be represented by this value.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure

#### Inherited from

Omit.pressure

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:42

---

### propagationImmediatelyStopped

• **propagationImmediatelyStopped**: `boolean`

Flags whether propagation was immediately stopped.

#### Inherited from

Omit.propagationImmediatelyStopped

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:63

---

### propagationPath

• **propagationPath**: `IEventTarget`[]

#### Inherited from

Omit.propagationPath

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:114

---

### propagationStopped

• **propagationStopped**: `boolean`

Flags whether propagation was stopped.

#### Inherited from

Omit.propagationStopped

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:61

---

### relatedTarget

• **relatedTarget**: `DisplayObject`<`any`, `any`\>

This is currently not implemented in the Federated Events API.

#### Inherited from

Omit.relatedTarget

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:16

---

### returnValue

• **returnValue**: `boolean`

#### Inherited from

Omit.returnValue

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:138

---

### screen

• **screen**: `Point`

The pointer coordinates in sceen space.

#### Inherited from

Omit.screen

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:47

---

### screenX

• **screenX**: `number`

#### Inherited from

Omit.screenX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:48

---

### screenY

• **screenY**: `number`

#### Inherited from

Omit.screenY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:49

---

### shiftKey

• **shiftKey**: `boolean`

Whether the "shift" key was pressed when this mouse event occurred.

#### Inherited from

Omit.shiftKey

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedMouseEvent.d.ts:18

---

### srcElement

• **srcElement**: `IEventTarget`

#### Inherited from

Omit.srcElement

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:139

---

### tangentialPressure

• **tangentialPressure**: `number`

Barrel pressure on a stylus pointer.

**`See`**

https://w3c.github.io/pointerevents/#pointerevent-interface

#### Inherited from

Omit.tangentialPressure

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:48

---

### target

• **target**: `IEventTarget`

can be used to implement event delegation

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target

#### Inherited from

Omit.target

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:32

---

### tiltX

• **tiltX**: `number`

The angle, in degrees, between the pointer device and the screen.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX

#### Inherited from

Omit.tiltX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:54

---

### tiltY

• **tiltY**: `number`

The angle, in degrees, between the pointer device and the screen.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY

#### Inherited from

Omit.tiltY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:60

---

### timeStamp

• **timeStamp**: `number`

timestamp when the event created

**`See`**

https://developer.mozilla.org/zh-CN/docs/Web/API/Event/timeStamp

#### Inherited from

Omit.timeStamp

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:53

---

### twist

• **twist**: `number`

Twist of a stylus pointer.

**`See`**

https://w3c.github.io/pointerevents/#pointerevent-interface

#### Inherited from

Omit.twist

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:66

---

### type

• **type**: `string`

The type of event, supports the following:

- pointerdown
- touchstart
- mousedown
- rightdown
- ...

#### Inherited from

Omit.type

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:18

---

### view

• **view**: `any`

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view

#### Inherited from

Omit.view

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:130

---

### viewport

• **viewport**: `Point`

relative to Viewport, account for Camera

#### Inherited from

Omit.viewport

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:94

---

### viewportX

• **viewportX**: `number`

#### Inherited from

Omit.viewportX

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:95

---

### viewportY

• **viewportY**: `number`

#### Inherited from

Omit.viewportY

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:96

---

### which

• **which**: `number`

#### Inherited from

Omit.which

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:137

---

### width

• **width**: `number`

The width of the pointer's contact along the x-axis, measured in CSS pixels.
radiusX of TouchEvents will be represented by this value.

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width

#### Inherited from

Omit.width

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedPointerEvent.d.ts:15

---

### x

• **x**: `number`

#### Inherited from

Omit.x

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:87

---

### y

• **y**: `number`

#### Inherited from

Omit.y

#### Defined in

node_modules/.pnpm/@antv+g-lite@1.2.12/node_modules/@antv/g-lite/dist/dom/FederatedEvent.d.ts:88
