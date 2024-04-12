## style

**类型**：

```ts
type style = {
  color?: string;
  stroke?: string;
  fillOpacity?: number;
  lineWidth?: number;
  [key: string]: unknown;
};
```

**默认值**：

```json
{
  "color": "#EEF6FF",
  "fillOpacity": 0.4,
  "stroke": "#DDEEFE",
  "lineWidth": 1
}
```

**是否必须**：false

**说明**：选区样式

## onSelect

**类型**：

```ts
type onSelect = (states: { [key: ID]: string[] }) => { [key: ID]: string[] };
```

**是否必须**：false

**说明**：选中时的回调函数

## state

**类型**：`string`

**默认值**：`'selected' | 'active'`

选中时切换到该状态

## mode

**类型**：`'union' | 'intersect' | 'diff' | 'default'`

**默认值**：`'default'`

选区的选择模式

<embed src="./BehaviorShouldBegin.zh.md"></embed>

## trigger

**类型**：`'shift' | 'ctrl' | 'alt' | 'meta' | 'drag'`

**默认值**：`'shift'`

触发交互的事件类型

## immediately

**类型**：`boolean`

**默认值**：`false`

Real-time departure brush select.

---

```ts
type ID = string | number;

type ITEM_TYPE = 'node' | 'edge' | 'combo';
```
