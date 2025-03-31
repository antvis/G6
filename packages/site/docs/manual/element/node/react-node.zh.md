---
title: 使用 React 定义节点
order: 5
---

## 简介

在数据可视化领域，为高效率使用 AntV G6，节点定义可采用 React 组件的方式。AntV G6 功能强大但原生节点定义处理复杂交互和状态管理有挑战。

### ReactNode 和 GNode 方式自定义 G6 节点

#### ReactNode<span class="label">推荐</span>

React Node 是指借助 React 框架来定义 G6 节点。
这种方式能把 React 组件的优势发挥到极致。React 以组件化开发闻名，使用 React 定义节点可提升代码复用性，减少重复工作，提高开发效率。其强大的状态管理能力便于处理节点的各种交互状态，比如点击、悬停、拖拽等，能让节点交互体验更加流畅。并且 React 拥有庞大的生态系统，有丰富的工具和库可供使用，能轻松为节点添加复杂的样式和交互逻辑，满足多样化的业务需求。

#### GNode

G Node 是基于 G 图形库来定义 G6 节点。
G 是一个高性能的图形渲染引擎，在 G6 中使用 G 来定义节点，能实现高效的图形渲染。G 提供了丰富的图形绘制 API，可直接对节点的图形元素进行精细控制，例如绘制复杂的几何形状、设置样式等。这种方式更侧重于底层的图形操作，在需要对节点图形进行高度定制化时具有很大优势，能够满足对节点外观和性能有严格要求的场景。

### 使用React自定义节点优势

React 组件化、状态管理能力强，将其用于 AntV G6 节点定义，能结合二者优势。可进行组件复用，提升开发效率；轻松处理节点交互状态，优化用户体验。

- 提高开发效率：React 以组件化开发著称，这使得节点定义可以复用。对于相同类型的节点，只需创建一次组件，就能在不同地方重复使用，减少了重复代码的编写，极大地提高了开发效率。
- 增强可维护性：组件化结构使代码逻辑更加清晰，每个组件都有明确的职责。当需要修改某个节点的样式或功能时，只需找到对应的组件进行修改，不会影响到其他部分的代码，降低了维护成本。
- 便于状态管理：React 拥有强大的状态管理能力，能轻松处理节点的各种交互状态，如点击、拖拽、悬停等。通过状态的变化，实时更新节点的显示效果，为用户带来流畅的交互体验。
- 丰富的生态系统：React 拥有庞大的生态系统，有大量可用的工具和库。可以将这些工具和库与 AntV G6 结合使用，为节点添加更多的功能，如动画效果、数据可视化等，满足复杂的业务需求。
- 易于集成：React 作为前端开发的主流框架，与其他前端技术和工具的集成非常方便。可以将使用 React 定义的 AntV G6 节点轻松集成到现有的项目中，与其他组件协同工作，提高项目的整体开发效率。

## 使用步骤

### 安装

```bash
npm install @antv/g6-extension-react
```

### 自定义React节点

ReactNode方式

```jsx
import { ReactNode } from '@antv/g6-extension-react';

const MyReactNode = () => {
  return <div>node</div>;
};
```

GNode方式

```jsx
import { Group, Rect, Text } from '@antv/g6-extension-react';

const GNode = () => {
  return <Group>
    <Rect width={100} height={100}></Rect>
    <Text text={"node"} />
  <Group>
};
```

### 注册节点

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react', ReactNode);
```

### 使用节点

使用自定义的ReactNode节点：

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'react',
    style: {
      component: () => <ReactNode />,
    },
  },
});
```

使用自定义的GNode节点：

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'g',
    style: {
      component: () => <GNode />,
    },
  },
});
```

## 在线测试

<div>
  <Playground path="element/custom-node/demo/react-node.jsx" rid="react-node-rid"></Playground>
  <Playground path="element/custom-node/demo/reactnode-idcard.jsx" rid="reactnode-idcard"></Playground>
</div>

<style>
.label {
  background-color:rgb(255, 168, 168);
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 10px;
}
</style>
