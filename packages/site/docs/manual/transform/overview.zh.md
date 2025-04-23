---
title: 数据处理总览
order: 1
---

## 什么是数据处理

数据处理（ `transform` ），也叫数据转换器，是 G6 提供的支持在 **渲染前( `beforeDraw` )** 或者 **布局后( `afterLayout` )** 对绘制数据进行转化处理的机制，用户可以通过数据处理很方便地对数据处理逻辑进行封装解耦。

## 实现原理

### 基类

所有的数据处理器都是基于 [BaseTransform](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/base-transform.ts) 这个基类进行实现，里面定义了两个基类方法 `beforeDraw` 和 `afterLayout` ：

```typescript
export abstract class BaseTransform<T extends BaseTransformOptions = BaseTransformOptions> extends BaseExtension<T> {
  public beforeDraw(data: DrawData, context: DrawContext): DrawData {
    return data;
  }

  public afterLayout(type: 'pre', data: DrawData): void;
  public afterLayout(type: 'post', data?: undefined): void;
  public afterLayout(type: 'pre' | 'post', data?: DrawData) {}
}
```

以下是这两个方法里核心的参数类型说明：

- **DrawData**

  ```typescript
  type ProcedureData = {
    nodes: Map<ID, NodeData>;
    edges: Map<ID, EdgeData>;
    combos: Map<ID, ComboData>;
  };

  type DrawData = {
    add: ProcedureData; // 本次渲染需要新增的元素
    update: ProcedureData; // 本次渲染需要更新的元素
    remove: ProcedureData; // 本次渲染需要移除的元素
  };
  ```

- **pre | post**

  pre：绘制前进行的布局（只会在首次布局触发）

  post：完成绘制后进行的布局

### 执行时机

- **beforeDraw**

  下面是每次渲染时数据处理的执行流程/时机：

  <img width="300px" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Pb3kRI2yHo8AAAAAAAAAAAAAemJ7AQ/original"/>

  **详细说明：**

  1. G6 在每次渲染前计算出 `add`、`update`、`remove`，分别对应为需要新增、更新、移除的元素，以下简称为 `DrawData`
  2. 此时数据处理介入，按配置顺序执行每个数据处理的 `beforeDraw` 方法，参数则为 `DrawData`
  3. 数据处理器中，对 `DrawData` 里面的元素数据进行改动，即可以按需对 `add`、`update`、`remove` 里面的元素数据进行修改、移除或者插入元素数据等，最终把改动后的 `DrawData` 返回给渲染主体逻辑
  4. 在执行数据处理后，执行对应的新增、更新、移除元素的操作，完成渲染

:::info{title=提示}
触发渲染的场景分为主动和被动，列举如下：

