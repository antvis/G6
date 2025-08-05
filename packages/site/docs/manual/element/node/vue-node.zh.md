---
title: 使用 Vue 定义节点
order: 14
---

在 G6 中，自定义节点通常需要操作 DOM 或 Canvas 元素，但借助 [`g6-extension-vue`](https://github.com/Child-qjj/g6-extension-vue) 社区生态库，可以直接使用 Vue 组件作为节点内容，提升开发效率与可维护性。

### G6 节点

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sEaLR7Q_hmoAAAAAAAAAAAAAemJ7AQ/fmt.avif" width="300" />

✅ **推荐场景：**

- 节点只是简单的几何图形
- 需要高效渲染超过 2,000 个节点的场景
- 需要直接操作图形实例进行精细控制

> 有关如何使用 Canvas 图形自定义节点的详细信息，请参阅 [自定义节点](/manual/element/node/custom-node) 文档

### Vue Node

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9oz-R7bIkd0AAAAAAAAAAAAADmJ7AQ/original" width="350" />

✅ **推荐场景：**

- 需要集成 Element Plus / Ant Design Vue 等 UI 库的业务系统
- 节点包含表单输入、状态切换等交互逻辑
- 已有 Vue 设计系统需要复用的场景

## 快速入门

### 环境准备

在开始之前，请确保您已经：

- **安装 Vue 项目**：确保已安装并创建 Vue 项目。
- **Vue 版本要求**：确保使用的 Vue 版本 >=2.6.0。(推荐使用 Vue 3)

### 安装依赖

要使用 [`g6-extension-vue`](https://github.com/Child-qjj/g6-extension-vue)，请运行以下命令：

:::code-group

```bash [npm]
npm install g6-extension-vue
```

```bash [yarn]
yarn add g6-extension-vue
```

```bash [pnpm]
pnpm add g6-extension-vue
```

:::

### 组件集成

#### 1. 注册 Vue 节点类型

通过扩展机制注册 Vue 节点类型：

```jsx
import { ExtensionCategory, register } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);
```

`register` 方法需要三个参数：

- 扩展类别：`ExtensionCategory.NODE` 表示这是一个节点类型
- 类型名称：`vue-node` 是我们给这个自定义节点起的名字，后续会在配置中使用
- 类定义：VueNode 是 `g6-extension-vue` 导出的实现类

#### 2. 定义业务组件

定义一个简单的 Vue 组件作为节点的内容：

```jsx
import { defineComponent, h } from 'vue';

const MyVueNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    return () => {
      return h('div', 'vue node');
    };
  },
});
```

#### 3. 使用组件

在图配置中使用自定义的 Vue 节点。通过在图配置中指定节点类型和样式，来使用自定义的 Vue 组件。

- `type`：指定节点类型为 `vue-node` (使用与注册时起的名字)
- `style.component`：定义节点的 Vue 组件内容

```jsx
const graph = new Graph({
  node: {
    type: 'vue-node',
    style: {
      component: () => <MyVueNode />,
    },
  },
});

graph.render();
```

## 高级功能

### 状态管理

在复杂图可视化场景中，节点需要动态响应交互状态。我们提供两种互补的状态管理方案：

#### 响应内置交互状态

G6 提供内置的交互状态管理状态，如 `hover-activate` 和 `click-select`。可以通过节点数据中的 `data.states` 字段获取当前节点状态，并根据状态调整节点样式。

**示例**：在节点被 hover 时改变背景颜色。

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';
import { computed, defineComponent } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const StatefulNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isActive = computed(() => props.data.states?.includes('active'));
    const label = computed(() => props.data.data?.label);

    return (
      <div
        style={{
          width: 100,
          padding: 5,
          border: '1px solid #eee',
          boxShadow: isActive.value ? '0 0 8px rgba(24,144,255,0.8)' : 'none',
          transform: `scale(${isActive.value ? 1.05 : 1})`,
        }}
      >
        {label.value}
      </div>
    );
  },
});

const graph = new Graph({
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 200 }, data: { label: 'node1' } },
      { id: 'node2', style: { x: 300, y: 200 }, data: { label: 'node2' } },
    ],
  },
  node: {
    type: 'vue-node',
    style: {
      component: (data) => <StatefulNode data={Object.assign({}, data)} />, // data是非响应式数据，需要通过改变引用来触发Vue的props副作用
    },
  },
  behaviors: ['hover-activate'],
});

graph.render();
```

#### 自定义业务状态

当需要管理业务相关状态（如审批状态、风险等级）时，可通过扩展节点数据实现：

**示例**：通过 data 添加 `selected` 变量，实现节点选中和取消选中的样式变化。

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';
import { defineComponent, computed } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const MyVueNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isSelected = computed(() => props.data.data.selected);

    const handleClick = () => {
      graph.updateNodeData([{ id: props.data.id, data: { selected: !isSelected.value } }]);
      graph.draw();
    };

    return (
      <div
        style={{
          width: 200,
          padding: 10,
          border: '1px solid red',
          borderColor: isSelected.value ? 'orange' : '#ddd', // 根据选中状态设置边框颜色
          cursor: 'pointer', // 添加鼠标指针样式
        }}
        onClick={handleClick}
      >
        Node
      </div>
    );
  },
});

const graph = new Graph({
  data: {
    nodes: [
      {
        id: 'node1',
        style: { x: 100, y: 100 },
        data: { selected: true },
      },
    ],
  },
  node: {
    type: 'vue-node',
    style: {
      component: (data) => <MyVueNode data={Object.assign({}, data)} graph={graph} />, // data是非响应式数据，需要通过改变引用来触发Vue的props副作用
    },
  },
});

graph.render();
```

### 事件交互

实现节点与图实例的双向通信，使节点和图实例可以相互更新。

**示例**：通过自定义节点操作图数据，并重新渲染图形。

```jsx
import { ExtensionCategory, register, Graph } from '@antv/g6';
import { VueNode } from 'g6-extension-vue';
import { defineComponent, computed } from 'vue';

register(ExtensionCategory.NODE, 'vue-node', VueNode);

const IDCardNode = defineComponent({
  setup(props, { attrs, slots, expose }) {
    const isSelected = computed(() => props.data.data.selected);

    const handleSelect = () => {
      graph.updateNodeData([{ id: props.data.id, data: { selected: true } }]);
      graph.draw();
    };

    return <Select onChange={handleSelect} style={{ background: isSelected.value ? 'orange' : '#eee' }} />;
  },
});

const graph = new Graph({
  node: {
    type: 'vue-node',
    style: {
      component: ({ id, data }) => <IDCardNode id={id} selected={isSelected.value} graph={graph} />,
    },
  },
});
```
