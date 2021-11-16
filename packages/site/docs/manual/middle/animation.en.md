---
title: Basic Animation
order: 5
---

There are two levels of animation in G6:

- GLobal animation: Transform the graph animatively when the changes are global;
- Item animation: The animation on a node or an edge.

<br />

## Global Animation

The global animation is controlled by Graph instance. It takes effect when some global changes happen, such as:

- `graph.updateLayout(cfg)` change the layout;
- `graph.changeData()` change the data.

Configure `animate: true` when instantiating a graph to achieve it. And the `animateCfg` is the configurations for the animate, see [animateCfg](#animateCfg) for more detail. <br />

```javascript
const graph = new G6.Graph({
  // ...                      // Other configurations
  animate: true, // Boolean, whether to activate the animation when global changes happen
  animateCfg: {
    duration: 500, // Number, the duration of one animation
    easing: 'linearEasing', // String, the easing function
  },
});
```

## Item Animation

All the built-in nodes and edges are static withou animation. To animate node or edge, please register your type of [Custom Node](/en/docs/manual/middle/elements/nodes/custom-node) or [Custom Edge](/en/docs/manual/middle/elements/edges/custom-edge), and override the `afterDraw` function.

### Node Animation

The animation frames are applied on one graphics shape of a node. We are going to introduce this part by three demos:

- The graphics animation (Left of the figure below);
- The background animation (Center of the figure below);
- Partial animation (Right of the figure below).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<br />

The code of the three demos can be found at: <a href='/en/examples/scatter/node' target='_blank'>Node Animation</a>.

#### The Graphics Animation

In this example, we are going to magnify and shrink the node. <br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aAjWQ4n_OOEAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

We first find the graphics shape to be animated by `group.get('children')[0]`. Here we find the 0th graphics shape of this type of node. Then, we call `animate` for the node to define the properties for each frame(The first parameter is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg)).

```javascript
// Magnify and shrink animation
G6.registerNode(
  'circle-animate',
  {
    afterDraw(cfg, group) {
      // Get the first graphics shape of this type of node
      const shape = group.get('children')[0];
      // The animation
      shape.animate(
        (ratio) => {
          // Returns the properties for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the properties for this frame.
          // Magnify first, and then shrink
          const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
          let radius = cfg.size;
          if (isNaN(radius)) radius = radius[0];
          // The properties for this frame. Only radius for this example
          return {
            r: radius / 2 + diff,
          };
        },
        {
          repeat: true, // Whehter play the animation repeatly
          duration: 3000, // The duration of one animation is 3000
          easing: 'easeCubic', // The easing fuction is 'easeCubic'
        },
      );
    },
  },
  'circle',
); // This custom node extend the built-in node 'circle'. Except for the overrode afterDraw, other functions will extend from 'circle' node
```

#### Background Animation

You can add extra shape with animation in `afterDraw`.<br />

