## algorithm / case

### Graph pattern matching

**文件路径**: `algorithm/case/demo/pattern-matching.js`

```js
import { GADDI } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const pattern = {
  nodes: [
    {
      id: 'pn0',
      cluster: 'nodeType-0',
    },
    {
      id: 'pn1',
      cluster: 'nodeType-1',
    },
    {
      id: 'pn2',
      cluster: 'nodeType-2',
    },
  ],
  edges: [
    { source: 'pn1', target: 'pn0', cluster: 'edgeType-1' },
    { source: 'pn1', target: 'pn2', cluster: 'edgeType-0' },
    { source: 'pn2', target: 'pn0', cluster: 'edgeType-2' },
  ],
};

fetch('https://assets.antv.antgroup.com/g6/gaddi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelPlacement: 'center',
          labelText: (d) => d.label,
          stroke: '#5F95FF',
          lineWidth: 1,
        },
        palette: {
          type: 'group',
          field: 'cluster',
          color: ['#5F95FF', '#61DDAA', '#65789B'],
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
        palette: {
          type: 'group',
          field: 'cluster',
          color: ['#5F95FF', '#61DDAA', '#65789B'],
        },
      },
      plugins: [
        {
          type: 'legend',
          nodeField: 'cluster',
          position: 'bottom',
        },
        {
          key: 'hull-0',
          type: 'hull',
          members: [],
        },
        {
          key: 'hull-1',
          type: 'hull',
          members: [],
        },
      ],
    });
    graph.render();

    window.addPanel((gui) => {
      gui.add(
        {
          match: () => {
            const matches = GADDI(data, pattern, true, undefined, undefined, 'cluster', 'cluster');
            matches.forEach((match, i) => {
              graph.updatePlugin({
                key: `hull-${i}`,
                members: match.nodes.map((node) => node.id),
              });
            });
            graph.render();
          },
        },
        'match',
      );
    });
  });
```

---

### Shortest path

**文件路径**: `algorithm/case/demo/shortest-path.js`

```js
import { findShortestPath } from '@antv/algorithm';
import { CanvasEvent, Graph } from '@antv/g6';

const format = ({ nodes, edges }) => {
  return {
    nodes: nodes.map((node) => ({
      ...node,
      style: {
        x: node.x,
        y: node.y,
      },
    })),
    edges,
  };
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then(format)
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      node: {
        style: {
          size: 12,
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', { type: 'click-select', multiple: true }],
      autoFit: 'view',
    });

    graph.render();

    const resetStates = () => {
      graph.setElementState(Object.fromEntries([...data.nodes, ...data.edges].map((element) => [element.id, []])));
    };

    graph.on(CanvasEvent.CLICK, () => {
      resetStates();
    });

    window.addPanel((gui) => {
      gui.add(
        {
          Help: () => {
            alert("Press 'shift' to select source and target nodes \n按住 'shift' 选取起点和终点");
          },
        },
        'Help',
      );
      gui.add(
        {
          Search: () => {
            const nodes = graph.getElementDataByState('node', 'selected');
            if (nodes.length !== 2) {
              alert('Please select 2 nodes!\n请选择两个节点！');
              return;
            }
            const [source, target] = nodes;
            const { length, path } = findShortestPath(data, source.id, target.id);
            if (length === Infinity) {
              alert('No path found!\n未找到路径！');
              return;
            }

            const states = {};
            data.nodes.forEach(({ id }) => {
              if (path.includes(id)) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            data.edges.forEach(({ id, source, target }) => {
              const sourceIndex = path.indexOf(source);
              const targetIndex = path.indexOf(target);
              if (sourceIndex === -1 || targetIndex === -1) return;
              if (Math.abs(sourceIndex - targetIndex) === 1) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            graph.setElementState(states);
            graph.frontElement(path);
          },
        },
        'Search',
      );
    });
  });
```

---

### LP automatic clustering

**文件路径**: `algorithm/case/demo/label-propagation.js`

```js
import { labelPropagation } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const colors = [
  '#5F95FF',
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      layout: {
        type: 'force',
        linkDistance: 50,
        animation: false,
      },
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add(
        {
          Cluster: () => {
            const clusteredData = labelPropagation(data, false);
            const result = clusteredData.clusters
              .map((cluster, i) => {
                const color = colors[i % colors.length];
                const nodes = cluster.nodes.map((node) => ({
                  id: node.id,
                  style: {
                    fill: color,
                  },
                }));
                return nodes;
              })
              .flat();
            graph.updateNodeData(result);
            graph.draw();
          },
        },
        'Cluster',
      );
    });
  });
```

---

### LOUVAIN automatic clustering

**文件路径**: `algorithm/case/demo/louvain.js`

```js
import { louvain } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const colors = [
  '#5F95FF',
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      layout: {
        type: 'force',
        linkDistance: 50,
        animation: false,
      },
    });
    graph.render();

    window.addPanel((gui) => {
      gui.add(
        {
          Cluster: () => {
            const clusteredData = louvain(data, false);
            const result = clusteredData.clusters
              .map((cluster, i) => {
                const color = colors[i % colors.length];
                const nodes = cluster.nodes.map((node) => ({
                  id: node.id,
                  style: {
                    fill: color,
                  },
                }));
                return nodes;
              })
              .flat();
            graph.updateNodeData(result);
            graph.draw();
          },
        },
        'Cluster',
      );
    });
  });
```

---

## animation / basic

### Enter Animation

**文件路径**: `animation/basic/demo/enter.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  node: {
    animation: {
      enter: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
  edge: {
    animation: {
      enter: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    index: 2,
    duration: 1000,
    easing: 'linear',
    add: () => {
      const { index } = config;
      const y = 50 + 25 * index;
      graph.addData({
        nodes: [
          { id: `node-${index + 1}`, style: { x: 50, y } },
          { id: `node-${index + 2}`, style: { x: 200, y } },
        ],
        edges: [{ source: `node-${index + 1}`, target: `node-${index + 2}` }],
      });
      graph.draw();
      config.index += 2;
    },
  };

  const updateMapper = (key, value) => {
    const { node, edge } = graph.getOptions();
    node.animation.enter[0][key] = value;
    edge.animation.enter[0][key] = value;
    graph.setNode(node);
    graph.setEdge(edge);
  };

  gui.add(config, 'duration', 500, 5000, 100).onChange((duration) => {
    updateMapper('duration', duration);
  });
  // see: https://g.antv.antgroup.com/en/api/animation/waapi#easing-1
  gui.add(config, 'easing', ['linear', 'ease-in-sine', 'ease-in-cubic']).onChange((easing) => {
    updateMapper('easing', easing);
  });
  gui.add(config, 'add').name('Add Element');
});
```

---

### Edge Path In

**文件路径**: `animation/basic/demo/enter-edge-path-in.js`

```js
import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class PathInLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate([{ lineDash: [0, length] }, { lineDash: [length, 0] }], {
      duration: 500,
      fill: 'both',
    });
  }
}

register(ExtensionCategory.EDGE, 'path-in-line', PathInLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
  },
  edge: {
    type: 'path-in-line',
    animation: {
      // disable default enter and exit animation
      enter: false,
      exit: false,
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    connect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        alert('The edge already exists.');
        return;
      }

      graph.addEdgeData([{ id: 'edge-1', source: 'node-0', target: 'node-1' }]);
      graph.draw();
    },
    disconnect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        graph.removeEdgeData(['edge-1']);
        graph.draw();
      }
    },
  };
  gui.add(config, 'connect');
  gui.add(config, 'disconnect');
});
```

---

### Update Animation

**文件路径**: `animation/basic/demo/update.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  node: {
    animation: {
      update: [{ fields: ['x', 'y', 'size'] }, { fields: ['fill'], shape: 'key' }],
    },
  },
  edge: {
    animation: {
      update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke', 'lineWidth'], shape: 'key' }],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black', 'purple', 'orange', 'gray'];
  let [nextOffsetY, nextSize, nextLineWidth] = [50, 50, 5];
  const config = {
    color: () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { fill: color } },
          { id: 'node-1', style: { fill: color } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { stroke: color } }],
      });
      graph.draw();
    },
    position: () => {
      const offsetY = nextOffsetY;
      graph.translateElementBy({
        'node-0': [0, offsetY],
        'node-1': [0, offsetY],
      });
      nextOffsetY = -nextOffsetY;
    },
    size: () => {
      const size = nextSize;
      const lineWidth = nextLineWidth;
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { size } },
          { id: 'node-1', style: { size } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { lineWidth } }],
      });
      graph.draw();
      [nextSize, nextLineWidth] = [nextSize === 50 ? 16 : 50, nextLineWidth === 5 ? 1 : 5];
    },
  };
  gui.add(config, 'color').name('fill & stroke');
  gui.add(config, 'position').name('position');
  gui.add(config, 'size').name('size & lineWidth');
});
```

---

### Exit Animation

**文件路径**: `animation/basic/demo/exit.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: Array.from({ length: 10 }, (_, i) => ({
      id: `node-${i}`,
      style: { x: i % 2 === 0 ? 50 : 200, y: 25 + 50 * Math.floor(i / 2) },
    })),
    edges: Array.from({ length: 5 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${i * 2}`,
      target: `node-${i * 2 + 1}`,
    })),
  },
  node: {
    animation: {
      exit: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
  edge: {
    animation: {
      exit: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    index: 4,
    duration: 1000,
    easing: 'linear',
    remove: () => {
      const { index } = config;
      if (index === -1) return;
      graph.removeData({
        nodes: [`node-${index * 2}`, `node-${index * 2 + 1}`],
        edges: [`edge-${index}`],
      });
      graph.draw();
      config.index--;
    },
  };
  const updateMapper = (key, value) => {
    const { node, edge } = graph.getOptions();
    node.animation.exit[0][key] = value;
    edge.animation.exit[0][key] = value;
    graph.setNode(node);
    graph.setEdge(edge);
  };
  gui.add(config, 'duration', 500, 5000, 100).onChange((duration) => {
    updateMapper('duration', duration);
  });
  // see: https://g.antv.antgroup.com/en/api/animation/waapi#easing-1
  gui.add(config, 'easing', ['linear', 'ease-in-sine', 'ease-in-cubic']).onChange((easing) => {
    updateMapper('easing', easing);
  });
  gui.add(config, 'remove').name('Remove Element');
});
```

---

### Combo Collapse/Expand

**文件路径**: `animation/basic/demo/combo-collapse-expand.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', combo: 'combo-2', style: { x: 120, y: 100 } },
      { id: 'node-2', combo: 'combo-1', style: { x: 300, y: 200 } },
      { id: 'node-3', combo: 'combo-1', style: { x: 200, y: 300 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
    combos: [
      {
        id: 'combo-1',
        type: 'rect',
        combo: 'combo-2',
        style: {
          collapsed: true,
        },
      },
      { id: 'combo-2' },
    ],
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    style: {
      labelText: (d) => d.id,
      lineDash: 0,
      collapsedLineDash: [5, 5],
    },
  },
  behaviors: [{ type: 'drag-element' }, 'collapse-expand'],
});

graph.render();

window.addPanel((gui) => {
  const config = {
    collapse: () => {
      graph.collapseElement('combo-1');
    },
    expand: () => {
      graph.expandElement('combo-1');
    },
  };
  gui.add(config, 'collapse');
  gui.add(config, 'expand');
});
```

---

## animation / persistence

### Ant Line

**文件路径**: `animation/persistence/demo/ant-line.js`

```js
import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class AntLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    shape.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'ant-line', AntLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 200, y: 50 } },
      { id: 'node-3', style: { x: 125, y: 150 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-1' },
    ],
  },
  edge: {
    type: 'ant-line',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    lineDash: 10,
  };
  gui.add(config, 'lineDash', 1, 20, 1).onChange((lineDash) => {
    graph.setEdge({
      type: 'ant-line',
      style: {
        lineDash: [lineDash, lineDash],
      },
    });
    graph.draw();
  });
});
```

---

### Fly Marker

**文件路径**: `animation/persistence/demo/fly-marker.js`

```js
import { Circle } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { CubicHorizontal, ExtensionCategory, Graph, register, subStyleProps } from '@antv/g6';

class FlyMarkerCubic extends CubicHorizontal {
  getMarkerStyle(attributes) {
    return { r: 5, fill: '#c3d5f9', offsetPath: this.shapeMap.key, ...subStyleProps(attributes, 'marker') };
  }

  onCreate() {
    const marker = this.upsert('marker', Circle, this.getMarkerStyle(this.attributes), this);
    marker.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
      duration: 3000,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'fly-marker-cubic', FlyMarkerCubic);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 200 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'fly-marker-cubic',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();
```

---

### Fly Marker

**文件路径**: `animation/persistence/demo/breathing-circle.js`

```js
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class BreathingCircle extends Circle {
  onCreate() {
    const halo = this.shapeMap.halo;
    halo.animate([{ lineWidth: 0 }, { lineWidth: 20 }], {
      duration: 1000,
      iterations: Infinity,
      direction: 'alternate',
    });
  }
}

register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }],
  },
  node: {
    type: 'breathing-circle',
    style: {
      size: 50,
      halo: true,
    },
    palette: ['#3875f6', '#efb041', '#ec5b56', '#72c240'],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Ripple

**文件路径**: `animation/persistence/demo/ripple-circle.js`

```js
import { Circle as CircleGeometry } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class RippleCircle extends Circle {
  onCreate() {
    const { fill } = this.attributes;
    const r = this.shapeMap.key.style.r;
    const length = 5;
    const fillOpacity = 0.5;

    Array.from({ length }).map((_, index) => {
      const ripple = this.upsert(
        `ripple-${index}`,
        CircleGeometry,
        {
          r,
          fill,
          fillOpacity,
        },
        this,
      );
      ripple.animate(
        [
          { r, fillOpacity },
          { r: r + length * 5, fillOpacity: 0 },
        ],
        {
          duration: 1000 * length,
          iterations: Infinity,
          delay: 1000 * index,
          easing: 'ease-cubic',
        },
      );
    });
  }
}

register(ExtensionCategory.NODE, 'ripple-circle', RippleCircle);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }],
  },
  node: {
    type: 'ripple-circle',
    animation: {
      enter: false,
    },
    style: {
      size: 50,
    },
    palette: ['#3875f6', '#efb041', '#ec5b56', '#72c240'],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

## animation / viewport

### Zoom Viewport

**文件路径**: `animation/viewport/demo/zoom.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    window.addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        zoomIn: () => {
          graph.zoomBy(1.2, animation);
        },
        zoomOut: () => {
          graph.zoomBy(0.8, animation);
        },
      };
      gui.add(config, 'zoomIn');
      gui.add(config, 'zoomOut');
    });
  });
```

---

### Translate Viewport

**文件路径**: `animation/viewport/demo/translate.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    window.addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        Up: () => graph.translateBy([0, -50], animation),
        Down: () => graph.translateBy([0, 50], animation),
        Left: () => graph.translateBy([-50, 0], animation),
        Right: () => graph.translateBy([50, 0], animation),
      };
      gui.add(config, 'Up').name('⬆️ Up');
      gui.add(config, 'Down').name('⬇️ Down');
      gui.add(config, 'Left').name('⬅️ Left');
      gui.add(config, 'Right').name('➡️ Right');
    });
  });
```

---

### Rotate Viewport

**文件路径**: `animation/viewport/demo/rotate.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    window.addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        clockwise: () => graph.rotateBy(-10, animation),
        anticlockwise: () => graph.rotateBy(10, animation),
      };
      gui.add(config, 'clockwise').name('🔁 Clockwise');
      gui.add(config, 'anticlockwise').name('🔄 Anti-clockwise');
    });
  });
```

---

## behavior / auto-adapt-label

### basic.js

**文件路径**: `behavior/auto-adapt-label/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
    { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
    { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      padding: 0,
      throttle: 200,
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
  animation: true,
});

graph.render();
```

---

## behavior / canvas

### Drag Canvas

**文件路径**: `behavior/canvas/demo/drag.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: ['drag-canvas'],
});

graph.render();
```

---

### Scroll XY

**文件路径**: `behavior/canvas/demo/scroll-xy.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: ['scroll-canvas'],
});

graph.render();
```

---

### Scroll Y

**文件路径**: `behavior/canvas/demo/scroll-y.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: [{ type: 'scroll-canvas', direction: 'y' }],
});

graph.render();
```

---

### Zoom Canvas

**文件路径**: `behavior/canvas/demo/zoom.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  behaviors: ['zoom-canvas'],
});

graph.render();
```

---

### Hide Elements When Dragging and Zooming

**文件路径**: `behavior/canvas/demo/optimize.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      labelText: (datum) => datum.id,
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'scroll-canvas', 'optimize-viewport-transform'],
});

graph.render();
```

---

## behavior / combo

### Expand/Collapse

**文件路径**: `behavior/combo/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 350, y: 200 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 250 } },
      { id: 'node3', combo: 'combo3', style: { x: 100, y: 200 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'combo1', target: 'node3' },
    ],
    combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }, { id: 'combo3', style: { collapsed: true } }],
  },
  behaviors: ['collapse-expand', 'drag-element'],
});

graph.render();
```

---

### Trigger of Expand/Collapse

**文件路径**: `behavior/combo/demo/collapse-expand.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 300, y: 100 } },
      { id: 'node2', combo: 'combo1', style: { x: 300, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 100, y: 100 } },
      { id: 'node4', combo: 'combo2', style: { x: 50, y: 150 } },
      { id: 'node5', combo: 'combo2', style: { x: 150, y: 150 } },
    ],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node3', target: 'node4' },
      { source: 'node3', target: 'node5' },
    ],
    combos: [
      { id: 'combo1', style: { labelText: '双击折叠', collapsed: true } },
      { id: 'combo2', style: { labelText: '单击折叠', collapsed: false } },
    ],
  },
  behaviors: [
    {
      type: 'collapse-expand',
      trigger: 'dblclick',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo1',
    },
    {
      type: 'collapse-expand',
      trigger: 'click',
      enable: (event) => event.targetType === 'combo' && event.target.id === 'combo2',
    },
  ],
});

graph.render();
```

---

## behavior / create-edge

### Create Edge by Drag

**文件路径**: `behavior/create-edge/demo/by-drag.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        fill: 'red',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();
```

---

### Create Edge by Click

**文件路径**: `behavior/create-edge/demo/by-click.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
      style: {
        stroke: 'red',
        lineWidth: 2,
      },
    },
  ],
});

graph.render();
```

---

### Create Edge Between Combos

**文件路径**: `behavior/create-edge/demo/between-combos.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  data: {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
      { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
    ],
    combos: [{ id: 'combo1' }, { id: 'combo2', style: { ports: [{ placement: 'center' }] } }],
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'drag',
      style: {
        lineWidth: 2,
        lineDash: [2, 3],
      },
    },
  ],
});

graph.render();
```

---

### Custom Edge Style

**文件路径**: `behavior/create-edge/demo/custom-edge-style.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',

  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node1', target: 'node4' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  layout: {
    type: 'grid',
  },
  behaviors: [
    {
      type: 'create-edge',
      trigger: 'click',
      onCreate: (edge) => {
        const { style, ...rest } = edge;
        return {
          ...rest,
          style: {
            ...style,
            stroke: 'red',
            lineWidth: 2,
            endArrow: true,
          },
        };
      },
    },
  ],
});