- **主动：** 用户主动调用 `graph.render()` 、 `graph.draw()` 或者在自定义插件、交互等实例里面通过上下文拿到元素控制器（ [ElementController](https://github.com/antvis/G6/blob/v5/packages/g6/src/runtime/element.ts) ）实例调用 `this.context.element.draw()`，等（ `graph.render()` 和 `graph.draw()` 也是调用元素控制器的 `draw` 方法）
- **被动：** 部分内置交互和插件有触发渲染，布局执行后也有触发渲染更新元素位置，等

:::

- **afterLayout**：在执行完布局计算并开始更新节点位置后，执行数据处理

## 内置数据处理

- **G6 提供给用户的内置数据处理如下：**

各数据处理详细配置可参考 [内置数据处理文档](/manual/transform/build-in/map-node-size)。

| 数据处理名称                                                 | 注册类型                 | 功能描述                                             | 执行时机   |
| ------------------------------------------------------------ | ------------------------ | ---------------------------------------------------- | ---------- |
| [动态调整节点大小](/manual/transform/build-in/map-node-size) | `map-node-size`          | 根据节点中心性调整节点的大小                         | beforeDraw |
| [径向标签](/manual/transform/build-in/place-radial-labels)   | `place-radial-labels`    | 根据径向布局自动调整节点标签样式，包括位置和旋转角度 | afterDraw  |
| [平行边](/manual/transform/build-in/process-parallel-edges)  | `process-parallel-edges` | 处理平行边，即多条边共享同一源节点和目标节点         | beforeDraw |

- **G6 内嵌的数据处理如下：**

除了提供给用户选用的数据处理外， G6 也封装并使用了以下数据处理机制来实现基础功能。以下数据处理不开放给用户配置使用，默认必带（列举出来供用户有需要时点击查看并参考源码）：

| 数据处理名称                                                                                                            | 注册类型                | 功能描述                                                                                                                                                      | 执行时机   |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| [调整combo绘制顺序](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/arrange-draw-order.ts)              | `arrange-draw-order`    | combo 嵌套时，优先绘制子 combo                                                                                                                                | beforeDraw |
| [处理组合的展开收起](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/collapse-expand-combo.ts)          | `collapse-expand-combo` | 收起时，移除 combo 内部元素、销毁内部边，外部边则连到收起的 combo 上；<br />展开时，反之；                                                                    | beforeDraw |
| [处理（树图）节点的收起和展开](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/collapse-expand-node.ts) | `collapse-expand-node`  | 绘制前，处理（树图）节点的收起和展开                                                                                                                          | beforeDraw |
| [获取边的实际端点](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/get-edge-actual-ends.ts)             | `get-edge-actual-ends`  | 配合`collapse-expand-combo`实现收起时，combo 外部连到内部节点的边改为连到收起的 combo 上（`collapse-expand-combo`只是在收起时判断并标记了这些边需要更新端点） | beforeDraw |
| [更新节点、combo相关边](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/update-related-edge.ts)         | `update-related-edges`  | 如果更新了节点/combo，则把连接的边也一起更新了                                                                                                                | beforeDraw |

:::warning{title=注意}

上面 G6 为实现自身基础功能使用的数据处理仅供参考，不可改动。如有需要在这些数据处理基础上做特殊处理，可通过 [自定义数据处理](#自定义数据处理) 实现。

:::

## 配置方式

### 基本配置

在图实例初始化时，通过 `transforms` 数组指定需要的数据处理：

```javascript
import { Graph } from '@antv/g6';

const graph = new Graph({
  // 其他配置...
  transforms: ['process-parallel-edges'],
});
```

### 配置数据处理参数

对于需要自定义参数的数据处理，可以使用 `object` 形式配置属性：

```javascript
const graph = new Graph({
  // 其他配置...
  transforms: [
    'place-radial-labels',
    {
      type: 'process-parallel-edges',
      key: 'process-parallel-edges-1',
      mode: 'bundle',
      distance: 30,
    },
  ],
});
```

### 动态更新数据处理

G6 支持在图实例运行期间动态管理数据处理：

- 可以通过 [setTransforms](/api/transform#graphsettransformstransforms) 方法调整数据处理器：

```javascript
// 添加新的数据处理器
graph.setTransforms((transforms) => [...transforms, 'place-radial-labels']);

// 移除数据处理器
graph.setTransforms((transforms) => transforms.filter((t) => t !== 'place-radial-labels'));
```

- 可以通过 [updateTransform](/api/transform#graphupdatetransformtransform) 方法更新数据处理的配置：

```javascript
// 更新单个数据处理器
graph.updateTransform({
  key: 'process-parallel-edges-1',
  distance: 100,
});
```

:::warning{title=注意}
使用`updateTransform`方法时，需要在初始化时为数据处理指定唯一的`key`。
:::

### 卸载数据处理

使用 [setTransforms](/api/transform#graphsettransformstransforms) 方法同样可以卸载数据处理，将数据处理配置列表置为空即可：

```javascript
// 卸载所有数据处理器
graph.setTransforms([]);
```

## 自定义数据处理

当内置数据处理器无法满足需求时，你可以：

- 继承和扩展现有数据处理
- 创建全新的自定义数据处理

自定义数据处理需要先注册后使用。详细教程请参考 [自定义数据处理](/manual/transform/custom-transform) 文档。

```javascript
import { register, ExtensionCategory } from '@antv/g6';
import { MyCustomTransform } from './my-custom-transform';

// 注册自定义数据处理器
register(ExtensionCategory.TRANSFORM, 'my-custom-transform', MyCustomTransform);

// 使用自定义数据处理
const graph = new Graph({
  transforms: ['my-custom-transform'],
});
```
