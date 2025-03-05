---
title: CollapseExpand
---

Expand/collapse elements by operation.

<embed src="@/common/api/behaviors/collapse-expand.md"></embed>

## Options

### key

> _string_

Behavior key, that is, the unique identifier

Used to identify the behavior for further operations

```typescript
// Update behavior options
graph.updateBehavior({key: 'key', ...});
```

### <Badge type="success">Required</Badge> type

> _string_

Behavior type

### align

> _boolean_

Whether to focus on the target element to avoid view offset

### animation

> _boolean_ **Default:** `true`

Whether to enable animation

### enable

> _boolean \| ((event:_ [Event](/manual/graph-api/event#事件对象属性)_) => boolean)_ **Default:** `true`

Whether to enable the expand/collapse function

### onCollapse

> _(id:_ _string) => void_

Callback when collapse is completed

### onExpand

> _(id:_ _string) => void_

Callback when expand is completed

### trigger

> [CommonEvent.CLICK](/manual/graph-api/event#通用事件-commonevent) _\|_ [CommonEvent.DBLCLICK](/manual/graph-api/event#通用事件-commonevent) **Default:** `'dblclick'`

Trigger method

## API

### CollapseExpand.destroy()

```typescript
destroy(): void;
```

### CollapseExpand.update(options)

```typescript
update(options: Partial<CollapseExpandOptions>): void;
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

options

</td><td>

Partial&lt;[CollapseExpandOptions](#options)>

</td><td>

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