graph.render();
```

---

## behavior / fix-element-size

### Fix Element Size While Zooming

**文件路径**: `behavior/fix-element-size/demo/fix-size.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 }, states: ['selected'] },
    { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 }, states: ['selected'] },
    { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
    { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
    { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
    { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
    { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
    { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
    { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
    { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
    { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
    { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
    { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
    { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
    { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
    { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
    { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1', states: ['selected'] },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.label,
      size: (d) => d.size,
      lineWidth: 1,
    },
  },
  edge: { style: { labelText: (d) => d.label } },
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'fix-element-size',
      type: 'fix-element-size',
      enable: (event) => event.data.scale < 1,
      state: 'selected',
      reset: true,
    },
    { type: 'click-select', key: 'click-select', multiple: true },
  ],
  autoFit: 'center',
});

graph.render();
```

---

### Auto Size Label While Zooming

**文件路径**: `behavior/fix-element-size/demo/autosize-label.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 } },
    { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 } },
    { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
    { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
    { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
    { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
    { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
    { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
    { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
    { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
    { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
    { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
    { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
    { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
    { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
    { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
    { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1' },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelMaxWidth: '200%',
      labelWordWrap: true,
      size: (d) => d.size,
    },
  },
  edge: {
    style: {
      labelText: (d) => `${d.source}-${d.target}`,
      labelWordWrap: true,
      labelMaxLines: 2,
      labelMaxWidth: '60%',
    },
  },
  behaviors: [
    {
      type: 'fix-element-size',
      key: 'fix-element-size',
      enable: true,
      node: [
        {
          shape: (shapes) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text'),
          fields: ['fontSize', 'lineHeight'],
        },
      ],
      edge: [
        {
          shape: (shapes) =>
            shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text'),
          fields: ['fontSize', 'lineHeight'],
        },
      ],
    },
    'zoom-canvas',
    'drag-canvas',
  ],
  autoFit: 'center',
});

graph.render();
```

---

### Fix Font Size While Zooming

**文件路径**: `behavior/fix-element-size/demo/fix-font-size.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50, label: '0', style: { x: 326, y: 268 } },
    { id: 'node1', size: 30, label: '1', style: { x: 280, y: 384 } },
    { id: 'node2', size: 30, label: '2', style: { x: 234, y: 167 } },
    { id: 'node3', size: 30, label: '3', style: { x: 391, y: 368 } },
    { id: 'node4', size: 30, label: '4', style: { x: 444, y: 209 } },
    { id: 'node5', size: 30, label: '5', style: { x: 378, y: 157 } },
    { id: 'node6', size: 15, label: '6', style: { x: 229, y: 400 } },
    { id: 'node7', size: 15, label: '7', style: { x: 281, y: 440 } },
    { id: 'node8', size: 15, label: '8', style: { x: 188, y: 119 } },
    { id: 'node9', size: 15, label: '9', style: { x: 287, y: 157 } },
    { id: 'node10', size: 15, label: '10', style: { x: 185, y: 200 } },
    { id: 'node11', size: 15, label: '11', style: { x: 238, y: 110 } },
    { id: 'node12', size: 15, label: '12', style: { x: 239, y: 221 } },
    { id: 'node13', size: 15, label: '13', style: { x: 176, y: 160 } },
    { id: 'node14', size: 15, label: '14', style: { x: 389, y: 423 } },
    { id: 'node15', size: 15, label: '15', style: { x: 441, y: 341 } },
    { id: 'node16', size: 15, label: '16', style: { x: 442, y: 398 } },
  ],
  edges: [
    { source: 'node0', target: 'node1', label: '0-1' },
    { source: 'node0', target: 'node2', label: '0-2' },
    { source: 'node0', target: 'node3', label: '0-3' },
    { source: 'node0', target: 'node4', label: '0-4' },
    { source: 'node0', target: 'node5', label: '0-5' },
    { source: 'node1', target: 'node6', label: '1-6' },
    { source: 'node1', target: 'node7', label: '1-7' },
    { source: 'node2', target: 'node8', label: '2-8' },
    { source: 'node2', target: 'node9', label: '2-9' },
    { source: 'node2', target: 'node10', label: '2-10' },
    { source: 'node2', target: 'node11', label: '2-11' },
    { source: 'node2', target: 'node12', label: '2-12' },
    { source: 'node2', target: 'node13', label: '2-13' },
    { source: 'node3', target: 'node14', label: '3-14' },
    { source: 'node3', target: 'node15', label: '3-15' },
    { source: 'node3', target: 'node16', label: '3-16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelBackground: true,
      labelBackgroundFill: '#FFB6C1',
      labelBackgroundRadius: 4,
      labelFontFamily: 'Arial',
      labelPadding: [0, 4],
      labelText: (d) => d.id,
      size: (d) => d.size,
    },
  },
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'fix-element-size',
      type: 'fix-element-size',
      enable: true,
      node: { shape: 'label' },
    },
  ],
});

graph.render();
```

---

## behavior / focus

### basic.js

**文件路径**: `behavior/focus/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 110, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 190, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 150, y: 260 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  node: {
    style: { labelText: (d) => d.id },
  },
  data,
  behaviors: ['collapse-expand', 'focus-element'],
});

graph.render();
```

---

## behavior / highlight-element

### Hover Element

**文件路径**: `behavior/highlight-element/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: ['hover-activate'],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```

---

### Activate Relations

**文件路径**: `behavior/highlight-element/demo/activate-relations.js`

```js
import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      behaviors: [
        {
          type: 'hover-activate',
          degree: 1, // 👈🏻 Activate relations.
        },
      ],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```

---

### Configurations for Activate Relations

**文件路径**: `behavior/highlight-element/demo/config-params.js`

```js
import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      node: {
        style: { size: 30 },
        state: {
          highlight: {
            fill: '#D580FF',
            halo: true,
            lineWidth: 0,
          },
          dim: {
            fill: '#99ADD1',
          },
        },
      },
      edge: {
        state: {
          highlight: {
            stroke: '#D580FF',
          },
        },
      },
      behaviors: [
        {
          type: 'hover-activate',
          enable: (event) => event.targetType === 'node',
          degree: 1, // 👈🏻 Activate relations.
          state: 'highlight',
          inactiveState: 'dim',
          onHover: (event) => {
            event.view.setCursor('pointer');
          },
          onHoverEnd: (event) => {
            event.view.setCursor('default');
          },
        },
      ],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
```

---

## behavior / inner-event

### Specify the shape response event

**文件路径**: `behavior/inner-event/demo/basic.js`

```js
import { Circle as CircleGeometry } from '@antv/g';
import { CanvasEvent, Circle, ExtensionCategory, Graph, NodeEvent, register } from '@antv/g6';

class LightNode extends Circle {
  render(attributes, container) {
    super.render(attributes, container);
    this.upsert('light', CircleGeometry, { r: 8, fill: '#0f0', cx: 0, cy: -25 }, container);
  }
}

register(ExtensionCategory.NODE, 'light', LightNode);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 150 } },
      { id: 'node2', style: { x: 300, y: 150 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    type: 'light',
    style: {
      size: 100,
      labelText: (d) => d.style.labelText || 'Click the Light',
      labelPlacement: 'center',
      labelBackground: true,
      labelBackgroundFill: '#fff',
      labelBackgroundFillOpacity: 0.8,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();

graph.on(NodeEvent.CLICK, (event) => {
  const { target, originalTarget } = event;
  if (originalTarget.className === 'light') {
    graph.updateNodeData([{ id: target.id, states: ['selected'], style: { labelText: 'Clicked!' } }]);
    graph.draw();
  }
});

graph.on(CanvasEvent.CLICK, () => {
  const selectedIds = graph.getElementDataByState('node', 'selected').map((node) => node.id);
  graph.updateNodeData(selectedIds.map((id) => ({ id, states: [], style: { labelText: 'Click the Light' } })));
  graph.draw();
});
```

---

## behavior / select

### Click Select

**文件路径**: `behavior/select/demo/click.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  layout: {
    type: 'grid',
  },
  data: {
    nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
    edges: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node5' },
    ],
  },
  node: {
    style: {
      fill: '#E4504D',
    },
    state: {
      active: {
        fill: '#0b0',
      },
    },
  },
  behaviors: [
    {
      type: 'click-select',
      degree: 1,
      state: 'active',
      unselectedState: 'inactive',
      multiple: true,
      trigger: ['shift'],
    },
    'drag-element',
  ],
});

graph.render();
```

---

### Brush Select

**文件路径**: `behavior/select/demo/brush.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 250 } },
      { id: 'node-2', style: { x: 250, y: 200 } },
      { id: 'node-3', style: { x: 300, y: 250 } },
      { id: 'node-4', style: { x: 250, y: 300 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-4' },
      { source: 'node-4', target: 'node-1' },
    ],
  },
  behaviors: [
    {
      key: 'brush-select',
      type: 'brush-select',
      enable: true,
      animation: false,
      mode: 'default', // union intersect diff default
      state: 'selected', // 'active', 'selected', 'inactive', ...
      trigger: [], // ['Shift', 'Alt', 'Control', 'Drag', 'Meta', ...]
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2],
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});

graph.render();
```

---

### Brush Combo

**文件路径**: `behavior/select/demo/brush-combo.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  animation: false,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  data: {
    nodes: [
      { id: 'node-1', combo: 'combo1', style: { x: 250, y: 150, lineWidth: 0 } },
      { id: 'node-2', combo: 'combo1', style: { x: 350, y: 150, lineWidth: 0 } },
      { id: 'node-3', combo: 'combo2', style: { x: 250, y: 300, lineWidth: 0 } },
    ],
    edges: [
      { target: 'node-1', source: 'node-2' },
      { target: 'node-1', source: 'node-3' },
    ],
    combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
  },
  behaviors: [
    {
      type: 'brush-select',
      immediately: true,
      mode: 'default',
    },
  ],
});

graph.render();
```

---

### Lasso Select

**文件路径**: `behavior/select/demo/lasso.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 250 } },
      { id: 'node-2', style: { x: 250, y: 200 } },
      { id: 'node-3', style: { x: 300, y: 250 } },
      { id: 'node-4', style: { x: 250, y: 300 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-4' },
      { source: 'node-4', target: 'node-1' },
    ],
  },
  behaviors: [
    {
      key: 'lasso-select',
      type: 'lasso-select',
      enable: true,
      animation: false,
      mode: 'default', // union intersect diff default
      state: 'selected', // 'active', 'selected', 'inactive', ...
      trigger: [], // ['Shift', 'Alt', 'Control', 'Drag', 'Meta', ...]
      style: {
        width: 0,
        height: 0,
        lineWidth: 4,
        lineDash: [2, 2],
        fill: 'linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
        stroke: 'pink',
        fillOpacity: 0.2,
        zIndex: 2,
        pointerEvents: 'none',
      },
    },
  ],
});

graph.render();
```

---

## behavior / update-label

### Update Label

**文件路径**: `behavior/update-label/demo/update.js`

```js
import { EdgeEvent, Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node-1',
      style: { x: 100, y: 150, labelText: 'Hover me!' },
    },
    {
      id: 'node-2',
      style: { x: 300, y: 150, labelText: 'Hover me!' },
    },
  ],
  edges: [{ source: 'node-1', target: 'node-2', style: { labelText: 'Hover me!' } }],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: ['drag-element'],
});

graph.render();

graph.on(NodeEvent.POINTER_ENTER, (event) => {
  const { target } = event;
  graph.updateNodeData([
    { id: target.id, style: { labelText: 'Hovered', fill: 'lightgreen', labelFill: 'lightgreen' } },
  ]);
  graph.draw();
});

graph.on(EdgeEvent.POINTER_ENTER, (event) => {
  const { target } = event;
  graph.updateEdgeData([
    { id: target.id, style: { labelText: 'Hovered', stroke: 'lightgreen', labelFill: 'lightgreen', lineWidth: 3 } },
  ]);
  graph.draw();
});

graph.on(NodeEvent.POINTER_OUT, (event) => {
  const { target } = event;
  graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
  graph.draw();
});

graph.on(EdgeEvent.POINTER_OUT, (event) => {
  const { target } = event;
  graph.updateEdgeData([
    { id: target.id, style: { labelText: 'Hover me!', stroke: '#5B8FF9', labelFill: 'black', lineWidth: 1 } },
  ]);
  graph.draw();
});
```

---

## element / combo

### circle.js

**文件路径**: `element/combo/demo/circle.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
  ],
  edges: [],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    type: 'circle',
  },
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();
```

---

### rect.js

**文件路径**: `element/combo/demo/rect.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
    { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
    { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
  ],
  edges: [],
  combos: [{ id: 'combo1', combo: 'combo2' }, { id: 'combo2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    type: 'rect',
    style: {
      padding: 20,
    },
  },
  behaviors: ['drag-element', 'collapse-expand'],
});

graph.render();
```

---

## element / custom-combo

### Extra Button

**文件路径**: `element/custom-combo/demo/extra-button.js`

```js
import { Circle, Path } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { CircleCombo, ExtensionCategory, Graph, register } from '@antv/g6';

const collapse = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x + r - 4, y],
  ];
};

const expand = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

class CircleComboWithExtraButton extends CircleCombo {
  render(attributes, container) {
    super.render(attributes, container);
    this.drawButton(attributes);
  }

  drawButton(attributes) {
    const { collapsed } = attributes;
    const [, height] = this.getKeySize(attributes);
    const btnR = 8;
    const y = height / 2 + btnR;
    const d = collapsed ? expand(0, y, btnR) : collapse(0, y, btnR);

    const hitArea = this.upsert('hit-area', Circle, { cy: y, r: 10, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', Path, { stroke: '#3d81f7', d, cursor: 'pointer' }, hitArea);
  }

  onCreate() {
    this.shapeMap['hit-area'].addEventListener('click', () => {
      const id = this.id;
      const collapsed = !this.attributes.collapsed;
      const { graph } = this.context;
      if (collapsed) graph.collapseElement(id);
      else graph.expandElement(id);
    });
  }
}

register(ExtensionCategory.COMBO, 'circle-combo-with-extra-button', CircleComboWithExtraButton);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', combo: 'combo-0', style: { x: 100, y: 100 } },
      { id: 'node-1', combo: 'combo-0', style: { x: 150, y: 100 } },
      { id: 'node-2', style: { x: 250, y: 100 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
    combos: [{ id: 'combo-0' }],
  },
  combo: {
    type: 'circle-combo-with-extra-button',
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

## element / custom-edge

### Custom Path

**文件路径**: `element/custom-edge/demo/custom-path.js`

```js
import { BaseEdge, ExtensionCategory, Graph, register } from '@antv/g6';

class PolylineEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}

register(ExtensionCategory.EDGE, 'custom-polyline', PolylineEdge);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100, ports: [{ key: 'right', placement: [1, 0.5] }] } },
      { id: 'node-1', style: { x: 250, y: 200, ports: [{ key: 'left', placement: [0, 0.5] }] } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'custom-polyline',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

### Extra Label

**文件路径**: `element/custom-edge/demo/extra-label.js`

```js
import { Text } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { ExtensionCategory, Graph, Line, register, subStyleProps } from '@antv/g6';

class LabelEdge extends Line {
  render(attributes, container) {
    super.render(attributes);
    this.drawEndLabel(attributes, container, 'start');
    this.drawEndLabel(attributes, container, 'end');
  }

  drawEndLabel(attributes, container, type) {
    const key = type === 'start' ? 'startLabel' : 'endLabel';
    const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];

    const fontStyle = {
      x,
      y,
      dx: type === 'start' ? 15 : -15,
      fontSize: 16,
      fill: 'gray',
      textBaseline: 'middle',
      textAlign: type,
    };
    const style = subStyleProps(attributes, key);
    const text = style.text;
    this.upsert(`label-${type}`, Text, text ? { ...fontStyle, ...style } : false, container);
  }
}

register(ExtensionCategory.EDGE, 'extra-label-edge', LabelEdge);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100 } },
      { id: 'node-1', style: { x: 300, y: 100 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'extra-label-edge',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
      startLabelText: 'start',
      endLabelText: 'end',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

### Custom Arrow

**文件路径**: `element/custom-edge/demo/custom-arrow.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(6).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: [
    {
      id: 'custom-arrow-1',
      source: 'node1',
      target: 'node2',
      style: {
        endArrowD: 'M-14,0 L-4,-4 L0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 Z',
        endArrowOffset: 14,
      },
    },
    {
      id: 'custom-arrow-2',
      source: 'node3',
      target: 'node4',
      style: {
        endArrowD: 'M 3,-5 L 3,5 L 15,10 L 15,-10 Z',
        endArrowOffset: 10,
      },
    },
    {
      id: 'image-arrow',
      source: 'node5',
      target: 'node6',
      style: {
        endArrowSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        endArrowSize: 28,
        endArrowTransform: [['rotate', 90]],
      },
    },
  ],
};

const graph = new Graph({
  data,
  edge: {
    style: {
      stroke: '#F6BD16',
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```

---

## element / custom-node

### G2 bar chart

**文件路径**: `element/custom-node/demo/g2-bar-chart.js`

```js
import { Rect as RectGeometry } from '@antv/g';
import { renderToMountedElement, stdlib } from '@antv/g2';
import { ExtensionCategory, Graph, Rect, register } from '@antv/g6';

class BarChart extends Rect {
  onCreate() {
    const [width, height] = this.getSize();
    const group = this.upsert(
      'chart-container',
      RectGeometry,
      {
        transform: `translate(${-width / 2}, ${-height / 2})`,
        width,
        height,
        fill: '#fff',
        stroke: '#697b8c',
        radius: 10,
        shadowColor: '#697b8c',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
      this.shapeMap.key,
    );

    const { name, value } = this.attributes;
    renderToMountedElement(
      // @antv/g2 Specification
      // https://g2.antv.antgroup.com/examples/general/interval/#column
      {
        width,
        height,
        data: { value },
        title: name,
        type: 'interval',
        axis: {
          x: { title: false },
          y: { title: false },
        },
        scale: {
          y: { domain: [0, 100] },
        },
        encode: {
          x: 'subject',
          y: 'score',
          color: 'subject',
        },
        legend: { color: false },
      },
      {
        group,
        library: stdlib(),
      },
    );
  }
}

register(ExtensionCategory.NODE, 'bar-chart', BarChart);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      {
        id: 'Jack',
        data: {
          value: [
            { subject: 'Math', score: 95 },
            { subject: 'Chinese', score: 70 },
            { subject: 'English', score: 75 },
            { subject: 'Geography', score: 80 },
            { subject: 'Physics', score: 90 },
            { subject: 'Chemistry', score: 85 },
            { subject: 'Biology', score: 70 },
          ],
        },
      },
      {
        id: 'Aaron',
        data: {
          value: [
            { subject: 'Math', score: 70 },
            { subject: 'Chinese', score: 90 },
            { subject: 'English', score: 90 },
            { subject: 'Geography', score: 60 },
            { subject: 'Physics', score: 70 },
            { subject: 'Chemistry', score: 65 },
            { subject: 'Biology', score: 80 },
          ],
        },
      },
      {
        id: 'Rebecca',
        data: {
          value: [
            { subject: 'Math', score: 60 },
            { subject: 'Chinese', score: 95 },
            { subject: 'English', score: 100 },
            { subject: 'Geography', score: 80 },
            { subject: 'Physics', score: 60 },
            { subject: 'Chemistry', score: 90 },
            { subject: 'Biology', score: 85 },
          ],
        },
      },
    ],
  },
  node: {
    type: 'bar-chart',
    style: {
      size: 250,
      fillOpacity: 0,
      name: (d) => d.id,
      value: (d) => d.data.value,
    },
  },
  layout: {
    type: 'grid',
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

### G2 activity Chart

**文件路径**: `element/custom-node/demo/g2-activity-chart.js`

```js
import { Circle as CircleGeometry } from '@antv/g';
import { renderToMountedElement, stdlib } from '@antv/g2';
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class ActivityChart extends Circle {
  onCreate() {
    const { value } = this.attributes;
    const radius = this.shapeMap.key.style.r;
    const activeRadius = radius / 4;
    const activeSize = radius / 2;

    const group = this.upsert(
      'chart-container',
      CircleGeometry,
      {
        r: radius,
        fill: '#fff',
      },
      this.shapeMap.key,
    );

    renderToMountedElement(
      // @antv/g2 Specification
      // https://g2.antv.antgroup.com/examples/general/radial/#apple-activity
      {
        x: -radius,
        y: -radius,
        width: radius * 2,
        height: radius * 2,
        type: 'view',
        data: value,
        margin: 0,
        coordinate: { type: 'radial', innerRadius: 0.2 },
        children: [
          {
            type: 'interval',
            encode: { x: 'name', y: 1, size: activeSize, color: 'color' },
            scale: { color: { type: 'identity' } },
            style: { fillOpacity: 0.25 },
            animate: false,
            tooltip: false,
          },
          {
            type: 'interval',
            encode: { x: 'name', y: 'percent', color: 'color', size: activeSize },
            style: {
              radius: activeRadius,
              shadowColor: 'rgba(0,0,0,0.45)',
              shadowBlur: 20,
              shadowOffsetX: -2,
              shadowOffsetY: -5,
            },
            animate: {
              enter: { type: 'fadeIn', duration: 1000 },
            },
            axis: false,
            tooltip: false,
          },
          {
            type: 'image',
            encode: { x: 'name', y: 0, src: (d) => d.icon, size: 6 },
            style: { transform: [['translateX', 6]] },
          },
        ],
      },
      {
        group,
        library: stdlib(),
      },
    );
  }
}

const people = ['Aaron', 'Rebecca', 'Emily', 'Liam', 'Olivia', 'Ethan', 'Sophia', 'Mason'];

const mockData = () => {
  const getRandomPercent = () => +(Math.random() * 0.9 + 0.1).toFixed(1);

  return [
    {
      name: 'activity1',
      percent: getRandomPercent(),
      color: '#1ad5de',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
    },
    {
      name: 'activity2',
      percent: getRandomPercent(),
      color: '#a0ff03',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
    },
    {
      name: 'activity3',
      percent: getRandomPercent(),
      color: '#e90b3a',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
    },
  ];
};

register(ExtensionCategory.NODE, 'activity-chart', ActivityChart);

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data: {
    nodes: people.map((name, i) => ({
      id: name,
      style: { value: mockData() },
    })),
    edges: people.map((_, i) => {
      return {
        id: `edge${i}`,
        source: people[i],
        target: people[(i + 1) % 5],
      };
    }),
  },
  node: {
    type: 'activity-chart',
    style: {
      size: 50,
      labelText: (d) => d.id,
      fillOpacity: 0,
    },
    animation: {
      enter: false,
    },
  },
  layout: {
    type: 'force',
    preventOverlap: true,
    animated: false,
  },
  behaviors: ['zoom-canvas', 'drag-element'],
});

graph.render();
```

---

## element / edge

### Line

**文件路径**: `element/edge/demo/line.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'line',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
```

---

### Polyline with Control Points

**文件路径**: `element/edge/demo/polyline.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      controlPoints: [[300, 190]],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      controlPoints: (d) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```

---

### Orthogonal Line

**文件路径**: `element/edge/demo/polyline-orth.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```

---

### Orthogonal Line with Control Points

**文件路径**: `element/edge/demo/polyline-orth-with-cps.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
    { id: 'node-cp', style: { x: 300, y: 190, size: 5, fill: 'rgb(244, 109, 67)' } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      style: { controlPoints: [[300, 190]] },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
      controlPoints: (d) => d.style.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
});

graph.render();
```

---

### Quadratic

**文件路径**: `element/edge/demo/quadratic.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'quadratic',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
```

---

### Cubic

**文件路径**: `element/edge/demo/cubic.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'cubic',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      badge: true,
      badgeText: '\ue603',
      badgeFontFamily: 'iconfont',
      badgeBackgroundWidth: 12,
      badgeBackgroundHeight: 12,
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 220,
    linkDistance: 220,
  },
});

graph.render();
```

---

### Vertical Cubic

**文件路径**: `element/edge/demo/vertical-cubic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'top' }, { placement: 'bottom' }],
    },
  },
  edge: {
    type: 'cubic-vertical',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    begin: [50, 50],
    rankdir: 'TB',
    nodesep: 20,
    ranksep: 120,
  },
});

graph.render();
```

---

### Horizontal Cubic

**文件路径**: `element/edge/demo/horizontal-cubic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'right' }, { placement: 'left' }],
    },
  },
  edge: {
    type: 'cubic-horizontal',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    rankdir: 'LR',
    nodesep: 20,
    ranksep: 120,
  },
});

graph.render();
```

---

### Polyline Loop

**文件路径**: `element/edge/demo/loop-polyline.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3-ports' }, { id: 'node4-ports' }],
  edges: [
    {
      id: 'loop-1',
      source: 'node1',
      target: 'node1',
      placement: 'top',
    },
    {
      id: 'loop-2',
      source: 'node1',
      target: 'node1',
      placement: 'right',
    },
    {
      id: 'loop-3',
      source: 'node1',
      target: 'node1',
      placement: 'bottom',
    },
    {
      id: 'loop-4',
      source: 'node1',
      target: 'node1',
      placement: 'left',
    },
    {
      id: 'loop-5',
      source: 'node2',
      target: 'node2',
      placement: 'top-right',
    },
    {
      id: 'loop-6',
      source: 'node2',
      target: 'node2',
      placement: 'bottom-right',
    },
    {
      id: 'loop-7',
      source: 'node2',
      target: 'node2',
      placement: 'bottom-left',
    },
    {
      id: 'loop-8',
      source: 'node2',
      target: 'node2',
      placement: 'top-left',
    },
    {
      id: 'loop-9',
      source: 'node3-ports',
      target: 'node3-ports',
      style: { sourcePort: 'port1', targetPort: 'port2' },
    },
    {
      id: 'loop-10',
      source: 'node4-ports',
      target: 'node4-ports',
      style: { sourcePort: 'port2', targetPort: 'port2' },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'rect',
    style: {
      size: [80, 30],
      port: (d) => d.id.includes('ports'),
      portR: 3,
      ports: [
        {
          key: 'port1',
          placement: [0.7, 0],
        },
        {
          key: 'port2',
          placement: 'right',
        },
      ],
    },
  },
  edge: {
    type: 'polyline',
    style: {
      sourcePort: (d) => d.style.sourcePort,
      targetPort: (d) => d.style.targetPort,
      endArrow: true,
      loopPlacement: (d) => d.placement,
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Curve Loop

**文件路径**: `element/edge/demo/loop-curve.js`

```js
import { Graph, idOf } from '@antv/g6';

const data = {
  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3-ports' }, { id: 'node4-ports' }],
  edges: [
    {
      id: 'loop-1',
      source: 'node1',
      target: 'node1',
      style: { placement: 'top' },
    },
    {
      id: 'loop-2',
      source: 'node1',
      target: 'node1',
      style: { placement: 'right' },
    },
    {
      id: 'loop-3',
      source: 'node1',
      target: 'node1',
      style: { placement: 'bottom' },
    },
    {
      id: 'loop-4',
      source: 'node1',
      target: 'node1',
      style: { placement: 'left' },
    },
    {
      id: 'loop-5',
      source: 'node2',
      target: 'node2',
      style: { placement: 'top-right' },
    },
    {
      id: 'loop-6',
      source: 'node2',
      target: 'node2',
      style: { placement: 'bottom-right' },
    },
    {
      id: 'loop-7',
      source: 'node2',
      target: 'node2',
      style: { placement: 'bottom-left' },
    },
    {
      id: 'loop-8',
      source: 'node2',
      target: 'node2',
      style: { placement: 'top-left' },
    },
    {
      id: 'loop-9',
      source: 'node3-ports',
      target: 'node3-ports',
      style: { sourcePort: 'port1', targetPort: 'port2' },
    },
    {
      id: 'loop-10',
      source: 'node4-ports',
      target: 'node4-ports',
      style: { sourcePort: 'port2', targetPort: 'port2' },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'rect',
    style: {
      size: [80, 30],
      port: (d) => idOf(d).includes('ports'),
      portR: 3,
      ports: [
        {
          key: 'port1',
          placement: [0.7, 0],
        },
        {
          key: 'port2',
          placement: 'right',
        },
      ],
    },
  },
  edge: {
    type: 'line',
    style: {
      sourcePort: (d) => d.style.sourcePort,
      targetPort: (d) => d.style.targetPort,
      endArrow: true,
      loopPlacement: (d) => d.style.placement,
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Arrows

**文件路径**: `element/edge/demo/arrows.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
  edges: [
    'default-arrow',
    'triangle-arrow',
    'simple-arrow',
    'vee-arrow',
    'circle-arrow',
    'rect-arrow',
    'diamond-arrow',
    'triangleRect-arrow',
  ].map((id, i) => ({
    id,
    source: `node${i * 2 + 1}`,
    target: `node${i * 2 + 2}`,
  })),
};

const graph = new Graph({
  data,
  edge: {
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
      endArrowType: (d) => d.id.split('-')[0],
    },
  },
  layout: {
    type: 'grid',
    cols: 2,
  },
});

graph.render();
```

---

## element / label

### Copy Content

**文件路径**: `element/label/demo/copy.js`

```js
import { Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        label: 'Click to copy this label which is too long to be displayed',
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      x: 200,
      y: 200,
      size: 150,
      labelPlacement: 'center',
      labelText: (d) => d.data.label,
      labelWordWrap: true,
      labelMaxWidth: '90%',
      labelBackground: true,
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
      labelPointerEvents: 'none',
      labelBackgroundPointerEvents: 'none',
    },
  },
  behaviors: ['drag-element'],
  plugins: [
    {
      type: 'tooltip',
      getContent: (e, items) => {
        let result = `<h4>Node Label:</h4>`;
        items.forEach((item) => {
          result += `<p>${item.data.label}</p>`;
        });
        return result;
      },
    },
  ],
});