In `afterDraw` of this demo, we draw three background circle shape with different filling colors. And the `animate` is called for magnifying and fading out the three circles. We do not use set the first parameter as a function here, but assign the target style for each animation to the input paramter: magify the radius to 10 and reduce the opacity to 0.1. The second parameter defines the configuration for the animation, see [animateCfg](#animateCfg).<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*FxDJQ5eY-5oAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode('background-animate', {
  afterDraw(cfg, group) {
    let r = cfg.size / 2;
      if (isNaN(r)) {
        r = cfg.size[0] / 2;
      };
    // The first background circle
    const back1 = group.addShape('circle',{
      zIndex: -3,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color,
        opacity: 0.6
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'circle-shape1'
    });
    // The second background circle
    const back2 = group.addShape('circle',{
      zIndex: -2,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'blue',
        opacity: 0.6
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'circle-shape2'
    });
    // The third background circle
    const back3 = group.addShape('circle',{
      zIndex: -1,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'green',
        opacity: 0.6
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'circle-shape3'
    });
    group.sort(); // Sort the graphic shapes of the nodes by zIndex

    // Magnify the first circle and fade it out
    back1.animate({
      r: r + 10,
      opacity: 0.1
    }, {
      repeat: true, // Play the animation repeatly
      duration: 3000,
      easing: 'easeCubic'
      delay: 0 // No delay
    })

    // Magnify the second circle and fade it out
    back2.animate({
      r: r + 10,
      opacity: 0.1
    }, {
      repeat: true // Play the animation repeatly
      duration: 3000,
      easing: 'easeCubic',
      delay: 1000 // Delay 1s
    })

    // Magnify the third circle and fade it out
    back3.animate({
      r: r + 10,
      opacity: 0.1
    }, {
      repeat: true // Play the animation repeatly
      duration: 3000,
      easing: 'easeCubic',
      delay: 2000 // Delay 2s
    })
  }
}, 'circle');
```

#### Partial Animation

In this demo, we add extra graphics shape(an image) in `afterDraw`, and set a rotation animation for it. Note that the rotation animation is a little complicated, which should be manipulated by matrix. The first parameter of `animate()` is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg)<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uFQsQqxIa_QAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerNode(
  'inner-animate',
  {
    afterDraw(cfg, group) {
      const size = cfg.size;
      const width = size[0] - 12;
      const height = size[1] - 12;
      // Add an image shape
      const image = group.addShape('image', {
        attrs: {
          x: -width / 2,
          y: -height / 2,
          width: width,
          height: height,
          img: cfg.img,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape',
      });
      // Add animation for the image
      image.animate(
        (ratio) => {
          // Returns the properties for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the properties for this frame.
          // Rotate by manipulating matrix
          // The current matrix
          const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          // The target matrix
          const toMatrix = Util.transform(matrix, [['r', ratio * Math.PI * 2]]);
          // The properties of this frame. Only target matrix for this demo
          return {
            matrix: toMatrix,
          };
        },
        {
          repeat: true, // Play the animation repeatly
          duration: 3000,
          easing: 'easeCubic',
        },
      );
    },
  },
  'rect',
);
```

### Edge Animation

We are going to introduce this part by three demos:

- A circle move along the edge (Left of the figure below);
- A running dashed line (Center of the figure below. The gif may look like a static edge due to the low fps problem. You can check out the demo by link);
- A growing line (Right of the figure below).

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

The code of the three demo can be found in: <a href='/en/examples/scatter/edge' target='_blank'>Edge Animation</a>.

#### A Moving Circle

In this demo, we add a circle shape with moving animation in `afterDraw`. In each frame, we return the relative position of the circle on the edge. The first parameter of `animate()` is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg)<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*OAGPRZbYpw4AAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge(
  'circle-running',
  {
    afterDraw(cfg, group) {
      // Get the first graphics shape of this type of edge, which is the edge's path
      const shape = group.get('children')[0];
      // The start point of the edge's path
      const startPoint = shape.getPoint(0);

      // Add a red circle shape
      const circle = group.addShape('circle', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          fill: 'red',
          r: 3,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape',
      });

      // Add the animation to the red circle
      circle.animate(
        (ratio) => {
          // Returns the properties for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the properties for this frame
          // Get the position on the edge according to the ratio
          const tmpPoint = shape.getPoint(ratio);
          // Return the properties of this frame, x and y for this demo
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          };
        },
        {
          repeat: true, // Play the animation repeatly
          duration: 3000, // The duration for one animation
        },
      );
    },
  },
  'cubic',
); // Extend the built-in edge cubic
```

#### Running Dashed Line

The running dashed line is achieved by modifying the `lineDash` in every frame. The first parameter of `animate()` is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg)<br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VUgETK6aMzcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
const lineDash = [4, 2, 1, 2];

G6.registerEdge(
  'line-dash',
  {
    afterDraw(cfg, group) {
      let index = 0;
      // Define the animation
      shape.animate(
        () => {
          index++;
          if (index > 9) {
            index = 0;
          }
          const res = {
            lineDash,
            lineDashOffset: -index,
          };
          // Returns the configurations to be modified in this frame. Here the return value contains lineDash and lineDashOffset
          return res;
        },
        {
          repeat: true, // whether executed repeatly
          duration: 3000, // animation's duration
        },
      );
    },
  },
  'cubic',
); // Extend the built-in edge cubic
```

#### A Growing Edge

A growing edge can also be implemented by calculating the `lineDash`. The first parameter of `animate()` is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg) <br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-l9lQ7Ck1QcAAAAAAAAAAABkARQnAQ' alt='download' width='150'/>

