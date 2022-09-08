import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  "combos": [
    {
      "id": "ccc",
      "label": "ccc",
      "collapsed": true,
      parentId: 'd'
    },
    {
      "id": "d",
      "label": "d",
    }
  ],
  "edges": [
    {
      "source": "a",
      "target": "b"
    }
  ],
  "nodes": [
    {
      "id": "b"
    },
    {
      "comboId": "ccc",
      "id": "a"
    }
  ]
};
describe('combo layout with collapsed', () => {
  it('combo layout with collapsed', (done) => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      layout: {
        type: 'grid'
      },
      modes: {
        default: ['collapse-expand-combo']
      }
    });

    graph.data(data);
    graph.render();
    console.log('data', data)
    setTimeout(() => {
      expect(data.combos[0].x).toBe(250)
      expect(data.combos[0].y).toBe(375)
      done()
    }, 0);
  });
});