graph.render();

graph.on('node:click', (e) => {
  const node = graph.getNodeData(e.target.id);
  const label = node?.data?.label;

  navigator.clipboard.writeText(label);
  alert('copied to clipboard!');
});

graph.on(NodeEvent.POINTER_ENTER, (e) => {
  graph.setElementState({ [e.target.id]: 'active' });
});

graph.on(NodeEvent.POINTER_OUT, (e) => {
  graph.setElementState({ [e.target.id]: [] });
});
```

---

### Text Ellipsis

**文件路径**: `element/label/demo/ellipsis.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 100, y: 150, size: 100 } },
    { id: 'node-2', style: { x: 400, y: 150, size: 150 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelPlacement: 'center',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true, // enable label ellipsis
      labelMaxWidth: '90%',
      labelBackground: true,
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  edge: {
    style: {
      labelOffsetY: -4,
      labelTextBaseline: 'bottom',
      labelText: 'This label is too long to be displayed',
      labelWordWrap: true,
      labelMaxWidth: '80%',
      labelBackground: true,
      labelBackgroundFill: 'red',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

### Word Wrap

**文件路径**: `element/label/demo/word-wrap.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 100, y: 150, size: 100 } },
    { id: 'node-2', style: { x: 400, y: 150, size: 150 } },
  ],
  edges: [{ source: 'node-1', target: 'node-2' }],
};

const graph = new Graph({
  container: 'container',
  fitCenter: true,
  data,
  node: {
    type: 'rect',
    style: {
      labelPlacement: 'bottom',
      labelText: 'This label is too long to be displayed',
      labelMaxWidth: '90%',
      labelBackground: true,
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
      labelWordWrap: true,
      labelMaxLines: 4,
    },
  },
  edge: {
    style: {
      labelOffsetY: -4,
      labelTextBaseline: 'bottom',
      labelText: 'This label is too long to be displayed',
      labelMaxWidth: '80%',
      labelBackground: true,
      labelBackgroundFill: 'red',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
      labelWordWrap: true,
      labelMaxLines: 4,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
```

---

### Background

**文件路径**: `element/label/demo/background.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 150, y: 100 } },
    { id: 'node2', style: { x: 250, y: 200 } },
    { id: 'node3', style: { x: 450, y: 200 } },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
      labelPosition: 'bottom',
      labelFill: '#e66465',
      labelFontSize: 12,
      labelFontStyle: 'italic',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(#e66465, #9198e5)',
      labelBackgroundStroke: '#9ec9ff',
      labelBackgroundRadius: 2,
    },
  },
  edge: {
    style: {
      labelText: (d) => d.id,
      labelPosition: 'center',
      labelTextBaseline: 'top',
      labelDy: 5,
      labelFontSize: 12,
      labelFontWeight: 'bold',
      labelFill: '#1890ff',
      labelBackground: true,
      labelBackgroundFill: 'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)',
      labelBackgroundStroke: '#9ec9ff',
      labelBackgroundRadius: 2,
    },
  },
  layout: {
    type: 'force',
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

## element / node

### Circle

**文件路径**: `element/node/demo/circle.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'circle',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Rect

**文件路径**: `element/node/demo/rect.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'rect',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Radius Rect

**文件路径**: `element/node/demo/rounded-rect.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'rect',
    style: {
      radius: 4, // 👈🏻 Set the radius.
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Diamond

**文件路径**: `element/node/demo/diamond.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'diamond',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Hexagon

**文件路径**: `element/node/demo/hexagon.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'hexagon',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      outerR: 30, // 外半径
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Triangle

**文件路径**: `element/node/demo/triangle.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'triangle',
    style: {
      size: 40,
      direction: (d) => (d.id === 'ports' ? 'left' : undefined),
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Image

**文件路径**: `element/node/demo/image.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'image',
    style: {
      size: 40,
      labelText: (d) => d.id,
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      haloStroke: '#227eff',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
    state: {
      inactive: {
        fillOpacity: 0.5,
      },
      disabled: {
        fillOpacity: 0.2,
      },
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Ellipse

**文件路径**: `element/node/demo/ellipse.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'ellipse',
    style: {
      size: [45, 35],
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### Star

**文件路径**: `element/node/demo/star.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    type: 'star',
    style: {
      size: 40,
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### HTML节点

**文件路径**: `element/node/demo/html.js`

```js
import { Graph } from '@antv/g6';

const ICON_MAP = {
  error: '&#10060;',
  overload: '&#9889;',
  running: '&#9989;',
};

const COLOR_MAP = {
  error: '#f5222d',
  overload: '#faad14',
  running: '#52c41a',
};

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', data: { location: 'East', status: 'error', ip: '192.168.1.2' } },
      { id: 'node-2', data: { location: 'West', status: 'overload', ip: '192.168.1.3' } },
      { id: 'node-3', data: { location: 'South', status: 'running', ip: '192.168.1.4' } },
    ],
  },
  node: {
    type: 'html',
    style: {
      size: [240, 80],
      dx: -120,
      dy: -40,
      innerHTML: (d) => {
        const {
          data: { location, status, ip },
        } = d;
        const color = COLOR_MAP[status];

        return `
<div 
  style="
    width:100%; 
    height: 100%; 
    background: ${color}bb; 
    border: 1px solid ${color};
    color: #fff;
    user-select: none;
    display: flex; 
    padding: 10px;
    "
>
  <div style="display: flex;flex-direction: column;flex: 1;">
    <div style="font-weight: bold;">
      ${location} Node
    </div>
    <div>
      status: ${status} ${ICON_MAP[status]}
    </div>
  </div>
  <div>
    <span style="border: 1px solid white; padding: 2px;">
      ${ip}
    </span>
  </div>
</div>`;
      },
    },
  },
  layout: {
    type: 'grid',
  },
  behaviors: ['drag-element', 'zoom-canvas'],
});

graph.render();
```

---

### Donut

**文件路径**: `element/node/demo/donut.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default', index: 0 },
    { id: 'halo', index: 1 },
    { id: 'badges', index: 2 },
    { id: 'ports', index: 3 },
    {
      id: 'active',
      states: ['active'],
      index: 4,
    },
    {
      id: 'selected',
      states: ['selected'],
      index: 5,
    },
    {
      id: 'highlight',
      states: ['highlight'],
      index: 6,
    },
    {
      id: 'inactive',
      states: ['inactive'],
      index: 7,
    },
    {
      id: 'disabled',
      states: ['disabled'],
      index: 8,
    },
  ],
};
const graph = new Graph({
  container: 'container',
  animation: false,
  data,
  node: {
    type: 'donut',
    style: {
      size: 80,
      fill: '#DB9D0D',
      innerR: 20,
      donuts: (item) => {
        const { index } = item;
        if (index === 0) return [1, 2, 3]; // donuts数据类型为number[]时，根据值的大小决定环的占比

        if (index === 1) {
          return [
            { value: 50, color: 'red' },
            { value: 150, color: 'green' },
            { value: 100, color: 'blue' },
          ];
        }

        if (index === 4) {
          return [
            { value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 },
            { value: 250, stroke: '#fff', lineWidth: 1 },
            { value: 200, stroke: '#fff', lineWidth: 1 },
          ];
        }

        return [100, 200, 100, 200];
      },
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
```

---

### 3D Node

**文件路径**: `element/node/demo/3d-node.js`

```js
import { ExtensionCategory, Graph, register } from '@antv/g6';
import {
  Capsule,
  Cone,
  Cube,
  Cylinder,
  Light,
  ObserveCanvas3D,
  Plane,
  Sphere,
  Torus,
  renderer,
} from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.NODE, 'plane', Plane);
register(ExtensionCategory.NODE, 'cylinder', Cylinder);
register(ExtensionCategory.NODE, 'cone', Cone);
register(ExtensionCategory.NODE, 'cube', Cube);
register(ExtensionCategory.NODE, 'capsule', Capsule);
register(ExtensionCategory.NODE, 'torus', Torus);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

const nodes = [
  {
    id: 'node-1',
    type: 'sphere',
    style: {
      texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
    },
  },
  { id: 'node-2', type: 'plane', style: { size: 50 } },
  { id: 'node-3', type: 'cylinder' },
  { id: 'node-4', type: 'cone' },
  {
    id: 'node-5',
    type: 'cube',
    style: {
      texture: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*8TlCRIsKeUkAAAAAAAAAAAAAARQnAQ',
    },
  },
  { id: 'node-6', type: 'capsule' },
  { id: 'node-7', type: 'torus' },
];

const graph = new Graph({
  container: 'container',
  renderer,
  data: {
    nodes,
  },
  node: {
    style: {
      materialType: 'phong',
      labelText: (d) => d.id,
      x: (d) => 100 + (nodes.findIndex((n) => n.id === d.id) % 5) * 100,
      y: (d) => 100 + Math.floor(nodes.findIndex((n) => n.id === d.id) / 5) * 100,
    },
  },
  plugins: [
    {
      type: '3d-light',
      directional: {
        direction: [0, 0, 1],
      },
    },
  ],
  behaviors: ['observe-canvas-3d'],
});

graph.render();
```

---

### Port

**文件路径**: `element/node/demo/port.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', style: { x: 80, y: 200, size: 30 } },
    {
      id: 'node-2',
      type: 'rect',
      style: {
        x: 250,
        y: 200,
        size: 50,
        port: true,
        ports: [
          { key: 'port-1', placement: [0, 0.15] },
          { key: 'port-2', placement: [0, 0.5] },
          { key: 'port-3', placement: [0, 0.85] },
        ],
      },
    },
  ],
  edges: [
    { id: 'edge-1', source: 'node-1', target: 'node-2', style: { targetPort: 'port-1' } },
    { id: 'edge-2', source: 'node-1', target: 'node-2', style: { targetPort: 'port-2' } },
    { id: 'edge-3', source: 'node-1', target: 'node-2', style: { targetPort: 'port-3' } },
  ],
};

const graph = new Graph({
  data,
  edge: {
    style: {
      endArrow: true,
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = { show: false, position: 'outline' };
  gui.add(config, 'position', ['outline', 'center']).onChange((value) => {
    graph.updateNodeData([{ id: 'node-2', style: { portLinkToCenter: value === 'center' } }]);
    graph.draw();
  });
  gui
    .add(config, 'show')
    .onChange((value) => {
      graph.updateNodeData([{ id: 'node-2', style: { portR: value ? 5 : 0 } }]);
      graph.draw();
    })
    .name('show ports');
});
```

---

## feature / default

### Switch Theme

**文件路径**: `feature/default/demo/theme.js`

```js
import { Graph } from '@antv/g6';

const themes = {
  '🌞 Light': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#fff' }],
  },
  '🌚 Dark': {
    theme: 'dark',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#000' }],
  },
  '🌎 Blue': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'blues',
        invert: true,
      },
    },
    plugins: [{ type: 'background', background: '#f3faff' }],
  },
  '🌕 Yellow': {
    background: '#fcf9f1',
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
    plugins: [{ type: 'background', background: '#fcf9f1' }],
  },
};

fetch('https://assets.antv.antgroup.com/g6/20000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      padding: 20,
      autoFit: 'view',
      theme: 'light',
      data,
      node: {
        style: { size: 4 },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
      plugins: [{ type: 'background', background: '#fff' }],
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add({ theme: '🌞 Light' }, 'theme', Object.keys(themes)).onChange((theme) => {
        graph.setOptions(themes[theme]);
        graph.draw();
      });
    });
  });
```

---

### Lite Solar System

**文件路径**: `feature/default/demo/lite-solar-system.js`

```js
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Sphere, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, 'light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);

const graph = new Graph({
  renderer,
  data: {
    nodes: [
      {
        id: 'sum',
        style: {
          x: 300,
          y: 300,
          radius: 100,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-mZfQr8LtPUAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'mars',
        style: {
          x: 430,
          y: 300,
          z: 0,
          radius: 20,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mniGTZktpecAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'earth',
        style: {
          x: 500,
          y: 300,
          z: 0,
          radius: 30,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'jupiter',
        style: {
          x: 600,
          y: 300,
          z: 0,
          radius: 50,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t_mQSZYAT70AAAAAAAAAAAAADmJ7AQ/original',
        },
      },
    ],
  },
  node: {
    type: 'sphere',
    style: {
      materialShininess: 0,
      labelText: (d) => d.id,
      labelFill: '#fff',
    },
  },
  plugins: [
    {
      type: '3d-light',
      directional: {
        direction: [0, 0, 1],
      },
    },
    {
      type: 'background',
      backgroundImage:
        'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M_OaRrzIZOEAAAAAAAAAAAAADmJ7AQ/original)',
      backgroundPosition: 'center',
    },
  ],
});

graph.draw().then(() => {
  const element = graph.context.element;

  const sum = element.getElement('sum');
  const mars = element.getElement('mars');
  const earth = element.getElement('earth');
  const jupiter = element.getElement('jupiter');

  const setRotation = (element, speed) => {
    setInterval(() => {
      element.rotate(0, -speed, 0);
    }, 30);
  };
  setRotation(sum, 0.1);
  setRotation(mars, 0.8);
  setRotation(earth, 1);
  setRotation(jupiter, 0.5);

  const setRevolution = (element, center, speed) => {
    setInterval(() => {
      const [x, y, z] = element.getPosition();
      const [cx, , cz] = center;
      const angle = (speed * Math.PI) / 180;

      const newX = (x - cx) * Math.cos(angle) + (z - cz) * Math.sin(angle) + cx;
      const newZ = -(x - cx) * Math.sin(angle) + (z - cz) * Math.cos(angle) + cz;

      element.setPosition(newX, y, newZ);
    }, 30);
  };

  setRevolution(mars, [300, 300, 0], 1.5);
  setRevolution(earth, [300, 300, 0], 1);
  setRevolution(jupiter, [300, 300, 0], 0.5);
});
```

---

### 3D Massive Data

**文件路径**: `feature/default/demo/3d-massive.js`

```js
import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.EDGE, 'line3d', Line3D);
register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

fetch('https://assets.antv.antgroup.com/g6/eva-3d-data.json')
  .then((res) => res.json())
  .then(({ nodes, edges }) => {
    const degree = new Map();
    edges.forEach(({ source, target }) => {
      if (!degree.has(source)) degree.set(source, 0);
      if (!degree.has(target)) degree.set(target, 0);
      degree.set(source, degree.get(source) + 1);
      degree.set(target, degree.get(target) + 1);
    });
    nodes.forEach((node) => {
      const { id } = node;
      Object.assign(node.data, { degree: degree.get(id) ?? 0 });
      return node;
    });

    return { nodes, edges };
  })
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      renderer,
      data,
      animation: false,
      node: {
        type: 'sphere',
        style: {
          materialType: 'phong',
          size: (d) => 50 + d.data.degree,
          x: (d) => d.data.x,
          y: (d) => d.data.y,
          z: (d) => d.data.z,
        },
        palette: {
          color: 'tableau',
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        type: 'line3d',
        style: {
          lineWidth: 0.4,
          opacity: 0.4,
          stroke: '#fff',
        },
      },
      behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
      plugins: [
        {
          type: 'camera-setting',
          projectionMode: 'orthographic',
          near: 1,
          far: 10000,
          fov: 45,
          aspect: 1,
        },
        {
          type: '3d-light',
          directional: {
            direction: [0, 0, 1],
          },
        },
        {
          type: 'background',
          background: '#000',
        },
      ],
    });

    graph.draw().then(() => {
      const camera = graph.getCanvas().getCamera();
      let frame;
      let counter = 0;
      const tick = () => {
        if (counter < 80) {
          camera.dolly(4);
        }
        camera.rotate(0.4, 0);
        counter++;

        frame = requestAnimationFrame(tick);
        if (counter > 160 && frame) {
          cancelAnimationFrame(frame);
        }
      };

      tick();
    });
  });
```

---

### Information Density

**文件路径**: `feature/default/demo/unicorns-investors.js`

```js
import { Graph } from '@antv/g6';

/**
 * Inspired by https://graphcommons.com/graphs/be8bc972-5b26-4f5c-837d-a34704f33a9e
 */
fetch('https://assets.antv.antgroup.com/g6/unicorns-investors.json')
  .then((res) => res.json())
  .then((data) => {
    const size = (node) => Math.max(...node.style.size);

    const graph = new Graph({
      data,
      autoFit: 'view',
      node: {
        style: {
          fillOpacity: 1,
          label: true,
          labelText: (d) => d.data?.name,
          labelBackground: true,
          icon: true,
          iconText: (d) => (d.data?.type === 'Investor' ? '💰' : '🦄️'),
          fill: (d) => (d.data?.type === 'Investor' ? '#6495ED' : '#FFA07A'),
        },
        state: {
          inactive: {
            fillOpacity: 0.3,
            icon: false,
            label: false,
          },
        },
      },
      edge: {
        style: {
          label: false,
          labelText: (d) => d.data?.type,
          labelBackground: true,
        },
        state: {
          active: {
            label: true,
          },
          inactive: {
            strokeOpacity: 0,
          },
        },
      },
      layout: {
        type: 'd3-force',
        link: { distance: (edge) => size(edge.source) + size(edge.target) },
        collide: { radius: (node) => size(node) },
        manyBody: { strength: (node) => -4 * size(node) },
        animation: false,
      },
      transforms: [
        {
          type: 'map-node-size',
          scale: 'linear',
          maxSize: 60,
          minSize: 20,
          mapLabelSize: [12, 24],
        },
      ],
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        function () {
          return {
            key: 'hover-activate',
            type: 'hover-activate',
            enable: (e) => e.targetType === 'node',
            degree: 1,
            inactiveState: 'inactive',
            onHover: (e) => {
              this.frontElement(e.target.id);
              e.view.setCursor('pointer');
            },
            onHoverEnd: (e) => {
              e.view.setCursor('default');
            },
          };
        },
        {
          type: 'fix-element-size',
          enable: true,
        },
        'auto-adapt-label',
      ],
      animation: false,
    });

    graph.render();
  });

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Network Map of 🦄 Unicorns and Their 💰Investors - 1086 nodes, 1247 edges';
container.appendChild(descriptionDiv);
```

---

## layout / circular

### Basic Circular Layout

**文件路径**: `layout/circular/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Degree Ordered

**文件路径**: `layout/circular/demo/degree.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        ordering: 'degree',
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Spiral Layout

**文件路径**: `layout/circular/demo/spiral.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        startRadius: 10,
        endRadius: 300,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Divided Circular Layout

**文件路径**: `layout/circular/demo/division.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
        divisions: 5,
        radius: 200,
        startAngle: Math.PI / 4,
        endAngle: Math.PI,
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

## layout / combo-layout

### Combo Combined Layout

**文件路径**: `layout/combo-layout/demo/combo-combined.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'combo-combined',
        comboPadding: 2,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: (d) => d.combo,
        },
      },
      edge: {
        style: (model) => {
          const { size, color } = model.data;
          return {
            stroke: color || '#99ADD1',
            lineWidth: size || 1,
          };
        },
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      autoFit: 'view',
    });

    graph.render();
  });
```

---

## layout / compact-box

### CompactBox Layout

**文件路径**: `layout/compact-box/demo/basic.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (d) => (isLeafNode(d) ? 'right' : 'left'),
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'compact-box',
        direction: 'LR',
        getHeight: function getHeight() {
          return 32;
        },
        getWidth: function getWidth() {
          return 32;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    graph.render();
  });
```

---

### Top to Bottom CompactBox

**文件路径**: `layout/compact-box/demo/vertical.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
      node: {
        style: (d) => {
          const style = {
            labelText: d.id,
            labelPlacement: 'right',
            labelOffsetX: 2,
            labelBackground: true,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
          };
          if (isLeafNode(d)) {
            Object.assign(style, {
              labelTransform: [
                ['rotate', 90],
                ['translate', 18],
              ],
              labelBaseline: 'center',
              labelTextAlign: 'left',
            });
          }
          return style;
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-vertical',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'compact-box',
        direction: 'TB',
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 80;
        },
        getHGap: function getHGap() {
          return 20;
        },
      },
    });

    graph.render();
  });
```

---

### Radial Layout

**文件路径**: `layout/compact-box/demo/radial.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'compact-box',
        radial: true,
        direction: 'RL',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: () => {
          return 26;
        },
        getWidth: () => {
          return 26;
        },
        getVGap: () => {
          return 20;
        },
        getHGap: () => {
          return 40;
        },
      },
    });

    graph.render();
  });
```

---

## layout / concentric

### Concentric Layout

**文件路径**: `layout/concentric/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/basement_prod/8dacf27e-e1bc-4522-b6d3-4b6d9b9ed7df.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      edge: {
        type: 'line',
      },
      layout: {
        type: 'concentric',
        nodeSize: 32,
        maxLevelDiff: 0.5,
        sortBy: 'degree',
        preventOverlap: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      animation: false,
    });

    graph.render();
  });
```

---

## layout / custom

### Bi-graph Layout

**文件路径**: `layout/custom/demo/bi-graph.js`

```js
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { cluster: 'A' } },
    { id: '1', data: { cluster: 'A' } },
    { id: '2', data: { cluster: 'A' } },
    { id: '3', data: { cluster: 'A' } },
    { id: '4', data: { cluster: 'A' } },
    { id: '5', data: { cluster: 'A' } },
    { id: '6', data: { cluster: 'B' } },
    { id: '7', data: { cluster: 'B' } },
    { id: '8', data: { cluster: 'B' } },
    { id: '9', data: { cluster: 'B' } },
  ],
  edges: [
    { source: '0', target: '6' },
    { source: '0', target: '7' },
    { source: '0', target: '9' },
    { source: '1', target: '6' },
    { source: '1', target: '9' },
    { source: '1', target: '7' },
    { source: '2', target: '8' },
    { source: '2', target: '9' },
    { source: '2', target: '6' },
    { source: '3', target: '8' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '5', target: '9' },
  ],
};

class BiLayout extends BaseLayout {
  id = 'bi-layout';

  async execute(data, options) {
    const { sep = 100, nodeSep = 20, nodeSize = 32 } = { ...this.options, ...options };

    const [A, B] = data.nodes.reduce(
      (acc, curr) => {
        acc[curr.data.cluster === 'A' ? 0 : 1].push(curr);
        return acc;
      },
      [[], []],
    );

    return {
      nodes: [
        ...A.map((node, i) => ({
          id: node.id,
          style: {
            x: i * (nodeSep + nodeSize),
            y: 0,
          },
        })),
        ...B.map((node, i) => ({
          id: node.id,
          style: {
            x: i * (nodeSep + nodeSize),
            y: sep,
          },
        })),
      ],
    };
  }
}

register(ExtensionCategory.LAYOUT, 'bi', BiLayout);

const graph = new Graph({
  container: 'container',
  data,
  autoFit: 'center',
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
    palette: {
      type: 'group',
      field: 'cluster',
      color: ['#1783FF', '#D580FF'],
    },
  },
  layout: {
    type: 'bi',
    sep: 300,
    nodeSep: 20,
    nodeSize: 32,
    preLayout: true,
  },
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
});

graph.render();
```

---

### Arc Diagram

**文件路径**: `layout/custom/demo/arc.js`

```js
import { BaseEdge, BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';

class ArcLayout extends BaseLayout {
  async execute(data, options) {
    const { nodeSep = 20, nodeSize } = { ...this.options, ...options };
    const { nodes } = data;
    return {
      nodes: nodes.map((node, index) => ({
        id: node.id,
        style: {
          x: index * (nodeSep + nodeSize),
          y: 0,
        },
      })),
    };
  }
}

class ArcEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const [sx, sy] = sourcePoint;
    const [tx] = targetPoint;
    const r = Math.abs(tx - sx) / 2;

    return [
      ['M', sx, sy],
      ['A', r, r, 0, 0, sx < tx ? 1 : 0, tx, sy],
    ];
  }
}

register(ExtensionCategory.LAYOUT, 'arc', ArcLayout);
register(ExtensionCategory.EDGE, 'arc', ArcEdge);

const palette = {
  analytics: 'rgb(158, 1, 66)',
  data: 'rgb(213, 62, 79)',
  animate: 'rgb(244, 109, 67)',
  display: 'rgb(253, 174, 97)',
  flex: 'rgb(254, 224, 139)',
  physics: 'rgb(230, 245, 152)',
  query: 'rgb(171, 221, 164)',
  scale: 'rgb(102, 194, 165)',
  util: 'rgb(50, 136, 189)',
  vis: 'rgb(94, 79, 162)',
};

fetch('https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json')
  .then((res) => res.json())
  .then((data) => {
    const getCluster = (id) => data.nodes.find((node) => node.id === id).cluster;

    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      node: {
        style: {
          size: 20,
          fill: (d) => palette[d.cluster],
          ports: [{ position: 'top' }],
          labelText: (d) => d.name,
          labelTextAlign: 'start',
          labelTextBaseline: 'middle',
          labelTransform: [['rotate', 90]],
        },
      },
      edge: {
        type: 'arc',
        style: {
          stroke: (d) => `linear-gradient(${palette[getCluster(d.source)]}, ${palette[getCluster(d.source)]})`,
          strokeOpacity: 0.5,
        },
      },
      layout: {
        type: 'arc',
        nodeSize: 20,
        preLayout: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

## layout / dagre

### Dagre Layout

**文件路径**: `layout/dagre/demo/antv-dagre.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '1', target: '4' },
    { source: '0', target: '3' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '7' },
    { source: '5', target: '8' },
    { source: '8', target: '9' },
    { source: '2', target: '9' },
    { source: '3', target: '9' },
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'view',
  data,
  layout: {
    type: 'antv-dagre',
    nodeSize: [60, 30],
    nodesep: 60,
    ranksep: 40,
    controlPoints: true,
  },
  node: {
    type: 'rect',
    style: {
      size: [60, 30],
      radius: 8,
      labelText: (d) => d.id,
      labelBackground: true,
    },
  },
  edge: {
    type: 'polyline',
  },
  behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
});

graph.render();

window.addPanel((gui) => {
  const config = { layout: 'default' };
  const layouts = {
    default: { type: 'antv-dagre', nodesep: 100, ranksep: 70, controlPoints: true },
    LR: { type: 'antv-dagre', rankdir: 'LR', align: 'DL', nodesep: 50, ranksep: 70, controlPoints: true },
    'LR&UL': { type: 'antv-dagre', rankdir: 'LR', align: 'UL', controlPoints: true, nodesep: 50, ranksep: 70 },
  };

  gui.add(config, 'layout', Object.keys(layouts)).onChange(async (layout) => {
    graph.setLayout(layouts[layout]);
    await graph.layout();
    graph.fitCenter();
  });
});
```

---

### Dagre with Combos

**文件路径**: `layout/dagre/demo/antv-dagre-combo.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/dagre-combo.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        type: 'rect',
        style: {
          size: [60, 30],
          radius: 8,
          labelText: (d) => d.id,
          labelBackground: true,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        },
        palette: {
          field: (d) => d.combo,
        },
      },
      edge: {
        type: 'cubic-vertical',
        style: {
          endArrow: true,
        },
      },
      combo: {
        type: 'rect',
        style: {
          radius: 8,
          labelText: (d) => d.id,
        },
      },
      layout: {
        type: 'antv-dagre',
        ranksep: 50,
        nodesep: 5,
        sortByCombo: true,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

### Dagre.js Layout

**文件路径**: `layout/dagre/demo/dagre.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'kspacey', data: { label: 'Kevin Spacey', width: 144, height: 100 } },
    { id: 'swilliams', data: { label: 'Saul Williams', width: 160, height: 100 } },
    { id: 'bpitt', data: { label: 'Brad Pitt', width: 108, height: 100 } },
    { id: 'hford', data: { label: 'Harrison Ford', width: 168, height: 100 } },
    { id: 'lwilson', data: { label: 'Luke Wilson', width: 144, height: 100 } },
    { id: 'kbacon', data: { label: 'Kevin Bacon', width: 121, height: 100 } },
  ],
  edges: [
    { id: 'kspacey->swilliams', source: 'kspacey', target: 'swilliams' },
    { id: 'swilliams->kbacon', source: 'swilliams', target: 'kbacon' },
    { id: 'bpitt->kbacon', source: 'bpitt', target: 'kbacon' },
    { id: 'hford->lwilson', source: 'hford', target: 'lwilson' },
    { id: 'lwilson->kbacon', source: 'lwilson', target: 'kbacon' },
  ],
};

const graph = new Graph({
  autoFit: 'center',
  data,
  node: {
    type: 'rect',
    style: {
      size: (d) => [d.data.width, d.data.height],
      radius: 10,
      iconText: (d) => d.data.label,
      iconFontSize: 14,
    },
    palette: {
      type: 'group',
      field: 'label',
    },
  },
  edge: {
    type: 'polyline',
    style: {
      router: {
        type: 'orth',
      },
    },
  },
  layout: {
    type: 'dagre',
  },
});

graph.render();
```

---

## layout / dendrogram

### Dendrogram Layout

**文件路径**: `layout/dendrogram/demo/basic.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (d) => (isLeafNode(d) ? 'right' : 'left'),
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 36,
        rankSep: 250,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

### Vertical Layout

**文件路径**: `layout/dendrogram/demo/vertical.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

/**
 * If the node is a leaf node
 * @param {*} d - node data
 * @returns {boolean} - whether the node is a leaf node
 */
function isLeafNode(d) {
  return !d.children || d.children.length === 0;
}

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
      node: {
        style: (d) => {
          const style = {
            labelText: d.id,
            labelPlacement: 'right',
            labelOffsetX: 2,
            labelBackground: true,
            ports: [{ placement: 'top' }, { placement: 'bottom' }],
          };
          if (isLeafNode(d)) {
            Object.assign(style, {
              labelTransform: [
                ['rotate', 90],
                ['translate', 18],
              ],
              labelBaseline: 'center',
              labelTextAlign: 'left',
            });
          }
          return style;
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-vertical',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 50,
        rankSep: 120,
      },
    });

    graph.render();
  });
```

---

### Radial Layout

**文件路径**: `layout/dendrogram/demo/radial.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        nodeSep: 40,
        rankSep: 140,
      },
    });

    graph.render();
  });
