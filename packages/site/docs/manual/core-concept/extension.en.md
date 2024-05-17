---
title: extension
order: 9
---

## Concept

Extension is an important concept in G6, it is a general term for all expandable parts in G6, including the following types:

- Animation
- Behavior
- Element
  - Node
  - Edge
  - Combo
- Layout
- Palette
- Plugin
- Theme
- Transform

## Register Extension

G6 provides the `register` function for registering extensions, for example:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { CustomNode } from './my-custom-node';

// # Registering Nodes
register(ExtensionCategory.NODE, 'custom-node', CustomNode);
```

The first parameter of the `register` function is the type of the extension, the second parameter is the name of the extension, and the third parameter is the implementation of the extension.

Different types of extensions **can** use the same extension name, but when registering extensions of the same type, only the first registration will take effect.

> For detailed parameter signatures, see: [API Documentation](/en/api/reference/g6/register)

```typescript
// ✅
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
register(ExtensionCategory.COMBO, 'custom-name', CustomCombo);

// ❌
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
register(ExtensionCategory.NODE, 'custom-name', CustomNode);
```

## Use Extension

The configuration location for different types of extensions varies, but all are used by specifying the name that was used during registration, for example:

- Using node extensions: `options.node.type`
- Using edge extensions: `options.edge.type`
- Using combo extensions: `options.combo.type`
- Using behavior extensions: `options.behaviors`
- Using layout extensions: `options.layout.type`
- Using plugin extensions: `options.plugins`
- Using theme extensions: `options.theme`
- Using data transform extensions: `options.transform`
- Using palette extensions: `options.node.palette`, `options.edge.palette`, etc.
- Using animation extensions: `options.node.animate`, `options.edge.animate`, etc.

## Get Extension

G6 provides the `getExtension` and `getExtensions` methods to obtain a single extension and all extensions of a specified type, respectively, for example:

```typescript
import { getExtension, getExtensions, ExtensionCategory } from '@antv/g6';

// To get the implementation of the node extension registered with the name 'custom-node'
getExtension(ExtensionCategory.NODE, 'custom-node');

// Retrieve all registered node extension implementations
getExtensions(ExtensionCategory.NODE);
```
