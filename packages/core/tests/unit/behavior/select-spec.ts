import { each } from '@antv/util';
import Graph from '../implement-graph';
import { registerBehavior, G6Event, IG6GraphEvent } from '../../../src';

const div = document.createElement('div');
div.id = 'select-spec';
document.body.appendChild(div);

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

// 自定义选中节点的 Behavior，功能完全同 click-select Behavior
registerBehavior('select-node', {
  getDefaultCfg(): object {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER,
      selectedState: 'selected',
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const self = this as any;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior brush-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'",
      );
    }
    if (!self.multiple) {
      return {
        'node:click': 'onClick',
        'combo:click': 'onClick',
        'canvas:click': 'onCanvasClick',
      };
    }
    return {
      'node:click': 'onClick',
      'combo:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onClick(evt: IG6GraphEvent) {
    const self = this;
    const { item } = evt;
    if (!item || item.destroyed) {
      return;
    }

    const type = item.getType();
    const { graph, keydown, multiple, shouldUpdate, shouldBegin } = self;
    if (!shouldBegin.call(self, evt)) {
      return;
    }

    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
    if (!keydown || !multiple) {
      const selected = graph.findAllByState(type, self.selectedState);
      each(selected, (combo) => {
        if (combo !== item) {
          graph.setItemState(combo, self.selectedState, false);
        }
      });
    }

    if (item.hasState(self.selectedState)) {
      if (shouldUpdate.call(self, evt)) {
        graph.setItemState(item, self.selectedState, false);
      }
      const selectedNodes = graph.findAllByState('node', self.selectedState);
      const selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          combos: selectedCombos,
        },
        select: false,
      });
    } else {
      if (shouldUpdate.call(self, evt)) {
        graph.setItemState(item, self.selectedState, true);
      }
      const selectedNodes = graph.findAllByState('node', self.selectedState);
      const selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          combos: selectedCombos,
        },
        select: true,
      });
    }
  },
  onCanvasClick() {
    const { graph } = this;
    const selected = graph.findAllByState('node', this.selectedState);
    each(selected, (node) => {
      graph.setItemState(node, this.selectedState, false);
    });

    const selectedCombos = graph.findAllByState('combo', this.selectedState);
    each(selectedCombos, (combo) => {
      graph.setItemState(combo, this.selectedState, false);
    });
    graph.emit('nodeselectchange', {
      selectedItems: { nodes: [], edges: [], combos: [] },
      select: false,
    });
  },
  onKeyDown(e: IG6GraphEvent) {
    const self = this;
    const code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === this.trigger.toLowerCase() || code.toLowerCase() === 'control') {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp() {
    const self = this;
    (self as any).keydown = false;
  },
});

describe('select-node', () => {
  it('select & deselect single node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['select-node'],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();

    graph.once('nodeselectchange', (e) => {
      expect(e.selectedItems.nodes.length).toEqual(1);
    });

    graph.emit('node:click', { item: node });
    expect(node.getStates().length).toEqual(1);
    expect(node.hasState('selected')).toBe(true);
    graph.emit('node:click', { item: node });
    expect(node.getStates().length).toEqual(0);
    graph.destroy();
  });
  it('select & deselect multiple node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['select-node'],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node1 = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    const node2 = graph.addItem('node', {
      color: '#666',
      x: 150,
      y: 150,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(1);
    expect(node1.getStates()[0]).toEqual('selected');
    graph.emit('keydown', { key: 'shift' });
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(0);
    graph.emit('node:click', { item: node1 });
    expect(node1.hasState('selected')).toBe(true);
    graph.emit('node:click', { item: node2 });
    expect(node2.getStates().length).toEqual(1);
    expect(node2.getStates()[0]).toEqual('selected');
    expect(node1.hasState('selected')).toBe(true);
    graph.emit('keyup', { key: 'shift' });
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(0);
    expect(node2.getStates().length).toEqual(0);
    graph.destroy();
  });
  it('shouldUpdate', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'select-node',
            shouldUpdate: () => {
              return false;
            },
          },
        ],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:click', { item: node });
    expect(node.hasState('selected')).toBe(false);
    graph.destroy();
  });
  it('click canvas to cancel', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'select-node',
          },
        ],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:click', { item: node });
    expect(node.hasState('selected')).toBe(true);
    graph.emit('canvas:click');
    expect(node.hasState('selected')).toBe(false);
    graph.destroy();
  });
  it('invalid trigger, multiple is false', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'select-node',
            trigger: 'abc',
            multiple: false,
          },
        ],
      },
    });
    graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    expect(graph.get('modeController').currentBehaves[0].trigger).toEqual('shift');
    graph.destroy();
  });
  it('invalid key', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'select-node',
          },
        ],
      },
      nodeStateStyles: {
        selected: {},
      },
    });
    const node1 = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    const node2 = graph.addItem('node', {
      color: '#666',
      x: 150,
      y: 150,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:click', { item: node1 });
    expect(node1.getStates().length).toEqual(1);
    expect(node1.getStates()[0]).toEqual('selected');
    // key undefined
    graph.emit('keydown', { key: undefined });
    graph.emit('node:click', { item: node2 });
    expect(node1.hasState('selected')).toBe(false);
    expect(node2.hasState('selected')).toBe(true);

    // different from trigger
    graph.emit('keydown', { key: 'alt' });
    graph.emit('node:click', { item: node1 });
    graph.emit('node:click', { item: node2 });
    expect(node1.hasState('selected')).toBe(false);
    expect(node2.hasState('selected')).toBe(true);
    graph.destroy();
  });
});
