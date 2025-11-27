```js | ob { pin: false, inject: true }
import { Graph, BaseTransform, register, ExtensionCategory } from '@antv/g6';

class HideFreeNode extends BaseTransform {
  beforeDraw(input, context) {
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

register(ExtensionCategory.TRANSFORM, 'hide-free-node', HideFreeNode);

const data = {
  nodes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }],
  edges: [
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '5' },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 600,
  height: 400,
  autoFit: 'center',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'antv-dagre',
    rankdir: 'LR',
  },
  transforms: ['hide-free-node'],
});

graph.render();
```
