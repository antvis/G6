---
title: 元素总览
order: 1
---

## 元素体系

G6 图表的核心是由三种基本元素构成：**节点(Node)**、**边(Edge)** 和 **组合(Combo)**。这些元素是构建复杂图形网络的基础单元。

<image width="400" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2ZewT4T1p_4AAAAAAAAAAAAADmJ7AQ/original" />

### 节点 (Node)

[节点](/manual/element/node/overview) 表示图中的实体或概念，如人物、地点、对象等。G6 提供了丰富的内置节点类型：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TZt2S7Z0d-8AAAAAAAAAAAAADmJ7AQ/original" />

G6 还支持 [使用 React 定义节点](/manual/element/node/react-node) 或 [自定义节点](/manual/element/node/custom-node) 以满足特定需求。

### 边 (Edge)

[边](/manual/element/edge/overview)表示节点间的连接关系，如朋友关系、交易往来等。G6 内置多种边类型：

<image width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*YKN7TasqOh4AAAAAAAAAAAAADmJ7AQ/original" />

当内置边不满足需求时，可以通过 [自定义边](/manual/element/edge/custom-edge) 来实现复杂的连接表现。

### 组合 (Combo)

[组合](/manual/element/combo/overview)是一种特殊元素，可以包含节点和其他组合，用于表示集合、分组或层级关系。G6 内置两种组合类型：

- **圆形组合**(`circle`)：适合紧凑型分组
- **矩形组合**(`rect`)：适合规则布局的分组

<image width="450" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zPAzSZ3XxpUAAAAAAAAAAAAADmJ7AQ/original" />

组合支持嵌套、拖拽、展开/收起等交互，可以通过 [自定义组合](/manual/element/combo/custom-combo) 来实现更复杂的容器行为。

## 元素构成原理

每个元素由一个或多个基础图形(Shape)组成。图形是 G6 中的最小图形单元，包括 [矩形](/manual/element/shape/properties#rectstyleprops)、[圆形](/manual/element/shape/properties#circlestyleprops)、[文本](/manual/element/shape/properties#textstyleprops)、[路径](/manual/element/shape/properties#pathstyleprops)等。

例如：

- 一个节点可能由背景图形(如圆形)和文本标签组成
- 一条边可能由路径、箭头和文本标签组成
- 一个组合可能由容器图形、标题文本和展开/收起按钮组成

要了解更多关于图形的信息，请参阅 [图形 Shape 总览](/manual/element/shape/overview) 和 [Shape 样式属性](/manual/element/shape/properties)。

## 元素状态

[元素状态](/manual/element/state) 是一种强大的机制，用于展示元素在不同交互或业务场景下的视觉变化。G6 提供了一套完整的状态管理系统：

- **预设状态**：`selected`(选中)、`highlight`(高亮)、`active`(激活)等
- **状态叠加**：元素可同时拥有多个状态，样式按优先级叠加
- **自定义状态**：可根据业务需求定义任意状态

<image width="500" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yVbORYybrDQAAAAAAAAAAAAADmJ7AQ/original" />

## 配置元素

G6 5.x 采用扁平化的配置结构，所有元素的配置都在同一层级，便于查找和管理：

```typescript
{
  node: {
    // 节点默认样式
    style: {
      fill: 'orange',
      labelText: 'node',
    },
    // 节点在不同状态下的样式
    state: {
      selected: {
        stroke: '#1890FF',
        lineWidth: 2,
      }
    }
  },
  edge: {
    // 边默认样式
    style: {
      stroke: '#aaa',
    },
    // 边在不同状态下的样式
    state: {
      highlight: {
        stroke: 'red',
      }
    }
  },
  combo: {
    // 组合默认样式
    style: {
      fill: 'lightblue',
      stroke: 'blue',
    }
  }
};
```

配置方式有三种，按优先级从高到低：

1. **使用实例方法动态配置**：如 `graph.setNode()`、`graph.setEdge()`、`graph.setCombo()`
2. **实例化图时全局配置**：在 `new Graph()` 时指定配置项
3. **在数据中配置**：在节点、边、组合的数据对象中设置

在 VSCode 等编辑器中，你可以看到元素的全部可配置属性，并基于关键字进行搜索：

<image width="800" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*oY_uTK80sIoAAAAAAAAAAAAADmJ7AQ/original" />

## 扩展能力

G6 提供了强大的扩展能力，满足各种自定义需求：

- **自定义节点**：[自定义节点指南](/manual/element/node/custom-node)
- **自定义边**：[自定义边指南](/manual/element/edge/custom-edge)
- **自定义组合**：[自定义组合指南](/manual/element/combo/custom-combo)
- **React 节点**：[使用 React 定义节点](/manual/element/node/react-node)
- **3D 扩展**：通过 `@antv/g6-extension-3d` 使用 3D 节点

## 内置元素参考

### 节点类型

- [内置节点库](/manual/element/node/build-in/base-node)

### 边类型

- [内置边库](/manual/element/edge/build-in/base-edge)

### 组合类型

- [内置组合库](/manual/element/combo/build-in/base-combo)
