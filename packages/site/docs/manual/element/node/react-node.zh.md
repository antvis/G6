---
title: 使用 React 定义节点
order: 5
---

## 简介

在数据可视化领域，为高效率使用 AntV G6，节点定义可采用 React 组件的方式。
为了让用户能更加方便地进行react自定义节点，我们提供了g6-extension-react库。

### g6-extension-react

g6-extension-react 是 AntV G6 图可视化库的一个扩展，它将 React 框架与 G6 进行了集成，使得开发者能够使用 React 组件来定义和渲染 G6 中的节点、边等图元素。通过这种方式，开发者可以充分利用 React 的组件化开发模式、状态管理能力以及丰富的生态系统来构建复杂且交互性强的图可视化应用。

#### 优点

- 组件化开发：React 以组件化开发著称，使用 g6-extension-react 可以将图中的节点和边封装成独立的 React 组件。这有助于提高代码的复用性，减少重复开发工作。例如，在一个复杂的图可视化应用中，可能有多种类型的节点，但部分节点的基本样式和交互逻辑是相同的，此时可以将这些共性封装成一个 React 组件，在不同地方复用。
- 状态管理：React 提供了强大的状态管理机制，如 useState、useReducer 等钩子函数，以及 Redux、MobX 等外部状态管理库。在 g6-extension-react 中，可以利用这些机制轻松管理图元素的状态，实现动态更新。比如，当用户点击某个节点时，可以通过修改节点组件的状态来改变其样式，如颜色、大小等。
- 丰富的生态系统：React 拥有庞大的生态系统，有众多的开源组件和工具可供使用。在 g6-extension-react 中，可以引入这些组件和工具来增强图元素的功能。例如，可以使用 react-icons 库为节点添加图标，使用 react-transition-group 库实现节点的动画效果。
- 易于集成：由于 g6-extension-react 基于 React 开发，它可以很方便地集成到现有的 React 项目中。开发者可以利用现有的 React 开发流程和工具链，快速搭建图可视化应用。

## 使用步骤

### 准备工作

1、在使用 g6-extension-react 之前，请确保已经安装并创建React项目
2、react版本要求：>=16.8.0
3、如果使用tTypeScrit，需要tsconfig.json文件支持jsx语法

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

### 安装依赖

npm 方式安装：

```bash
npm install @antv/g6-extension-react
```

yard 方式安装：

```bash
yarn add @antv/g6-extension-react
```

pnpm方式安装：

```bash
pnpm add @antv/g6-extension-react
```

### 自定义React节点

````jsx
import { ReactNode } from '@antv/g6-extension-react';

const MyReactNode = () => {
  return <div>node</div>;
};

### 注册节点

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react', ReactNode);
````

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

## 状态和交互事件

### 状态

我们可以通过data传入状态，以便节点展示不同的样式。

#### 示例：

通过data添加selected参数，实现节点选中和取消选中的样式变化。

graph实例所需data中传递：

```json
const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        ... // other data
        selected: true, // selcted status
      },
    },
    ...
  ]
}
```

自定义节点内展示：

```jsx
const MyReactNode = ({ data }) => {
  return (
    <Card
      style={{
        width: 500,
        padding: 10,
        borderColor: data.selected ? 'orange' : '#ddd', // 根据选中状态设置边框颜色
        cursor: 'pointer', // 添加鼠标指针样式
      }}
      >
  ...
}
```

### 交互事件

我们可以传递回调函数，在节点上与图实例进行交互。

#### 示例：

通过data传递回调事件，实现通过自定义节点操作图数据。

注册节点：
通过在props定义接受回调函数

```json
const IDCardNode = ({ id, data, onSelectChange }) => {
  ...
  const handleSelect = () => {
    onSelectChange()
  }

  return (
    ...
    <Select
      onChange={handleSelect}
      ...
    />
    ...
  )
}
```

创建Graph实例时候，传递onSelectChange回调函数：

```jsx
const graph = new Graph({
  ...
  data,
  node: {
    type: 'react',
    style: {
      component: (data) => <IDCardNode
        id={data.id}
        data={{ ...data.data, graph: graph }}
        onSelectChange={handleSelectChange} />,
    },
  },
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
