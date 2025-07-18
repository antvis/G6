---
title: 缩进树 Indented
order: 16
---

## 概述

Indented（缩进树）布局是一种通过水平方向的缩进量来表示树节点层级的布局方式。每个元素占据一行或一列，常用于文件目录结构、组织架构等场景。该布局结构清晰，便于展示层级关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NBUzRonaOYMAAAAAAAAAAABkARQnAQ' width=175 alt='Indented 缩进树布局示意图'/>

## 使用场景

- 文件目录结构可视化
- 组织架构树
- 分类体系展示
- 需要突出层级关系的树状数据

## 配置项

> IndentedLayout 支持通用布局配置项和专有配置项，详见下表。

| 属性                   | 描述                                                 | 类型                            | 默认值     | 必选 |
| ---------------------- | ---------------------------------------------------- | ------------------------------- | ---------- | ---- |
| type                   | 布局类型，需为 'indented'                            | 'indented'                      | -          | ✓    |
| direction              | 布局方向，根节点在左/右/中间，详见下方说明           | 'LR' \| 'RL' \| 'H'             | 'LR'       |      |
| indent                 | 列间间距，支持固定值或函数                           | number \| (d?: Node) => number  | 20         |      |
| getWidth               | 获取每个节点宽度，仅 direction='H' 时生效            | (d?: Node) => number            | -          |      |
| getHeight              | 获取每个节点高度                                     | (d?: Node) => number            | -          |      |
| getSide                | 节点排布在根节点的左/右侧，设置后 direction='H' 失效 | (d?: Node) => 'left' \| 'right' | -          |      |
| dropCap                | 每个节点的第一个子节点是否换行                       | boolean                         | true       |      |
| isLayoutInvisibleNodes | 不可见节点是否参与布局（preLayout=true 时生效）      | boolean                         | false      |      |
| nodeFilter             | 参与该布局的节点                                     | (node: NodeData) => boolean     | () => true |      |
| preLayout              | 使用前布局，在初始化元素前计算布局                   | boolean                         | false      |      |
| enableWorker           | 是否在 WebWorker 中运行布局                          | boolean                         | -          |      |
| iterations             | 迭代布局的迭代次数                                   | number                          | -          |      |

### 复杂类型说明

- **direction**

  - `'LR'`：根节点在左，向右布局
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mq6YSIKrAt0AAAAAAAAAAABkARQnAQ' width=110 alt='LR'/>
  - `'RL'`：根节点在右，向左布局
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VGEnRbpvxlUAAAAAAAAAAABkARQnAQ' width=90 alt='RL'/>
  - `'H'`：根节点在中间，水平对称布局
    <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vek6RqtUXNcAAAAAAAAAAABkARQnAQ' width=160 alt='H'/>

- **indent**

  - 固定数值：所有层级缩进一致
  - 函数：(d?: Node) => number，可根据节点自定义缩进
  - 示例：
    ```js
    (d) => {
      if (d.parent?.id === 'testId') return d.parent.x + 50;
      return 100;
    };
    ```

- **getWidth/getHeight**

  - 用于自定义每个节点的宽度/高度，常用于自适应内容
  - 示例：
    ```js
    (d) => (d.id === 'testId' ? 50 : 100);
    ```

- **getSide**
  - 指定节点在根节点的哪一侧，仅 direction='H' 时生效
  - 示例：
    ```js
    (d) => (d.id === 'testId' ? 'left' : 'right');
    ```

## 示例代码

> 更多示例可参考 [在线 Demo](https://g6.antv.antgroup.com/examples/layout/indented)

### 子节点自动分布

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kc63QoxgLNYAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
    });
    graph.render();
  });
```

### 子节点右侧分布

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3PioQ4TAMx8AAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
// ... 代码同上，layout.direction: 'LR'
```

### 子节点左侧分布

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*o6uzQ5nmXJkAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
// ... 代码同上，layout.direction: 'RL'
```

### 自定义子节点分布

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Kc63QoxgLNYAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
layout: {
  type: 'indented',
  direction: 'H',
  indent: 80,
  getHeight: () => 16,
  getWidth: () => 32,
  getSide: (d) => {
    if (d.id === 'Regression' || d.id === 'Classification') return 'left';
    return 'right';
  },
}
```

### 首子节点不换行

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*bC-pRrO7srwAAAAAAAAAAAAADmJ7AQ/original" width="300" />

```js
layout: {
  type: 'indented',
  direction: 'LR',
  indent: 80,
  getHeight: () => 16,
  getWidth: () => 32,
  dropCap: false,
}
```
