---
title: Layout Transformation Mechanism
order: 2
---

G6 provides two layout transformations:

- `updateLayout(params)`: Layout methods and configurations transformation;
- `changeData()`: Data transformation.

### Layout Methods and Configuration Transformation

**Interface Definition:**

```javascript
/**
 * Change the layout or its configurations
 * @param {String | object} cfg New layout configurations
 * If the cfg is a String or an object with the property type, and the type is different from the current layout method, the layout method will be changed into the new one;
 * Only change the configurations for the current layout otherwise
 */
updateLayout(cfg);
```

**Change the Layout Method:** <br />If the `cfg` is a `String` or an object with property `type`, and the type is different from the current layout method, the layout method will be changed into the new one;

**Change the Configurations Only:** <br />If the `cfg` is an object without property `type`, or the `type` is the same as the current layout method, only the configurations for the current layout will be changed.

### Data Transformation

**Interface Definition:**

```javascript
/**
 * Change the source data, render the graph with new data
 * @param {object} data source data
 * @return {object} this
 */
changeData(data);
```

### Transformation Example

#### Expected Effect

In the first stage, the graph is arranged by random layout. Transform to force layout with node overlappings after 2000ms, force layout without node overlappings after 4000ms, change data to `data2` after 6000ms.<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6k-iQ405hEEAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

#### Complete Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Layout Demo</title>
  </head>
  <body>
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
    <script>
      const data = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' },
          { source: '1', target: '2' },
          { source: '1', target: '3' },
        ],
      };

      const data2 = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
        ],
      };

      const graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement, Required, the id of the container or the container object
        width: 300, // Number, Required, The width of the graph
        height: 300, // Number, Required, The height of the graph
        animate: true, // Boolean, whether to activate the animation while changing the layout
      });

      // Load data and render
      graph.data(data);
      graph.render();

      // Transform to force layout with node overlappings in 2000 ms
      setTimeout(() => {
        graph.updateLayout('force');
      }, 8000);

      // Transform to force layout without node overlappings in 4000 ms
      setTimeout(() => {
        graph.updateLayout({
          type: 'force', // Layout name
          preventOverlap: true, // Whether to prevent the node overlappings
          nodeSize: 40, // The node size for collide detection
          linkDistance: 100, // The edge length
        });
      }, 10000);

      // Change the data to data2 in 6000 ms
      setTimeout(() => {
        graph.changeData(data2);
      }, 12000);
    </script>
  </body>
</html>
```
