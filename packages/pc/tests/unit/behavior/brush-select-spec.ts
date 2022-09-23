import '../../../src';
import { Graph, Node, Edge, Combo } from '../../../src';

describe('brush-select', () => {
  let graph: Graph;
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement('div');
    div.id = 'activate-relations-spec';
    document.body.appendChild(div);

    graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: { default: ['zoom-canvas'] },
      nodeStateStyles: {
        selected: { stroke: '#ff0' },
        customState: {},
      },
      edgeStateStyles: {
        selected: {},
        customState: {},
      },
    });
  });

  afterEach(() => {
    div.remove(); 
  });

  describe('Configs', () => {
    let node1: Node;
    let node2: Node;
    let node3: Node;
    let edge1: Edge;

    beforeEach(() => {
      node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
      node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
      node3 = graph.addItem('node', { id: 'node3', x: 80, y: 150, label: 'node3' });
      graph.addItem('edge', { source: 'node1', target: 'node2' });
      edge1 = graph.addItem('edge', { source: 'node1', target: 'node3' });
    });

    afterEach(() => {
      graph.destroy(); 
    });

    it('default configs', () => {
      graph.addBehaviors(['brush-select'], 'default');
      graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
      graph.emit('dragstart', { canvasX: 20, canvasY: 20 });
      graph.emit('drag', { canvasX: 120, canvasY: 120 });
      // 只选中一个节点，没有边被选中
      graph.emit('dragend', { canvasX: 120, canvasY: 120, x: 120, y: 120 });
      let selectedNodes = graph.findAllByState('node', 'selected');
      expect(selectedNodes.length).toEqual(1);
      expect(selectedNodes[0] === node1).toBe(true);

      let selectedEdges = graph.findAllByState('edge', 'selected');
      expect(selectedEdges.length).toEqual(0);

      // 选中两个节点，一条边
      graph.emit('keydown', { canvasX: 20, canvasY: 20 });
      graph.emit('dragstart', { canvasX: 20, canvasY: 20 });
      graph.emit('dragend', { canvasX: 120, canvasY: 160, x: 120, y: 160 });

      selectedNodes = graph.findAllByState('node', 'selected');
      expect(selectedNodes.length).toEqual(2);
      expect(selectedNodes[1] === node3).toBe(true);

      selectedEdges = graph.findAllByState('edge', 'selected');
      expect(selectedEdges.length).toEqual(1);
      expect(selectedEdges[0] === edge1).toBe(true);

      graph.emit('canvas:click');
      selectedNodes = graph.findAllByState('node', 'selected');
      expect(selectedNodes.length).toEqual(0);

      selectedEdges = graph.findAllByState('edge', 'selected');
      expect(selectedEdges.length).toEqual(0);

      graph.translate(200, 200);
      graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'abc' }); // invalid key
      graph.emit('dragstart', { canvasX: 20, canvasY: 20 });
      graph.emit('drag', { canvasX: 120, canvasY: 120 });
      graph.emit('keyup', { key: 'shift' });
      graph.emit('dragend', { canvasX: 120, canvasY: 120, x: -80, y: -80 });
      selectedNodes = graph.findAllByState('node', 'selected');
      expect(selectedNodes.length).toEqual(0);

      graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
      graph.emit('dragstart', { canvasX: 20, canvasY: 20 });
      graph.emit('drag', { canvasX: 120, canvasY: 120 });
      graph.emit('keyup', { key: 'shift' });
      selectedNodes = graph.findAllByState('node', 'selected');
      expect(selectedNodes.length).toEqual(0);

      // translate 到原点，以防影响后续的测试
      graph.translate(-200, -200);
      graph.removeBehaviors(['brush-select'], 'default');
    });

    it('modify cfgs', () => {
      let triggered = false;
      graph.translate(-200, -200);
      graph.addBehaviors(
        [
          {
            type: 'brush-select',
            selectedState: 'customState',
            includeEdges: false,
            trigger: 'drag',
            onSelect() {
              triggered = true;
            },
          },
        ],
        'default',
      );
      graph.emit('dragstart', { canvasX: -110, canvasY: -120 });
      graph.emit('drag', { canvasX: 300, canvasY: 300 });
      graph.emit('dragend', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
      let selectedNodes = graph.findAllByState('node', 'customState');
      expect(selectedNodes.length).toEqual(2);
      expect(selectedNodes[0] === node1).toBe(true);
      expect(selectedNodes[1] === node2).toBe(true);

      const selectedEdges = graph.findAllByState('edge', 'customState');
      expect(selectedEdges.length).toEqual(0);

      graph.emit('canvas:click');
      selectedNodes = graph.findAllByState('node', 'customState');
      expect(selectedNodes.length).toEqual(0);
      expect(triggered).toBe(true);
    });
  });

  it('invalid trigger, multiple is false', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'brush-select',
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

  it('manipulate on a node', () => {
    const graph2 = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'brush-select',
            trigger: 'drag',
          },
        ],
      },
      nodeStateStyles: {
        selected: {
          stroke: '#ff0',
        },
      },
    });
    const node = graph2.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph2.paint();

    graph2.emit('keydown', { canvasX: 50, canvasY: 50, key: 'shift' });
    graph2.emit('dragstart', { canvasX: 50, canvasY: 50, item: node });
    graph2.emit('drag', { canvasX: 100, canvasY: 100 });
    graph2.emit('dragend', { canvasX: 100, canvasY: 100, x: 100, y: 100 });
    const selectedNodes = graph2.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(0);

    graph2.destroy();
  });

  describe('On drag start', () => {
    let node1: Node;
    let node2: Node;
    let edge: Edge;
    let combo: Combo;

    beforeEach(() => {
      graph.addBehaviors([
        {
          type: 'brush-select',
          trigger: 'drag',
          includeCombos: true,
        }
      ], 'default');

      node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
      node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
      edge = graph.addItem('edge', { source: 'node1', target: 'node2' });
      combo = graph.addItem('combo', { id: combo, x: 100, y: 100 });

      graph.paint();

      graph.emit('keydown', { canvasX: 0, canvasY: 0, key: 'shift' });
      graph.emit('dragstart', { canvasX: 0, canvasY: 0 });
      graph.emit('drag', { canvasX: 250, canvasY: 250 });
      graph.emit('dragend', { canvasX: 250, canvasY: 250, x: 250, y: 250 });
    });

    it('should clear current selection', () => {
      expect(graph.findAllByState('node', 'selected')).toEqual([node1, node2]);
      expect(graph.findAllByState('edge', 'selected')).toEqual([edge]);
      expect(graph.findAllByState('combo', 'selected')).toEqual([combo]);

      graph.emit('keydown', { canvasX: 0, canvasY: 0, key: 'shift' });
      graph.emit('dragstart', { canvasX: 0, canvasY: 0 });
      graph.emit('drag', { canvasX: 50, canvasY: 50 }); // Not far enough to include objects
      graph.emit('dragend', { canvasX: 50, canvasY: 50, x: 50, y: 50 });

      expect(graph.findAllByState('node', 'selected')).toEqual([]);
      expect(graph.findAllByState('edge', 'selected')).toEqual([]);
      expect(graph.findAllByState('combo', 'selected')).toEqual([]);
    });
  });

  describe('includeCombos', () => {
    let combo: Combo;
    let shouldUpdate: jest.Mock;
    let onSelect: jest.Mock;

    function doDragSelection() {
      graph.emit('keydown', { canvasX: 0, canvasY: 0, key: 'shift' });
      graph.emit('dragstart', { canvasX: 0, canvasY: 0 });
      graph.emit('drag', { canvasX: 100, canvasY: 100 });
      graph.emit('dragend', { canvasX: 100, canvasY: 100, x: 100, y: 100 });
    }

    describe('when false', () => {
      beforeEach(() => {
        shouldUpdate = jest.fn().mockReturnValue(true);
        onSelect = jest.fn();

        graph.addBehaviors([
          {
            type: 'brush-select',
            trigger: 'drag',
            includeCombos: false,
            shouldUpdate,
            onSelect,
          }
        ], 'default');

        combo = graph.addItem('combo', { id: 'combo1', x: 50, y: 50 });

        graph.paint();
      });

      it('should not select combos on drag end', () => {
        doDragSelection();

        const selectedCombos = graph.findAllByState('combo', 'selected');
        expect(selectedCombos).toEqual([]);
      });

      it('should not pass selectedCombos to onSelect()', () => {
        doDragSelection();

        expect(onSelect).toHaveBeenCalledWith([], [], []);
      });

      it('should not notify combo selection on "nodeselectchange"', (done) => {
        graph.on('nodeselectchange', ({ selectedItems }: any) => {
          expect(selectedItems.combos).toEqual([]);
          done();
        });

        doDragSelection();
      });

    });

    describe('when true', () => {
      beforeEach(() => {
        shouldUpdate = jest.fn().mockReturnValue(true);
        onSelect = jest.fn();

        graph.addBehaviors([
          {
            type: 'brush-select',
            trigger: 'drag',
            includeCombos: true,
            shouldUpdate,
            onSelect,
          }
        ], 'default');

        combo = graph.addItem('combo', { id: 'combo1', x: 50, y: 50 });

        graph.paint();
      });

      it('should select combos on drag end', () => {
        doDragSelection();

        const selectedCombos = graph.findAllByState('combo', 'selected');
        expect(selectedCombos).toEqual([combo]);
      });

      it('should pass selectedCombos to onSelect()', () => {
        doDragSelection();

        expect(onSelect).toHaveBeenCalledWith([], [], [combo]);
      });

      it('should notify combo selection on "nodeselectchange"', (done) => {
        graph.on('nodeselectchange', ({ selectedItems }: any) => {
          expect(selectedItems.combos).toEqual([combo]);
          done();
        });

        doDragSelection();
      });

      it('should not select invisible combos', () => {
        combo.hide(); // Make the combo invisible
        doDragSelection();

        const selectedCombos = graph.findAllByState('combo', 'selected');
        expect(selectedCombos).toEqual([]);
      });

      it('should use shouldUpdate() to check if the combo has to be selected', () => {
        shouldUpdate.mockReturnValue(false);
        doDragSelection();

        const selectedCombos = graph.findAllByState('combo', 'selected');
        expect(selectedCombos).toEqual([]);
      });
    });
  });
});
