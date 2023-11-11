## brushStyle

**Type**:

```ts
type brushStyle = {
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
  "fill": "#EEF6FF",
  "fillOpacity": 0.4,
  "stroke": "#DDEEFE",
  "lineWidth": 1
}
```

**Required**: false

**Description**: The style of the selection area

## eventName

**Type**: `string`

**Default**: `''`

**Required**: false

**Description**: The event name triggered when selected/deselected

<embed src="./BehaviorItemTypes.en.md"></embed>

## onDeselect

**Type**:

```ts
type onDeselect = (
  selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] },
  deselectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] },
) => void;
```

**Required**: false

**Description**: The callback function when deselected

## onSelect

**Type**:

```ts
type onSelect = (selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] }) => void;
```

**Required**: false

**Description**: The callback function when selected

## selectedState

**Type**: `string`

**Default**: `'selected'`

**Required**: false

**Description**: Switch to this state when highlighted

## selectSetMode

**Type**: `'union'` | `'intersect'` | `'latest'` | `'latest'`

**Default**: `'latest'`

**Required**: false

**Description**: The mode of the select set

<embed src="./BehaviorShouldBegin.zh.md"></embed>

## shouldUpdate

**Type**:

```ts
type shouldUpdate = (itemType: ITEM_TYPE, id: ID, action: 'select' | 'deselect', self: BrushSelect) => boolean;
```

**Default**: `() => {}`

**Required**: false

**Description**: Whether to allow the current node to update the interaction state. When false is returned, you need to manually listen for events and update the state

## trigger

**Type**: `'shift'` | `'ctrl'` | `'alt'` | `'meta'` | `'drag'`

**Default**: `'shift'`

**Required**: false

**Description**: The event type that triggers the interaction

---

```ts
type ID = string | number;

type ITEM_TYPE = 'node' | 'edge' | 'combo';
```
