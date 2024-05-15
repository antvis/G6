---
title: Extension - 扩展
order: 9
---

## 概念

扩展 (Extension) 是 G6 中的一个重要概念，它是 G6 中所有可扩展部分的统称，包括以下几种：

- 动画 (Animation)
- 交互 (Behavior)
- 元素 (Element)
- 节点 (Node)
  - 边 (Edge)
  - 组合 (Combo)
- 布局 (Layout)
- 色板 (Palette)
- 插件 (Plugin)
- 主题 (Theme)
- 数据转换 (Transform)

## 注册扩展

G6 提供了 `register` 函数用于注册扩展，例如：

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomNode } from './my-custom-node';

// 注册节点
register(ExtensionCategory.NODE, 'custom-node', CustomNode);
```

`register` 函数的第一个参数是扩展的类型，第二个参数是扩展的名称，第三个参数是扩展的实现。

不同的扩展类型之间**可以**使用相同的扩展名称，但同一类型的扩展重复注册时仅会在第一次注册时生效。

> 详细的参数签名见：[API 文档](/api/reference/g6/register)

```typescript
// ✅
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
register(ExtensionCategory.COMBO, 'custom-name', CustomCombo);

// ❌
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
```

## 使用扩展

不同的扩展类型的配置位置有所不同，但都是通过指定注册时所使用的名称来使用扩展，例如：

- 使用节点扩展：`options.node.type`
- 使用边扩展：`options.edge.type`
- 使用组合扩展：`options.combo.type`
- 使用交互扩展：`options.behaviors`
- 使用布局扩展：`options.layout.type`
- 使用插件扩展：`options.plugins`
- 使用主题扩展：`options.theme`
- 使用数据转换扩展：`options.transform`
- 使用色板扩展：`options.node.palette` `options.edge.palette` 等
- 使用动画扩展：`options.node.animate` `options.edge.animate` 等

## 获取扩展

G6 提供了 `getExtension` 和 `getExtensions` 方法分别用于获取指定扩展类型下的单个扩展和所有扩展，例如：

```typescript
import { getExtension, getExtensions, ExtensionCategory } from '@antv/g6';

// 获取注册的名称为 'custom-node' 的节点扩展实现
getExtension(ExtensionCategory.NODE, 'custom-node');

// 获取所有注册的节点扩展实现
getExtensions(ExtensionCategory.NODE);
```
