---
title: Quick Start
order: 1
---

## Online Demo

<iframe src="https://codesandbox.io/embed/g6-v5-beta-quick-start-m3yncv?fontsize=14&hidenavigation=1&theme=light"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="g6-v5-beta-quick-start"
   allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
 ></iframe>

## G6 in vanilla HTML

Using G6 in vanilla HTML only requires importing the G6 JS file, as shown below:

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. Create container -->
    <div id="container"></div>

    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/5.0.0-beta.28/dist/g6.min.js"></script>

    <script>
      // 2. prepare data
      const data = {
        nodes: [
          {
            /** Unique identifier of the node, required, can be a string or number */
            id: 'node1',
            /** Custom data of the node, optional */
            data: { name: 'Circle1' },
          },
          { id: 'node2', data: { name: 'Circle2' } },
        ],
        edges: [
          {
            /** Unique identifier of the edge, optional, can be a string or number */
            id: 'edge1',
            /** Source node id of the edge, required */
            source: 'node1',
            /** Target node id of the edge, required */
            target: 'node2',
            /** Custom data of the edge, optional */
            data: {},
          },
        ],
      };

      // 3. Create G6 instance
      const graph = new Graph({
        /** Canvas container, required, can be the container id or HTML node object */
        container: 'container',
        /** Canvas width, optional, adapt to the container width by default */
        width: 800,
        /** Canvas height, optional, adapt to the container height by default */
        height: 500,
        /** Data, optional, you can also configure it later through graph.read(data) */
        data: data,
        /** Enabled interactions, optional */
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
        },
      });
    </script>
  </body>
</html>
```

**Preview**

<img src='https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DQl8SJmb_6gAAAAAAAAAAAAADmJ7AQ/original' width=400 alt='img' />

## Installing from npm

### Install

```bash
# Using npm
npm install --save @antv/g6@5.0.0

# Using yarn
yarn add @antv/g6@5.0.0

# Using pnpm
pnpm add @antv/g6@5.0.0
```

### Import

```js
import { Graph } from '@antv/g6';
```

## G6 in React

You can use G6 in React by creating a DOM container in the React component and then instantiating G6 in `useEffect`. [Online Demo](https://codesandbox.io/s/g6-5-0-demo-hqjs9w)

```js
import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/g6';

export default () => {
  const ref = useRef();

  const data = {
    nodes: [
      { id: 'node1', data: { name: 'Circle1' } },
      { id: 'node2', data: { name: 'Circle2' } },
    ],
    edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
  };

  useEffect(() => {
    if (!ref.current) return;

    const graph = new Graph({
      container: ref.current,
      width: 800,
      height: 500,
      data,
      modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
      },
    });
  }, []);

  return <div ref={ref}></div>;
};
```

## G6 in Vue

> Under construction, PRs are welcome

## Further Reading

This chapter introduces how to install and the simplest scene. In other chapters of [G6 Tutorial](https://g6.antv.vision/en/docs/tutorial/preface), you will learn:

- Instance configuration
- How to set element attributes and styles
- Set layout
- Add interaction
- Configure animation
- Use plugins
