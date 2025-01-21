---
title: 布局
order: 6
---

### Graph.getLayout()

获取布局配置

```typescript
getLayout(): LayoutOptions;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]

- **描述：** 布局配置

</details>

### Graph.layout()

执行布局

```typescript
layout(): Promise<void>;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** Promise&lt;void&gt;

</details>

### Graph.setLayout(layout)

设置布局

```typescript
setLayout(layout: LayoutOptions | ((prev: LayoutOptions) => LayoutOptions)): void;
```

**示例**

```ts
graph.setLayout({
  type: 'dagre',
});
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

layout

</td><td>

BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[] \| ((prev: BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[]) =&gt; BuiltInLayoutOptions \| BaseLayoutOptions \| BaseLayoutOptions[])

</td><td>

布局配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.stopLayout()

停止布局

```typescript
stopLayout(): void;
```

适用于带有迭代动画的布局，目前有 `force` 属于此类布局，即停止力导布局的迭代，一般用于布局迭代时间过长情况下的手动停止迭代动画，例如在点击画布/节点的监听中调用
