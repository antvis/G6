---
title: Configure the Items
order: 2
---

The items on the graph include `Node` and `Edge`. In the last chapter, we rendered the **Tutorial Demo** with items with rough styles. Now, we are going to beautify the items while introducing the attributes of the items.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> Figure 1  The **Tutorial Demo** with cofigured items.


## Basic Concept
### Graph Item
The items on the graph include `Node` and `Edge`. There are several [Built-in Nodes](../middle/elements/defaultNode) and [Built-in Edges](../middle/elements/defaultEdge) in G6. The main difference between different types of items is their [Graphics Shape](../middle/keyConcept). For example, a node's graphics shape can be a circle, a rect, an image, or others.

## Attributes of Item
The attributes can be categorized into two kinds for nodes or edges:

- **Style Attribute `style`**: Corresponds to the style in Canvas. When the [State](../middle/states/state) of an item is changed, the style can be updated;
- **Other Attribute**: Such as graphics `shape`, `id`, they are a kind of attributes that will not be changed when the [State](../middle/states/state) of the item is changed.

For example, When you change the state `'hover'` or `'click'` to true for a node A, only the **style attributes** of A can be updated, e.g. `fill`, `stroke`, and so on. The **other attributes** such as `shape` can not be changed. To update the other attributes, configure A by [graph.updateItem](../../api/Graph) manually. **style attributes** is an object named `style`.

### Data Structure
The data structure of a node:
```javascript
{
	id: 'node0',          // Unique id of the node
  shape: 'circle',      // The graphics shape of the node
  size: 40,             // The size
  label: 'node0'        // The label
  labelCfg: {           // The configurations for the label
    positions: 'center',// The relative position of the label
    style: {            // The style attributes of the label
      fontSize: 12,     // The font size of the label
      // ...            // Other style attributes of the label
    }
  }
  // ...,               // Other attributes of the node
  style: {              // The object of style attributes of the node
    fill: '#000',       // The filling color
    stroke: '#888',     // The stroke color
    // ...              // Other styleattribtues of the node
  }
}
```

The data structure of an edge is similar to node, but two more attributes `source` and `target` in addition, representing the `id` of the source node and the `id` of the target node respectively.

<br />Refine the visual requirments in figure 1 of **Tutorial Demo**:

- Visual Effect:
  - R1: Set the color for stroke and fill for nodes with `fill` and `stroke`;
  - R2: Set the color for the label with `labelCfg`;
  - R3: Set the opacity and color for edges with `opacity`，`stroke`;
  - R4: Set the direction of the label with `labelCfg`;
- Map the data to visual channel:
  - R5: Configure the shape of nodes with `shape` according to `class` in node data;
  - R6: Configure the line widht of edges with `lineWidth` according to the `weight` in edge data.

## Configure the Attributes
在 G6 中，根据不同的场景需求，有 7 种配置元素属性的方式。这里，我们简单介绍其中的两种: 

1. 实例化图时配置元素的全局属性;
1. 在数据中配置。

### 1. 实例化图时全局配置
**适用场景: **所有节点统一的属性配置，所有边统一的属性配置。<br />**使用方式: **使用图的两个配置项: 

- `defaultNode`: 节点在默认状态下的**样式属性**（`style`）和**其他属性**;
- `defaultEdge`: 边在默认状态下的**样式属性**（`style`）和**其他属性**。

 注意 : 由于是统一的配置，不能根据数据中的属性（如 `class`、`weight`）等值的不同进行个性化设置，因此只能满足 R1、R2、R3、R4 需求。达到如下效果: 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bufdS75wcmMAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> 图 2  全局配置元素属性后的 **Tutorial案例**。


<br />通过如下方式在实例化图时 `defaultNode` 和 `defaultEdge` ，可以完成上图效果: 
```javascript
const graph = new G6.Graph({
  // ...                   // 图的其他配置
  // 节点在默认状态下的样式配置（style）和其他配置
  defaultNode:{
    size: 30,              // 节点大小
    // ...                 // 节点的其他配置
    // 节点样式配置
    style: {               
      fill: 'steelblue',   // 节点填充色
      stroke: '#666',      // 节点描边色
      lineWidth: 1         // 节点描边粗细
    },
    // 节点上的标签文本配置
    labelCfg: {       
      // 节点上的标签文本样式配置
      style: {             
        fill: '#fff'       // 节点标签文字颜色
      }
    }
  },
  // 边在默认状态下的样式配置（style）和其他配置
  defaultEdge: {
    // ...                 // 边的其他配置
    // 边样式配置
    style: {               
      opacity: 0.6,        // 边透明度
      stroke: 'grey'       // 边描边颜色
    },
    // 边上的标签文本配置
    labelCfg: {            
      autoRotate: true     // 边上的标签文本根据边的方向旋转
    }
  },
});
```

