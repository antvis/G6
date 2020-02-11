---
title: G6 3.3 Upgrade Guide
order: 0
---

## The Built Outcomes of esm and commonjs
The built outcomes of esm and commonjs do not support layouts with Web-Worker.

## Util

- You don't need export @antv/util again after importing @antv/util in G6. The methods in @antv/util can be used directly;
- util/layout is removed:
  - The methods `scaleMatrix`, `floydWarshall`, and `getAdjMatrix` in util/layout have been moved to util.math;
  - The method `getEDistance` in util/layout was the same as the method `distance` in util/math. Please use `distance` in util/math;
  - Use the methods `mix`, `augment`, and `isString` in @antv/util instead of these in util/layout;
- `groupData` is changed into `group`；
- The methods `flatToTree` and `addNodesToParentNode` are removed from util/group;
- The dependency to @antv/util in base is removed.


## The Usage of Plugins
You don't need to import other packages when you are using the built-in plugins of G6. Only use them by `G6.PluginName` after import G6. e.g.

```javascript
// <= G6 3.2
// Import by CDN. you need import G6 and the plugins you need.
<script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/minimap.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/grid.js"></script>
// Or import by NPM.  you need import G6 and the plugins you need.
import G6, { Minimap, Grid } from '@antv/G6'

const minimap = new Minimap({
	//... configurations
})
const grid = new Grid({
	//... configurations
})


// G6 3.3
// Import by CDN. Yuo only need to import G6.
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.3.0/dist/g6.min.js"></script>
// Or import by NPM. Yuo only need to import G6.
import G6 from '@antv/G6'

const minimap = new G6.Minimap({
	//... configurations
})

const grid = new G6.Grid({
	//... configurations
})

const graph = new G6.Graph({
	//... other configurations
  plugins: [ minimap, grid ]
});
```


## Tree-Graph
In G6 3.3, The methods about layout in TreeGraph are unified as Graph:

1. `changeLayout` is changed into `updateLayout`;
1. `refreshLayout` is changed into `layout`.


## Group
G6 3.3 does not support `findByClassName` for Shape Group anymore,方法. Call the method below instead:
```javascript
// G6 3.2
const group = node.get('group')
const label = group.findByClassName('node-label')

// G6 3.3
const group = node.get('group')
const label = group.find(element => element.get('className') === `node-label`);
```

## Animation
In G6 3.2.x and its previous version, the usage of the shape animation is:
```javascript
G6.registerEdge('loop-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate({
      onFrame(ratio) {
        const startLen = ratio * length;
        // Calculating the lineDash for the line
        const cfg = {
          lineDash: [startLen, length - startLen]
        };
        return cfg;
      },
      repeat: true
    }, 2000);
  }
}, 'loop');
```

In G6 3.3:

- The method `onFrame` in `shape.animate` is removed;
- Call `animate` by two ways:
  - Way 1: `animate(toAttrs, animateCfg)`, where `toAttrs` is the target attributes of this animation, and `animateCfg` is the configuration of the animation. e.g.
```javascript
G6.registerEdge('widen-line', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate({
    		lineWidth: 10
      },
      {
        repeat: false,
        duration: 500
      });
  }
}, 'single-edge');
```


  - Way 2: `animate(onFrame, animateCfg)`, where `onFrame` is the callback function of each frame, and `animateCfg` is the configurations of the animation. e.g.
```javascript
G6.registerEdge('loop-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate(
      (ratio) => {
        const startLen = ratio * length;
        // Calculating the lineDash for the line
        const cfg = {
          lineDash: [startLen, length - startLen]
        };
        return cfg;
      },
      {
        repeat: true,
        duration: 2000
      });
  }
}, 'loop');
```


## The Matrix Trasform Function

- The functions for 3x3 matrix only of Shape Group or Shape (we call them Element below for convenience) are removed, including:
  - 🗑  traslating function `translate`
  - 🗑  moving function `move`
  - 🗑  scaling function `scale`
  - 🗑  rotating function `rotate`
  - 🗑  rotating function that rotate the group at the center (0, 0) `rotateAtStart`
- To achieve the transform effect, you need to set the value for the matrix manually in G6 3.3:
  - Set the matrix for the element `element.setMatrix(matrix)`
  - Another way to set the matrix for the element `element.attr('matrix', matrix)`
  - Reset the matrix for the element `element.resetMatrix`
- For convenience, we provide a tool function `transform` in util, you can call it as:
```javascript
import { transform } from '@antv/matrix-util';
// Transform the 3*3 matrix m
trasform(m, [
  ['t', x, y], // translate
  ['r', Math.PI], // rotate
  ['s', 2, 2], // scale
]);
```


