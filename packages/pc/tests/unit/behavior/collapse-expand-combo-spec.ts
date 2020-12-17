import '../../../src/behavior';
import '../../../src/shape';
import G6 from '../../../src';
import { ComboConfig, ICombo, INode } from '@antv/g6-core';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A',
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'A',
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 200,
      y: 350,
      label: 'node4',
      comboId: 'B',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node4',
    },
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
  ],
  combos: [
    {
      id: 'A',
      parentId: 'C',
      label: 'gorup A',
      type: 'circle',
    },
    {
      id: 'B',
      parentId: 'C',
      label: 'gorup B',
      type: 'circle',
    },
    {
      id: 'C',
      label: 'gorup C',
      // type: 'rect'
    },
    {
      id: 'F',
      label: 'gorup F',
      // type: 'rect'
    },
    {
      id: 'G',
      label: 'gorup G',
      // parentId: 'F'
      type: 'circle',
    },
  ],
};

describe('collapse-expand-combo', () => {
  it('default collapse expand combo', (done) => {
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
      modes: {
        default: ['collapse-expand-combo'],
      },
      defaultCombo: {
        type: 'circle',
        style: {
          fill: '#b5f5ec',
        },
      },
      nodeStateStyles: {
        selected: {
          fill: 'red',
        },
      },
      comboStateStyles: {
        active: {
          stroke: 'red',
        },
        selected: {
          'text-shape': {
            fill: '#f00',
            fontSize: 20,
          },
          fill: '#36cfc9',
        },
        state2: {
          stroke: '#0f0',
        },
      },
    });

    graph.data(data);
    graph.render();

    const comboA = graph.findById('A') as ICombo;
    const comboC = graph.findById('C') as ICombo;
    // collapse A and collapse B
    graph.emit('combo:dblclick', { item: comboA });
    graph.emit('combo:dblclick', { item: comboC });
    expect(comboA.getModel().collapsed).toBe(true);
    expect(comboC.getModel().collapsed).toBe(true);
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboA.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });
    comboC.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboC.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });

    setTimeout(() => {
      // The console will warn: Fail to expand the combo since it's ancestor combo is collapsed.
      graph.emit('combo:dblclick', { item: comboA });
      expect(comboA.getModel().collapsed).toBe(true);
      comboA.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(false);
      });
      comboA.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(false);
      });

      graph.emit('combo:dblclick', { item: comboC });
      expect(comboC.getModel().collapsed).toBe(false);
      comboC.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(true);
      });
      comboC.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(true);
      });
      // but A is still in collapsed state
      expect(comboA.getModel().collapsed).toBe(true);
      comboA.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(false);
      });
      comboA.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(false);
      });
      graph.destroy();
      done();
    }, 250);
  });
  it('default collapsed set in data', (done) => {
    data.combos.forEach((combo: ComboConfig) => {
      combo.collapsed = true;
    });
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
    });
    graph.read(data);
    setTimeout(() => {
      graph.getNodes().forEach((node: INode) => {
        if (node.get('id') !== 'node3') {
          expect(node.isVisible()).toBe(false);
        }
      });
      graph.destroy();
      done();
    }, 250);
  });
  it('collapse-expand-combo behavior with click trigger', (done) => {
    data.combos.forEach((combo: ComboConfig) => {
      delete combo.collapsed;
    });
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
      modes: {
        default: [
          {
            type: 'collapse-expand-combo',
            trigger: 'click',
          },
        ],
      },
    });
    graph.read(data);

    const comboA = graph.findById('A') as ICombo;
    const comboC = graph.findById('C') as ICombo;
    // collapse A and collapse B
    graph.emit('combo:click', { item: comboA });
    graph.emit('combo:click', { item: comboC });
    expect(comboA.getModel().collapsed).toBe(true);
    expect(comboC.getModel().collapsed).toBe(true);
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboA.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });
    comboC.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboC.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });

    setTimeout(() => {
      // The console will warn: Fail to expand the combo since it's ancestor combo is collapsed.
      graph.emit('combo:click', { item: comboA });
      expect(comboA.getModel().collapsed).toBe(true);
      comboA.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(false);
      });
      comboA.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(false);
      });

      graph.emit('combo:click', { item: comboC });
      expect(comboC.getModel().collapsed).toBe(false);
      comboC.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(true);
      });
      comboC.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(true);
      });
      // but A is still in collapsed state
      expect(comboA.getModel().collapsed).toBe(true);
      comboA.getChildren().nodes.forEach((node) => {
        expect(node.isVisible()).toBe(false);
      });
      comboA.getChildren().combos.forEach((combo) => {
        expect(combo.isVisible()).toBe(false);
      });
      graph.destroy();
      done();
    }, 250);
  });

  it('collapse-expand-combo behavior with invalid trigger', (done) => {
    data.combos.forEach((combo: ComboConfig) => {
      delete combo.collapsed;
    });
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
      modes: {
        default: [
          {
            type: 'collapse-expand-combo',
            trigger: 'mouseenter',
          },
        ],
      },
    });
    graph.read(data);

    const comboA = graph.findById('A') as ICombo;
    // collapse A and collapse B
    graph.emit('combo:mouseenter', { item: comboA });
    expect(comboA.getModel().collapsed).toBe(undefined);
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(true);
    });
    comboA.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(true);
    });
    graph.destroy();
    done();
  });

  it('collapse-expand-combo behavior with layout', (done) => {
    data.combos.forEach((combo: ComboConfig) => {
      delete combo.collapsed;
    });
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
      modes: {
        default: [
          {
            type: 'collapse-expand-combo',
          },
        ],
      },
      layout: {
        type: 'comboForce',
      },
    });
    graph.read(data);

    const comboA = graph.findById('A') as ICombo;
    // collapse A and collapse B
    graph.emit('combo:dblclick', { item: comboA });
    expect(comboA.getModel().collapsed).toBe(true);
    comboA.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(false);
    });
    comboA.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(false);
    });
    graph.destroy();
    done();
  });

  it('click on item which is not a combo', (done) => {
    data.combos.forEach((combo: ComboConfig) => {
      delete combo.collapsed;
    });
    const graph = new G6.Graph({
      container: 'container',
      width: 1000,
      height: 800,
      modes: {
        default: [
          {
            type: 'collapse-expand-combo',
          },
          'zoom-canvas',
          'drag-canvas',
        ],
      },
      layout: {
        type: 'comboForce',
      },
    });
    graph.read(data);

    const node = graph.getNodes()[0];
    const comboB = graph.findById('B') as ICombo;
    graph.emit('combo:dblclick', { item: node });
    expect(comboB.getModel().collapsed).toBe(undefined);
    comboB.getChildren().nodes.forEach((node) => {
      expect(node.isVisible()).toBe(true);
    });
    comboB.getChildren().combos.forEach((combo) => {
      expect(combo.isVisible()).toBe(true);
    });
    graph.destroy();
    done();
  });
});
