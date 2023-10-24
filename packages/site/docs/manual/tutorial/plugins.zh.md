---
title: 插件与工具
order: 5
---

本文将为 **Tutorial 案例** 添加缩略图插件、节点提示框。

使用插件时，有三个步骤：<br />  Step 1: 引入插件；<br />  Step 2: 注册插件；<br />  Step 3: 在实例化图时将插件的实例配置到图上。

## Minimap

缩略图 (Minimap) 是一种常见的用于快速预览和探索图的工具，可作为导航辅助用户探索大规模图。

现在，我们为 **Tutorial 案例** 配置一个 Minimap：

**预期效果**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9VQjTp0Ipi8AAAAAAAAAAAAADmJ7AQ/original' width=350 alt='img' />

**使用方法**

Minimap 是 G6 的提供的插件之一，但未提前注册，需要从 Extensions 引入并注册后，再配置到图上：

```javascript
cosnt { Graph as BaseGraph, extend, Extensions } = G6;

const ExtGraph = extend(BaseGraph, {
  // ... 其他扩展的注册
  // 插件注册
  plugins: {
    minimap: Extensions.Minimap,
  }
});

// 实例化图，注意这里使用的是 extend 后的 Graph
const graph = new Graph({
  // ...                           // 其他配置项
  plugins: [
    // 若使用默认配置，可以只写一个字符串 'minimap'
    {
      type: 'minimap',
      // ... 其他配置项
    }
  ],
});
```

## tooltip 节点提示框

节点提示框可以用在边的详细信息的展示。当鼠标滑过节点时，显示一个浮层告知节点的详细信息。更多配置参见 [Tooltip 插件](https://g6-next.antv.antgroup.com/apis/interfaces/plugins/tooltip-config)。

**预期效果**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9VQjTp0Ipi8AAAAAAAAAAAAADmJ7AQ/original' width=300 alt='img' />

**使用方法**

Tooltip 是 G6 的提供的插件之一，但未提前注册，需要从 Extensions 引入并注册后，再配置到图上：

```javascript
cosnt { Graph as BaseGraph, extend, Extensions } = G6;

const ExtGraph = extend(BaseGraph, {
  // ... 其他扩展的注册
  // 插件注册
  plugins: {
    minimap: Extensions.Minimap,
    tooltip: Extensions.Tooltip,
  }
});

// 实例化图，注意这里使用的是 extend 后的 Graph
const graph = new Graph({
  // ...                           // 其他配置项
  plugins: [
    // 若使用默认配置，可以只写一个字符串 'minimap'
    'minimap',,
    // 若使用默认配置，可以只写一个字符串 'tooltip'
    {
      type: "tooltip",
      key: "my-tooltip", // 唯一标志
      itemTypes: ["node"], // 只对节点生效，可以配置为 ['node', 'edge'] 使其同时对边生效
      getContent: (e) => { // 自定义内容
        const model = graph.getNodeData(e.itemId);
        return `ID: ${e.itemId}<br/>Degree: ${model.data.degree}`;
      }
      // ... 其他配置项
    },
  ],
});
```

## 完整代码

至此，**Tutorial 案例** 完成，完整代码见：<a href='https://codesandbox.io/s/g6-v5-tutorial-j67vnm?file=/index.js' target='_blank'>Tutorial 案例代码</a>。

**⚠️ 注意:** <br /> 若需更换数据，请替换  `'https://raw.githubusercontent.com/antvis/G6/v5/packages/g6/tests/datasets/force-data.json'`  为新的数据文件地址。

<iframe src="https://codesandbox.io/embed/g6-v5-tutorial-j67vnm?fontsize=14&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="g6-v5-tutorial"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
