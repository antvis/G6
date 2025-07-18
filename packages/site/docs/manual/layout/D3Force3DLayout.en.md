---
title: 3D Force-Directed Layout
order: 7
---

## Overview

The D3Force3D layout is a 3D extension based on [d3-force](https://d3js.org/d3-force), which simulates physical forces in three-dimensional space to achieve automatic layout. Compared to 2D layouts, it adds force effects in the Z-axis direction, allowing richer data relationships to be displayed in 3D space.

<img width="300" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4mbSTJLOXkgAAAAAAAAAAAAADmJ7AQ/original" alt="3D Force-Directed Layout Illustration" />

## Core Concepts

### Force System

D3Force3D extends the traditional 2D force-directed layout with the following forces:

- **3D Centering Force**: Pulls nodes toward the center point in 3D space
- **3D Collision Force**: Prevents node overlap in 3D space
- **3D Radial Force**: Attracts nodes to a sphere in 3D space
- **3D Axis Forces**: Applies forces along the X, Y, and Z axes

### Iteration System

The layout is computed through iterations, mainly involving the following parameters:

- **alpha**: The current energy value of the iteration, controlling node movement speed
- **alphaDecay**: The decay rate of the energy value
- **alphaMin**: The minimum energy value; iteration stops below this value
- **velocityDecay**: The velocity decay factor

## Options

| Property        | Description                                                      | Type                                                                       | Default       | Required |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- | -------- |
| type            | Layout type                                                      | string                                                                     | `d3-force-3d` | ✓        |
| nodeSize        | Node size (diameter), used for collision detection               | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -             |          |
| iterations      | Number of force iterations; higher means more precise but slower | number                                                                     | -             |          |
| numDimensions   | Number of dimensions (2 or 3)                                    | number                                                                     | 3             |          |
| forceSimulation | Custom force simulation method                                   | Simulation<NodeDatum, EdgeDatum>                                           | -             |          |
| onTick          | Callback for each iteration                                      | (data: LayoutMapping) => void                                              | -             |          |
| randomSource    | Random number generator                                          | () => number                                                               | -             |          |

### Iteration Control

| Property      | Description                   | Type   | Default | Required |
| ------------- | ----------------------------- | ------ | ------- | -------- |
| alpha         | Current convergence threshold | number | 1       |          |
| alphaDecay    | Convergence decay rate (0-1)  | number | 0.028   |          |
| alphaMin      | Stop iteration threshold      | number | 0.001   |          |
| alphaTarget   | Target convergence threshold  | number | 0       |          |
| velocityDecay | Velocity decay factor         | number | 0.4     |          |

### Force Model Options

#### Centering Force (center)

| Property        | Description         | Type   | Default | Required |
| --------------- | ------------------- | ------ | ------- | -------- |
| center.x        | Center x coordinate | number | 0       |          |
| center.y        | Center y coordinate | number | 0       |          |
| center.z        | Center z coordinate | number | 0       |          |
| center.strength | Force strength      | number | 1       |          |

#### Collision Force (collide)

| Property           | Description          | Type                                                                       | Default | Required |
| ------------------ | -------------------- | -------------------------------------------------------------------------- | ------- | -------- |
| collide.radius     | Collision radius     | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 10      |          |
| collide.strength   | Force strength       | number                                                                     | 1       |          |
| collide.iterations | Collision iterations | number                                                                     | 1       |          |

#### Link Force (link)

| Property        | Description           | Type                                                                       | Default | Required |
| --------------- | --------------------- | -------------------------------------------------------------------------- | ------- | -------- |
| link.id         | Edge id generator     | (edge: EdgeDatum, index: number, edges: EdgeDatum[]) => string             | edge.id |          |
| link.distance   | Ideal edge length     | number \| ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number) | 30      |          |
| link.strength   | Force strength        | number \| ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number) | 1       |          |
| link.iterations | Link force iterations | number                                                                     | 1       |          |

#### Many-Body Force (manyBody)

| Property             | Description                  | Type                                                                       | Default  | Required |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------- | -------- | -------- |
| manyBody.strength    | Force strength               | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -30      |          |
| manyBody.theta       | Barnes-Hut accuracy          | number                                                                     | 0.9      |          |
| manyBody.distanceMin | Minimum interaction distance | number                                                                     | 1        |          |
| manyBody.distanceMax | Maximum interaction distance | number                                                                     | Infinity |          |

#### Radial Force (radial)

| Property        | Description     | Type                                                                       | Default | Required |
| --------------- | --------------- | -------------------------------------------------------------------------- | ------- | -------- |
| radial.strength | Force strength  | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 0.1     |          |
| radial.radius   | Target radius   | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | 100     |          |
| radial.x        | Sphere center x | number                                                                     | 0       |          |
| radial.y        | Sphere center y | number                                                                     | 0       |          |
| radial.z        | Sphere center z | number                                                                     | 0       |          |

#### Axis Forces (x, y, z)

Each axis can be configured separately:

| Property   | Description           | Type                                                                       | Default | Required |
| ---------- | --------------------- | -------------------------------------------------------------------------- | ------- | -------- |
| x.strength | X-axis force strength | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
| x.x        | Target x coordinate   | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
| y.strength | Y-axis force strength | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
| y.y        | Target y coordinate   | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
| z.strength | Z-axis force strength | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
| z.z        | Target z coordinate   | number \| ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number) | -       |          |
