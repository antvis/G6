## style

**Type**:

```ts
type style = {
  fill?: string;
  stroke?: string;
  fillOpacity?: number;
  lineWidth?: number;
  [key: string]: unknown;
};
```

**Default**:

```json
{
  "color": "#EEF6FF",
  "fillOpacity": 0.4,
  "stroke": "#DDEEFE",
  "lineWidth": 1
}
```

**Required**: false

**Description**: The style of the selection area

## onSelect

**Type**:

```ts
type onSelect = (states: { [key: ID]: string[] }) => { [key: ID]: string[] };
```

**Required**: false

**Description**: The callback function when deselected

## state

**Type**: `string`

**Default**: `'selected' | 'active'`

Switch to this state when highlighted

## mode

**Type**: `'union' | 'intersect' | 'diff' | 'default'`

**Default**: `'default'`

The mode of the select set

<embed src="./BehaviorShouldBegin.zh.md"></embed>

## trigger

**Type**: `'shift' | 'ctrl' | 'alt' | 'meta' | 'drag'`

**Default**: `'shift'`

The event type that triggers the interaction

## isTimely

**Type**: `boolean`

**Default**: `false`

The event type that triggers the interaction

---

```ts
type ID = string | number;

type ITEM_TYPE = 'node' | 'edge' | 'combo';
```