```

---

## layout / fishbone

### Fishbone Layout

**文件路径**: `layout/fishbone/demo/basic.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Quality',
  children: [
    {
      id: 'Machine',
      children: [{ id: 'Mill' }, { id: 'Mixer' }, { id: 'Metal Lathe', children: [{ id: 'Milling' }] }],
    },
    { id: 'Method' },
    {
      id: 'Material',
      children: [
        {
          id: 'Masonite',
          children: [
            { id: 'spearMint' },
            { id: 'pepperMint', children: [{ id: 'test3' }] },
            { id: 'test1', children: [{ id: 'test4' }] },
          ],
        },
        {
          id: 'Marscapone',
          children: [{ id: 'Malty' }, { id: 'Minty' }],
        },
        { id: 'Meat', children: [{ id: 'Mutton' }] },
      ],
    },
    {
      id: 'Man Power',
      children: [
        { id: 'Manager' },
        { id: "Master's Student" },
        { id: 'Magician' },
        { id: 'Miner' },
        { id: 'Magister', children: [{ id: 'Malpractice' }] },
        {
          id: 'Massage Artist',
          children: [{ id: 'Masseur' }, { id: 'Masseuse' }],
        },
      ],
    },
    {
      id: 'Measurement',
      children: [{ id: 'Malleability' }],
    },
    {
      id: 'Milieu',
      children: [{ id: 'Marine' }],
    },
  ],
};

export const layoutFishbone = async (context) => {
  const graph = new Graph({
    ...context,
    container: 'container',
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: {
        size: [32, 32],
        // fill: () => randomColor(),
        label: false,
        labelFill: '#262626',
        labelFontFamily: 'Gill Sans',
        labelMaxLines: 2,
        labelMaxWidth: '100%',
        labelPlacement: 'center',
        labelText: (d) => d.id,
        labelWordWrap: true,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    layout: {
      type: 'fishbone',
      vGap: 48,
      hGap: 48,
      direction: 'RL',
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    animation: false,
  });

  await graph.render();

  layoutFishbone.form = (panel) => {
    const config = {
      type: 'fishbone',
      direction: 'RL',
    };

    return [
      panel
        .add(config, 'direction', ['LR', 'RL'])
        .name('Direction')
        .onChange((value) => {
          graph.setLayout((prev) => ({ ...prev, direction: value }));
          graph.render();
        }),
    ];
  };

  return graph;
};

layoutFishbone();
```

---

## layout / force-directed

### Clustering Force Layout

**文件路径**: `layout/force-directed/demo/force.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterNodeStrength: 70,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

### Force-Atlas 2 Layout

**文件路径**: `layout/force-directed/demo/atlas2.js`

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      layout: {
        type: 'force-atlas2',
        preventOverlap: true,
        kr: 20,
        center: [250, 250],
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
      autoResize: true,
      zoomRange: [0.1, 5],
    });

    graph.render();
  });
```

---

### D3 Force Layout

**文件路径**: `layout/force-directed/demo/d3-force.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          strength: 0.5,
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

### Customize Layout Parameters For Different Nodes

**文件路径**: `layout/force-directed/demo/functional-params.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node0', size: 50 },
    { id: 'node1', size: 30 },
    { id: 'node2', size: 30 },
    { id: 'node3', size: 30 },
    { id: 'node4', size: 30, isLeaf: true },
    { id: 'node5', size: 30, isLeaf: true },
    { id: 'node6', size: 15, isLeaf: true },
    { id: 'node7', size: 15, isLeaf: true },
    { id: 'node8', size: 15, isLeaf: true },
    { id: 'node9', size: 15, isLeaf: true },
    { id: 'node10', size: 15, isLeaf: true },
    { id: 'node11', size: 15, isLeaf: true },
    { id: 'node12', size: 15, isLeaf: true },
    { id: 'node13', size: 15, isLeaf: true },
    { id: 'node14', size: 15, isLeaf: true },
    { id: 'node15', size: 15, isLeaf: true },
    { id: 'node16', size: 15, isLeaf: true },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
    },
  },
  layout: {
    type: 'd3-force',
    link: {
      distance: (d) => {
        if (d.source.id === 'node0') {
          return 100;
        }
        return 30;
      },
      strength: (d) => {
        if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
          return 0.7;
        }
        return 0.1;
      },
    },
    manyBody: {
      strength: (d) => {
        if (d.isLeaf) {
          return -50;
        }
        return -10;
      },
    },
  },
  behaviors: ['drag-element-force'],
});

graph.render();
```

---

### Prevent Overlap in d3-force Layout

**文件路径**: `layout/force-directed/demo/prevent-overlap.js`

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;
    // randomize the node size
    nodes.forEach((node) => {
      node.size = Math.random() * 30 + 5;
    });

    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          size: (d) => d.size,
          lineWidth: 1,
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          // Prevent nodes from overlapping by specifying a collision radius for each node.
          radius: (d) => d.size / 2,
        },
      },
      behaviors: ['drag-element-force'],
    });

    graph.render();
  });
```

---

### Drag Fixed Nodes

**文件路径**: `layout/force-directed/demo/drag-fixed.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(10).fill(0).map((_, i) => ({ id: `${i}`, label: `${i}` })),
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '5' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelText: (d) => d.label,
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
  },
  layout: {
    type: 'd3-force',
    link: {
      distance: 100,
      strength: 2,
    },
    collide: {
      radius: 40,
    },
  },
  behaviors: [
    {
      type: 'drag-element-force',
      fixed: true,
    },
  ],
});

graph.render();
```

---

### Force Directed Bubble Chart

**文件路径**: `layout/force-directed/demo/bubbles.js`

```js
import { Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      value: 10,
      cluster: 'a',
      description: 'this is node 0, \nand the value of it is 10',
    },
    {
      id: '1',
      label: '1',
      value: 20,
      cluster: 'b',
      description: 'this is node 1, \nand the value of it is 20',
    },
    {
      id: '2',
      label: '2',
      value: 5,
      cluster: 'a',
      description: 'this is node 2, \nand the value of it is 5',
    },
    {
      id: '3',
      label: '3',
      value: 10,
      cluster: 'a',
      description: 'this is node 3, \nand the value of it is 10',
    },
    {
      id: '4',
      label: '4',
      value: 12,
      cluster: 'c',
      subCluster: 'sb',
      description: 'this is node 4, \nand the value of it is 12',
    },
    {
      id: '5',
      label: '5',
      value: 18,
      cluster: 'c',
      subCluster: 'sa',
      description: 'this is node 5, \nand the value of it is 18',
    },
    {
      id: '6',
      label: '6',
      value: 3,
      cluster: 'c',
      subCluster: 'sa',
      description: 'this is node 6, \nand the value of it is 3',
    },
    {
      id: '7',
      label: '7',
      value: 7,
      cluster: 'b',
      subCluster: 'sa',
      description: 'this is node 7, \nand the value of it is 7',
    },
    {
      id: '8',
      label: '8',
      value: 21,
      cluster: 'd',
      subCluster: 'sb',
      description: 'this is node 8, \nand the value of it is 21',
    },
    {
      id: '9',
      label: '9',
      value: 9,
      cluster: 'd',
      subCluster: 'sb',
      description: 'this is node 9, \nand the value of it is 9',
    },
  ],
  edges: [],
};

const oriSize = {};

const nodes = data.nodes;
// randomize the node size
nodes.forEach((node) => {
  node.size = Math.random() * 30 + 16;
  oriSize[node.id] = node.size;
});

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
      labelText: (d) => (d.size === 200 ? d.description : d.id),
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
    palette: {
      field: (d) => d.cluster,
    },
  },
  layout: {
    type: 'd3-force',
    collide: {
      radius: (d) => d.size / 2,
      strength: 0.7,
    },
    manyBody: {
      strength: 30,
    },
  },
  behaviors: ['drag-element-force'],
});

graph.on(NodeEvent.CLICK, async (e) => {
  const nodeId = e.target.id;
  const data = graph.getNodeData(nodeId);
  const size = data.size === oriSize[nodeId] ? 200 : oriSize[nodeId];
  graph.updateNodeData([{ id: nodeId, size }]);
  await graph.layout();
});

graph.render();
```

---

### 3D Force Layout

**文件路径**: `layout/force-directed/demo/3d-force.js`

```js
import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { D3Force3DLayout, Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.EDGE, 'line3d', Line3D);
register(ExtensionCategory.LAYOUT, 'd3-force-3d', D3Force3DLayout);
register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

fetch('https://assets.antv.antgroup.com/g6/d3-force-3d.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      renderer,
      data,
      layout: {
        type: 'd3-force-3d',
      },
      node: {
        type: 'sphere',
        style: {
          materialType: 'phong',
        },
        palette: {
          color: 'tableau',
          type: 'group',
          field: 'group',
        },
      },
      edge: {
        type: 'line3d',
      },
      behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
      plugins: [
        {
          type: '3d-light',
          directional: {
            direction: [0, 0, 1],
          },
        },
      ],
    });

    graph.render();
  });
```

---

### Mesh Layout

**文件路径**: `layout/force-directed/demo/mesh.js`

```js
import { Graph } from '@antv/g6';

function getData(size = 10) {
  const nodes = Array.from({ length: size * size }, (_, i) => ({ id: `${i}` }));
  const edges = [];
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      if (y > 0) edges.push({ source: `${(y - 1) * size + x}`, target: `${y * size + x}` });
      if (x > 0) edges.push({ source: `${y * size + (x - 1)}`, target: `${y * size + x}` });
    }
  }
  return { nodes, edges };
}

const graph = new Graph({
  data: getData(),
  layout: {
    type: 'd3-force',
    manyBody: {
      strength: -30,
    },
    link: {
      strength: 1,
      distance: 20,
      iterations: 10,
    },
  },
  node: {
    style: {
      size: 10,
      fill: '#000',
    },
  },
  edge: {
    style: {
      stroke: '#000',
    },
  },
  behaviors: [{ type: 'drag-element-force' }, 'zoom-canvas'],
});

graph.render();

window.addPanel((gui) => {
  gui.add({ msg: 'Try to drag nodes' }, 'msg').name('Tips').disable();
});
```

---

### Collision Layout

**文件路径**: `layout/force-directed/demo/collision.js`

```js
import { BaseBehavior, ExtensionCategory, Graph, invokeLayoutMethod, register } from '@antv/g6';

function getData(width, size = 200) {
  const k = width / 200;
  const r = randomUniform(k * 2, k * 8);
  const n = 4;
  return {
    nodes: Array.from({ length: size }, (_, i) => ({ id: `${i}`, data: { r: r(), group: i && (i % n) + 1 } })),
    edges: [],
  };
}

function randomUniform(min, max) {
  min = min == null ? 0 : +min;
  max = max == null ? 1 : +max;
  if (arguments.length === 1) (max = min), (min = 0);
  else max -= min;
  return function () {
    return Math.random() * max + min;
  };
}

class CollisionElement extends BaseBehavior {
  constructor(context) {
    super(context, {});
    this.onPointerMove = this.onPointerMove.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    this.context.graph.on('pointermove', this.onPointerMove);
  }

  onPointerMove(event) {
    const pos = this.context.graph.getCanvasByClient([event.client.x, event.client.y]);
    const layoutInstance = this.context.layout
      ?.getLayoutInstance()
      .find((layout) => ['d3-force', 'd3-force-3d'].includes(layout?.id));

    if (layoutInstance) {
      invokeLayoutMethod(layoutInstance, 'setFixedPosition', '0', [...pos]);
    }
  }
}

register(ExtensionCategory.BEHAVIOR, 'collision-element', CollisionElement);

const container = document.getElementById('container');
const width = container.scrollWidth;

const graph = new Graph({
  container,
  data: getData(width),
  layout: {
    type: 'd3-force',
    alphaTarget: 0.3,
    velocityDecay: 0.1,
    x: {
      strength: 0.01,
    },
    y: {
      strength: 0.01,
    },
    collide: {
      radius: (d) => d.data.r,
      iterations: 3,
    },
    manyBody: {
      strength: (d, i) => (i ? 0 : (-width * 2) / 3),
    },
    link: false,
  },
  node: {
    style: {
      size: (d) => (d.id === '0' ? 0 : d.data.r * 2),
    },
    palette: {
      color: 'tableau',
      type: 'group',
      field: (d) => d.data.group,
    },
  },
  behaviors: ['collision-element'],
});

graph.render();
```

---

## layout / fruchterman

### Basic Fruchterman Layout

**文件路径**: `layout/fruchterman/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
        animation: true,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Fruchterman Cluster Layout

**文件路径**: `layout/fruchterman/demo/cluster.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'fruchterman',
        gravity: 5,
        speed: 5,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterGravity: 16,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        style: {
          endArrow: true,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Run in Web-worker

**文件路径**: `layout/fruchterman/demo/run-in-web-worker.js`

```js
import { Graph, GraphEvent } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'fruchterman',
        speed: 20,
        gravity: 10,
        maxIteration: 10000,
        workerEnabled: true,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
          labelPlacement: 'center',
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        style: {
          stroke: '#ddd',
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();

    window.addPanel((gui) => {
      const msg = gui.add({ msg: 'Running...' }, 'msg').name('Tips').disable();
      graph.on(GraphEvent.AFTER_LAYOUT, () => {
        msg.setValue('Layout Done!');
      });
    });
  });
```

---

### Run in GPU

**文件路径**: `layout/fruchterman/demo/run-in-gpu.js`

```js
import { Graph, register } from '@antv/g6';
import { FruchtermanLayout } from '@antv/layout-gpu';

register('layout', 'fruchterman-gpu', FruchtermanLayout);

fetch('https://gw.alipayobjects.com/os/basement_prod/7bacd7d1-4119-4ac1-8be3-4c4b9bcbc25f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          size: 5,
        },
      },
      edge: {
        style: {
          startArrow: true,
        },
      },
      layout: {
        type: 'fruchterman-gpu',
        speed: 20,
        gravity: 1,
        maxIteration: 10000,
        workerEnabled: true,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

## layout / grid

### Grid Layout

**文件路径**: `layout/grid/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'grid',
        sortBy: 'id',
        nodeSize: 32,
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add({ sortBy: 'id' }, 'sortBy', ['id', 'cluster']).onChange((type) => {
        graph.setLayout({
          type: 'grid',
          sortBy: type,
        });
        graph.layout();
      });
    });
  });
```

---

## layout / indented

### Two Side Indented Layout

**文件路径**: `layout/indented/demo/auto-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: function (d) {
          const side = getNodeSide(this, d);
          return {
            labelText: d.id,
            labelPlacement: side === 'center' ? 'bottom' : side,
            labelBackground: true,
            ports:
              side === 'center'
                ? [{ placement: 'bottom' }]
                : side === 'right'
                  ? [{ placement: 'bottom' }, { placement: 'left' }]
                  : [{ placement: 'bottom' }, { placement: 'right' }],
          };
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        preLayout: false,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

### Right Side Indented Layout

**文件路径**: `layout/indented/demo/right-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

### Left Side Indented Layout

**文件路径**: `layout/indented/demo/left-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'left',
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'RL',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

### Custom Side Indented Layout

**文件路径**: `layout/indented/demo/custom-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: function (d) {
          const side = getNodeSide(this, d);
          return {
            labelText: d.id,
            labelPlacement: side === 'center' ? 'bottom' : side,
            labelBackground: true,
            ports:
              side === 'center'
                ? [{ placement: 'bottom' }]
                : side === 'right'
                  ? [{ placement: 'bottom' }, { placement: 'left' }]
                  : [{ placement: 'bottom' }, { placement: 'right' }],
          };
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        preLayout: false,
        getHeight: () => 16,
        getWidth: () => 32,
        getSide: (d) => {
          if (d.id === 'Regression' || d.id === 'Classification') return 'left';
          return 'right';
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

### No Drop Cap Indented Layout

**文件路径**: `layout/indented/demo/no-drop-cap.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth',
          },
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
        dropCap: false,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
```

---

## layout / mds

### Basic MDS Layout

**文件路径**: `layout/mds/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      padding: 20,
      autoFit: 'view',
      data,
      node: {
        style: {
          labelFill: '#fff',
          labelText: (d) => d.id,
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'mds',
        nodeSize: 32,
        linkDistance: 100,
      },
      behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

## layout / mechanism

### Switch Layout

**文件路径**: `layout/mechanism/demo/switch.js`

```js
import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      layout: {
        type: 'circular',
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      data,
    });

    graph.render();

    window.addPanel((gui) => {
      gui
        .add({ layout: 'circular' }, 'layout', ['circular', 'grid', 'force', 'radial', 'concentric', 'mds'])
        .onChange((layout) => {
          const options = {
            circular: { type: 'circular' },
            grid: { type: 'grid' },
            force: { type: 'force', preventOverlap: true },
            radial: { type: 'radial', preventOverlap: true },
            concentric: { type: 'concentric' },
            mds: { type: 'mds', linkDistance: 100 },
          };
          graph.stopLayout();
          graph.layout(options[layout]);
        });
    });
  });
