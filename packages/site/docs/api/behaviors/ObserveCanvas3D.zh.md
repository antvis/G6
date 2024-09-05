---
title: ObserveCanvas3D
---

## 配置项

### enable

> _boolean_

### mode

> _'orbiting' \| 'exploring' \| 'tracking'_

相机模式

- `orbiting` 固定视点(`focalPoint`<!-- -->)，改变相机位置。不能跨越南北极

- `exploring` 固定视点(`focalPoint`<!-- -->)，改变相机位置。可以跨越南北极

- `tracking` 第一人称模式，固定相机位置，改变视点(`focalPoint`<!-- -->)位置

### sensitivity

> _number_

灵敏度

### trigger

> _ShortcutKey_

按下该快捷键配合指针观察场景

## API

### ObserveCanvas3D.destroy()

```typescript
destroy(): void;
```

### ObserveCanvas3D.update(options)

```typescript
update(options: Partial<ObserveCanvas3DOptions>): void;
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

options

</td><td>

Partial&lt;[ObserveCanvas3DOptions](../reference/g6-extension-3d.observecanvas3doptions.zh.md)<!-- -->&gt;

</td><td>

</td></tr>
</tbody></table>

**返回值**<!-- -->：

- **类型：**<!-- -->void

</details>
