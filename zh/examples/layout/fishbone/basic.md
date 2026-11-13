---
title: "Fishbone 鱼骨布局"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/examples/layout/fishbone/basic/"
version: "5.1.1"
---

# Fishbone 鱼骨布局

[运行示例](https://g6.antv.antgroup.com/zh/examples/layout/fishbone/basic/)

[资料索引](/llms.txt)

页面需要一个 `id="container"` 的 DOM 元素。以下为原始示例源码。

## 源码

```js
import { Graph, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Quality',
  children: [
    {
      id: 'Machine',
      children: [{ id: 'Mill' }, { id: 'Mixer' }, { id: 'Metal Lathe', children: [{ id: 'Milling' }] }],
    },
    { id: 'Method' },
    {
      id: 'Material',
      children: [
        {
          id: 'Masonite',
          children: [
            { id: 'spearMint' },
            { id: 'pepperMint', children: [{ id: 'test3' }] },
            { id: 'test1', children: [{ id: 'test4' }] },
          ],
        },
        {
          id: 'Marscapone',
          children: [{ id: 'Malty' }, { id: 'Minty' }],
        },
        { id: 'Meat', children: [{ id: 'Mutton' }] },
      ],
    },
    {
      id: 'Man Power',
      children: [
        { id: 'Manager' },
        { id: "Master's Student" },
        { id: 'Magician' },
        { id: 'Miner' },
        { id: 'Magister', children: [{ id: 'Malpractice' }] },
        {
          id: 'Massage Artist',
          children: [{ id: 'Masseur' }, { id: 'Masseuse' }],
        },
      ],
    },
    {
      id: 'Measurement',
      children: [{ id: 'Malleability' }],
    },
    {
      id: 'Milieu',
      children: [{ id: 'Marine' }],
    },
  ],
};

export const layoutFishbone = async (context) => {
  const graph = new Graph({
    ...context,
    container: 'container',
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: {
        size: [32, 32],
        // fill: () => randomColor(),
        label: false,
        labelFill: '#262626',
        labelFontFamily: 'Gill Sans',
        labelMaxLines: 2,
        labelMaxWidth: '100%',
        labelPlacement: 'center',
        labelText: (d) => d.id,
        labelWordWrap: true,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    layout: {
      type: 'fishbone',
      vGap: 48,
      hGap: 48,
      direction: 'RL',
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    animation: false,
  });

  await graph.render();

  layoutFishbone.form = (panel) => {
    const config = {
      type: 'fishbone',
      direction: 'RL',
    };

    return [
      panel
        .add(config, 'direction', ['LR', 'RL'])
        .name('Direction')
        .onChange((value) => {
          graph.setLayout((prev) => ({ ...prev, direction: value }));
          graph.render();
        }),
    ];
  };

  return graph;
};

layoutFishbone();
```