```

---

### Change Data

**文件路径**: `layout/mechanism/demo/change-data.js`

```js
import { Graph } from '@antv/g6';

const fetchData = async (type) => {
  if (type === 'large') {
    const data = await fetch('https://assets.antv.antgroup.com/g6/cluster.json').then((res) => res.json());
    return data;
  }
  return {
    nodes: [{ id: 'b0' }, { id: 'b1' }, { id: 'b2' }, { id: 'b3' }, { id: 'b4' }, { id: 'b5' }],
    edges: [
      { source: 'b0', target: 'b1' },
      { source: 'b0', target: 'b2' },
      { source: 'b0', target: 'b3' },
      { source: 'b0', target: 'b4' },
      { source: 'b0', target: 'b5' },
    ],
  };
};

fetchData('small').then((data) => {
  const graph = new Graph({
    container: 'container',
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    layout: {
      type: 'force',
      animated: true,
      linkDistance: 100,
      preventOverlap: true,
    },
    data,
  });

  graph.render();

  window.addPanel((gui) => {
    gui.add({ type: 'small' }, 'type', ['small', 'large']).onChange((type) => {
      fetchData(type).then((data) => {
        graph.setData(data);
        graph.render();
      });
    });
  });
});
```

---

## layout / mindmap

### Auto Mindmap Layout

**文件路径**: `layout/mindmap/demo/auto-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          labelPlacement: function (d) {
            const side = getNodeSide(this, d);
            return side === 'center' ? 'right' : side;
          },
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 64,
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

### Right Side Mindmap Layout

**文件路径**: `layout/mindmap/demo/right-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'right',
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'LR',
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 100,
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

### Left Side Mindmap Layout

**文件路径**: `layout/mindmap/demo/left-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: 'left',
          labelBackground: true,
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'RL',
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 100,
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

### Custom Mindmap Layout

**文件路径**: `layout/mindmap/demo/custom-side.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelBackground: true,
          labelPlacement: function (d) {
            const side = getNodeSide(this, d);
            return side === 'center' ? 'right' : side;
          },
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        preLayout: false,
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 64,
        getSide: (d) => {
          if (d.id === 'Classification') {
            return 'left';
          }
          return 'right';
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
```

---

## layout / radial

### Basic Radial Layout

**文件路径**: `layout/radial/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 100,
        linkDistance: 200,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Strict Radial Layout with Overlap Prevention

**文件路径**: `layout/radial/demo/strict-prevent-overlap.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 90,
        linkDistance: 200,
        preventOverlap: true,
        maxPreventOverlapIteration: 100,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Non-strict Radial Layout with Overlap Prevention

**文件路径**: `layout/radial/demo/non-strict-prevent-overlap.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/radial.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'center',
      layout: {
        type: 'radial',
        nodeSize: 32,
        unitRadius: 90,
        linkDistance: 200,
        preventOverlap: true,
        maxPreventOverlapIteration: 100,
        strictRadial: false,
      },
      node: {
        style: {
          labelFill: '#fff',
          labelPlacement: 'center',
          labelText: (d) => d.id,
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();
  });
```

---

### Cluster Sort

**文件路径**: `layout/radial/demo/cluster-sort.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { type: 'a' } },
    { id: '1', data: { type: 'a' } },
    { id: '2', data: { type: 'a' } },
    { id: '3', data: { type: 'a' } },
    { id: '4', data: { type: 'c' } },
    { id: '5', data: { type: 'a' } },
    { id: '6', data: { type: 'b' } },
    { id: '7', data: { type: 'b' } },
    { id: '8', data: { type: 'c' } },
    { id: '9', data: { type: 'd' } },
    { id: '10', data: { type: 'd' } },
    { id: '11', data: { type: 'b' } },
    { id: '12', data: { type: 'c' } },
    { id: '13', data: { type: 'b' } },
    { id: '14', data: { type: 'd' } },
    { id: '15', data: { type: 'd' } },
    { id: '16', data: { type: 'b' } },
    { id: '17', data: { type: 'c' } },
    { id: '18', data: { type: 'c' } },
    { id: '19', data: { type: 'b' } },
    { id: '20', data: { type: 'b' } },
    { id: '21', data: { type: 'd' } },
    { id: '22', data: { type: 'd' } },
    { id: '23', data: { type: 'd' } },
    { id: '24', data: { type: 'a' } },
    { id: '25', data: { type: 'a' } },
    { id: '26', data: { type: 'b' } },
    { id: '27', data: { type: 'b' } },
    { id: '28', data: { type: 'd' } },
    { id: '29', data: { type: 'c' } },
    { id: '30', data: { type: 'c' } },
    { id: '31', data: { type: 'b' } },
    { id: '32', data: { type: 'b' } },
    { id: '33', data: { type: 'a' } },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '5' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '0', target: '10' },
    { source: '0', target: '11' },
    { source: '0', target: '13' },
    { source: '0', target: '14' },
    { source: '0', target: '15' },
    { source: '0', target: '16' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' },
    { source: '7', target: '13' },
    { source: '8', target: '14' },
    { source: '9', target: '10' },
    { source: '10', target: '22' },
    { source: '10', target: '14' },
    { source: '10', target: '12' },
    { source: '10', target: '24' },
    { source: '10', target: '21' },
    { source: '10', target: '20' },
    { source: '11', target: '24' },
    { source: '11', target: '22' },
    { source: '11', target: '14' },
    { source: '12', target: '13' },
    { source: '16', target: '17' },
    { source: '16', target: '18' },
    { source: '16', target: '21' },
    { source: '16', target: '22' },
    { source: '17', target: '18' },
    { source: '17', target: '20' },
    { source: '18', target: '19' },
    { source: '19', target: '20' },
    { source: '19', target: '33' },
    { source: '19', target: '22' },
    { source: '19', target: '23' },
    { source: '20', target: '21' },
    { source: '21', target: '22' },
    { source: '22', target: '24' },
    { source: '22', target: '25' },
    { source: '22', target: '26' },
    { source: '22', target: '23' },
    { source: '22', target: '28' },
    { source: '22', target: '30' },
    { source: '22', target: '31' },
    { source: '22', target: '32' },
    { source: '22', target: '33' },
    { source: '23', target: '28' },
    { source: '23', target: '27' },
    { source: '23', target: '29' },
    { source: '23', target: '30' },
    { source: '23', target: '31' },
    { source: '23', target: '33' },
    { source: '32', target: '33' },
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  layout: {
    type: 'radial',
    nodeSize: 32,
    unitRadius: 90,
    linkDistance: 200,
    preventOverlap: true,
    sortBy: 'type',
    sortStrength: 50,
  },
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
    palette: {
      type: 'group',
      field: 'type',
    },
  },
  edge: {
    style: {
      endArrow: true,
    },
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

## layout / snake

### Basic Snake Layout

**文件路径**: `layout/snake/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    padding: 50,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

### Snake Layout with Gutter

**文件路径**: `layout/snake/demo/gutter.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
  edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
  },
  layout: {
    type: 'snake',
    cols: 3,
    rowGap: 80,
    colGap: 120,
  },
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

## layout / sub-graph

### SubGraph Layout

**文件路径**: `layout/sub-graph/demo/basic.js`

```js
import { Graph } from '@antv/g6';

function generateArray(groups = 10, itemsPerGroup = 6) {
  const result = [];

  for (let i = 1; i <= groups; i++) {
    for (let j = 1; j <= itemsPerGroup; j++) {
      const id = `${i}-${j}`;
      result.push({
        id,
        labelText: id,
      });
    }
  }

  return result;
}

const data = generateArray();

const graph = new Graph({
  container: 'container',
  data: {
    nodes: data,
  },
  animation: false,
  autoFit: 'view',
  autoResize: true,
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.labelText,
    },
  },
  layout: Array.from({ length: 10 }, (_, i) => ({
    type: 'circular',
    nodeFilter: (node) => node.id.startsWith(`${i + 1}-`),
    center: [
      1000 + (i % 5) * 850, // x坐标
      i < 5 ? 100 : 1100, // y坐标
    ],
  })),
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
});

graph.render();
```

---

## performance / massive-data

### More than 5000 elements

**文件路径**: `performance/massive-data/demo/5000.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/5000.json')
  .then((res) => res.json())
  .then(async (data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      autoFit: 'view',
    });

    await graph.render();
  });
```

---

### About 20000 elements

**文件路径**: `performance/massive-data/demo/20000.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/20000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      autoFit: 'view',
      data,
      node: {
        style: {
          size: 8,
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

### More than 60000 elements

**文件路径**: `performance/massive-data/demo/60000.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/60000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      autoFit: 'view',
      data,
      node: {
        style: {
          size: 4,
          batchKey: 'node',
        },
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

## plugin / background

### Background Image

**文件路径**: `plugin/background/demo/background.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  data,
  layout: { type: 'grid' },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'background',
      width: '800px',
      height: '600px',
      backgroundImage:
        'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      opacity: 0.2,
    },
  ],
});

graph.render();
```

---

## plugin / bubble-sets

### Use Bubblesets to wrap the node sets.

**文件路径**: `plugin/bubble-sets/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/collection.json')
  .then((res) => res.json())
  .then((data) => {
    const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
      const cluster = node.data.cluster;
      acc[cluster] ||= [];
      acc[cluster].push(node.id);
      return acc;
    }, {});

    const createStyle = (baseColor) => ({
      fill: baseColor,
      stroke: baseColor,
      labelFill: '#fff',
      labelPadding: 2,
      labelBackgroundFill: baseColor,
      labelBackgroundRadius: 5,
    });

    const graph = new Graph({
      container: 'container',
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      node: {
        palette: { field: 'cluster' },
      },
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: (d) => {
          if (d.source === 'node0' || d.target === 'node0') {
            return 200;
          }
          return 80;
        },
      },
      plugins: [
        {
          key: 'bubble-sets-a',
          type: 'bubble-sets',
          members: groupedNodesByCluster['a'],
          labelText: 'cluster-a',
          ...createStyle('#1783FF'),
        },
        {
          key: 'bubble-sets-b',
          type: 'bubble-sets',
          members: groupedNodesByCluster['b'],
          labelText: 'cluster-b',
          ...createStyle('#00C9C9'),
        },
        {
          key: 'bubble-sets-c',
          type: 'bubble-sets',
          members: groupedNodesByCluster['c'],
          labelText: 'cluster-c',
          ...createStyle('#F08F56'),
        },
        {
          key: 'bubble-sets-d',
          type: 'bubble-sets',
          members: groupedNodesByCluster['d'],
          labelText: 'cluster-d',
          ...createStyle('#D580FF'),
        },
      ],
      autoFit: 'center',
    });

    graph.render();
  });
```

---

## plugin / contextMenu

### Context Menu

**文件路径**: `plugin/contextMenu/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'contextmenu',
      trigger: 'contextmenu', // 'click' or 'contextmenu'
      onClick: (v) => {
        alert('You have clicked the「' + v + '」item');
      },
      getItems: () => {
        return [
          { name: '展开一度关系', value: 'spread' },
          { name: '查看详情', value: 'detail' },
        ];
      },
      enable: (e) => e.targetType === 'node',
    },
  ],
});

graph.render();
```

---

## plugin / edge-bundling

### Edge Bundling

**文件路径**: `plugin/edge-bundling/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/circular.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      layout: {
        type: 'circular',
      },
      node: { style: { size: 20 } },
      behaviors: ['drag-canvas', 'drag-element'],
      plugins: [
        {
          key: 'edge-bundling',
          type: 'edge-bundling',
          bundleThreshold: 0.1,
        },
      ],
    });

    graph.render();
  });
```

---

## plugin / edge-filter-lens

### Edge Filter Lens

**文件路径**: `plugin/edge-filter-lens/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      node: {
        style: { size: 16 },
        palette: {
          field: (datum) => Math.floor(datum.style?.y / 60),
        },
      },
      edge: {
        style: {
          label: false,
          labelText: (d) => d.data.value?.toString(),
          stroke: '#ccc',
        },
      },
      plugins: [
        {
          key: 'edge-filter-lens',
          type: 'edge-filter-lens',
        },
      ],
    });
    graph.render();

    const config = {
      trigger: 'pointermove',
      scaleRBy: 'wheel',
      nodeType: 'both',
    };

    window.addPanel((gui) => {
      gui
        .add(config, 'trigger', ['pointermove', 'click', 'drag'])
        .name('Trigger')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            trigger: value,
          });
        });
      gui
        .add(config, 'scaleRBy', ['wheel', 'unset'])
        .name('Scale R by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            scaleRBy: value,
          });
        });
      gui
        .add(config, 'nodeType', ['source', 'target', 'both', 'either'])
        .name('Node Type')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'edge-filter-lens',
            nodeType: value,
          });
        });
    });
  });
```

---

## plugin / fisheye

### Fisheye

**文件路径**: `plugin/fisheye/demo/basic.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
    });
    graph.render();
  });
```

---

### Custom Fisheye

**文件路径**: `plugin/fisheye/demo/custom.js`

```js
import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [
        {
          key: 'fisheye',
          type: 'fisheye',
          trigger: 'click',
          scaleRBy: 'wheel',
          scaleDBy: 'drag',
          style: { fill: '#F08F56', stroke: '#666', lineDash: [5, 5] },
          nodeStyle: { label: true, icon: true },
        },
      ],
    });
    graph.render();

    const config = {
      trigger: 'click',
      scaleRBy: 'wheel',
      scaleDBy: 'drag',
      showDPercent: true,
      borderless: true,
    };

    window.addPanel((gui) => {
      gui
        .add(config, 'trigger', ['pointermove', 'click', 'drag'])
        .name('Trigger')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            trigger: value,
          });
        });
      gui
        .add(config, 'scaleRBy', ['wheel', 'drag', 'unset'])
        .name('Scale R by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            scaleRBy: value,
          });
        });
      gui
        .add(config, 'scaleDBy', ['wheel', 'drag', 'unset'])
        .name('Scale D by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            scaleDBy: value,
          });
        });
      gui
        .add(config, 'showDPercent')
        .name('Show D Percent')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            showDPercent: value,
          });
        });
      gui
        .add(config, 'borderless')
        .name('Borderless')
        .onChange((value) => {
          const style = value
            ? { fill: 'transparent', lineDash: 0, stroke: 'transparent' }
            : { fill: '#F08F56', lineDash: [5, 5], stroke: '#666' };
          graph.updatePlugin({
            key: 'fisheye',
            style,
          });
        });
    });
  });
```

---

## plugin / fullscreen

### Fullscreen

**文件路径**: `plugin/fullscreen/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  autoFit: 'center',
  background: '#fff',
  plugins: [
    {
      type: 'fullscreen',
      key: 'fullscreen',
    },
    function () {
      const graph = this;
      return {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        onClick: (item) => {
          const fullscreenPlugin = graph.getPluginInstance('fullscreen');
          if (item === 'request-fullscreen') {
            fullscreenPlugin.request();
          }
          if (item === 'exit-fullscreen') {
            fullscreenPlugin.exit();
          }
        },
        getItems: () => {
          return [
            { id: 'request-fullscreen', value: 'request-fullscreen' },
            { id: 'exit-fullscreen', value: 'exit-fullscreen' },
          ];
        },
      };
    },
  ],
});

graph.render();
```

---

## plugin / grid-line

### Grid Line

**文件路径**: `plugin/grid-line/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas'],
  plugins: [{ key: 'grid-line', type: 'grid-line', follow: false }],
});

graph.render();

window.addPanel((gui) => {
  gui
    .add({ follow: false }, 'follow')
    .name('Follow')
    .onChange((value) => {
      graph.updatePlugin({
        key: 'grid-line',
        follow: value,
      });
    });
});
```

---

## plugin / history

### Redo/Undo

**文件路径**: `plugin/history/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [{ id: 'node-0', style: { x: 200, y: 150 } }],
  },
  node: {
    style: {
      size: 60,
      labelText: 'Drag Me!',
      labelPlacement: 'middle',
      labelFill: '#fff',
    },
  },
  behaviors: ['drag-element'],
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

graph.render().then(() => {
  window.addPanel((gui) => {
    const history = graph.getPluginInstance('history');
    const config = {
      undo: () => {
        if (history.canUndo()) history.undo();
      },
      redo: () => {
        if (history.canRedo()) history.redo();
      },
    };
    gui.add(config, 'undo').name('⬅️ undo');
    gui.add(config, 'redo').name('➡️ redo');
  });
});
```

---

## plugin / hull

### Use hulls to wrap the node sets.

**文件路径**: `plugin/hull/demo/basic.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/collection.json')
  .then((res) => res.json())
  .then((data) => {
    const groupedNodesByCluster = data.nodes.reduce((acc, node) => {
      const cluster = node.data.cluster;
      acc[cluster] ||= [];
      acc[cluster].push(node.id);
      return acc;
    }, {});

    const createStyle = (baseColor) => ({
      fill: baseColor,
      stroke: baseColor,
      labelFill: '#fff',
      labelPadding: 2,
      labelBackgroundFill: baseColor,
      labelBackgroundRadius: 5,
    });

    const graph = new Graph({
      container: 'container',
      data,
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      node: {
        palette: { field: 'cluster' },
      },
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: (d) => {
          if (d.source === 'node0' || d.target === 'node0') {
            return 200;
          }
          return 80;
        },
      },
      plugins: [
        {
          key: 'hull-a',
          type: 'hull',
          members: groupedNodesByCluster['a'],
          labelText: 'cluster-a',
          ...createStyle('#1783FF'),
        },
        {
          key: 'hull-b',
          type: 'hull',
          members: groupedNodesByCluster['b'],
          labelText: 'cluster-b',
          ...createStyle('#00C9C9'),
        },
        {
          key: 'hull-c',
          type: 'hull',
          members: groupedNodesByCluster['c'],
          labelText: 'cluster-c',
          ...createStyle('#F08F56'),
        },
        {
          key: 'hull-d',
          type: 'hull',
          members: groupedNodesByCluster['d'],
          labelText: 'cluster-d',
          ...createStyle('#D580FF'),
        },
      ],
      autoFit: 'center',
    });

    graph.render();
  });
```

---

## plugin / legend

### Default legend

**文件路径**: `plugin/legend/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: 'node-2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: 'node-3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: 'node-4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: 'node-1', target: 'node-2', data: { cluster: 'edge-type1' } },
    { source: 'node-1', target: 'node-4', data: { cluster: 'edge-type2' } },
    { source: 'node-3', target: 'node-4' },
    { source: 'node-2', target: 'node-4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: {
      field: 'cluster',
    },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
    },
  ],
});

graph.render();
```

---

### Click legend

**文件路径**: `plugin/legend/demo/click.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '1', type: 'circle', data: { cluster: 'node-type1' } },
    { id: '2', type: 'rect', data: { cluster: 'node-type2' } },
    { id: '3', type: 'triangle', data: { cluster: 'node-type3' } },
    { id: '4', type: 'diamond', data: { cluster: 'node-type4' } },
  ],
  edges: [
    { source: '1', target: '2', type: 'quadratic', data: { cluster: 'edge-type1' } },
    { source: '1', target: '4', data: { cluster: 'edge-type2' } },
    { source: '3', target: '4' },
    { source: '2', target: '4', data: { cluster: 'edge-type3' } },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: { field: 'cluster' },
  },
  edge: {
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      trigger: 'click',
      gridRow: 1,
      gridCol: 4,
      itemLabelFontSize: 12,
    },
  ],
});

graph.render();
```

---

### Item style

**文件路径**: `plugin/legend/demo/style.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '1',
      type: 'circle',
      data: { cluster: 'node-type1' },
    },
    {
      id: '2',
      type: 'rect',
      data: { cluster: 'node-type2' },
    },
    {
      id: '3',
      type: 'triangle',
      data: { cluster: 'node-type3' },
    },
    {
      id: '4',
      type: 'diamond',
      data: { cluster: 'node-type4' },
    },
  ],
  edges: [
    {
      id: '1-2',
      source: '1',
      target: '2',
      type: 'quadratic',
      data: { cluster: 'edge-type1' },
    },
    {
      id: '1-4',
      source: '1',
      target: '4',
      data: { cluster: 'edge-type2' },
    },
    {
      id: '3-4',
      source: '3',
      target: '4',
    },
    {
      id: '2-4',
      source: '2',
      target: '4',
      data: { cluster: 'edge-type3' },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: { size: 32 },
    palette: { field: 'cluster' },
  },
  edge: {
    palette: { field: 'cluster' },
  },
  layout: {
    type: 'force',
  },
  plugins: [
    {
      type: 'legend',
      nodeField: 'cluster',
      edgeField: 'cluster',
      titleText: 'Legend Title',
      trigger: 'click',
      position: 'top',
      gridCol: 3,
      itemLabelFontSize: 12,
    },
  ],
});

graph.render();
```

---

## plugin / minimap

### Minimap

**文件路径**: `plugin/minimap/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: { nodes: Array.from({ length: 20 }).map((_, i) => ({ id: `node${i}` })) },
  behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  plugins: [
    {
      type: 'minimap',
      size: [240, 160],
    },
  ],
  node: {
    palette: 'spectral',
  },
  layout: {
    type: 'circular',
  },
  autoFit: 'view',
});

graph.render();
```

---

## plugin / snapline

### Snapline

**文件路径**: `plugin/snapline/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'snapline',
      key: 'snapline',
      verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
      horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      autoSnap: false,
    },
  ],
});

graph.render();
```

---

### Snapline with auto snap

**文件路径**: `plugin/snapline/demo/autoSnap.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'snapline',
      key: 'snapline',
      verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
      horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      offset: Infinity,
      autoSnap: true,
    },
  ],
});

graph.render();
```

---

## plugin / timebar

### Time Mode

**文件路径**: `plugin/timebar/demo/time.js`

```js
import { Graph } from '@antv/g6';

const startTime = new Date('2023-08-01').getTime();
const diff = 3600 * 24 * 1000;
const timebarData = [10, 2, 3, 4, 15, 10, 5, 0, 3, 1].map((value, index) => ({
  time: new Date(startTime + index * diff),
  value,
  label: new Date(startTime + index * diff).toLocaleString(),
}));
const graphData = {
  nodes: new Array(49).fill(0).map((_, index) => ({
    id: `node-${index}`,
    data: {
      timestamp: startTime + (index % 10) * diff,
      value: index % 20,
      label: new Date(startTime + (index % 10) * diff).toLocaleString(),
    },
  })),
  edges: new Array(49).fill(0).map((_, i) => ({
    id: `edge-${i}`,
    source: `node-${i % 30}`,
    target: `node-${(i % 20) + 29}`,
    data: {
      edgeType: 'e1',
    },
  })),
};

const graph = new Graph({
  container: 'container',
  data: graphData,
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
  layout: {
    type: 'grid',
    cols: 7,
  },
  plugins: [
    {
      type: 'timebar',
      key: 'timebar',
      data: timebarData,
      width: 450,
      loop: true,
    },
  ],
  autoFit: 'view',
  padding: [10, 0, 65, 0],
});

graph.render();
```

---

### Chart Mode

**文件路径**: `plugin/timebar/demo/chart.js`

```js
import { Graph } from '@antv/g6';

