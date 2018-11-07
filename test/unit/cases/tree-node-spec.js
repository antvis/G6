const G6 = require('../../../src/index');
const div = document.createElement('div');
const Layouts = G6.Layouts;
document.body.appendChild(div);
// graph.zoom({ x: 10, y: 10 }, 4);
div.setAttribute('data-test-spec', 'cases/tree-node-spec.js');
describe('tree node user cases test', () => {
  const data = {
    roots: [
      {
        label: 'root',
        children: [
          {
            label: 'child2'
          }, {
            label: 'child4'
          }, {
            label: 'child1',
            children: [
              {
                label: 'child\n1.1'
              }
            ]
          }, {
            label: 'childd3'
          }]
      }
    ]
  };
  const tree = new G6.Tree({
    container: div,
    layout: new Layouts.CompactBoxTree({
      direction: 'H',
      getHGap(child) {
        if (!child.parent) {
          return 50;
        }
        return 50;
      },
      getVGap() {
        return 10;
      }
    }),
    width: 700,
    height: 500,
    fitView: 'cc'
  });
  tree.read(data);
  tree.destroy();
});

