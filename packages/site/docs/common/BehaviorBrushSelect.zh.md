## brushStyle

**类型**：

```ts
type brushStyle = {
  fill?: string;
  stroke?: string;
  fillOpacity?: number;
  lineWidth?: number;
  [key: string]: unknown;
};
```

**默认值**：

```json
{
  "fill": "#EEF6FF",
  "fillOpacity": 0.4,
  "stroke": "#DDEEFE",
  "lineWidth": 1
}
```

**是否必须**：false

**说明**：选区样式

## eventName

**类型**：`string`

**默认值**：`''`

**是否必须**：false

**说明**：选中/取消选中时触发的事件名

<embed src="./BehaviorItemTypes.zh.md"></embed>

## onDeselect

**类型**：

```ts
type onDeselect = (
  selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] },
  deselectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] },
) => void;
```

**是否必须**：false

**说明**：取消选中时的回调函数

## onSelect

**类型**：

```ts
type onSelect = (selectedIds: { nodes: ID[]; edges: ID[]; combos: ID[] }) => void;
```

**是否必须**：false

**说明**：选中时的回调函数

## selectedState

**类型**：`string`

**默认值**：`'selected'`

**是否必须**：false

**说明**：选中时切换到该状态

## selectSetMode

**类型**：`'union'` | `'intersect'` | `'latest'` | `'latest'`

**默认值**：`'latest'`

**是否必须**：false

**说明**：选区的选择模式

<embed src="./BehaviorShouldBegin.zh.md"></embed>

## shouldUpdate

**类型**：

```ts
type shouldUpdate = (itemType: ITEM_TYPE, id: ID, action: 'select' | 'deselect', self: BrushSelect) => boolean;
```

**是否必须**：false

**是否必须**：false

**说明**：是否允许当前节点更新交互状态。返回 false 时，需要手动监听事件和更新状态

## trigger

**类型**：`'shift'` | `'ctrl'` | `'alt'` | `'meta'` | `'drag'`

**默认值**：`'shift'`

**是否必须**：false

**说明**：触发交互的事件类型

---

```ts
type ID = string | number;

type ITEM_TYPE = 'node' | 'edge' | 'combo';
```