const startTime = new Date('2023-08-01').getTime();
const diff = 3600 * 24 * 1000;
const timebarData = [10, 2, 3, 4, 15, 10, 5, 0, 3, 1].map((value, index) => ({
  time: new Date(startTime + index * diff),
  value,
  label: new Date(startTime + index * diff).toLocaleString(),
}));
const graphData = {
  nodes: new Array(49).fill(0).map((_, index) => ({
    id: `node-${index}`,
    data: {
      timestamp: startTime + (index % 10) * diff,
      value: index % 20,
      label: new Date(startTime + (index % 10) * diff).toLocaleString(),
    },
  })),
  edges: new Array(49).fill(0).map((_, i) => ({
    id: `edge-${i}`,
    source: `node-${i % 30}`,
    target: `node-${(i % 20) + 29}`,
    data: {
      edgeType: 'e1',
    },
  })),
};

const graph = new Graph({
  container: 'container',
  data: graphData,
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
  layout: {
    type: 'grid',
    cols: 7,
  },
  plugins: [
    {
      type: 'timebar',
      key: 'timebar',
      data: timebarData,
      width: 450,
      height: 100,
      loop: true,
      timebarType: 'chart',
    },
  ],
  autoFit: 'view',
  padding: [10, 0, 160, 0],
});

graph.render();
```

---

## plugin / toolbar

### ToolBar

**文件路径**: `plugin/toolbar/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'toolbar',
      position: 'top-left',
      onClick: (item) => {
        alert('item clicked:' + item);
      },
      getItems: () => {
        // G6 内置了 9 个 icon，分别是 zoom-in、zoom-out、redo、undo、edit、delete、auto-fit、export、reset
        return [
          { id: 'zoom-in', value: 'zoom-in' },
          { id: 'zoom-out', value: 'zoom-out' },
          { id: 'redo', value: 'redo' },
          { id: 'undo', value: 'undo' },
          { id: 'edit', value: 'edit' },
          { id: 'delete', value: 'delete' },
          { id: 'auto-fit', value: 'auto-fit' },
          { id: 'export', value: 'export' },
          { id: 'reset', value: 'reset' },
        ];
      },
    },
  ],
});

graph.render();
```

---

### ToolBar

**文件路径**: `plugin/toolbar/demo/custom.js`

```js
import { Graph } from '@antv/g6';

// Use your own iconfont.
const iconFont = document.createElement('script');
iconFont.src = '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js';
document.head.appendChild(iconFont);

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'toolbar',
      position: 'right-top',
      onClick: (item) => {
        alert('item clicked:' + item);
      },
      getItems: () => {
        return [
          { id: 'icon-xinjian', value: 'new' },
          { id: 'icon-fenxiang', value: 'share' },
          { id: 'icon-chexiao', value: 'undo' },
        ];
      },
    },
  ],
});

graph.render();
```

---

## plugin / tooltip

### Tooltip

**文件路径**: `plugin/tooltip/demo/basic.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: '0', data: { label: 'node-0', description: 'This is node-0.' } },
      { id: '1', data: { label: 'node-1', description: 'This is node-1.' } },
      { id: '2', data: { label: 'node-2', description: 'This is node-2.' } },
      { id: '3', data: { label: 'node-3', description: 'This is node-3.' } },
      { id: '4', data: { label: 'node-4', description: 'This is node-4.' } },
      { id: '5', data: { label: 'node-5', description: 'This is node-5.' } },
    ],
    edges: [
      { source: '0', target: '1', data: { description: 'This is edge from node 0 to node 1.' } },
      { source: '0', target: '2', data: { description: 'This is edge from node 0 to node 2.' } },
      { source: '0', target: '3', data: { description: 'This is edge from node 0 to node 3.' } },
      { source: '0', target: '4', data: { description: 'This is edge from node 0 to node 4.' } },
      { source: '0', target: '5', data: { description: 'This is edge from node 0 to node 5.' } },
    ],
  },
  layout: {
    type: 'grid',
  },
  plugins: [
    {
      type: 'tooltip',
      getContent: (e, items) => {
        let result = `<h4>Custom Content</h4>`;
        items.forEach((item) => {
          result += `<p>Type: ${item.data.description}</p>`;
        });
        return result;
      },
    },
  ],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

### Show on click

**文件路径**: `plugin/tooltip/demo/click.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: '0', data: { label: 'node-0', description: 'This is node-0.' } },
      { id: '1', data: { label: 'node-1', description: 'This is node-1.' } },
      { id: '2', data: { label: 'node-2', description: 'This is node-2.' } },
      { id: '3', data: { label: 'node-3', description: 'This is node-3.' } },
      { id: '4', data: { label: 'node-4', description: 'This is node-4.' } },
      { id: '5', data: { label: 'node-5', description: 'This is node-5.' } },
    ],
    edges: [
      { source: '0', target: '1', data: { description: 'This is edge from node 0 to node 1.' } },
      { source: '0', target: '2', data: { description: 'This is edge from node 0 to node 2.' } },
      { source: '0', target: '3', data: { description: 'This is edge from node 0 to node 3.' } },
      { source: '0', target: '4', data: { description: 'This is edge from node 0 to node 4.' } },
      { source: '0', target: '5', data: { description: 'This is edge from node 0 to node 5.' } },
    ],
  },
  layout: {
    type: 'grid',
  },
  plugins: [
    {
      type: 'tooltip',
      trigger: 'click',
      getContent: (e, items) => {
        let result = `<h4>Custom Content</h4>`;
        items.forEach((item) => {
          result += `<p>Type: ${item.data.description}</p>`;
        });
        return result;
      },
    },
  ],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

### Dual tooltips

**文件路径**: `plugin/tooltip/demo/dual.js`

```js
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: '0', data: { label: 'node-0', description: 'This is node-0.' } },
      { id: '1', data: { label: 'node-1', description: 'This is node-1.' } },
      { id: '2', data: { label: 'node-2', description: 'This is node-2.' } },
      { id: '3', data: { label: 'node-3', description: 'This is node-3.' } },
      { id: '4', data: { label: 'node-4', description: 'This is node-4.' } },
      { id: '5', data: { label: 'node-5', description: 'This is node-5.' } },
    ],
    edges: [
      { source: '0', target: '1', data: { description: 'This is edge from node 0 to node 1.' } },
      { source: '0', target: '2', data: { description: 'This is edge from node 0 to node 2.' } },
      { source: '0', target: '3', data: { description: 'This is edge from node 0 to node 3.' } },
      { source: '0', target: '4', data: { description: 'This is edge from node 0 to node 4.' } },
      { source: '0', target: '5', data: { description: 'This is edge from node 0 to node 5.' } },
    ],
  },
  layout: {
    type: 'grid',
  },
  plugins: [
    function () {
      return {
        key: 'tooltip-click',
        type: 'tooltip',
        trigger: 'click',
        getContent: (evt, items) => {
          return `<div>click ${items[0].id}</div>`;
        },
        onOpenChange: (open) => {
          const tooltip = this.getPluginInstance('tooltip-hover');
          if (tooltip && open) tooltip.hide();
        },
      };
    },
    function () {
      return {
        key: 'tooltip-hover',
        type: 'tooltip',
        trigger: 'hover',
        enable: (e) => {
          const tooltip = this.getPluginInstance('tooltip-click');
          return e.target.id !== tooltip.currentTarget;
        },
        getContent: (evt, items) => {
          return `<div>hover ${items[0].id}</div>`;
        },
        onOpenChange: (open) => {
          const tooltip = this.getPluginInstance('tooltip-click');
          if (tooltip && open) {
            tooltip.hide();
          }
        },
      };
    },
  ],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
```

---

## plugin / watermark

### Text Watermark

**文件路径**: `plugin/watermark/demo/text.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: { type: 'grid' },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'watermark',
      text: 'G6: Graph Visualization',
      textFontSize: 14,
      textFontFamily: 'Microsoft YaHei',
      fill: 'rgba(0, 0, 0, 0.1)',
      rotate: Math.PI / 12,
    },
  ],
});

graph.render();
```

---

### Repeat Image

**文件路径**: `plugin/watermark/demo/repeat.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'watermark',
      width: 200,
      height: 100,
      rotate: Math.PI / 12,
      imageURL: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
    },
  ],
});

graph.render();
```

---

## scene-case / default

### Music Festival

**文件路径**: `scene-case/default/demo/music-festival.js`

```js
import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/music-festival.json')
  .then((res) => res.json())
  .then((data) => {
    const map = new Map();

    data.forEach((datum) => {
      const { actors, venuecity } = datum;
      actors.forEach((actor) => {
        if (!map.has(actor)) map.set(actor, new Set([venuecity]));
        else map.get(actor).add(venuecity);
      });
    });

    const nodes = Array.from(map)
      .filter(([, city]) => city.size >= 2)
      .sort((a, b) => -a[1].size + b[1].size)
      .map(([name, city]) => ({
        id: name,
        data: {
          city: Array.from(city),
          value: city.size,
        },
      }));

    return { nodes };
  })
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'rect',
        style: {
          size: [100, 20],
          radius: 5,
          iconText: (d) => d.id,
          iconFill: '#000',
          iconWordWrap: true,
          iconWordWrapWidth: 80,
          iconFontSize: 15,
          iconTextOverflow: '...',
          iconMaxLines: 1,
          labelText: (d) => d.data.city.join('\n'),
          labelFontSize: 12,
          labelDy: 2,
          labelFill: '#fff',
        },
        palette: {
          type: 'group',
          field: 'value',
          color: [
            '#FCE75A',
            '#F5DB75',
            '#EFCF90',
            '#E8C3AB',
            '#E1B7C6',
            '#DBABE0',
            '#D49FFB',
            '#CD93FF',
            '#B981F2',
            '#7E45E8',
          ],
        },
      },
      layout: {
        type: 'grid',
        nodeSize: [100, 120],
        sortBy: 'order',
        cols: 5,
      },
      behaviors: [{ type: 'scroll-canvas', direction: 'y' }],
      plugins: [
        {
          type: 'background',
          background: '#000',
        },
      ],
    });

    graph.render();
  });
```

---

### Fund Flow

**文件路径**: `scene-case/default/demo/fund-flow.js`

```js
import { Rect as GRect, Text as GText } from '@antv/g';
import {
  Badge,
  CommonEvent,
  ExtensionCategory,
  Graph,
  GraphEvent,
  iconfont,
  Label,
  Rect,
  register,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const COLORS = {
  B: '#1783FF',
  R: '#F46649',
  Y: '#DB9D0D',
  G: '#60C42D',
  DI: '#A7A7A7',
};
const GREY_COLOR = '#CED4D9';

class TreeNode extends Rect {
  get data() {
    return this.context.model.getNodeLikeDatum(this.id);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  getLabelStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 8,
      y: -height / 2 + 16,
      text: this.data.name,
      fontSize: 12,
      opacity: 0.85,
      fill: '#000',
      cursor: 'pointer',
    };
  }

  getPriceStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2 + 8,
      y: height / 2 - 8,
      text: this.data.label,
      fontSize: 16,
      fill: '#000',
      opacity: 0.85,
    };
  }

  drawPriceShape(attributes, container) {
    const priceStyle = this.getPriceStyle(attributes);
    this.upsert('price', GText, priceStyle, container);
  }

  getCurrencyStyle(attributes) {
    const [, height] = this.getSize(attributes);
    return {
      x: this.shapeMap['price'].getLocalBounds().max[0] + 4,
      y: height / 2 - 8,
      text: this.data.currency,
      fontSize: 12,
      fill: '#000',
      opacity: 0.75,
    };
  }

  drawCurrencyShape(attributes, container) {
    const currencyStyle = this.getCurrencyStyle(attributes);
    this.upsert('currency', GText, currencyStyle, container);
  }

  getPercentStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    return {
      x: width / 2 - 4,
      y: height / 2 - 8,
      text: `${((Number(this.data.variableValue) || 0) * 100).toFixed(2)}%`,
      fontSize: 12,
      textAlign: 'right',
      fill: COLORS[this.data.status],
    };
  }

  drawPercentShape(attributes, container) {
    const percentStyle = this.getPercentStyle(attributes);
    this.upsert('percent', GText, percentStyle, container);
  }

  getTriangleStyle(attributes) {
    const percentMinX = this.shapeMap['percent'].getLocalBounds().min[0];
    const [, height] = this.getSize(attributes);
    return {
      fill: COLORS[this.data.status],
      x: this.data.variableUp ? percentMinX - 18 : percentMinX,
      y: height / 2 - 16,
      fontFamily: 'iconfont',
      fontSize: 16,
      text: '\ue62d',
      transform: this.data.variableUp ? [] : [['rotate', 180]],
    };
  }

  drawTriangleShape(attributes, container) {
    const triangleStyle = this.getTriangleStyle(attributes);
    this.upsert('triangle', Label, triangleStyle, container);
  }

  getVariableStyle(attributes) {
    const [, height] = this.getSize(attributes);
    return {
      fill: '#000',
      fontSize: 12,
      opacity: 0.45,
      text: this.data.variableName,
      textAlign: 'right',
      x: this.shapeMap['triangle'].getLocalBounds().min[0] - 4,
      y: height / 2 - 8,
    };
  }

  drawVariableShape(attributes, container) {
    const variableStyle = this.getVariableStyle(attributes);
    this.upsert('variable', GText, variableStyle, container);
  }

  getCollapseStyle(attributes) {
    if (this.childrenData.length === 0) return false;
    const { collapsed } = attributes;
    const [width, height] = this.getSize(attributes);
    return {
      backgroundFill: '#fff',
      backgroundHeight: 16,
      backgroundLineWidth: 1,
      backgroundRadius: 0,
      backgroundStroke: GREY_COLOR,
      backgroundWidth: 16,
      cursor: 'pointer',
      fill: GREY_COLOR,
      fontSize: 16,
      text: collapsed ? '+' : '-',
      textAlign: 'center',
      textBaseline: 'middle',
      x: width / 2,
      y: 0,
    };
  }

  drawCollapseShape(attributes, container) {
    const collapseStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse', Badge, collapseStyle, container);

    if (btn && !Reflect.has(btn, '__bind__')) {
      Reflect.set(btn, '__bind__', true);
      btn.addEventListener(CommonEvent.CLICK, () => {
        const { collapsed } = this.attributes;
        const graph = this.context.graph;
        if (collapsed) graph.expandElement(this.id);
        else graph.collapseElement(this.id);
      });
    }
  }

  getProcessBarStyle(attributes) {
    const { rate, status } = this.data;
    const { radius } = attributes;
    const color = COLORS[status];
    const percent = `${Number(rate) * 100}%`;
    const [width, height] = this.getSize(attributes);
    return {
      x: -width / 2,
      y: height / 2 - 4,
      width: width,
      height: 4,
      radius: [0, 0, radius, radius],
      fill: `linear-gradient(to right, ${color} ${percent}, ${GREY_COLOR} ${percent})`,
    };
  }

  drawProcessBarShape(attributes, container) {
    const processBarStyle = this.getProcessBarStyle(attributes);
    this.upsert('process-bar', GRect, processBarStyle, container);
  }

  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes);
    return {
      ...keyStyle,
      fill: '#fff',
      lineWidth: 1,
      stroke: GREY_COLOR,
    };
  }

  render(attributes = this.parsedAttributes, container) {
    super.render(attributes, container);

    this.drawPriceShape(attributes, container);
    this.drawCurrencyShape(attributes, container);
    this.drawPercentShape(attributes, container);
    this.drawTriangleShape(attributes, container);
    this.drawVariableShape(attributes, container);
    this.drawProcessBarShape(attributes, container);
    this.drawCollapseShape(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'tree-node', TreeNode);

fetch('https://assets.antv.antgroup.com/g6/decision-tree.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: treeToGraphData(data, {
        getNodeData: (datum, depth) => {
          if (!datum.style) datum.style = {};
          datum.style.collapsed = depth >= 2;
          if (!datum.children) return datum;
          const { children, ...restDatum } = datum;
          return { ...restDatum, children: children.map((child) => child.id) };
        },
      }),
      node: {
        type: 'tree-node',
        style: {
          size: [202, 60],
          ports: [{ placement: 'left' }, { placement: 'right' }],
          radius: 4,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: GREY_COLOR,
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => 60,
        preLayout: false,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph.fitView();
    });

    graph.render();
  });
```

---

### Organization Chart

**文件路径**: `scene-case/default/demo/organization-chart.js`

```js
import { Badge, BaseBehavior, ExtensionCategory, Graph, GraphEvent, Label, Rect, register } from '@antv/g6';

const statusColors = {
  online: '#17BEBB',
  busy: '#E36397',
  offline: '#B7AD99',
};

const DEFAULT_LEVEL = 'detailed';

/**
 * Draw a chart node with different ui based on the zoom level.
 */
class ChartNode extends Rect {
  get data() {
    return this.context.model.getElementDataById(this.id).data;
  }

  get level() {
    return this.data.level || DEFAULT_LEVEL;
  }

  getLabelStyle() {
    const text = this.data.name;
    const labelStyle =
      this.level === 'overview'
        ? {
            fill: '#fff',
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
            transform: [['translate', 0, 0]],
          }
        : {
            fill: '#2078B4',
            fontSize: 14,
            fontWeight: 400,
            textAlign: 'left',
            transform: [['translate', -65, -15]],
          };
    return { text, ...labelStyle };
  }

  getKeyStyle(attributes) {
    return {
      ...super.getKeyStyle(attributes),
      fill: this.level === 'overview' ? statusColors[this.data.status] : '#fff',
    };
  }

  getPositionStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: this.data.position,
      fontSize: 8,
      fontWeight: 400,
      textTransform: 'uppercase',
      fill: '#343f4a',
      textAlign: 'left',
      transform: [['translate', -65, 0]],
    };
  }

  drawPositionShape(attributes, container) {
    const positionStyle = this.getPositionStyle(attributes);
    this.upsert('position', Label, positionStyle, container);
  }

  getStatusStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: this.data.status,
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 40, -16]],
      padding: [0, 4],
      fill: '#fff',
      backgroundFill: statusColors[this.data.status],
    };
  }

  drawStatusShape(attributes, container) {
    const statusStyle = this.getStatusStyle(attributes);
    this.upsert('status', Badge, statusStyle, container);
  }

  getPhoneStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: this.data.phone,
      fontSize: 8,
      fontWeight: 300,
      textAlign: 'left',
      transform: [['translate', -65, 20]],
    };
  }

  drawPhoneShape(attributes, container) {
    const style = this.getPhoneStyle(attributes);
    this.upsert('phone', Label, style, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawPositionShape(attributes, container);

    this.drawStatusShape(attributes, container);

    this.drawPhoneShape(attributes, container);
  }
}

/**
 * Implement a level of detail rendering, which will show different details based on the zoom level.
 */
class LevelOfDetail extends BaseBehavior {
  prevLevel = DEFAULT_LEVEL;
  levels = {
    ['overview']: [0, 0.6],
    ['detailed']: [0.6, Infinity],
  };

  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  updateZoomLevel = async (e) => {
    if ('scale' in e.data) {
      const scale = e.data.scale;
      const level = Object.entries(this.levels).find(([key, [min, max]]) => scale > min && scale <= max)?.[0];
      if (level && this.prevLevel !== level) {
        const { graph } = this.context;
        graph.updateNodeData((prev) => prev.map((node) => ({ ...node, data: { ...node.data, level } })));
        await graph.draw();
        this.prevLevel = level;
      }
    }
  };

  bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  destroy() {
    this.unbindEvents();
    super.destroy();
  }
}

register(ExtensionCategory.NODE, 'chart-node', ChartNode);
register(ExtensionCategory.BEHAVIOR, 'level-of-detail', LevelOfDetail);

fetch('https://assets.antv.antgroup.com/g6/organization-chart.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      node: {
        type: 'chart-node',
        style: {
          labelPlacement: 'center',
          lineWidth: 1,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
          radius: 2,
          shadowBlur: 10,
          shadowColor: '#e0e0e0',
          shadowOffsetX: 3,
          size: [150, 60],
          stroke: '#C0C0C0',
        },
      },
      edge: {
        type: 'polyline',
        style: {
          router: {
            type: 'orth',
          },
          stroke: '#C0C0C0',
        },
      },
      layout: {
        type: 'dagre',
      },
      autoFit: 'view',
      behaviors: ['level-of-detail', 'zoom-canvas', 'drag-canvas'],
    });

    graph.render();
  });
