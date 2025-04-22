---
title: 自定义数据处理
order: 3
---

## 概述

自定义数据处理允许用户在业务实现过程中，把额外的数据处理封装起来，在渲染前或者布局后对数据进行进一步处理。用户通过自定义数据处理，实现部分数据处理解耦，更好地进行管理、编排代码以及提高代码可维护性。

## 开始前

用户在进行自定义数据处理前，需要仔细阅读并掌握数据处理器的 [实现原理和执行时机](/manual/transform/overview#实现原理) 。

## 代码示例

接下来将讲述两个可能的业务场景，并通过自定义数据处理来实现：

### 不展示游离节点

- **需求**

  游离节点，即没有连线的节点，画布渲染时不展示游离节点

- **实现**

  ```typescript
  import type { DrawData, DrawContext } from '@antv/g6';
  import { Graph, BaseTransform, register, ExtensionCategory } from '@antv/g6';

  class HideFreeNode extends BaseTransform {
    public beforeDraw(input: DrawData, context: DrawContext): DrawData {
      const { model } = this.context;
      const { add, update, remove } = input;

      add.nodes.forEach((nodeData, nodeId) => {
        // 获取节点的相关连线
        const edges = model.getRelatedEdgesData(nodeId);
        // 没有任何连线的的节点则从add里面移除，添加到remove里面
        if (!edges.length) {
          add.nodes.delete(nodeId);
          remove.nodes.set(nodeId, nodeData);
        }
      });

      return input;
    }
  }
  ```

  <embed src="@/common/manual/custom-extension/transform/hide-free-node.md"></embed>

- **说明**

  示例中总共有6个节点，id为1-6，id为4的节点没有连线，因此被移除了。

  通过 `getRelatedEdgesData` 获取节点的相关连线，没有则把该节点放到 `remove.nodes` 里面去，并从 `add.nodes` 里面移除。

### 环形布局径向label

- **需求**

  使用 [环形布局](/manual/layout/build-in/circular-layout) 时，节点 label 的也需要像内置数据处理器 [PlaceRadialLabels](/manual/transform/build-in/place-radial-labels) 一样实现径向展示（但 PlaceRadialLabels 只支持径向布局，环形布局不是径向布局）

- **实现**

  ```typescript
  import type { RuntimeContext, DrawContext, Point, TransformArray, Vector2, Vector3 } from '@antv/g6';
  import { Graph, BaseTransform, register, ExtensionCategory, BaseTransformOptions } from '@antv/g6';

  // 目前circular布局没有暴露方法可以获取布局中心，这里简单处理先固定一个，配置circular布局时center与这里保持一致即可
  const circularCenter = [300, 300];

  // 下面的函数 G6 没有暴露出来，先自行声明
  function subtract(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
    return a.map((v, i) => v - b[i]) as Vector2 | Vector3;
  }
  function rad(a: Vector2 | Vector3): number {
    const [x, y] = a;
    if (!x && !y) return 0;
    return Math.atan2(y, x);
  }
  function rad2deg(rad: number): number {
    return rad * (180 / Math.PI);
  }

  interface CircularRadialLabelsOptions extends BaseTransformOptions {
    offset?: number; // 偏移量
  }

  class CircularRadialLabels extends BaseTransform<CircularRadialLabelsOptions> {
    static defaultOptions = {
      offset: 5,
    };
    constructor(context: RuntimeContext, options: CircularRadialLabelsOptions) {
      super(context, Object.assign({}, CircularRadialLabels.defaultOptions, options));
    }
    get center(): Point {
      return circularCenter;
    }
    public afterLayout() {
      const { graph, model } = this.context;
      const data = model.getData();
      data.nodes?.forEach((datum) => {
        const radian = rad(subtract([datum.style.x, datum.style.y], this.center));
        const isLeft = Math.abs(radian) > Math.PI / 2;
        const isLeaf = !datum.children || datum.children.length === 0;
        const nodeId = datum.id;
        const node = this.context.element?.getElement(nodeId);
        if (!node || !node.isVisible()) return;

        const nodeHalfWidth = graph.getElementRenderStyle(nodeId).size / 2;
        const offset = (isLeaf ? 1 : -1) * (nodeHalfWidth + this.options.offset);

        const labelTransform: TransformArray = [
          ['translate', offset * Math.cos(radian), offset * Math.sin(radian)],
          ['rotate', isLeft ? rad2deg(radian) + 180 : rad2deg(radian)],
        ];

        model.updateNodeData([
          {
            id: datum.id,
            style: {
              labelTextAlign: isLeft === isLeaf ? 'right' : 'left',
              labelTextBaseline: 'middle',
              labelTransform,
            },
          },
        ]);
      });

      graph.draw();
    }
  }
  ```

  <embed src="@/common/manual/custom-extension/transform/circular-radial-labels.md"></embed>

- **说明**
  上面的实现基本是参考内置数据处理器 [PlaceRadialLabels](/manual/transform/build-in/place-radial-labels) 来实现的，区别是这里的实现是通过拿到布局中心来计算偏移和旋转，具体可参考 PlaceRadialLabels 的 [源码](https://github.com/antvis/G6/blob/v5/packages/g6/src/transforms/place-radial-labels.ts)
