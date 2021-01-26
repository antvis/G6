### G6 Mobile


## Usage
Graph with g6-mobile:

```ts
import G6 from '@antv/g6-mobile';

Page({
  data: {
    canvasWidth: 400,
    canvasHeight: 610,
  },

  onLoad() {
    this.ctx = my.createCanvasContext('canvas')
    this.drawG6()
  },

  drawG6() {
    const { canvasWidth, canvasHeight } = this.data
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'Circle1',
          x: 50,
          y: 50,
        },
        {
          id: 'node2',
          label: 'Circle2',
          x: 100,
          y: 100,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
      ],
    }

    const graph = new G6.Graph({
      container: null,
      context: this.ctx,
      renderer: 'mini',
      width: canvasWidth,
      height: canvasHeight,
      defaultNode: {
        shape: 'circle',
        size: [30],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 20,
          },
        },
      },
      defaultEdge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
    })

    graph.data(data)
    graph.render()
  },
})

```



TreeGraph with g6-mobile extends package:

```ts
import G6 from '@antv/g6-mobile';
import TreeGraph from '@antv/g6-mobile/es/extends/treeGraph';

G6.extend(TreeGraph);

Page({
  data: {
    canvasWidth: 400,
    canvasHeight: 610,
  },

  onLoad() {
    this.ctx = my.createCanvasContext('canvas')
    this.drawG6()
  },

  drawG6() {
    const { canvasWidth, canvasHeight } = this.data

    const data = {
      id: 'Modeling Methods',
      children: [
        {
          id: 'Classification',
          children: [
            { id: 'Logistic regression' },
            { id: 'Linear discriminant analysis' },
            { id: 'Rules' },
          ],
        },
        {
          id: 'Consensus',
          children: [
            {
              id: 'Models diversity',
            },
            {
              id: 'Methods',
            },
            {
              id: 'Common',
            },
          ],
        },
      ],
    }

    const graph = new G6.TreeGraph({
      container: null,
      context: this.ctx,
      renderer: 'mini',
      width: canvasWidth,
      height: canvasHeight,
      defaultNode: {
        shape: 'circle',
        size: [20],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 10,
          },
        },
      },
      defaultEdge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        // fixedRoot: true,
      },
    })

    graph.data(data)
    graph.render()
  },
})
```
