import { TreeGraph } from '../../../src';
import { timerOut } from '../util/timeOut';

const div = document.createElement('div');
div.id = 'tree-spec';
document.body.appendChild(div);

describe('tree graph without updateChild', () => {
  let graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    animate: false,
    modes: {
      default:
        ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
    },
  });
  it('update child', () => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then((res) => res.json())
      .then((data) => {
        graph.node(function (node) {
          return {
            label: node.id,
            labelCfg: {
              offset: 10,
              position: node.children && node.children.length > 0 ? 'left' : 'right',
            },
          };
        });
        graph.data(data);
        graph.render();
        graph.fitView();

        graph.updateChildren([{
          id: 'subTree1',
          children: []
        }, {
          id: 'subTree2',
          children: []
        }, {
          id: 'subTree3',
          children: [{
            id: 'aaa'
          }, {
            id: 'bbb'
          }]
        }], 'Methods');
        const newParentData = graph.findDataById('Methods');
        expect(newParentData.children.length).toBe(3);
        const subTree3 = graph.findById('subTree3');
        expect(subTree3).not.toBe(undefined);
        graph.destroy();
      });
  });
});