```

---

### System Performance Diagnosis Flowchart

**文件路径**: `scene-case/default/demo/performance-diagnosis-flowchart.js`

```js
import { BugOutlined } from '@ant-design/icons';
import { ExtensionCategory, Graph, HoverActivate, idOf, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import { Flex, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

const { Text } = Typography;

const ACTIVE_COLOR = '#f6c523';
const COLOR_MAP = {
  'pre-inspection': '#3fc1c9',
  problem: '#8983f3',
  inspection: '#f48db4',
  solution: '#ffaa64',
};

class HoverElement extends HoverActivate {
  getActiveIds(event) {
    const { model, graph } = this.context;
    const { targetType, target } = event;
    const targetId = target.id;

    const ids = [targetId];
    if (targetType === 'edge') {
      const edge = model.getEdgeDatum(targetId);
      ids.push(edge.source, edge.target);
    } else if (targetType === 'node') {
      ids.push(...model.getRelatedEdgesData(targetId).map(idOf));
    }

    graph.frontElement(ids);

    return ids;
  }
}

register(ExtensionCategory.NODE, 'react', ReactNode);
register(ExtensionCategory.BEHAVIOR, 'hover-element', HoverElement);

const Node = ({ data }) => {
  const { text, type } = data.data;

  const isHovered = data.states?.includes('active');
  const isSelected = data.states?.includes('selected');
  const color = isHovered ? ACTIVE_COLOR : COLOR_MAP[type];

  const containerStyle = {
    width: '100%',
    height: '100%',
    background: color,
    border: `3px solid ${color}`,
    borderRadius: 16,
    cursor: 'pointer',
  };

  if (isSelected) {
    Object.assign(containerStyle, { border: `3px solid #000` });
  }

  return (
    <Flex style={containerStyle} align="center" justify="center">
      <Flex vertical style={{ padding: '8px 16px', textAlign: 'center' }} align="center" justify="center">
        {type === 'problem' && <BugOutlined style={{ color: '#fff', fontSize: 24, marginBottom: 8 }} />}
        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{text}</Text>
      </Flex>
    </Flex>
  );
};

export const PerformanceDiagnosisFlowchart = () => {
  const containerRef = useRef();

  useEffect(() => {
    fetch('https://assets.antv.antgroup.com/g6/performance-diagnosis.json')
      .then((res) => res.json())
      .then((data) => {
        const graph = new Graph({
          container: containerRef.current,
          data,
          autoFit: 'view',
          node: {
            type: 'react',
            style: (d) => {
              const style = {
                component: <Node data={d} />,
                ports: [{ placement: 'top' }, { placement: 'bottom' }],
              };

              const size = {
                'pre-inspection': [240, 120],
                problem: [200, 120],
                inspection: [330, 100],
                solution: [200, 120],
              }[d.data.type] || [200, 80];

              Object.assign(style, {
                size,
                dx: -size[0] / 2,
                dy: -size[1] / 2,
              });
              return style;
            },
            state: {
              active: {
                halo: false,
              },
              selected: {
                halo: false,
              },
            },
          },
          edge: {
            type: 'polyline',
            style: {
              lineWidth: 3,
              radius: 20,
              stroke: '#8b9baf',
              endArrow: true,
              labelText: (d) => d.data.text,
              labelFill: '#8b9baf',
              labelFontWeight: 600,
              labelBackground: true,
              labelBackgroundFill: '#f8f8f8',
              labelBackgroundOpacity: 1,
              labelBackgroundLineWidth: 3,
              labelBackgroundStroke: '#8b9baf',
              labelPadding: [1, 10],
              labelBackgroundRadius: 4,
              router: {
                type: 'orth',
              },
            },
            state: {
              active: {
                stroke: ACTIVE_COLOR,
                labelBackgroundStroke: ACTIVE_COLOR,
                halo: false,
              },
            },
          },
          layout: {
            type: 'antv-dagre',
          },
          behaviors: ['zoom-canvas', 'drag-canvas', 'hover-element', 'click-select'],
        });

        graph.render();
      });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
};

const root = createRoot(document.getElementById('container'));
root.render(<PerformanceDiagnosisFlowchart />);
```

---

### Sub Graph

**文件路径**: `scene-case/default/demo/sub-graph.js`

```js
import { BaseCombo, ExtensionCategory, Graph, HTML, isCollapsed, register } from '@antv/g6';
import { isEqual } from '@antv/util';

class SubGraphNode extends HTML {
  connectedCallback() {
    super.connectedCallback();
    this.drawSubGraph();
  }

  render(attributes, container) {
    super.render(attributes, container);
    this.drawSubGraph();
  }

  get data() {
    return this.context.graph.getElementData(this.id).data;
  }

  drawSubGraph() {
    if (!this.isConnected) return;
    if (isEqual(this.previousData, this.data)) return;
    this.previousData = this.data;

    const data = this.data;
    this.drawGraphNode(data.data);
  }

  drawGraphNode(data) {
    const [width, height] = this.getSize();
    const container = this.getDomElement();
    container.innerHTML = '';

    const subGraph = new Graph({
      container,
      width,
      height,
      animation: false,
      data: data,
      node: {
        style: {
          labelText: (d) => d.id,
          iconFontFamily: 'iconfont',
          iconText: '\ue6e5',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
      },
      behaviors: ['zoom-canvas', { type: 'drag-canvas', enable: (event) => event.shiftKey === true }],
      autoFit: 'view',
    });

    subGraph.render();

    this.graph = subGraph;
  }

  destroy() {
    this.graph?.destroy();
    super.destroy();
  }
}

class CardCombo extends BaseCombo {
  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes);
    const [width, height] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      width,
      height,
      x: -width / 2,
      y: -height / 2,
    };
  }

  drawKeyShape(attributes, container) {
    const { collapsed } = attributes;
    const outer = this.upsert('key', 'rect', this.getKeyStyle(attributes), container);
    if (!outer || !collapsed) {
      this.removeCardShape();
      return outer;
    }

    this.drawCardShape(attributes, container);

    return outer;
  }

  drawCardShape(attributes, container) {
    const [width, height] = this.getCollapsedKeySize(attributes);
    const data = this.context.graph.getComboData(this.id).data;

    const baseX = -width / 2;
    const baseY = -height / 2;

    this.upsert(
      'card-title',
      'text',
      {
        x: baseX,
        y: baseY,
        text: 'Group: ' + this.id,
        textAlign: 'left',
        textBaseline: 'top',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#4083f7',
      },
      container,
    );

    const gap = 10;
    const sep = (width + gap) / data.data.length;
    data.data.forEach(({ name, value }, index) => {
      this.upsert(
        `card-item-name-${index}`,
        'text',
        {
          x: baseX + index * sep,
          y: baseY + 40,
          text: name,
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 12,
          fill: 'gray',
        },
        container,
      );
      this.upsert(
        `card-item-value-${index}`,
        'text',
        {
          x: baseX + index * sep,
          y: baseY + 60,
          text: value + '%',
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 24,
        },
        container,
      );
    });
  }

  removeCardShape() {
    Object.entries(this.shapeMap).forEach(([key, shape]) => {
      if (key.startsWith('card-')) {
        delete this.shapeMap[key];
        shape.destroy();
      }
    });
  }
}

register(ExtensionCategory.NODE, 'sub-graph', SubGraphNode);
register(ExtensionCategory.COMBO, 'card', CardCombo);

const getSize = (d) => {
  const data = d.data;
  if (data.type === 'card') return data.status === 'expanded' ? [200, 100 * data.children.length] : [200, 100];
  else return [200, 200];
};

const graph = new Graph({
  container: 'container',
  animation: false,
  zoom: 0.8,
  data: {
    nodes: [
      {
        id: '1',
        combo: 'A',
        style: { x: 120, y: 70 },
        data: {
          data: {
            nodes: [
              { id: 'node-1' },
              { id: 'node-2' },
              { id: 'node-3' },
              { id: 'node-4' },
              { id: 'node-5' },
              { id: 'node-6' },
              { id: 'node-7' },
              { id: 'node-8' },
            ],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
              { source: 'node-1', target: 'node-5' },
              { source: 'node-1', target: 'node-6' },
              { source: 'node-1', target: 'node-7' },
              { source: 'node-1', target: 'node-8' },
            ],
          },
        },
      },
      {
        id: '2',
        combo: 'C',
        style: { x: 370, y: 70 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
      {
        id: 'node-4',
        combo: 'D',
        style: { x: 370, y: 200 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
    ],
    edges: [],
    combos: [
      {
        id: 'root',
        data: {
          data: [
            { name: 'percent', value: 50 },
            { name: 'percent', value: 45 },
            { name: 'percent', value: 70 },
          ],
        },
      },
      {
        id: 'A',
        combo: 'root',
        data: {
          data: [
            { name: 'percent', value: 30 },
            { name: 'percent', value: 90 },
          ],
        },
      },
      {
        id: 'B',
        combo: 'root',
        style: { collapsed: true },
        data: {
          data: [
            { name: 'percent', value: 60 },
            { name: 'percent', value: 80 },
          ],
        },
      },
      {
        id: 'C',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 60 }],
        },
      },
      {
        id: 'D',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 80 }],
        },
      },
    ],
  },
  node: {
    type: 'sub-graph',
    style: {
      dx: -100,
      dy: -50,
      size: getSize,
    },
  },
  combo: {
    type: 'card',
    style: {
      collapsedSize: [200, 100],
      collapsedMarker: false,
      radius: 10,
    },
  },
  behaviors: [
    { type: 'drag-element', enable: (event) => event.shiftKey !== true },
    'collapse-expand',
    'zoom-canvas',
    'drag-canvas',
  ],
  plugins: [
    {
      type: 'contextmenu',
      getItems: (event) => {
        const { targetType, target } = event;
        if (!['node', 'combo'].includes(targetType)) return [];
        const id = target.id;

        if (targetType === 'combo') {
          const data = graph.getComboData(id);
          if (isCollapsed(data)) {
            return [{ name: '展开', value: 'expanded' }];
          } else return [{ name: '收起', value: 'collapsed' }];
        }
        return [{ name: '收起', value: 'collapsed' }];
      },
      onClick: (value, target, current) => {
        const id = current.id;
        const elementType = graph.getElementType(id);

        if (elementType === 'node') {
          const parent = graph.getParentData(id, 'combo');
          if (parent) return graph.collapseElement(parent.id, false);
        }

        if (value === 'expanded') graph.expandElement(id, false);
        else graph.collapseElement(id, false);
      },
    },
  ],
});

graph.render();
```

---

### Why Do Cats?

**文件路径**: `scene-case/default/demo/why-do-cats.js`

```js
// ref: https://whydocatsanddogs.com/cats
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';
import { hierarchy, pack } from '@antv/vendor/d3-hierarchy';

const style = document.createElement('style');
style.innerHTML = `
@font-face {
font-family: 'handwriting';
src: url('https://mass-office.alipay.com/huamei_koqzbu/afts/file/sgUeRbI3d-IAAAAAAAAAABAADnV5AQBr/font.woff2')
  format('woff2');
}`;
document.head.appendChild(style);

function getColor(id) {
  const colors = [
    '#8dd3c7',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
  ];
  const index = parseInt(id);
  return colors[index % colors.length];
}

const topics = [
  'cat.like',
  'cat.hate',
  'cat.love',
  'cat.not.like',
  'cat.afraid_of',
  'cat.want.to',
  'cat.scared.of',
  'cat.not.want_to',
];

class BubbleLayout extends BaseLayout {
  id = 'bubble-layout';

  async execute(model, options) {
    const { nodes = [] } = model;

    const { width = 0, height = 0 } = { ...this.options, ...options };

    const root = hierarchy({ id: 'root' }, (datum) => {
      const { id } = datum;
      if (id === 'root') return nodes.filter((node) => node.depth === 1);
      else if (datum.depth === 2) return [];
      else return nodes.filter((node) => node.actualParentId === id);
    });

    root.sum((d) => (+d.index_value || 0.01) ** 0.5 * 100);

    pack()
      .size([width, height])
      .padding((node) => {
        return node.depth === 0 ? 20 : 2;
      })(root);

    const result = { nodes: [] };

    root.descendants().forEach((node) => {
      const {
        data: { id },
        x,
        y,
        // @ts-expect-error r is exist
        r,
      } = node;

      if (node.depth >= 1) result.nodes.push({ id, style: { x, y, size: r * 2 } });
    });

    return result;
  }
}

register(ExtensionCategory.LAYOUT, 'bubble-layout', BubbleLayout);

fetch('https://assets.antv.antgroup.com/g6/cat-hierarchy.json')
  .then((res) => res.json())
  .then((rawData) => {
    const graphData = rawData.reduce(
      (acc, row) => {
        const { id } = row;
        topics.forEach((topic) => {
          if (id.startsWith(topic)) {
            if (id === topic) {
              acc.nodes.push({ ...row, depth: 1 });
            } else {
              acc.nodes.push({ ...row, depth: 2, actualParentId: topic });
            }
          }
        });

        return acc;
      },
      { nodes: [] },
    );

    const graph = new Graph({
      container: 'container',
      data: graphData,
      renderer: (layer) => {
        const renderer = new CanvasRenderer();
        if (layer === 'main') {
          renderer.registerPlugin(new PluginRoughCanvasRenderer());
        }
        return renderer;
      },
      node: {
        style: (d) => {
          const { id, depth, id_num } = d;
          const color = getColor(id_num);

          if (depth === 1) {
            return {
              fill: 'none',
              stroke: color,
              labelFontFamily: 'handwriting',
              labelFontSize: 20,
              labelText: id.replace('cat.', '').replace(/\.|_/g, ' '),
              labelTextTransform: 'capitalize',
              lineWidth: 1,
              zIndex: -1,
            };
          }

          const {
            text,
            style: { size: diameter },
          } = d;

          return {
            fill: color,
            fillOpacity: 0.7,
            stroke: color,
            fillStyle: 'cross-hatch',
            hachureGap: 1.5,
            iconFontFamily: 'handwriting',
            iconFontSize: (diameter / text.length) * 2,
            iconText: diameter > 20 ? text : '',
            iconFontWeight: 'bold',
            iconStroke: color,
            iconLineWidth: 2,
            lineWidth: (diameter || 20) ** 0.5 / 5,
          };
        },
      },
      layout: {
        type: 'bubble-layout',
        preLayout: true,
      },
      plugins: [
        {
          type: 'tooltip',
          getContent: (event, items) => {
            return `<span style="text-transform: capitalize; font-family: handwriting; font-size: 20px;">${items[0].id.replace(/\.|_/g, ' ')}</span>`;
          },
        },
      ],
      behaviors: [{ type: 'drag-canvas', enable: true }, 'zoom-canvas'],
    });

    graph.render();
  });
```

---

### Snake Flow Diagram

**文件路径**: `scene-case/default/demo/snake-flow-diagram.js`

```js
import { ExtensionCategory, Graph, Polyline, positionOf, register } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { label: '开始流程', time: '17:00:00' } },
    { id: '1', data: { label: '流程1', time: '17:00:05' } },
    { id: '2', data: { label: '流程2', time: '17:00:12' } },
    { id: '3', data: { label: '流程3', time: '17:00:30' } },
    { id: '4', data: { label: '流程4', time: '17:02:00' } },
    { id: '5', data: { label: '流程5', time: '17:02:40' } },
    { id: '6', data: { label: '流程6', time: '17:05:50' } },
    { id: '7', data: { label: '流程7', time: '17:10:00' } },
    { id: '8', data: { label: '流程8', time: '17:11:20' } },
    { id: '9', data: { label: '流程9', time: '17:15:00' } },
    { id: '10', data: { label: '流程10', time: '17:30:00' } },
    { id: '11', data: { label: '流程11' } },
    { id: '12', data: { label: '流程12' } },
    { id: '13', data: { label: '流程13' } },
    { id: '14', data: { label: '流程14' } },
    { id: '15', data: { label: '流程结束' } },
  ],
  edges: [
    { source: '0', target: '1', data: { done: true } },
    { source: '1', target: '2', data: { done: true } },
    { source: '2', target: '3', data: { done: true } },
    { source: '3', target: '4', data: { done: true } },
    { source: '4', target: '5', data: { done: true } },
    { source: '5', target: '6', data: { done: true } },
    { source: '6', target: '7', data: { done: true } },
    { source: '7', target: '8', data: { done: true } },
    { source: '8', target: '9', data: { done: true } },
    { source: '9', target: '10', data: { done: true } },
    { source: '10', target: '11', data: { done: false } },
    { source: '11', target: '12', data: { done: false } },
    { source: '12', target: '13', data: { done: false } },
    { source: '13', target: '14', data: { done: false } },
    { source: '14', target: '15', data: { done: false } },
  ],
};

class SnakePolyline extends Polyline {
  getPoints(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);

    if (sourcePoint[1] === targetPoint[1]) return [sourcePoint, targetPoint];

    const prevPointId = this.context.model
      .getRelatedEdgesData(this.sourceNode.id)
      .filter((edge) => edge.target === this.sourceNode.id)[0]?.source;
    if (!prevPointId) return [sourcePoint, targetPoint];

    const prevPoint = positionOf(this.context.model.getNodeLikeDatum(prevPointId));
    const offset = -(prevPoint[0] - sourcePoint[0]) / 4;
    return [
      sourcePoint,
      [sourcePoint[0] + offset, sourcePoint[1]],
      [targetPoint[0] + offset, targetPoint[1]],
      targetPoint,
    ];
  }
}

register(ExtensionCategory.EDGE, 's-polyline', SnakePolyline);

const graph = new Graph({
  container: 'container',
  data,
  background: '#fafafa',
  autoFit: 'center',
  node: {
    style: {
      fill: (d) => (d.data.time ? '#1783ff' : '#d9d9d9'),
      lineWidth: 2,
      size: 8,
      stroke: (d) => (d.data.time ? 'lightblue' : ''),
      labelFontWeight: 500,
      labelOffsetY: 8,
      labelText: (d) => d.data.label,
      badge: true,
      badges: (d) => [
        {
          background: false,
          fill: '#858ca6',
          fontSize: 10,
          offsetY: 39,
          placement: 'bottom',
          text: d.data.time || '--',
        },
      ],
    },
  },
  edge: {
    type: 's-polyline',
    style: {
      lineWidth: 2,
      stroke: (d) => (d.data.done ? '#1783ff' : '#d9d9d9'),
    },
  },
  layout: {
    type: 'snake',
    cols: 6,
    rowGap: 200,
    padding: [20, 140, 80],
  },
  behaviors: ['drag-canvas', 'zoom-canvas'],
});

graph.render();
```

---

## scene-case / tree-graph

### Indented Tree

**文件路径**: `scene-case/tree-graph/demo/indented-tree.js`

```js
import { Text as GText, Rect } from '@antv/g';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  CommonEvent,
  ExtensionCategory,
  Graph,
  NodeEvent,
  Polyline,
  iconfont,
  idOf,
  register,
  subStyleProps,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const rootId = 'Modeling Methods';

const COLORS = [
  '#5B8FF9',
  '#F6BD16',
  '#5AD8A6',
  '#945FB9',
  '#E86452',
  '#6DC8EC',
  '#FF99C3',
  '#1E9493',
  '#FF9845',
  '#5D7092',
];

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
  ADD_CHILD: 'add-child',
};

let textShape;
const measureText = (text) => {
  if (!textShape) textShape = new GText({ style: text });
  textShape.attr(text);
  return textShape.getBBox().width;
};

class IndentedNode extends BaseNode {
  static defaultStyleProps = {
    ports: [
      {
        key: 'in',
        placement: 'right-bottom',
      },
      {
        key: 'out',
        placement: 'left-bottom',
      },
    ],
  };

  constructor(options) {
    Object.assign(options.style, IndentedNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  getKeyStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const keyStyle = super.getKeyStyle(attributes);
    return {
      width,
      height,
      ...keyStyle,
      fill: 'transparent',
    };
  }

  drawKeyShape(attributes, container) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', 'rect', keyStyle, container);
  }

  getLabelStyle(attributes) {
    if (attributes.label === false || !attributes.labelText) return false;
    return subStyleProps(this.getGraphicStyle(attributes), 'label');
  }

  drawIconArea(attributes, container) {
    const [, h] = this.getSize(attributes);
    const iconAreaStyle = {
      fill: 'transparent',
      height: 30,
      width: 12,
      x: -6,
      y: h,
      zIndex: -1,
    };
    this.upsert('icon-area', Rect, iconAreaStyle, container);
  }

  forwardEvent(target, type, listener) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getCountStyle(attributes) {
    const { collapsed, color } = attributes;
    if (collapsed) {
      const [, height] = this.getSize(attributes);
      return {
        backgroundFill: color,
        cursor: 'pointer',
        fill: '#fff',
        fontSize: 8,
        padding: [0, 10],
        text: `${this.childrenData.length}`,
        textAlign: 'center',
        y: height + 8,
      };
    }

    return false;
  }

  drawCountShape(attributes, container) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: false,
      });
    });
  }

  isShowCollapse(attributes) {
    return !attributes.collapsed && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes) {
    const { showIcon, color } = attributes;
    if (!this.isShowCollapse(attributes)) return false;
    const [, height] = this.getSize(attributes);
    return {
      visibility: showIcon ? 'visible' : 'hidden',
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '\ue6e4',
      textAlign: 'center',
      x: -1, // half of edge line width
      y: height + 8,
    };
  }

  drawCollapseShape(attributes, container) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  getAddStyle(attributes) {
    const { collapsed, showIcon } = attributes;
    if (collapsed) return false;
    const [, height] = this.getSize(attributes);
    const color = '#ddd';
    const lineWidth = 1;

    return {
      visibility: showIcon ? 'visible' : 'hidden',
      backgroundFill: '#fff',
      backgroundHeight: 12,
      backgroundLineWidth: lineWidth,
      backgroundStroke: color,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: color,
      fontFamily: 'iconfont',
      text: '\ue664',
      textAlign: 'center',
      x: -1,
      y: height + (this.isShowCollapse(attributes) ? 22 : 8),
    };
  }

  drawAddShape(attributes, container) {
    const addStyle = this.getAddStyle(attributes);
    const btn = this.upsert('add', Badge, addStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id });
    });
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawCountShape(attributes, container);

    this.drawIconArea(attributes, container);
    this.drawCollapseShape(attributes, container);
    this.drawAddShape(attributes, container);
  }
}

class IndentedEdge extends Polyline {
  getControlPoints(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);
    const [sx] = sourcePoint;
    const [, ty] = targetPoint;
    return [[sx, ty]];
  }
}

class CollapseExpandTree extends BaseBehavior {
  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  bindEvents() {
    const { graph } = this.context;

    graph.on(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.on(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.on(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.on(TreeEvent.ADD_CHILD, this.addChild);
  }

  unbindEvents() {
    const { graph } = this.context;

    graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.off(TreeEvent.ADD_CHILD, this.addChild);
  }

  status = 'idle';

  showIcon = (event) => {
    this.setIcon(event, true);
  };

  hideIcon = (event) => {
    this.setIcon(event, false);
  };

  setIcon = (event, show) => {
    if (this.status !== 'idle') return;
    const { target } = event;
    const id = target.id;
    const { graph, element } = this.context;
    graph.updateNodeData([{ id, style: { showIcon: show } }]);
    element.draw({ animation: false, silence: true });
  };

  onCollapseExpand = async (event) => {
    this.status = 'busy';
    const { id, collapsed } = event;
    const { graph } = this.context;
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };

  addChild(event) {
    const { onCreateChild = () => ({ id: `${Date.now()}`, style: { labelText: 'new node' } }) } = this.options;
    const { graph } = this.context;
    const datum = onCreateChild(event.id);
    graph.addNodeData([datum]);
    graph.addEdgeData([{ source: event.id, target: datum.id }]);
    const parent = graph.getNodeData(event.id);
    graph.updateNodeData([
      { id: event.id, children: [...(parent.children || []), datum.id], style: { collapsed: false } },
    ]);
    graph.render();
  }
}

/**
 * <zh/> 支持拖拽节点到其他节点下作为子节点
 *
 * <en/> Support dragging nodes to other nodes as child nodes
 */
class DragBranch extends BaseBehavior {
  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  bindEvents() {
    const { graph } = this.context;

    graph.on(NodeEvent.DRAG_START, this.onDragStart);
    graph.on(NodeEvent.DRAG, this.onDrag);
    graph.on(NodeEvent.DRAG_END, this.onDragEnd);
    graph.on(NodeEvent.DRAG_ENTER, this.onDragEnter);
    graph.on(NodeEvent.DRAG_LEAVE, this.onDragLeave);
  }

  unbindEvents() {
    const { graph } = this.context;

    graph.off(NodeEvent.DRAG_START, this.onDragStart);
    graph.off(NodeEvent.DRAG, this.onDrag);
    graph.off(NodeEvent.DRAG_END, this.onDragEnd);
    graph.off(NodeEvent.DRAG_ENTER, this.onDragEnter);
    graph.off(NodeEvent.DRAG_LEAVE, this.onDragLeave);
  }

  enable = true;

  validate(event) {
    if (this.destroyed) return false;
    const { enable = (evt) => evt.target.id !== rootId } = this.options;
    if (typeof enable === 'function') return enable(event);
    return !!enable;
  }

  createShadow(target) {
    const shadowStyle = subStyleProps(this.options, 'shadow');
    const positionStyle = target.getShape('label').getBBox();

    this.shadow = new Rect({
      style: {
        pointerEvents: 'none',
        fill: '#F3F9FF',
        fillOpacity: 0.5,
        stroke: '#1890FF',
        strokeOpacity: 0.9,
        lineDash: [5, 5],
        ...shadowStyle,
        ...positionStyle,
      },
    });
    this.context.canvas.appendChild(this.shadow);
  }

  moveShadow(offset) {
    if (!this.shadow) return;
    const [dx, dy] = offset;
    this.shadow.translate(dx, dy);
  }

  destroyShadow() {
    this.shadow?.remove();
    this.shadow = undefined;
  }

  onDragStart = (event) => {
    this.enable = this.validate(event);
    if (!this.enable) return;

    const { target } = event;
    this.child = target;
    this.createShadow(target);
  };

  getDelta(event) {
    const zoom = this.context.graph.getZoom();
    return [event.dx / zoom, event.dy / zoom];
  }

  onDrag = (event) => {
    if (!this.enable) return;

    const delta = this.getDelta(event);
    this.moveShadow(delta);
  };

  onDragEnd = () => {
    this.destroyShadow();
    if (this.child === undefined || this.parent === undefined) return;

    const { graph } = this.context;
    const childId = this.child.id;
    const parentId = this.parent.id;

    const originalParent = graph.getParentData(childId, 'tree');

    // 前后父节点不应该相同
    // The previous and current parent nodes should not be the same
    if (idOf(originalParent) === parentId) return;

    // 新的父节点不应该是当前节点的子节点
    // The new parent node should not be a child node of the current node
    const ancestors = graph.getAncestorsData(parentId, 'tree');
    if (ancestors.some((ancestor) => ancestor.id === childId)) return;

    const edges = graph
      .getEdgeData()
      .filter((edge) => edge.target === childId)
      .map(idOf);
    graph.removeEdgeData(edges);
    graph.updateNodeData([
      { id: idOf(originalParent), children: originalParent?.children?.filter((child) => child !== childId) },
    ]);
    const modifiedParent = graph.getNodeData(parentId);
    graph.updateNodeData([{ id: parentId, children: [...(modifiedParent.children || []), childId] }]);
    graph.addEdgeData([{ source: parentId, target: childId }]);
    graph.render();
  };

  onDragEnter = (event) => {
    const { graph, element } = this.context;
    const targetId = event.target.id;
    if (targetId === this.child?.id || targetId === rootId) {
      if (targetId === rootId) this.parent = event.target;
      return;
    }

    this.parent = event.target;
    graph.updateNodeData([{ id: targetId, states: ['selected'] }]);
    element.draw({ animation: false, silence: true });
  };

  onDragLeave = (event) => {
    const { graph, element } = this.context;
    const targetId = event.target.id;

    this.parent = undefined;
    graph.updateNodeData([{ id: targetId, states: [] }]);
    element.draw({ animation: false, silence: true });
  };
}

register(ExtensionCategory.NODE, 'indented', IndentedNode);
register(ExtensionCategory.EDGE, 'indented', IndentedEdge);
register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
register(ExtensionCategory.BEHAVIOR, 'drag-branch', DragBranch);

fetch('https://assets.antv.antgroup.com/g6/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      x: 60,
      data: treeToGraphData(data),
      node: {
        type: 'indented',
        style: {
          size: (d) => [measureText({ text: d.id, fontSize: 12 }) + 6, 20],
          labelBackground: (datum) => datum.id === rootId,
          labelBackgroundRadius: 0,
          labelBackgroundFill: '#576286',
          labelFill: (datum) => (datum.id === rootId ? '#fff' : '#666'),
          labelText: (d) => d.style?.labelText || d.id,
          labelTextAlign: (datum) => (datum.id === rootId ? 'center' : 'left'),
          labelTextBaseline: 'top',
          color: (datum) => {
            const depth = graph.getAncestorsData(datum.id, 'tree').length - 1;
            return COLORS[depth % COLORS.length] || '#576286';
          },
        },
        state: {
          selected: {
            lineWidth: 0,
            labelFill: '#40A8FF',
            labelBackground: true,
            labelFontWeight: 'normal',
            labelBackgroundFill: '#e8f7ff',
            labelBackgroundRadius: 10,
          },
        },
      },
      edge: {
        type: 'indented',
        style: {
          radius: 16,
          lineWidth: 2,
          sourcePort: 'out',
          targetPort: 'in',
          stroke: (datum) => {
            const depth = graph.getAncestorsData(datum.source, 'tree').length;
            return COLORS[depth % COLORS.length];
          },
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        isHorizontal: true,
        indent: 40,
        getHeight: () => 20,
        getVGap: () => 10,
      },
      behaviors: [
        'scroll-canvas',
        'drag-branch',
        'collapse-expand-tree',
        { type: 'click-select', enable: (event) => event.targetType === 'node' && event.target.id !== rootId },
      ],
    });

    graph.render();
  });
```

---

### Mind Map

**文件路径**: `scene-case/tree-graph/demo/mindmap.js`

```js
import { Rect, Text } from '@antv/g';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  BaseTransform,
  CommonEvent,
  CubicHorizontal,
  ExtensionCategory,
  Graph,
  GraphEvent,
  iconfont,
  idOf,
  NodeEvent,
  positionOf,
  register,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const RootNodeStyle = {
  fill: '#EFF0F0',
  labelFill: '#262626',
  labelFontSize: 24,
  labelFontWeight: 600,
  labelOffsetY: 8,
  labelPlacement: 'center',
  ports: [{ placement: 'right' }, { placement: 'left' }],
  radius: 8,
};

const NodeStyle = {
  fill: 'transparent',
  labelPlacement: 'center',
  labelFontSize: 16,
  ports: [{ placement: 'right-bottom' }, { placement: 'left-bottom' }],
};

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
  ADD_CHILD: 'add-child',
};

