const G6 = require('../../src/index');

describe('issue-308-spec', () => {
  const div = G6.Util.createDOM(`
  <div>
    <div id="mountNode"></div>
    <div id="minimap"></div>
  </div>
  `);
  document.body.appendChild(div);
  const data = {
    roots: [{
      id: 'root',
      children: [{
        id: 'child1',
        collapsed: true,
        children: [{
          id: 'child\n1.1'
        }]
      }, {
        id: 'child2'
      }]
    }]
  };
  const tree = new G6.Tree({
    container: 'mountNode',
    width: 500,
    height: 500,
    fitView: 'tl'
  });
  tree.node({
    label(model) {
      return model.id;
    }
  });
  tree.read(data);
  tree.on('node:click', ev => {
    const item = ev.item;
    const model = item.getModel();
    if (model.collapsed) {
      tree.update(item, {
        collapsed: false
      });
    } else {
      tree.update(item, {
        collapsed: true
      });
    }
  });
});