```javascript
G6.registerEdge(
  'line-growth',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = group.getTotalLength();
      shape.animate(
        (ratio) => {
          // Returns the properties for each frame. The input parameter ratio is a number that range from 0 to 1. The return value is an object that defines the properties for this frame
          const startLen = ratio * length;
          // Calculate the lineDash
          const cfg = {
            lineDash: [startLen, length - startLen],
          };
          return cfg;
        },
        {
          repeat: true, // Play the animation repeatly
          duration: 2000, // The duration for one animation
        },
      );
    },
  },
  'cubic',
); // Extend the built-in edge cubic
```

### Interaction Animation

G6 allows user to add animation for the interaction. As showin in the figure beow, when the mouse enters the node, the related edges will show the dashed line animation.<br />![交互动画.gif](https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-90pSrm4hkUAAAAAAAAAAABkARQnAQ)<br />The code for the demo can be found in: <a href='/en/examples/scatter/stateChange' target='_blank'>Animation of State Changing</a>.

This kind of animation is related to the [State](/en/docs/manual/middle/states/state) of edge. Override the function `setState` to response the state changing. When the mouse enters a node, some state of the related edges are activated. The `setState` of the edges activate the animation once it receive the state changing. The steps are:

- Override the `setState` in custom edge, and listen to the state changing in this function;
- Listen the `mouseenter` and `mouseleave` of the nodes to activate the state of the related edges.

The code below is a part of the code in <a href='/en/examples/scatter/stateChange' target='_blank'>Animation of State Changing</a>. Please note that we have omit some code to emphasize the code related to the animation.

The first parameter of `animate()` is a function which returns the properties of each frame; the second parameter defines the configuration for animation, see [animateCfg](#animateCfg)

```javascript
// const data = ...
// const graph = new G6.Graph({...});

const lineDash = [4, 2, 1, 2];

// Register a type of edge named 'can-running'
G6.registerEdge(
  'can-running',
  {
    // Override setState
    setState(name, value, item) {
      const shape = item.get('keyShape');
      // Response the running state
      if (name === 'running') {
        // When the running state is turned to be true
        if (value) {
          let index = 0;
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // Returns the configurations to be modified in this frame. Here the return value contains lineDash and lineDashOffset
              return res;
            },
            {
              repeat: true, // whether executed repeatly
              duration: 3000, // animation's duration
            },
          );
        } else {
          // When the running state is turned to be false
          // Stop the animation
          shape.stopAnimate();
          // Clear the lineDash
          shape.attr('lineDash', null);
        }
      }
    },
  },
  'cubic-horizontal',
); // Extend the built-in edge cubic-horizontal

// Listen the mouseenter event on node
graph.on('node:mouseenter', (ev) => {
  // Get the target node of the event
  const node = ev.item;
  // Get the related edges of the target node
  const edges = node.getEdges();
  // Turn the running state of all the related edges to be true. The setState function will be activated now
  edges.forEach((edge) => graph.setItemState(edge, 'running', true));
});

// Listen the mouseleave event on node
graph.on('node:mouseleave', (ev) => {
  // Get the target node of the event
  const node = ev.item;
  // Get the related edges of the target node
  const edges = node.getEdges();
  // Turn the running state of all the related edges to be false. The setState function will be activated now
  edges.forEach((edge) => graph.setItemState(edge, 'running', false));
});

// graph.data(data);
// graph.render();
```

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;<strong>⚠️Attention:</strong></span> When `running` is turned to be `false`, the animation should be stopped and the `lineDash` should be cleared.

## animateCfg

| Configuration | Type | Default Value | Description |
| --- | --- | --- | --- |
| duration | Number | 500 | The duration for animating once |
| easing | boolean | 'linearEasing' | The easing function for the animation, see [Easing Function](#easing-Function) for more detail |
| delay | Number | 0 | Execute the animation with delay |
| repeat | boolean | false | Whether execute the animation repeatly |
| callback | Function | undefined | Callback function after the animation finish |
| pauseCallback | Function | undefined | Callback function after the animation is paused by shape.pause() |
| resumeCallback | Function | undefined | Callback function after the animation is resume by shape.resume() |

### Easing Function

G6 supports all the easing functions in d3.js. Thus, the options of `easing` in `animateCfg`: <br />`'easeLinear'`, <br />`'easePolyIn'`, `'easePolyOut'`, `'easePolyInOut'` , <br />`'easeQuad'`, `'easeQuadIn'`, `'easeQuadOut'`, `'easeQuadInOut'` .

For more detail of the easing functions, please refer to: <a href='https://github.com/d3/d3/blob/master/API.md#easings-d3-ease' target='_blank'>d3 Easings</a>.
