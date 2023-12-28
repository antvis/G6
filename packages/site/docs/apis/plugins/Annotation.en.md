---
title: Annotation
order: 15
---

When clicking on a node or edge, annotation content can be added to the pop-up card

<img alt="edge filter lens" src="https://github.com/antvis/G6/assets/6951527/942c5667-63b3-4c46-9e40-6daf64a773da" height='400'/>

## Configurations

### trigger

**Type**：`'click' | 'manual'`

**Default**：`'click`

Event that triggers the display of annotated cards

- `'click'`：Trigger when clicking on a node/edge
- `'manual'`：No events, need to manually call the[```showCard```](#api-showCard) function on the plugin to trigger, suitable for customized development in special scenarios

### containerCfg

**Type**：
```typescript
{
    position?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    width?: number | string;
    height?: number | string;
    offsetX?: number;
    offsetY?: number;
}
```

**Default**：`undefined`

Set the parent element of the card, by default, using the container of ```this.graph``` as the parent element

### editable

**Type**：`boolean`

**Default**：`true`

Set whether the card is editable

### itemHighlightState

**Type**：`string`

**Default**：`highlight`

The highlight status of the item; When the mouse or keyboard is focused on the card, the relevant items will be set to this state

### defaultData

**Type**：`CardConfig[]`

**Default**：`undefined`

Initial card data

### cardCfg

**Type**：`CardConfig[]`

**Default**：
```typescript
{
    maxWidth: 300,
    maxHeight: 500,
    minWidth: 180,
    minHeight: 120,
    width: 180,
    height: 'fit-content',
    visible: true,
    collapsed: false,
    collapseType: 'minimize',
    closeType: 'hide',
    maxTitleLength: 20,
    focusEditOnInit: false,
}
```

Detailed configuration of the card, please refer to [```CardConfig```](#CardConfig) for details

### linkStyle

**Type**：`PathStyleProps`

**Default**：`undefined`

The line style between cards and items (nodes, edges, etc.)

### linkHighlightStyle

**Type**：`PathStyleProps`

**Default**：
```typescript
{
    shadowColor: '#5B8FF9',
    shadowBlur: 10,
}
```

Highlight the style of the connecting lines between cards and items (nodes, edges, etc.)

### getTitle

**Type**：`(item: Item) => string`

**Default**：
```typescript
(item) => {
    const { data, id } = item?.model || {};
    return data?.label || id || '-';
}
```

Initialize the title of the card. When getTitle returns empty, the return of getTitlePlaceholder will be used as the title

### getContent

**Type**：`(item: Item) => string`

**Default**：
```typescript
(item) => {
    if (!item) return '-';
    const { id, data } = item.model || {};
    const type = item.getType?.();
    const suffix = type ? `${type}: ` : '';
    return `${suffix}${data?.label || id || ''}`;
}
```

Initialize the content of the card. When getTitle returns empty, the return of getContentPlaceholder will be used as content

### getTitlePlaceholder

**Type**：`(item: Item) => string`

**Default**：
```typescript
() {
    return '按 回车 保存';
}
```

Return the placeholder of the title of the card

### getContentPlaceholder

**Type**：`(item: Item) => string`

**Default**：
```typescript
() {
    return '按 回车 保存\n按 Shift + 回车 换行';
}
```

Return the placeholder of the content of the card

### onAnnotationChange

**Type**：`(cardInfo: Card, action: 'create' | 'update' | 'show' | 'hide' | 'remove') => void`

**Default**：`undefined`

Triggered when annotation changes

## <a id="CardConfig">CardConfig</a>

Annotation: When creating cards, ```cardCfg``` will be passed into the card constructor, and the type of ```cardCfg``` is ```CardConfig```

### id

**Type**：`string`

The ID of the card, equivalent to ```item.getID()```, where item can be a node or edge

### width

**Type**：`number | string`

The width of the card

### height

**Type**：`number | string`

The height of the card

### minWidth

**Type**：`number | string`

The minimum width of the card

### minHeight

**Type**：`number | string`

The minimum height of the card

### maxWidth

**Type**：`number | string`

The maximum width of the card

### maxHeight

**Type**：`number | string`

The maximum height of the card

### visible

**Type**：`boolean`

Is the card initially visible and defaults to true

### collapsed

**Type**：`boolean`

Whether the card was initially folded, default to false

### x / y

**Type**：`number`

Specify the position and viewport coordinate system, only valid if there is no `containerCfg`

### title

**Type**：`string`

Title of the card

### content

**Type**：`string`

Content of the card

### maxTitleLength

**Type**：`string`

In editing mode, the maximum length of the title input box is set to 20 by default

### collapseType

**Type**：`'minimize' | 'hide'`

How to handle when clicking the fold button

* ```minimize```: By default, the card will be folded

* ```hide```: Hide card, set CSS attribute display: none

### closeType

**Type**：`'hide' | 'remove'`

How to handle when clicking the close button

* ```hide```: Hide card, set CSS attribute display: none, default

* ```remove```: Destroy the card, which will delete the card's dom and related events

### defaultBegin

**Type**：
```typescript
{
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}
```

Specify the starting position of the card. The default location will be in the upper right corner of the container, and multiple cards will be arranged in order from top to bottom

### onMouseEnterIcon

**Type**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
Hover event for close button and fold button

### onMouseLeaveIcon

**Type**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
Hover event for close button and fold button

### onClickIcon

**Type**：
```typescript
(
    evt: MouseEvent,
    id: string,
    type: 'expand' | 'collapse' | 'close',
) => void
```
Click events for close and fold buttons

### focusEditOnInit

**Type**：
```typescript
boolean | EditPosition
```
```typescript
type EditPosition = 'title' | 'content';
```

When creating a card, do you enter edit mode and focus on the card

* ```false```: By default, it will not enter editing mode and requires manual operation
* ```title```: Edit and focus on the title area
* ```content```: Edit and focus on the content area
* ```true```: Switch all areas to editing mode and focus on the title area

## API

### <a id="api-showCard">showCard</a>

**Type**：`(id: CardID) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Generate and display annotation cards by passing in the `id` of a node or edge, and the passed `id` will be used as the node id

### hideCard

**Type**：`(id: CardID) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Hide the annotation card and keep the previous configuration, including text content, position, etc., when opened next time

### editCard

**Type**：`(id: CardID, options?: { position?: EditPosition; value?: any }) => void`

**Related Types**：
```typescript
type EditPosition = 'title' | 'content'
type CardID = number | string
```

**Description**：Activate the card's editing mode, set the area to be edited through `position`, and set the initial content for editing through `value`



### exitEditCard

**Type**：`(id: CardID, options?: { position?: EditPosition }) => void`

**Related Types**：
```typescript
type EditPosition = 'title' | 'content'
type CardID = number | string
```

**Description**：Exit the editing mode of the card and set the area to exit editing through the `position`

### moveCard

**Type**：`(id: CardID, x: number, y: number) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Move the card to `x` / `y`

### focusCard

**Type**：`(id: CardID) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Focus on the specified `id` card and set the focus style


### blurCard

**Type**：`(id: CardID) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Causes the specified `id` card to lose focus and unsets the focus style

### collapseCard

**Type**：`(id: CardID, collapsed?: boolean) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Based on the passed in `collapsed` value, fold or expand the specified `id` card. The folded card only displays the title area and no longer displays the main content area

### removeCard

**Type**：`(id: CardID) => void`

**Related Types**：
```typescript
type CardID = number | string
```

**Description**：Delete the specified `id` card, note that this will delete the card's DOM, edited data, and related events

### saveData

**Type**：`() => AnnotationData`

**Related Types**：
```typescript
type AnnotationData = Array<{
  id: string;
  x?: number;
  y?: number;
  collapsed?: boolean;
  title?: string;
  content?: string;
  visible?: boolean;
}>;
```

**Description**：Export annotation data

### readData

**Type**：`(data: AnnotationData) => void`

**Related Types**：
```typescript
type AnnotationData = Array<{
  id: string;
  x?: number;
  y?: number;
  collapsed?: boolean;
  title?: string;
  content?: string;
  visible?: boolean;
}>;
```

**Description**：Set annotation data