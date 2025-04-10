---
title: 使用 React 定义节点
order: 5
---

## 简介

在数据可视化领域，为高效率使用 AntV G6，节点定义可采用 React 组件的方式。
为了让用户能更加方便地进行 react 自定义节点，我们提供了 g6-extension-react 库用于集成使用进而为用户提高开发效率。

### g6-extension-react

g6-extension-react 是 AntV G6 图可视化库的一个扩展，它将 React 框架与 G6 进行了集成，使得开发者能够使用 React 组件来定义和渲染 G6 中的节点、边等图元素。通过这种方式，开发者可以充分利用 React 的组件化开发模式、状态管理能力以及丰富的生态系统来构建复杂且交互性强的图可视化应用。

#### 优点

- 组件化开发：在图可视化场景下，节点的设计往往会更加复杂，不仅要考虑多样化的样式呈现，还要兼顾复杂的交互逻辑，这无疑增加了开发的难度和工作量。而使用 g6-extension-react 可以将图中的节点封装成独立的 React 组件，这为解决节点设计的复杂性提供了有效的解决方案。
- 状态管理：React 提供了强大的状态管理机制，如 useState、useReducer 等钩子函数，以及 Redux、MobX 等外部状态管理库。在 g6-extension-react 中，可以利用这些机制轻松管理图元素的状态，实现动态更新。比如，当用户点击某个节点时，可以通过修改节点组件的状态来改变其样式，如颜色、大小等。
- 丰富的生态系统：React 拥有庞大的生态系统，有众多的开源组件和工具可供使用。在 g6-extension-react 中，可以引入这些组件和工具来增强图元素的功能。例如，可以使用 react-icons 库为节点添加图标，使用 react-transition-group 库实现节点的动画效果。
- 易于集成：由于 g6-extension-react 基于 React 开发，它可以很方便地集成到现有的 React 项目中。开发者可以利用现有的 React 开发流程和工具链，快速搭建图可视化应用。

## 使用步骤

### 准备工作

1. 在使用 g6-extension-react 之前，请确保已经安装并创建 React 项目

2. Reac 版本要求：>=16.8.0

3. 如果要支持使用 TypeScrit，需要 tsconfig.json 配置文件支持 jsx 语法

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

```jsx
import { ReactNode } from '@antv/g6-extension-react';

const MyReactNode = () => {
  return <div>node</div>;
};
```

### 注册节点

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

register(ExtensionCategory.NODE, 'react-node', ReactNode);
```

### 使用节点

使用自定义的 ReactNode 节点：

```jsx
const graph = new Graph({
  // ... other options
  node: {
    type: 'react-node',
    style: {
      component: () => <ReactNode />,
    },
  },
});
```

## 状态管理和交互事件

### 状态管理

在 G6 中，节点状态的管理和样式展示可以通过以下方式实现。

#### G6 内置交互状态管理

在使用内置交互行为（如 hover-activate 或 click-select）时，G6 会自动为节点维护状态。此时，你可以通过访问节点数据中的 data.states 字段来获取当前节点的状态，并依据这些状态来调整节点的样式逻辑。例如，当节点处于 hover 状态时，改变其颜色或大小，以提供更好的交互反馈。

**示例**：

假设我们有一个简单的节点，并希望在节点被 hover 时改变其背景颜色。

```jsx
import { Graph } from '@antv/g6';

const graph = new Graph({
  ...
  data: {
    nodes: [
      { id: 'node1', x: 100, y: 200 },
      { id: 'node2', x: 300, y: 200 },
    ],
  },
  node: {
    type: 'react-node',
    style: {
      component: ({ data }) => {
        const backgroundColor = data.states?.hover ? 'lightblue' : 'white';
        return (
          <div
            style={{
              ...
              backgroundColor: backgroundColor,
            }}
          >
            {data.id}
          </div>
        );
      },
    },
  },
  behaviors: ['hover-activate']
});
```

#### React 自定义状态管理

我们也可以通过在节点数据中自定义状态字段，手动管理状态的切换以及样式的更新。比如，你可以在节点数据里添加一个自定义的状态标识，然后在代码中根据这个标识来动态修改节点的样式。这种方式给予开发者更大的灵活性，适用于有特殊需求的场景。你可以通过 data 传入状态，以此让节点展示不同的样式，这就是手动管理状态时的操作方式。

**示例**：

通过 data 添加 selected 参数，实现节点选中和取消选中的样式变化。

graph 实例所需 data 中传递：

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

通过 data 传递回调事件，实现通过自定义节点操作图数据。

注册节点：
通过在 props 定义接受回调函数

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

创建 Graph 实例时候，传递 onSelectChange 回调函数：

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
  <Playground path="element/custom-node/demo/reactnode-idcard.jsx" rid="reactnode-idcard-rid"></Playground>
</div>
