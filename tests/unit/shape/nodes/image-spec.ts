import Graph from '../../../../src/graph/graph'
import '../../../../src/shape/node'
import '../../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('image test', () => {
  describe('default image test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      defaultNode: {
        shape: 'image'
      }
    };
    const graph = new Graph(cfg);
    it('default image config', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            x: 100,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toEqual(200);
      expect(keyShape.attr('img')).toEqual('https://img2.bosszhipin.com/boss/avatar/avatar_13.png');
    });

    it('image with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);

      const label = group.find(g => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(undefined);
      expect(label.attr('fill')).toEqual('#595959');
      const type = label.get('type');
      expect(type).toEqual('text');
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  // describe('clip', () => {
  //   it('circle clip', () => {
  //     const graph = new Graph({
  //       container: div,
  //       width: 500,
  //       height: 500,
  //       pixelRatio: 2,
  //       defaultNode: {
  //         shape: 'image',
  //         size: 50,
  //         style: {
  //           stroke: '#ccc',
  //           lineWidth: 5
  //         }
  //       }
  //     });
  //     const data = {
  //       nodes: [
  //         {
  //           id: 'node',
  //           label: 'image',
  //           x: 200,
  //           y: 100
  //         }
  //       ]
  //     };
  //     graph.data(data);
  //     graph.render();

  //     const nodes = graph.getNodes();
  //     const node = nodes[0];
  //     node.update({
  //       size: 30,
  //       color: 'black',
  //     })
  //     const group = node.get('group');
  //     expect(group.getCount()).toEqual(2);
  //     const keyShape = node.getKeyShape();
  //     expect(keyShape.attr('width')).toBe(30);
  //     expect(keyShape.attr('height')).toBe(30);
  //     expect(keyShape.attr('lineWidth')).toBe(5);
  //     expect(keyShape.attr('stroke')).toBe('black');

  //     graph.destroy();
  //     expect(graph.destroyed).toBe(true);
  //   });
  // });

  describe('update', () => {
    // it('update styles', () => {
    //   const graph = new Graph({
    //     container: div,
    //     width: 500,
    //     height: 500,
    //     pixelRatio: 2,
    //     defaultNode: {
    //       shape: 'image',
    //       size: 50,
    //       style: {
    //         stroke: '#ccc',
    //         lineWidth: 5
    //       }
    //     }
    //   });
    //   const data = {
    //     nodes: [
    //       {
    //         id: 'node',
    //         label: 'image',
    //         x: 200,
    //         y: 100
    //       }
    //     ]
    //   };
    //   graph.data(data);
    //   graph.render();

    //   const nodes = graph.getNodes();
    //   const node = nodes[0];
    //   const keyShape = node.getKeyShape();
    //   expect(keyShape.attr('stroke')).toBe('#ccc');
    //   expect(keyShape.attr('lineWidth')).toBe(5);

      // node.update({
      //   size: 30,
      //   color: 'black'
      // })
      // const group = node.get('group');
      // expect(group.getCount()).toEqual(2);
      // expect(keyShape.attr('width')).toBe(30);
      // expect(keyShape.attr('height')).toBe(30);
      // expect(keyShape.attr('lineWidth')).toBe(5);
      // expect(keyShape.attr('stroke')).toBe('black');

      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    // });
    it('update label', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old image label',
            shape: 'image',
            x: 200,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      node.update({
        label: 'new image label',
        labelCfg: {
          style: {
            fill: '#ff0'
          }
        }
      })

      const label = group.find(g => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('fill')).toEqual('#ff0');

      // test if it will keep the current fill without setting
      node.update({
        labelCfg: {
          position: 'center',
          style: {
            stroke: 'black',
            lineWidth: 3
          }
        }
      });
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('lineWidth')).toEqual(3);
      expect(label.attr('stroke')).toEqual('black');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label from none', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500
      });
      const data = {
        nodes: [
          {
            id: 'node',
            shape: 'image',
            x: 200,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      node.update({
        label: 'new image label',
        labelCfg: {
          style: {
            fill: '#ff0'
          }
        }
      })

      const label = group.find(g => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