## The Type of the Node/Edge
In G6 3.2.x and its previous versions, you can assign the type for edges and nodes in data, or assign them globally when instantiating the Graph, e.g.
```javascript
// Assign the type of edges/nodes in data
const data = {
  nodes: [{
    id: 'node0',
    shape: 'circle' // the type of this node is circle
  }, {
    id: 'node1',
    shape: 'rect' // the type of this node is rect
  }],
  edges: [{
  	id: 'edge0',
    source: 'node0',
    target: 'node1',
    shape: 'polyline' // the type of this edge is polyline
  }]
}
// or assign them globally when instantiating the Graph
const graph = new Graph({
  // ... other configurations for graph
  defaultNode: {
    shape: 'circle',
    // ... other configurations for default node
  }
});

```

In G6 3.3, please use **`type` instead of `shape`** (For now, the `shape` is comatible. But it will be discarded in the future).



## Cumstom Node/Edge

#### Extending the Built-in Node/Edge
In G6 3.3, if you want to register a type of node or edge without extending the built-in node/edge, do not assign the third parameter for function `registerNode` or `registerEdge`, and **must** do rewrite `draw`.
```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    // ...
    return keyShape;
  }
});
```

If you want to exending a built-in type of node/edge, the base class of the node is `'single-node'`, and the base class of the edge is `'single-edge'` in G6 3.3. Of course you can extend other classes besides the base class. In G6 3.2 and previous versions, the base classes for node and edge are the same: `'single-shape'`.


#### Adding a Shape
In G6 3.2 and previous versions, you can add a shape to a custom node or edge as following without assign `name` and `draggable`:
```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
    	attrs: {
        // ... The attributes of the graphic shape
      }
    });
    const circle = group.addShape('circle', {
    	attrs: {
        // ... The attributes of the graphic shape
      }
    });
    return keyShape;
  }
});
```

In G6 3.3, we highly recommend you to assign `name` and `draggable` when adding a shape. If not, the shapes will not response some interactive events. Adding these two property as below:
```javascript
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
    	attrs: {
        // ... The attributes of the graphic shape
      },
      draggable: true, // Allow this shape to be dragged
      name: 'key-shape' // Not unique, you can assign any string value to it
    });
    const circle = group.addShape('circle', {
    	attrs: {
        // ... The attributes of the graphic shape
      },
      draggable: true, // Allow this shape to be dragged
      name: 'circle-shape' // Not unique, you can assign any string value to it
    });
    return keyShape;
  }
});
```





#### marker
In G6 3.2 and previous versions, the radius of the marker was assigned by `r` or `radius`.

In G6 3.3, the radius of marker can be assigned by `r` only.

e.g.
```javascript
// <= G6 3.2.x
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const marker = group.addShape('marker', {
    	attrs: {
        // ... Other attributes
        radius: cfg.size[0]
      },
      draggable: true,
      name: 'marker-shape'
    });
    return keyShape;
  }
});


// <= G6 3.3
G6.registerEdge('customNode', {
  draw(cfg, group) {
    const marker = group.addShape('marker', {
    	attrs: {
        // ... Other attributes
        r: cfg.size[0]
      },
      draggable: true,
      name: 'marker-shape'
    });
    return keyShape;
  }
});
```


## pixelRatio
In G6 3.2 and previous versions, you need to assign the `pixelRatio` when instantiating the Graph.

In G6 3.3, `pixelRatio` will be calculated automatically.


## The Timing Event of click-select and brush-select
In G6 3.2 and previous versions, The timing `nodeselectchange` will be emitted when end-users make some change by `brush-select` and `click-select`. There were two properties in the callback function of `nodeselectchange` for `brush-select`:

- `targets`: The selected nodes and edges currently as `{nodes: [...], edges: [...]}`
- `select`: Whether the option is select or deselect currently. `true` | `false`

There were two another properties in the callback function of `nodeselectchange` for `click-select`:

- `target`: The manipulated node currently. It might be selected or deselected
- `select`: Whether the option is select or deselect currently. `true` | `false`

G6 3.3 unifies the `nodeselectchange` events in these two behaviors. The `targets` is replaced by `selectedItems`, which means the selected nodes and edges currently, to avoid the confusion of the meanings of `targets` and `target`. 

<br />Now, there two properties in the callback function of `nodeselectchange` for `brush-select`:

- `selectedItems`: The selected nodes and edges currently as `{nodes: [...], edges: [...]}`
- `select`:  Whether the option is select or deselect currently. `true` | `false`

There three properties in the callback function of `nodeselectchange` for `click-select`:

- `target`: The manipulated node currently. It might be selected or deselected
- `selectedItems`: The selected nodes and edges currently as `{nodes: [...], edges: [...]}`
- `select`: Whether the option is select or deselect currently. `true` | `false`

## SVG Renderer
In G6 3.2 and previous versions, you can assign the renderer with options options `'canvas'` and `'svg'` for graph when instantiating the Graph.

In G6 3.3, to make a better version with canvas, we do not support SVG
 renderer temporary. But we will support it in the future.