### 2. 在数据中配置
**适用场景: **不同节点/边可以有不同的个性化配置。<br />因此，这种配置方式可以满足 R5、R6 需求。<br />**使用方式: **可以直接将配置写入数据文件;也可以在读入数据后，通过遍历的方式写入配置。这里展示读入数据后，通过遍历的方式写入配置。下面代码展示了如何遍历数据进行属性的配置: 
```javascript
const nodes = remoteData.nodes;
nodes.forEach(node => {
  if (!node.style) {
    node.style = {};
  }
  switch (node.class) {         // 根据节点数据中的 class 属性配置图形
    case 'c0': {
      node.shape = 'circle';    // class = 'c0' 时节点图形为 circle
      break;
    }
    case 'c1': {
      node.shape = 'rect';       // class = 'c1' 时节点图形为 rect
      node.size = [ 35, 20 ];    // class = 'c1' 时节点大小
      break;
    }
    case 'c2': {
      node.shape = 'ellipse';    // class = 'c1' 时节点图形为 ellipse
      node.size = [ 35, 20 ];    // class = 'c2' 时节点大小
      break;
    }
  }
});

graph.data(remoteData);
```

运行结果如下: 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JU6xRZLKCjcAAAAAAAAAAABkARQnAQ' width=450 height=450 />

> 图 3


可以看到，图中有一些节点被渲染成了矩形，还有一些被渲染成了椭圆形。除了设置 shape 属性之外，我们还覆盖了上文全局配置的节点的 size 属性，在矩形和椭圆的情况下，size 是一个数组;而在默认圆形的情况下，G6 仍然会去读全局配置的 size 属性为数字 30。也就是说，动态配置属性让我们既可以根据数据的不同配置不同的属性值，也可以有能力覆盖全局静态的属性值。

进一步地，我们尝试根据数据的比重不同，配置不一样边的粗细: 
```javascript
// const nodes = ...

// 遍历边数据
const edges = remoteData.edges;
edges.forEach(edge => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight;  // 边的粗细映射边数据中的 weight 属性数值
});

graph.data(remoteData);
```

结果如下: 

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*46GdQaNFiVIAAAAAAAAAAABkARQnAQ' width=450 height=450 />

如图所示，边的粗细已经按照数据的比重成功渲染了出来，但是边原有的样式（透明度、颜色）却丢失了。这是因为我们提到过动态配置属性会覆盖全局配置属性，这里配置了 `style.lineWidth`，导致覆盖了全局的 `style` 对象。解决办法是将被覆盖的边的样式都移到动态配置里面来: 
```javascript
const graph = new G6.Graph({
  // ...
  defaultEdge: {
    // 去掉全局配置的 style
    labelCfg: {        // 边上的标签文本配置
      autoRotate: true // 边上的标签文本根据边的方向旋转
    }
  }
});

// 遍历点数据
// const nodes = ...
// nodes.forEach ...

// 遍历边数据
const edges = remoteData.edges;
edges.forEach(edge => {
  if (!edge.style) {
    edge.style = {};
  }
  edge.style.lineWidth = edge.weight;  // 边的粗细映射边数据中的 weight 属性数值
  // 移到此处
  opt.style.opacity = 0.6;
  opt.style.stroke = 'grey';
});

graph.data(remoteData);
graph.render()
```

## 完整代码
至此，完整代码如下: 
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tutorial Demo</title>
</head>
<body>
  <div id="mountNode"></div>
  <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.1.0/build/g6.js"></script>
  <script>
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 800,
      height: 600,
      fitView: true,
      fitViewPadding: [ 20, 40, 50, 20 ],
      defaultNode: {
        size: 30,
        labelCfg: {
          style: {
            fill: '#fff'
          }
        }
      },
      defaultEdge: {
        labelCfg: {
          autoRotate: true
        }
      },
    });
		const main = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
      );
      const remoteData = await response.json();
      const nodes = remoteData.nodes;
      const edges = remoteData.edges;
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {};
        }
        node.style.lineWidth = 1;
        node.style.stroke = '#666';
        node.style.fill = 'steelblue';
        switch (node.class) {
          case 'c0': {
            node.shape = 'circle';
            break;
          }
          case 'c1': {
            node.shape = 'rect';
            node.size = [ 35, 20 ];
            break;
          }
          case 'c2': {
            node.shape = 'ellipse';
            node.size = [ 35, 20 ];
            break;
          }
        }
      });
      edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight;
        edge.style.opacity = 0.6;
        edge.style.stroke = 'grey';
      });

      graph.data(remoteData);
      graph.render();
    };
    main();
  </script>
</body>
</html>
```

**⚠️注意** <br />若需更换数据，请替换 `'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'` 为新的数据文件地址。
