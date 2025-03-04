---
title: Layout
order: 6
---

### Graph.getLayout()

Get layout options

```typescript
getLayout(): LayoutOptions;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]

- **Description:** 布局配置

</details>

### Graph.layout()

Execute layout

```typescript
layout(): Promise<void>;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** Promise&lt;void&gt;

</details>

### Graph.setLayout(layout)

Set layout

```typescript
setLayout(layout: LayoutOptions | ((prev: LayoutOptions) => LayoutOptions)): void;
```

**Example**

```ts
graph.setLayout({
  type: 'dagre',
});
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

layout

</td><td>

BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[] \| ((prev: BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]) =&gt; BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[])

</td><td>

布局配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.stopLayout()

Stop layout

```typescript
stopLayout(): void;
```

Suitable for layouts with iterative animations. Currently, `force` belongs to this type of layout, that is, stop the iteration of the force-directed layout. It is generally used to manually stop the iteration animation when the layout iteration time is too long, such as calling in the click canvas/node listener
