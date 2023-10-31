import { Graph, extend, Extensions } from '@antv/g6';

class ClickAddNodeBehavior extends Extensions.BaseBehavior {
  getEvents() {
    // The event is canvas:click, the responsing function is onClick
    return {
      'canvas:click': this.onClick,
    };
  }
  onClick(ev) {
    // Add a new node
    this.graph.addData('node', {
      id: `node-${Math.random()}`, // Generate the unique id
      data: {
        x: ev.canvas.x,
        y: ev.canvas.y,
      },
    });
  }
}

// Custom behavior: click two end nodes to add an edge
class ClickAddEdgeBehavior extends Extensions.BaseBehavior {
  virtualEdgeId = 'add-edge-virtual-edge';
  virtualNodeId = 'add-edge-virtual-node';
  getEvents() {
    // Set the events and the corresponding responsing function for this behavior
    return {
      'node:click': this.onClick, // The event is canvas:click, the responsing function is onClick
      pointermove: this.onMousemove, // The event is mousemove, the responsing function is onMousemove
      'edge:click': this.onEdgeClick, // The event is edge:click, the responsing function is onEdgeClick
    };
  }
  // The responsing function for node:click defined in getEvents
  onClick(ev) {
    // The position where the mouse clicks
    if (this.addingEdge && this.edge) {
      graph.addData('edge', {
        id: `actual-edge-${Math.random()}`,
        target: ev.itemId,
        source: this.edge.source,
      });
      if (this.graph.getNodeData(this.virtualNodeId)) this.graph.removeData('node', this.virtualNodeId);
      if (this.graph.getEdgeData(this.virtualEdgeId)) this.graph.removeData('edge', this.virtualEdgeId);
      this.edge = null;
      this.addingEdge = false;
    } else {
      // Add anew edge, the end node is the current node user clicks
      this.graph.addData('node', {
        id: this.virtualNodeId,
        data: {
          x: ev.canvas.x,
          y: ev.canvas.y,
          keyShape: {
            opacity: 0,
            interactive: false,
          },
          labelShape: {
            opacity: 0,
            interactive: false,
          },
        },
      });
      this.edge = graph.addData('edge', {
        id: this.virtualEdgeId,
        source: ev.itemId,
        target: this.virtualNodeId,
        data: {},
      });
      this.addingEdge = true;
    }
  }
  // The responsing function for mousemove defined in getEvents
  onMousemove(ev) {
    // The current position the mouse clicks
    if (this.addingEdge && this.edge) {
      // Update the end node to the current node the mouse clicks
      // this.graph.updateData('edge', {
      //   id: this.edge.id,
      //   target: point,
      // });
      this.graph.updateData('node', {
        id: this.virtualNodeId,
        data: {
          x: ev.canvas.x,
          y: ev.canvas.y,
        },
      });
    }
  }
  // The responsing function for edge:click defined in getEvents
  onEdgeClick(ev) {
    if (this.addingEdge && this.edge.id === ev.itemId) {
      this.graph.removeData('node', this.virtualNodeId);
      this.graph.removeData('edge', this.virtualEdgeId);
      this.edge = null;
      this.addingEdge = false;
    }
  }
}

const ExtGraph = extend(Graph, {
  behaviors: {
    'click-add-node': ClickAddNodeBehavior,
    'click-add-edge': ClickAddEdgeBehavior,
  },
});

// Initial data
const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 200,
      },
    },
    {
      id: 'node2',
      data: {
        x: 300,
        y: 200,
      },
    },
    {
      id: 'node3',
      data: {
        x: 300,
        y: 300,
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1',
    },
  ],
};

const container = document.getElementById('container');

// Add a selector to DOM
const selector = document.createElement('select');
selector.id = 'selector';
selector.style.position = 'absolute';
selector.style.zIndex = 10;
const selection1 = document.createElement('option');
selection1.value = 'default';
selection1.innerHTML = 'Default Mode';
const selection2 = document.createElement('option');
selection2.value = 'addNode';
selection2.innerHTML = 'Add Node (By clicking canvas)';
const selection3 = document.createElement('option');
selection3.value = 'addEdge';
selection3.innerHTML = 'Add Edge (By clicking two end nodes)';
selector.appendChild(selection1);
selector.appendChild(selection2);
selector.appendChild(selection3);
container.appendChild(selector);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  // The sets of behavior modes
  modes: {
    // Defualt mode
    default: ['drag-node', 'click-select', 'drag-canvas'],
    // Adding node mode
    addNode: ['click-add-node', 'click-select'],
    // Adding edge mode
    addEdge: ['click-add-edge', 'click-select'],
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  data,
});

// Listen to the selector, change the mode when the selector is changed
selector.addEventListener('change', (e) => {
  const value = e.target.value;
  // change the behavior mode
  graph.setMode(value);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 30]);
  };
