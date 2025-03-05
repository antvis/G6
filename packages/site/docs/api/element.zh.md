---
title: 元素操作
order: 1
---

## 元素操作概述

G6 中的 [元素](/manual/element/overview) 操作 API 允许您控制图中节点、边和组合(Combo)等元素的行为和属性。这些 API 可以用于：

1. **元素状态管理**：设置、更新或移除元素的状态
2. **元素显示控制**：控制元素的层级、可见性
3. **元素展开/收起**：操作可折叠元素的展开/收起状态
4. **元素位置操作**：移动、对齐元素位置
5. **元素聚焦**：将视口聚焦到特定元素

通过这些操作，您可以实现丰富的交互效果和视觉呈现。

## API 参考

### Graph.getElementPosition(id)

获取元素位置。

```typescript
getElementPosition(id: ID): Point;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: [number, number] \| [number, number, number]
- **描述**: 返回元素的坐标位置

**示例**:

```typescript
graph.getElementPosition('node1');
```

### Graph.getElementRenderBounds(id)

获取元素自身以及子节点在世界坐标系下的渲染包围盒。

```typescript
getElementRenderBounds(id: ID): AABB;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: [AABB](#aabb)
- **描述**: 返回元素的渲染包围盒

### Graph.getElementRenderStyle(id)

获取元素的渲染样式。

```typescript
getElementRenderStyle(id: ID): Record<string, any>;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: Record\<string, any\>
- **描述**: 返回元素的渲染样式

### Graph.getElementState(id)

获取元素的状态。

```typescript
getElementState(id: ID): State[];
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: [State](#state)[]
- **描述**: 返回元素的状态

### Graph.getElementType(id)

获取元素类型。

```typescript
getElementType(id: ID): string;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: string
- **描述**: 返回元素的类型

### Graph.getElementVisibility(id)

获取元素可见性。

```typescript
getElementVisibility(id: ID): 'visible' | 'hidden' ;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: 'visible' | 'hidden'
- **描述**: 返回元素的可见性

### Graph.getElementZIndex(id)

获取元素层级。

```typescript
getElementZIndex(id: ID): number;
```

**参数**:

| 参数 | 描述    | 类型   | 默认值 | 必选 |
| ---- | ------- | ------ | ------ | ---- |
| id   | 元素 ID | string | -      | ✓    |

**返回值**:

- **类型**: number
- **描述**: 返回元素的层级

### Graph.setElementState(id, state, options)

设置元素状态，支持两种调用方式：

```typescript
// 设置单个元素状态
setElementState(id: ID, state: State | State[], animation?: boolean): Promise<void>;

// 批量设置元素状态
setElementState(state: Record<ID, State | State[]>, animation?: boolean): Promise<void>;
```

**参数**:

**单个元素状态设置**

| 参数      | 描述                | 类型                       | 默认值 | 必选 |
| --------- | ------------------- | -------------------------- | ------ | ---- |
| id        | 要设置状态的元素 ID | string                     | -      | ✓    |
| state     | 要设置的状态        | [State](#state) \| State[] | -      | ✓    |
| animation | 是否启用动画        | boolean                    | -      |      |

**批量元素状态设置**

| 参数      | 描述               | 类型                                   | 默认值 | 必选 |
| --------- | ------------------ | -------------------------------------- | ------ | ---- |
| state     | 元素ID到状态的映射 | Record<ID, [State](#state) \| State[]> | -      | ✓    |
| animation | 是否启用动画       | boolean                                | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，状态设置操作完成后 resolve

**示例**:

```typescript
// 设置单个元素状态
await graph.setElementState('node1', 'selected');

// 设置多个元素状态
await graph.setElementState({
  node1: 'selected',
  node2: 'hover',
  node3: ['selected', 'hover'],
});
```

### Graph.setElementVisibility(id, visibility, animation)

设置元素的可见性，支持两种调用方式：

```typescript
// 设置单个元素可见性
setElementVisibility(id: ID, visibility: 'visible' | 'hidden', animation?: boolean): Promise<void>;

// 批量设置元素可见性
setElementVisibility(visibility: Record<ID, 'visible' | 'hidden'>, animation?: boolean): Promise<void>;
```

**参数**:

**单个元素可见性设置**

| 参数       | 描述                  | 类型                      | 默认值 | 必选 |
| ---------- | --------------------- | ------------------------- | ------ | ---- |
| id         | 要设置可见性的元素 ID | string                    | -      | ✓    |
| visibility | 要设置的可见性        | `'visible'` \| `'hidden'` | -      | ✓    |
| animation  | 是否启用动画          | boolean                   | -      |      |

**批量元素可见性设置**

| 参数       | 描述                 | 类型                                  | 默认值 | 必选 |
| ---------- | -------------------- | ------------------------------------- | ------ | ---- |
| visibility | 元素ID到可见性的映射 | Record<ID, `'visible'` \| `'hidden'`> | -      | ✓    |
| animation  | 是否启用动画         | boolean                               | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，可见性设置操作完成后 resolve

**示例**:

```typescript
// 设置单个元素可见性
await graph.setElementVisibility('node1', 'hidden');

// 设置多个元素可见性
await graph.setElementVisibility({
  node1: 'hidden',
  node2: 'visibility',
});
```

### Graph.setElementZIndex(id, zIndex)

设置元素的层级，有两种调用方式：

```typescript
// 设置单个元素层级
setElementZIndex(id: ID, zIndex: number): Promise<void>;

// 批量设置元素层级
setElementZIndex(zIndex: Record<ID, number>): Promise<void>;
```

**参数**:

**单个元素层级设置**

| 参数   | 描述    | 类型   | 默认值 | 必选 |
| ------ | ------- | ------ | ------ | ---- |
| id     | 元素 ID | string | -      | ✓    |
| zIndex | 层级    | number | -      | ✓    |

**批量元素层级设置**

| 参数   | 描述               | 类型               | 默认值 | 必选 |
| ------ | ------------------ | ------------------ | ------ | ---- |
| zIndex | 元素ID到层级的映射 | Record<ID, number> | -      | ✓    |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，层级设置操作完成后 resolve

**示例**:

```typescript
// 设置单个元素层级
await graph.setElementZIndex('node1', 10);

// 设置多个元素层级
await graph.setElementZIndex({
  node1: 10,
  node2: 20,
  node3: 30,
});
```

### Graph.setNode(node)

设置节点样式映射。即 `options.node` 的值。

```typescript
setNode(node: NodeOptions): void;
```

**参数**:

| 参数 | 描述     | 类型                                         | 默认值 | 必选 |
| ---- | -------- | -------------------------------------------- | ------ | ---- |
| node | 节点配置 | [NodeOptions](/manual/element/node/overview) | -      | ✓    |

**示例**:

```typescript
// 设置所有的节点填充色为红色
graph.setNode({
  style: {
    fill: 'red',
  },
});
```

### Graph.setEdge(edge)

设置边样式映射。即 `options.edge` 的值。

```typescript
setEdge(edge: EdgeOptions): void;
```

**参数**:

| 参数 | 描述   | 类型                                         | 默认值 | 必选 |
| ---- | ------ | -------------------------------------------- | ------ | ---- |
| edge | 边配置 | [EdgeOptions](/manual/element/edge/overview) | -      | ✓    |

### Graph.setCombo(combo)

设置组合样式映射。即 `options.combo` 的值。

```typescript
setCombo(combo: ComboOptions): void;
```

**参数**:

| 参数  | 描述     | 类型                                           | 默认值 | 必选 |
| ----- | -------- | ---------------------------------------------- | ------ | ---- |
| combo | 组合配置 | [ComboOptions](/manual/element/combo/overview) | -      | ✓    |

### Graph.collapseElement(id, options)

收起指定元素，通常用于折叠组合(Combo)或具有子元素的节点。

```typescript
collapseElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

**参数**:

| 参数    | 描述                               | 类型                                                               | 默认值 | 必选 |
| ------- | ---------------------------------- | ------------------------------------------------------------------ | ------ | ---- |
| id      | 要收起的元素 ID                    | string                                                             | -      | ✓    |
| options | 是否启用动画或收起节点的详细配置项 | boolean \| [CollapseExpandNodeOptions](#collapseexpandnodeoptions) | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，收起操作完成后 resolve

**示例**:

```typescript
// 简单收起，使用默认配置
await graph.collapseElement('combo1');

// 收起并启用动画
await graph.collapseElement('combo1', true);

// 收起并保证展开/收起的节点位置不变
await graph.collapseElement('combo1', {
  align: true,
});
```

### Graph.expandElement(id, options)

展开指定元素，通常用于展开先前收起的组合(Combo)或节点。

```typescript
expandElement(id: ID, options?: boolean | CollapseExpandNodeOptions): Promise<void>;
```

**参数**:

| 参数    | 描述                               | 类型                                                               | 默认值 | 必选 |
| ------- | ---------------------------------- | ------------------------------------------------------------------ | ------ | ---- |
| id      | 要展开的元素 ID                    | string                                                             | -      | ✓    |
| options | 是否启用动画或展开节点的详细配置项 | boolean \| [CollapseExpandNodeOptions](#collapseexpandnodeoptions) | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，展开操作完成后 resolve

**示例**:

```typescript
// 简单展开，使用默认配置
await graph.expandElement('combo1');

// 展开并启用动画
await graph.expandElement('combo1', true);

// 展开并保证展开/收起的节点位置不变
await graph.expandElement('combo1', {
  align: true,
});
```

### Graph.frontElement(id)

将指定元素置于最顶层，使其显示在其他重叠元素之上。

```typescript
frontElement(id: ID | ID[]): void;
```

**参数**:

| 参数 | 描述    | 类型               | 默认值 | 必选 |
| ---- | ------- | ------------------ | ------ | ---- |
| id   | 元素 ID | string \| string[] | -      | ✓    |

**返回值**:

- **类型**: void

**示例**:

```typescript
// 将节点置于最顶层
graph.frontElement('node1');

// 对于选中的多个节点，都置于最顶层
graph.frontElement(['node1', 'node2', 'node3']);
```

### Graph.showElement(id, animation)

显示指定元素。

```typescript
showElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

**参数**:

| 参数      | 描述         | 类型               | 默认值 | 必选 |
| --------- | ------------ | ------------------ | ------ | ---- |
| id        | 元素 ID      | string \| string[] | -      | ✓    |
| animation | 是否启用动画 | boolean            | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，显示操作完成后 resolve

**示例**:

```typescript
// 显示单个元素
await graph.showElement('node1');

// 带动画显示元素
await graph.showElement('node1', true);

// 显示多个元素
await graph.showElement(['node1', 'node2', 'node3']);
```

### Graph.hideElement(id, animation)

隐藏指定元素。

```typescript
hideElement(id: ID | ID[], animation?: boolean): Promise<void>;
```

**参数**:

| 参数      | 描述         | 类型               | 默认值 | 必选 |
| --------- | ------------ | ------------------ | ------ | ---- |
| id        | 元素 ID      | string \| string[] | -      | ✓    |
| animation | 是否启用动画 | boolean            | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，隐藏操作完成后 resolve

**示例**:

```typescript
// 无动画隐藏元素
await graph.hideElement('node1');

// 带动画隐藏元素
await graph.hideElement('node1', true);

// 隐藏多个元素
await graph.hideElement(['node1', 'node2', 'node3'], true);
```

### Graph.translateElementBy(id, offset, animation)

相对平移元素指定距离，支持两种调用方式：

```typescript
// 将元素平移指定距离（相对平移）
translateElement(id: ID, offset: Point, animation?: boolean): Promise<void>;

// 批量将元素平移指定距离（相对平移）
translateElement(offsets: Record<ID, Point>, animation?: boolean): Promise<void>;
```

**参数**:

**单个元素平移**

| 参数      | 描述                    | 类型             | 默认值 | 必选 |
| --------- | ----------------------- | ---------------- | ------ | ---- |
| id        | 要平移的元素 ID         | string           | -      | ✓    |
| offset    | 平移的相对距离 [dx, dy] | [number, number] | -      | ✓    |
| animation | 是否启用动画            | boolean          | -      |      |

**批量元素平移**

| 参数      | 描述                   | 类型                         | 默认值 | 必选 |
| --------- | ---------------------- | ---------------------------- | ------ | ---- |
| offsets   | 元素ID到平移距离的映射 | Record<ID, [number, number]> | -      | ✓    |
| animation | 是否启用动画           | boolean                      | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，平移操作完成后 resolve

**示例**:

```typescript
// 向右平移100像素，向下平移50像素
await graph.translateElementBy('node1', [100, 50]);

// 带动画平移
await graph.translateElementBy('node1', [100, 50], true);

// 对多个节点应用相同的平移
await graph.translateElementBy(
  {
    node1: [50, 50],
    node2: [100, 100],
    node3: [150, 150],
  },
  true,
);
```

### Graph.translateElementTo(id, position, animation)

将元素移动到指定位置，支持两种调用方式：

```typescript
// 将元素移动到指定位置（绝对位置）
translateElementTo(id: ID, position: Point, animation?: boolean): Promise<void>;

// 批量将元素移动到指定位置（绝对位置）
translateElementTo(positions: Record<ID, Point>, animation?: boolean): Promise<void>;
```

**参数**:

**单个元素移动**

| 参数      | 描述                | 类型             | 默认值 | 必选 |
| --------- | ------------------- | ---------------- | ------ | ---- |
| id        | 要移动的元素 ID     | string           | -      | ✓    |
| position  | 目标绝对位置 [x, y] | [number, number] | -      | ✓    |
| animation | 是否启用动画        | boolean          | -      |      |

**批量元素移动**

| 参数      | 描述                   | 类型                             | 默认值 | 必选 |
| --------- | ---------------------- | -------------------------------- | ------ | ---- |
| positions | 元素ID到目标位置的映射 | Record<string, [number, number]> | -      | ✓    |
| animation | 是否启用动画           | boolean                          | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，移动操作完成后 resolve

**示例**:

```typescript
// 将节点移动到画布的 (200, 300) 位置
await graph.translateElementTo('node1', [200, 300]);

// 带动画移动
await graph.translateElementTo('node1', [200, 300], true);

// 将一组节点整齐排列
await graph.translateElementTo(
  {
    node1: [100, 100],
    node2: [200, 200],
    node3: [300, 100],
  },
  true,
);
```

### Graph.focusElement(id, animation)

聚焦到指定元素，使元素居中于视口。

```typescript
focusElement(id: ID | ID[], animation?: ViewportAnimationEffectTiming): Promise<void>;
```

**参数**:

| 参数      | 描述                      | 类型                                                            | 默认值 | 必选 |
| --------- | ------------------------- | --------------------------------------------------------------- | ------ | ---- |
| id        | 要聚焦的一个或多个元素 ID | string \| string[]                                              | -      | ✓    |
| animation | 视口动画配置              | [ViewportAnimationEffectTiming](#viewportanimationeffecttiming) | -      |      |

**返回值**:

- **类型**: Promise\<void\>
- **描述**: 返回一个 Promise，聚焦操作完成后 resolve

**示例**:

```typescript
// 聚焦到单个节点
await graph.focusElement('node1');

// 使用自定义动画配置
await graph.focusElement('node1', {
  duration: 800,
  easing: 'ease-in-out',
});

// 聚焦到多个节点
await graph.focusElement(['node1', 'node2', 'node3']);
```

## 类型定义

### CollapseExpandNodeOptions

收起或展开元素的配置选项。

```typescript
interface CollapseExpandNodeOptions {
  /**
   * 是否使用动画
   */
  animation?: boolean;
  /**
   * 保证展开/收起的节点位置不变
   */
  align?: boolean;
}
```

### ViewportAnimationEffectTiming

视口动画配置类型。

```typescript
type ViewportAnimationEffectTiming =
  | boolean // 是否启用动画
  | {
      easing?: string; // 缓动函数
      duration?: number; // 动画持续时间(ms)
    };
```

### AABB

AABB (Axis-Aligned Bounding Box) 是"轴对齐包围盒"的缩写，是计算机图形学中的一个基础概念。

```typescript
interface AABB {
  x: number; // 矩形左上角的 x 坐标
  y: number; // 矩形左上角的 y 坐标
  width: number; // 矩形宽度
  height: number; // 矩形高度
}
```

### State

元素状态类型。

```typescript
type State = 'selected' | 'hover' | 'active' | 'inactive' | 'disabled' | string;
```
