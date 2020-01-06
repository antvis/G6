import '../../../src/behavior'
import '../../../src/shape'
import TreeGraph from '../../../src/graph/tree-graph'
import { Event } from '@antv/g-canvas';
import { IG6GraphEvent } from "../../../types";


const div = document.createElement('div');
div.id = 'collapse-expand-spec';
document.body.appendChild(div);

function approximateEqual(a, b) {
  return Math.abs(a - b) < 0.0001;
}

describe('collapse expand tree graph', () => {

  const data = {
    isRoot: true,
    id: 'Root',
    style: {
      fill: 'red'
    },
    children: [{
      id: 'SubTreeNode1',
      raw: {},
      children: [{
        id: 'SubTreeNode1.1'
      },
      {
        id: 'SubTreeNode1.2',
        children: [{
          id: 'SubTreeNode1.2.1'
        },
        {
          id: 'SubTreeNode1.2.2'
        },
        {
          id: 'SubTreeNode1.2.3'
        }]
      }]
    },
    {
      id: 'SubTreeNode2',
      children: [{
        id: 'SubTreeNode2.1'
      }]
    },
    {
      id: 'SubTreeNode3',
      children: [{
        id: 'SubTreeNode3.1'
      },
      {
        id: 'SubTreeNode3.2'
      },
      {
        id: 'SubTreeNode3.3'
      }]
    },
    {
      id: 'SubTreeNode4'
    },
    {
      id: 'SubTreeNode5'
    },
    {
      id: 'SubTreeNode6'
    },
    {
      id: 'SubTreeNode7',
    },
    {
      id: 'SubTreeNode8'
    },
    {
      id: 'SubTreeNode9'
    },
    {
      id: 'SubTreeNode10'
    },
    {
      id: 'SubTreeNode11'
    }]
  };
  // FIXME: the nodes are updated, but the edges are remained unchanged.
  it('collapse tree graph', () => {
    const graph = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'compactBox'
      },
      fitView: true,
      modes: {
        default: [ 'collapse-expand' ]
      },
      defaultNode: {
        size: 10
      }
    });
    graph.data(data);
    graph.render();
    // graph.emit('dblclick', {
    // });
    // graph.destroy();
  });
  it('expand tree graph', () => {
    const graph = new TreeGraph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'compactBox'
      },
      modes: {
        default: [ 'collapse-expand' ]
      }
    });
    graph.data(data);
    graph.render();
    graph.destroy();
  });
});
