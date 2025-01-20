---
title: 画布
order: 1
---

### Graph.clear()

清空画布元素

```typescript
clear(): Promise<void>;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：**Promise&lt;void&gt;

</details>

### Graph.getCanvas()

获取画布实例

```typescript
getCanvas(): Canvas;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：**[Canvas](../api/reference/g6.canvas.zh.md)

- **描述：**画布实例

</details>

### Graph.getSize()

获取当前画布容器的尺寸

```typescript
getSize(): [number, number];
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：**[number, number]

- **描述：**画布尺寸

</details>

### Graph.setSize(width, height)

设置当前画布容器的尺寸

```typescript
setSize(width: number, height: number): void;
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

width

</td><td>

number

</td><td>

画布宽度

</td></tr>
<tr><td>

height

</td><td>

number

</td><td>

画布高度

</td></tr>
</tbody></table>

**返回值**：

- **类型：**void

</details>
