---
title: FixElementSize
---

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

### combo

Combo configuration for defining which combo attributes should remain fixed in size visually. By default, the entire combo will be fixed

### comboFilter

> _(datum:_ [ComboData](/api/graph/option#combodata)_) => boolean_ **Default:** `() = true`

Combo filter for filtering which combos remain fixed in size during zooming

### edge

Edge configuration for defining which edge attributes should remain fixed in size visually. By default, the lineWidth and labelFontSize attributes are fixed

### edgeFilter

> _(datum:_ [EdgeData](/api/graph/option#edgedata)_) => boolean_ **Default:** `() = true`

Edge filter for filtering which edges remain fixed in size during zooming

### enable

Whether to enable the fix element size behavior. Enabled by default when zooming out

Enabled by default when zooming out, set `enable: (event) => event.data.scale < 1`; If you want to enable it when zooming in, set `enable: (event) => event.data.scale > 1`; If you want to enable it when zooming in and out, set `enable: true`

### node

Node configuration for defining which node attributes should remain fixed in size visually. If not specified (i.e., undefined), the entire node will be fixed in size.

**Example**

如果在缩放过程中希望固定节点主图形的 lineWidth，可以这样配置：

If you want to fix the lineWidth of the key shape of the node during zooming, you can configure it like this:

```ts
{
  node: [{ shape: 'key', fields: ['lineWidth'] }];
}
```

如果在缩放过程中想保持元素标签大小不变，可以这样配置：

If you want to keep the label size of the element unchanged during zooming, you can configure it like this:

```ts
{
  shape: 'label';
}
```

### nodeFilter

> _(datum:_ [NodeData](/api/graph/option#nodedata)_) => boolean_ **Default:** `() = true`

Node filter for filtering which nodes remain fixed in size during zooming

### reset

> _boolean_ **Default:** `false`

Whether to reset styles when elements are redrawn

### state

> _string_ **Default:** ``

Specify the state of elements to be fixed in size

## API

### FixElementSize.destroy()

```typescript
destroy(): void;
```
