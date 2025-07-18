---
title: D3 Force-Directed Layout
order: 8
---

## Overview

The D3Force layout is a force-directed layout based on [d3-force](https://d3js.org/d3-force). It simulates physical forces (such as attraction, repulsion, collision, etc.) to make the graph reach a stable state with minimal energy.

The main features of this layout are:

1. **Automatic arrangement**: No need to manually set node positions, the system will automatically find suitable positions
2. **Real-time adjustment**: When you drag a node, other nodes will adjust their positions in real time
3. **Flexible configuration**:
   - You can adjust the attraction and repulsion between nodes
   - You can set the ideal length of edges
   - You can fix the positions of important nodes
4. **Animation effect**: Nodes move with smooth animation, making changes more natural

<img alt="D3Force layout diagram" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-_sFS5IRGGcAAAAAAAAAAAAADmJ7AQ/original" />

## Core Concepts

### Force System

The D3Force layout simulates five different forces to achieve automatic layout. Imagine a physical world where these forces act simultaneously and eventually reach equilibrium:

<img width="350" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*p5L2S6gtZ2AAAAAAAAAAAAAAemJ7AQ/original" alt="force" />

> Note: The arrows of different colors in the diagram represent different types of forces. In the actual layout, these forces are invisible and also affected by other forces.

- **Link Force**: Imagine nodes connected by rubber bands, which pull connected nodes to a suitable distance. The tightness of the rubber band is the force strength, and the ideal length is the distance we set.
- **Many-Body Force**: Similar to magnets, it allows all nodes to attract or repel each other. When the force strength is negative, nodes repel each other (like like poles of magnets); when positive, they attract (like opposite poles). This force determines the density of the graph.
- **Center Force**: Like all nodes are tied to the center of the canvas by an invisible string. This force prevents nodes from drifting too far and keeps the graph centered.
- **Collision Force**: Treats nodes as solid balls. When nodes get too close, they automatically bounce apart. This force mainly prevents node overlap and improves readability.
- **Radial Force**: Imagine an invisible ring that attracts nodes to the ring. By setting the radius and force strength, nodes can form a beautiful circular layout.

### Iteration System

Layout calculation is an iterative process with two key concepts:

#### Alpha Value (Energy)

Like the "energy" of the layout, it determines how vigorously nodes move:

- **Initial state**: Alpha = 1, nodes move vigorously
- **During calculation**: Alpha gradually decreases, node movement slows
- **End state**: When Alpha < alphaMin, nodes stop moving

#### Iterations

Controls the number of times forces are applied in each calculation:

- **Effect**: The larger the value, the more precise the layout, but the slower the computation
- **Adjustment**:
  - Simple graphs: use the default value
  - Complex graphs: increase the number of iterations as needed
  - Real-time interaction: use fewer iterations

> Tip: Iterations and alpha value work together. Increasing iterations makes each step more precise, while alpha controls the overall progress.

## Options

| Property        | Description                                        | Type                                       | Default    | Required |
| --------------- | -------------------------------------------------- | ------------------------------------------ | ---------- | -------- |
| type            | Layout type                                        | string                                     | 'd3-force' | ✓        |
| nodeSize        | Node size (diameter), for collision detection      | number \| ((node, index, nodes) => number) | -          |          |
| iterations      | Number of force iterations, higher is more precise | number                                     | -          |          |
| onTick          | Callback for each iteration, for real-time results | (data: LayoutMapping) => void              | -          |          |
| forceSimulation | Custom force simulation, defaults to d3.js method  | Simulation<NodeDatum, EdgeDatum>           | -          |          |
| randomSource    | Function to generate random numbers                | () => number                               | -          |          |

### Iteration Control

| Property      | Description                                          | Type   | Default | Required |
| ------------- | ---------------------------------------------------- | ------ | ------- | -------- |
| alpha         | Current convergence threshold, controls activity     | number | 1       |          |
| alphaMin      | Minimum threshold to stop, when alpha < this, stop   | number | 0.001   |          |
| alphaDecay    | Decay rate of alpha, [0, 1], 0.028 ≈ 300 iterations  | number | 0.028   |          |
| alphaTarget   | Target alpha, system tries to converge to this value | number | 0       |          |
| velocityDecay | Velocity decay factor, higher means slower movement  | number | 0.4     |          |

### Force Model Options

#### Link Force (link)

| Property        | Description                                  | Type                                       | Default     | Required |
| --------------- | -------------------------------------------- | ------------------------------------------ | ----------- | -------- |
| link.id         | Function to generate edge id                 | (edge, index, edges) => string             | (e) => e.id |          |
| link.distance   | Ideal edge length                            | number \| ((edge, index, edges) => number) | 30          |          |
| link.strength   | Force strength, higher means closer to ideal | number \| ((edge, index, edges) => number) | 1           |          |
| link.iterations | Number of link force iterations              | number                                     | 1           |          |

#### Many-Body Force (manyBody)

| Property             | Description                                                     | Type                                       | Default  | Required |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------ | -------- | -------- |
| manyBody.strength    | Force strength, negative for repulsion, positive for attraction | number \| ((node, index, nodes) => number) | -30      |          |
| manyBody.theta       | Barnes-Hut accuracy, smaller is more accurate                   | number                                     | 0.9      |          |
| manyBody.distanceMin | Minimum distance, prevents excessive force                      | number                                     | 1        |          |
| manyBody.distanceMax | Maximum distance, beyond which no force is applied              | number                                     | Infinity |          |

#### Center Force (center)

| Property        | Description                                   | Type   | Default | Required |
| --------------- | --------------------------------------------- | ------ | ------- | -------- |
| center.x        | Center x coordinate                           | number | 0       |          |
| center.y        | Center y coordinate                           | number | 0       |          |
| center.strength | Force strength, higher means closer to center | number | 1       |          |

#### Collision Force (collide)

| Property           | Description                                     | Type                                       | Default | Required |
| ------------------ | ----------------------------------------------- | ------------------------------------------ | ------- | -------- |
| collide.radius     | Collision radius, nodes repel if closer         | number \| ((node, index, nodes) => number) | 10      |          |
| collide.strength   | Force strength, higher means stronger repulsion | number                                     | 1       |          |
| collide.iterations | Number of collision iterations                  | number                                     | 1       |          |

#### Radial Force (radial)

| Property        | Description                                   | Type                                       | Default | Required |
| --------------- | --------------------------------------------- | ------------------------------------------ | ------- | -------- |
| radial.strength | Force strength, higher means closer to radius | number \| ((node, index, nodes) => number) | 0.1     |          |
| radial.radius   | Target radius, nodes are attracted to circle  | number \| ((node, index, nodes) => number) | 100     |          |
| radial.x        | Center x coordinate                           | number                                     | 0       |          |
| radial.y        | Center y coordinate                           | number                                     | 0       |          |

#### X Axis Force (x)

| Property   | Description                               | Type                                       | Default | Required |
| ---------- | ----------------------------------------- | ------------------------------------------ | ------- | -------- |
| x.strength | Force strength in x direction             | number \| ((node, index, nodes) => number) | -       |          |
| x.x        | Target x coordinate, nodes attracted here | number \| ((node, index, nodes) => number) | -       |          |

#### Y Axis Force (y)

| Property   | Description                               | Type                                       | Default | Required |
| ---------- | ----------------------------------------- | ------------------------------------------ | ------- | -------- |
| y.strength | Force strength in y direction             | number \| ((node, index, nodes) => number) | -       |          |
| y.y        | Target y coordinate, nodes attracted here | number \| ((node, index, nodes) => number) | -       |          |

## Code Examples

### Prevent Node Overlap

```js
{
  layout: {
    type: 'd3-force',
    collide: {
      // Prevent nodes from overlapping by specifying a collision radius for each node.
      radius: (d) => d.size / 2,
    },
  },
}
```

See [Example - Prevent Node Overlap in Force-Directed Layout](/en/examples/layout/force-directed/#prevent-overlap)

### Team Clustering Layout

This example shows how to use force-directed layout for team clustering, where nodes of different teams automatically cluster together.

```js | ob { pin: false, inject: true }
import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  width: 500,
  height: 250,
  autoFit: 'view',
  data: {
    nodes: [
      // Team A
      { id: 'A1', team: 'A', label: 'A1', size: 30 },
      { id: 'A2', team: 'A', label: 'A2', size: 20 },
      { id: 'A3', team: 'A', label: 'A3', size: 20 },
      { id: 'A4', team: 'A', label: 'A4', size: 20 },
      // Team B
      { id: 'B1', team: 'B', label: 'B1', size: 30 },
      { id: 'B2', team: 'B', label: 'B2', size: 20 },
      { id: 'B3', team: 'B', label: 'B3', size: 20 },
      { id: 'B4', team: 'B', label: 'B4', size: 20 },
      // Team C
      { id: 'C1', team: 'C', label: 'C1', size: 30 },
      { id: 'C2', team: 'C', label: 'C2', size: 20 },
      { id: 'C3', team: 'C', label: 'C3', size: 20 },
      { id: 'C4', team: 'C', label: 'C4', size: 20 },
    ],
    edges: [
      // Team A internal connections
      { source: 'A1', target: 'A2' },
      { source: 'A1', target: 'A3' },
      { source: 'A1', target: 'A4' },
      // Team B internal connections
      { source: 'B1', target: 'B2' },
      { source: 'B1', target: 'B3' },
      { source: 'B1', target: 'B4' },
      // Team C internal connections
      { source: 'C1', target: 'C2' },
      { source: 'C1', target: 'C3' },
      { source: 'C1', target: 'C4' },
      // Few connections between teams
      { source: 'A1', target: 'B1' },
      { source: 'B1', target: 'C1' },
    ],
  },
  node: {
    style: {
      size: (d) => d.size,
      fill: (d) => {
        // Different colors for different teams
        const colors = {
          A: '#FF6B6B',
          B: '#4ECDC4',
          C: '#45B7D1',
        };
        return colors[d.team];
      },
      labelText: (d) => d.label,
      labelPlacement: 'center',
      labelFill: '#fff',
    },
  },
  edge: {
    style: {
      stroke: '#aaa',
    },
  },
  layout: {
    type: 'd3-force',
    // Configure link force - nodes within the same team are closer
    link: {
      distance: (d) => {
        // Shorter distance within the same team
        if (d.source.team === d.target.team) return 50;
        // Longer distance between teams
        return 200;
      },
      strength: (d) => {
        // Stronger connection within the same team
        if (d.source.team === d.target.team) return 0.7;
        // Weaker connection between teams
        return 0.1;
      },
    },
    // Configure many-body force - control repulsion between nodes
    manyBody: {
      strength: (d) => {
        // Team leader nodes (ending with 1) have stronger repulsion
        if (d.label.endsWith('1')) return -100;
        return -30;
      },
    },
    // Configure collision force - prevent node overlap
    collide: {
      radius: 35,
      strength: 0.8,
    },
    // Configure center force - keep the graph centered
    center: {
      strength: 0.05,
    },
  },
  behaviors: ['drag-element-force'],
});

graph.render();
```

<details><summary>Show full code</summary>

```javascript
import { Graph } from '@antv/g6';

// Create mock data with nodes from different teams
const data = {
  nodes: [
    // Team A
    { id: 'A1', team: 'A', label: 'A1', size: 30 },
    { id: 'A2', team: 'A', label: 'A2', size: 20 },
    { id: 'A3', team: 'A', label: 'A3', size: 20 },
    { id: 'A4', team: 'A', label: 'A4', size: 20 },
    // Team B
    { id: 'B1', team: 'B', label: 'B1', size: 30 },
    { id: 'B2', team: 'B', label: 'B2', size: 20 },
    { id: 'B3', team: 'B', label: 'B3', size: 20 },
    { id: 'B4', team: 'B', label: 'B4', size: 20 },
    // Team C
    { id: 'C1', team: 'C', label: 'C1', size: 30 },
    { id: 'C2', team: 'C', label: 'C2', size: 20 },
    { id: 'C3', team: 'C', label: 'C3', size: 20 },
    { id: 'C4', team: 'C', label: 'C4', size: 20 },
  ],
  edges: [
    // Team A internal connections
    { source: 'A1', target: 'A2' },
    { source: 'A1', target: 'A3' },
    { source: 'A1', target: 'A4' },
    // Team B internal connections
    { source: 'B1', target: 'B2' },
    { source: 'B1', target: 'B3' },
    { source: 'B1', target: 'B4' },
    // Team C internal connections
    { source: 'C1', target: 'C2' },
    { source: 'C1', target: 'C3' },
    { source: 'C1', target: 'C4' },
    // Few connections between teams
    { source: 'A1', target: 'B1' },
    { source: 'B1', target: 'C1' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      size: (d) => d.size,
      fill: (d) => {
        // Different colors for different teams
        const colors = {
          A: '#FF6B6B',
          B: '#4ECDC4',
          C: '#45B7D1',
        };
        return colors[d.team];
      },
      labelText: (d) => d.label,
      labelPlacement: 'center',
      labelFill: '#fff',
    },
  },
  edge: {
    style: {
      stroke: '#aaa',
    },
  },
  layout: {
    type: 'd3-force',
    // Configure link force - nodes within the same team are closer
    link: {
      distance: (d) => {
        // Shorter distance within the same team
        if (d.source.team === d.target.team) return 50;
        // Longer distance between teams
        return 200;
      },
      strength: (d) => {
        // Stronger connection within the same team
        if (d.source.team === d.target.team) return 0.7;
        // Weaker connection between teams
        return 0.1;
      },
    },
    // Configure many-body force - control repulsion between nodes
    manyBody: {
      strength: (d) => {
        // Team leader nodes (ending with 1) have stronger repulsion
        if (d.label.endsWith('1')) return -100;
        return -30;
      },
    },
    // Configure collision force - prevent node overlap
    collide: {
      radius: 35,
      strength: 0.8,
    },
    // Configure center force - keep the graph centered
    center: {
      strength: 0.05,
    },
  },
  behaviors: ['drag-element-force'],
});

graph.render();
```

</details>

Main configuration notes:

- `link.distance`: Shorter within teams, longer between teams
- `link.strength`: Stronger within teams, weaker between teams
- `manyBody.strength`: Controls repulsion between nodes
- `collide`: Prevents node overlap
- `center`: Keeps the layout centered

See also [Customize parameters for different nodes](/en/examples/layout/force-directed/#functional-params).