let textShape;
const measureText = (text) => {
  if (!textShape) textShape = new Text({ style: text });
  textShape.attr(text);
  return textShape.getBBox().width;
};

const getNodeWidth = (nodeId, isRoot) => {
  const padding = isRoot ? 40 : 30;
  const nodeStyle = isRoot ? RootNodeStyle : NodeStyle;
  return measureText({ text: nodeId, fontSize: nodeStyle.labelFontSize, fontFamily: 'Gill Sans' }) + padding;
};

const getNodeSize = (nodeId, isRoot) => {
  const width = getNodeWidth(nodeId, isRoot);
  const height = isRoot ? 48 : 32;
  return [width, height];
};

class MindmapNode extends BaseNode {
  static defaultStyleProps = {
    showIcon: false,
  };

  constructor(options) {
    Object.assign(options.style, MindmapNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  isShowCollapse(attributes) {
    const { collapsed, showIcon } = attributes;
    return !collapsed && showIcon && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes) {
    const { showIcon, color, direction } = attributes;
    if (!this.isShowCollapse(attributes)) return false;
    const [width, height] = this.getSize(attributes);

    return {
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '\ue6e4',
      textAlign: 'center',
      transform: direction === 'left' ? [['rotate', 90]] : [['rotate', -90]],
      visibility: showIcon ? 'visible' : 'hidden',
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCollapseShape(attributes, container) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  getCountStyle(attributes) {
    const { collapsed, color, direction } = attributes;
    const count = this.context.model.getDescendantsData(this.id).length;
    if (!collapsed || count === 0) return false;
    const [width, height] = this.getSize(attributes);
    return {
      backgroundFill: color,
      backgroundHeight: 12,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: '#fff',
      fontSize: 8,
      text: count.toString(),
      textAlign: 'center',
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCountShape(attributes, container) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: false,
      });
    });
  }

  getAddStyle(attributes) {
    const { collapsed, showIcon, direction } = attributes;
    if (collapsed || !showIcon) return false;
    const [width, height] = this.getSize(attributes);
    const color = '#ddd';

    const offsetX = this.isShowCollapse(attributes) ? 24 : 12;
    const isRoot = this.id === this.rootId;

    return {
      backgroundFill: '#fff',
      backgroundHeight: 12,
      backgroundLineWidth: 1,
      backgroundStroke: color,
      backgroundWidth: 12,
      cursor: 'pointer',
      fill: color,
      fontFamily: 'iconfont',
      fontSize: 8,
      text: '\ue664',
      textAlign: 'center',
      x: isRoot ? width + 12 : direction === 'left' ? -offsetX : width + offsetX,
      y: isRoot ? height / 2 : height,
    };
  }

  getAddBarStyle(attributes) {
    const { collapsed, showIcon, direction, color = '#1783FF' } = attributes;
    if (collapsed || !showIcon) return false;
    const [width, height] = this.getSize(attributes);

    const offsetX = this.isShowCollapse(attributes) ? 12 : 0;
    const isRoot = this.id === this.rootId;

    const HEIGHT = 2;
    const WIDTH = 6;

    return {
      cursor: 'pointer',
      fill:
        direction === 'left'
          ? `linear-gradient(180deg, #fff 20%, ${color})`
          : `linear-gradient(0deg, #fff 20%, ${color})`,
      height: HEIGHT,
      width: WIDTH,
      x: isRoot ? width : direction === 'left' ? -offsetX - WIDTH : width + offsetX,
      y: isRoot ? height / 2 - HEIGHT / 2 : height - HEIGHT / 2,
      zIndex: -1,
    };
  }

  drawAddShape(attributes, container) {
    const addStyle = this.getAddStyle(attributes);
    const addBarStyle = this.getAddBarStyle(attributes);
    this.upsert('add-bar', Rect, addBarStyle, container);
    const btn = this.upsert('add', Badge, addStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id, direction: attributes.direction });
    });
  }

  forwardEvent(target, type, listener) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getKeyStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const keyShape = super.getKeyStyle(attributes);
    return { width, height, ...keyShape };
  }

  drawKeyShape(attributes, container) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', Rect, keyStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawCollapseShape(attributes, container);
    this.drawAddShape(attributes, container);

    this.drawCountShape(attributes, container);
  }
}

class MindmapEdge extends CubicHorizontal {
  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  getKeyPath(attributes) {
    const path = super.getKeyPath(attributes);
    const isRoot = this.targetNode.id === this.rootId;
    const labelWidth = getNodeWidth(this.targetNode.id, isRoot);

    const [, tp] = this.getEndpoints(attributes);
    const sign = this.sourceNode.getCenter()[0] < this.targetNode.getCenter()[0] ? 1 : -1;
    return [...path, ['L', tp[0] + labelWidth * sign, tp[1]]];
  }
}

class CollapseExpandTree extends BaseBehavior {
  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  bindEvents() {
    const { graph } = this.context;

    graph.on(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.on(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.on(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.on(TreeEvent.ADD_CHILD, this.addChild);
  }

  unbindEvents() {
    const { graph } = this.context;

    graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
    graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
    graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
    graph.off(TreeEvent.ADD_CHILD, this.addChild);
  }

  status = 'idle';

  showIcon = (event) => {
    this.setIcon(event, true);
  };

  hideIcon = (event) => {
    this.setIcon(event, false);
  };

  setIcon = (event, show) => {
    if (this.status !== 'idle') return;
    const { target } = event;
    const id = target.id;
    const { graph, element } = this.context;
    graph.updateNodeData([{ id, style: { showIcon: show } }]);
    element.draw({ animation: false, silence: true });
  };

  onCollapseExpand = async (event) => {
    this.status = 'busy';
    const { id, collapsed } = event;
    const { graph } = this.context;
    await graph.frontElement(id);
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };

  addChild = async (event) => {
    this.status = 'busy';
    const {
      onCreateChild = () => {
        const currentTime = new Date(Date.now()).toLocaleString();
        return { id: `New Node in ${currentTime}` };
      },
    } = this.options;
    const { graph } = this.context;
    const datum = onCreateChild(event.id);
    const parent = graph.getNodeData(event.id);

    graph.addNodeData([datum]);
    graph.addEdgeData([{ source: event.id, target: datum.id }]);
    graph.updateNodeData([
      {
        id: event.id,
        children: [...(parent.children || []), datum.id],
        style: { collapsed: false, showIcon: false },
      },
    ]);
    await graph.render();
    await graph.focusElement(datum.id);
    this.status = 'idle';
  };
}

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#1783FF',
      '#F08F56',
      '#D580FF',
      '#00C9C9',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  };

  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };

    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
register(ExtensionCategory.EDGE, 'mindmap', MindmapEdge);
register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);

const getNodeSide = (nodeData, parentData) => {
  if (!parentData) return 'center';

  const nodePositionX = positionOf(nodeData)[0];
  const parentPositionX = positionOf(parentData)[0];
  return parentPositionX > nodePositionX ? 'left' : 'right';
};

fetch('https://assets.antv.antgroup.com/g6/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const rootId = data.id;

    const graph = new Graph({
      data: treeToGraphData(data),
      node: {
        type: 'mindmap',
        style: function (d) {
          const direction = getNodeSide(d, this.getParentData(idOf(d), 'tree'));
          const isRoot = idOf(d) === rootId;

          return {
            direction,
            labelText: idOf(d),
            size: getNodeSize(idOf(d), isRoot),
            labelFontFamily: 'Gill Sans',
            // 通过设置节点标签背景来扩大交互区域 | Expand the interaction area by setting the node label background
            labelBackground: true,
            labelBackgroundFill: 'transparent',
            labelPadding: direction === 'left' ? [2, 0, 10, 40] : [2, 40, 10, 0],
            ...(isRoot ? RootNodeStyle : NodeStyle),
          };
        },
      },
      edge: {
        type: 'mindmap',
        style: {
          lineWidth: 3,
          stroke: function (data) {
            return this.getNodeData(data.target).style.color || '#99ADD1';
          },
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 30,
        getWidth: (node) => getNodeWidth(node.id, node.id === rootId),
        getVGap: () => 6,
        getHGap: () => 60,
        animation: false,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree'],
      transforms: ['assign-color-by-branch'],
      animation: false,
    });

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph.fitView();
    });

    graph.render();
  });
```

---

### Anti-Procrastination Fishbone Diagram

**文件路径**: `scene-case/tree-graph/demo/anti-procrastination-fishbone.js`

```js
import { Text } from '@antv/g';
import { BaseTransform, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Overcome \n procrastination',
  children: [
    {
      id: 'Perfectionism',
      children: [
        { id: 'Correctly assess the difficulty of things' },
        { id: 'Complete first, then improve' },
        { id: 'Just do it' },
      ],
    },
    {
      id: 'Improve concentration',
      children: [
        { id: 'Pomodoro Technique' },
        { id: 'Limited time, limited quantity, only do one thing at a time' },
        { id: 'Improve anti-interference ability, reduce interruptions' },
      ],
    },
    {
      id: 'Set a clear task management process',
      children: [
        { id: 'Set priorities for completed tasks' },
        { id: 'Break down specific executable goals' },
        { id: 'Collect-sort-sort-execute feedback-summary' },
      ],
    },
    {
      id: 'Establish positive feedback',
      children: [{ id: 'Do what you like' }, { id: 'Spiritual motivation' }, { id: 'Material motivation' }],
    },
    {
      id: 'Relax and enjoy',
      children: [
        { id: 'Focus on process rather than results' },
        { id: 'Driven by needs rather than anxiety' },
        { id: 'Accept and understand' },
      ],
    },
  ],
};

let textShape;
const measureText = (style) => {
  if (!textShape) textShape = new Text({ style });
  textShape.attr(style);
  return textShape.getBBox().width;
};

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#1783FF',
      '#F08F56',
      '#D580FF',
      '#00C9C9',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  };

  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };

    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

class ArrangeEdgeZIndex extends BaseTransform {
  beforeDraw(input) {
    const { model } = this.context;
    const { nodes, edges } = model.getData();

    const oneLevelNodes = nodes.filter((node) => node.depth === 1);
    const oneLevelNodeIds = oneLevelNodes.map((node) => node.id);

    edges.forEach((edge) => {
      if (oneLevelNodeIds.includes(edge.target)) {
        edge.style ||= {};
        edge.style.zIndex = oneLevelNodes.length - oneLevelNodes.findIndex((node) => node.id === edge.target);
      }
    });

    return input;
  }
}

register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);
register(ExtensionCategory.TRANSFORM, 'arrange-edge-z-index', ArrangeEdgeZIndex);

const getNodeSize = (id, depth) => {
  const FONT_FAMILY = 'system-ui, sans-serif';
  return depth === 0
    ? [measureText({ text: id, fontSize: 24, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 70]
    : depth === 1
      ? [measureText({ text: id, fontSize: 18, fontFamily: FONT_FAMILY }) + 50, 42]
      : [2, 30];
};

const graph = new Graph({
  autoFit: 'view',
  padding: 10,
  data: treeToGraphData(data),
  node: {
    type: 'rect',
    style: (d) => {
      const style = {
        radius: 8,
        size: getNodeSize(d.id, d.depth),
        labelText: d.id,
        labelPlacement: 'right',
        labelFontFamily: 'Gill Sans',
      };

      if (d.depth === 0) {
        Object.assign(style, {
          fill: '#EFF0F0',
          labelFill: '#262626',
          labelFontWeight: 'bold',
          labelFontSize: 24,
          labelOffsetY: 4,
          labelPlacement: 'center',
          labelLineHeight: 24,
        });
      } else if (d.depth === 1) {
        Object.assign(style, {
          labelFontSize: 18,
          labelFill: '#fff',
          labelFillOpacity: 0.9,
          labelOffsetY: 5,
          labelPlacement: 'center',
          fill: d.style?.color,
        });
      } else {
        Object.assign(style, {
          fill: 'transparent',
          labelFontSize: 16,
          labeFill: '#262626',
        });
      }
      return style;
    },
  },
  edge: {
    type: 'polyline',
    style: {
      lineWidth: 3,
      stroke: function (data) {
        return this.getNodeData(data.target).style.color || '#99ADD1';
      },
    },
  },
  layout: {
    type: 'fishbone',
    direction: 'LR',
    hGap: 40,
    vGap: 60,
  },
  behaviors: ['zoom-canvas', 'drag-canvas'],
  transforms: ['assign-color-by-branch', 'arrange-edge-z-index'],
});

graph.render();
```

---

### Product Profitability Below Expectations

**文件路径**: `scene-case/tree-graph/demo/product-fishbone.js`

```js
import { Text } from '@antv/g';
import { BaseTransform, ExtensionCategory, Graph, register, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Product Profitability\nBelow Expectations',
  children: [
    {
      id: 'Problem Description',
      children: [
        { id: 'Brand Sales Volume' },
        { id: 'Market Capacity' },
        { id: 'Brand Market Share' },
        { id: 'Total Contribution Margin' },
      ],
    },
    {
      id: 'Brand Positioning',
      children: [{ id: 'Packaging' }, { id: 'Brand Name' }, { id: 'Selling Price' }, { id: 'Product Specifications' }],
    },
    {
      id: 'Distribution Channels',
      children: [{ id: 'Region' }, { id: 'Channel' }, { id: 'Customer Type' }, { id: 'Sales Personnel Coverage' }],
    },
    {
      id: 'Market Awareness',
      children: [
        { id: 'Regional Weighting' },
        { id: 'Media Mix' },
        { id: 'Advertising Investment' },
        { id: 'Quality Perception' },
      ],
    },
    {
      id: 'Trial Purchase',
      children: [
        { id: 'In-store Display' },
        { id: 'Promotion Type' },
        { id: 'Timing of Promotion' },
        { id: 'Supply Assurance' },
      ],
    },
    {
      id: 'Repeat Purchase',
      children: [
        { id: 'Consumer Profile' },
        { id: 'Usage Occasion' },
        { id: 'Frequency of Use' },
        { id: 'Returns Due to Product Issues' },
      ],
    },
  ],
};

let textShape;
const measureText = (style) => {
  if (!textShape) textShape = new Text({ style });
  textShape.attr(style);
  return textShape.getBBox().width;
};

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#1783FF',
      '#F08F56',
      '#D580FF',
      '#00C9C9',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  };

  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };

    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

class ArrangeEdgeZIndex extends BaseTransform {
  beforeDraw(input) {
    const { model } = this.context;
    const { nodes, edges } = model.getData();

    const oneLevelNodes = nodes.filter((node) => node.depth === 1);
    const oneLevelNodeIds = oneLevelNodes.map((node) => node.id);

    edges.forEach((edge) => {
      if (oneLevelNodeIds.includes(edge.target)) {
        edge.style ||= {};
        edge.style.zIndex = oneLevelNodes.length - oneLevelNodes.findIndex((node) => node.id === edge.target);
      }
    });

    return input;
  }
}

register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);
register(ExtensionCategory.TRANSFORM, 'arrange-edge-z-index', ArrangeEdgeZIndex);

const getNodeSize = (id, depth) => {
  const FONT_FAMILY = 'system-ui, sans-serif';
  return depth === 0
    ? [measureText({ text: id, fontSize: 24, fontWeight: 'bold', fontFamily: FONT_FAMILY }) + 80, 90]
    : depth === 1
      ? [measureText({ text: id, fontSize: 18, fontFamily: FONT_FAMILY }) + 50, 42]
      : [2, 30];
};

const graph = new Graph({
  autoFit: 'view',
  padding: 30,
  data: treeToGraphData(data),
  node: {
    type: 'rect',
    style: (d) => {
      const style = {
        radius: 8,
        size: getNodeSize(d.id, d.depth),
        labelText: d.id,
        labelPlacement: 'left',
        labelFontFamily: 'Gill Sans',
      };

      if (d.depth === 0) {
        Object.assign(style, {
          fill: '#EFF0F0',
          labelFill: '#262626',
          labelFontWeight: 'bold',
          labelFontSize: 24,
          labelOffsetY: 3,
          labelPlacement: 'center',
          labelLineHeight: 32,
        });
      } else if (d.depth === 1) {
        Object.assign(style, {
          labelFontSize: 18,
          labelFill: '#252525',
          labelFillOpacity: 0.9,
          labelOffsetY: 5,
          labelPlacement: 'center',
          labelFontWeight: 600,
          fill: d.style?.color,
          fillOpacity: 0.6,
          lineWidth: 2,
          stroke: '#252525',
        });
      } else {
        Object.assign(style, {
          fill: 'transparent',
          labelFontSize: 16,
          labeFill: '#262626',
        });
      }
      return style;
    },
  },
  edge: {
    type: 'polyline',
    style: {
      lineWidth: 3,
      stroke: '#252525',
    },
  },
  layout: {
    type: 'fishbone',
    direction: 'RL',
    hGap: 40,
    vGap: 60,
    getRibSep: (node) => {
      console.log(node);
      return node.depth === 0 ? 0 : -50;
    },
  },
  behaviors: ['zoom-canvas', 'drag-canvas'],
  transforms: ['assign-color-by-branch', 'arrange-edge-z-index'],
});

graph.render();
```

---

### Radial Dendrogram

**文件路径**: `scene-case/tree-graph/demo/radial-dendrogram.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      padding: 50,
      data: treeToGraphData(data),
      node: {
        style: {
          size: 12,
          labelText: (d) => d.id,
          labelBackground: true,
          labelFontSize: 14,
          labelFontFamily: 'Gill Sans',
        },
      },
      edge: {
        type: 'cubic-radial',
        style: {
          lineWidth: 3,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        preLayout: false,
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 5,
          direction: 'in',
          inactiveState: 'inactive',
        },
      ],
      transforms: ['place-radial-labels'],
      animation: false,
    });

    graph.render();
  });
```

---

### Radial Compact Tree

**文件路径**: `scene-case/tree-graph/demo/radial-compact-tree.js`

```js
import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/flare.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      padding: 50,
      data: treeToGraphData(data),
      node: {
        style: {
          size: 12,
          labelText: (d) => d.id,
          labelBackground: true,
          labelFontSize: 14,
          labelFontFamily: 'Gill Sans',
        },
      },
      edge: {
        type: 'cubic-radial',
        style: {
          lineWidth: 3,
        },
      },
      layout: {
        type: 'compact-box',
        radial: true,
        direction: 'RL',
        getVGap: () => 40,
        getHGap: () => 80,
        preLayout: false,
      },
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'drag-element',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 5,
          direction: 'in',
          inactiveState: 'inactive',
        },
      ],
      transforms: ['place-radial-labels'],
      animation: false,
    });

    graph.render();
  });
```

---

## transform / process-parallel-edges

### Bundle Mode

**文件路径**: `transform/process-parallel-edges/demo/bundle.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'A', style: { x: 50, y: 350 } },
    { id: 'B', style: { x: 250, y: 150 } },
    { id: 'C', style: { x: 450, y: 350 } },
  ],
  edges: [
    { source: 'A', target: 'C' },
    { source: 'C', target: 'A' },
    ...Array.from({ length: 10 }).map((_, i) => ({
      id: `edge:A-B${i}`,
      source: 'A',
      target: 'B',
      data: {
        label: `A->B:${i}`,
      },
    })),
    ...Array.from({ length: 5 }).map((_, i) => ({
      id: `edge:B-C${i}`,
      source: 'B',
      target: 'C',
      data: {
        label: `B->C:${i}`,
      },
    })),
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      ports: [{ placement: 'center' }],
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      labelText: (d) => d?.data?.label || `${d.source}->${d.target}`,
    },
  },
  behaviors: ['drag-element'],
  transforms: ['process-parallel-edges'],
});

graph.render();
```

---

### Merge Mode

**文件路径**: `transform/process-parallel-edges/demo/merge.js`

```js
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'A', style: { x: 50, y: 350 } },
    { id: 'B', style: { x: 250, y: 150 } },
    { id: 'C', style: { x: 450, y: 350 } },
  ],
  edges: [
    { source: 'A', target: 'B' },
    { source: 'B', target: 'A' },
    { id: 'B-C:1', source: 'B', target: 'C' },
    { id: 'B-C:2', source: 'B', target: 'C' },
    { source: 'A', target: 'C' },
  ],
};

const graph = new Graph({
  container: 'container',
  autoFit: 'center',
  data,
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  edge: {
    style: {
      labelText: (d) => d?.data?.label || `${d.source}->${d.target}`,
      startArrow: false,
    },
  },
  transforms: [
    {
      type: 'process-parallel-edges',
      mode: 'merge',
      style: {
        halo: true,
        haloOpacity: 0.2,
        haloStroke: 'red',
        startArrow: true,
      },
    },
  ],
});

graph.render();
```

---
