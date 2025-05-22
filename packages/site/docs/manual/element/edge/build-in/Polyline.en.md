---
title: Polyline
---

## Overview

A polyline is an edge composed of multiple straight line segments, suitable for connecting nodes by bypassing obstacles in complex layouts.

Use cases:

- Suitable for graphs with complex layouts, such as circuit diagrams and pipeline diagrams.

- Use when you need to bypass other nodes or obstacles.

## Online Experience

<embed src="@/common/api/elements/edges/polyline.md"></embed>

## Style Configuration

> If the element has specific attributes, we will list them below. For all general style attributes, see [BaseEdge](/en/manual/element/edge/build-in/base-edge)

| Attribute     | Description                                                                | Type                                                                                    | Default | Required |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- | -------- |
| controlPoints | Array of control points used to define the turning points of the polyline. | [Point](#point)[]                                                                       | []      |          |
| radius        | Corner radius of the turning points.                                       | number                                                                                  | 0       |          |
| router        | Whether to enable routing.                                                 | false &#124; [OrthRouter](#orthrouter) &#124; [ShortestPathRouter](#shortestpathrouter) | false   |          |

### OrthRouter

| Attribute | Description                                                                                              | Type                | Default |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| type      | Orthogonal routing, adding extra control points on the path to keep each segment horizontal or vertical. | `'orth'`            | -       |
| padding   | Minimum distance between the node connection point and the corner.                                       | [Padding](#padding) | `0`     |

### ShortestPathRouter

| Attribute                 | Description                                                                                                                                                                                                                                                                          | Type                                                                   | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------- |
| type                      | Shortest path routing, an intelligent version of orthogonal routing `'orth'`. This routing consists of horizontal or vertical orthogonal segments. It uses the A\* algorithm to calculate the shortest path and supports automatic avoidance of other nodes (obstacles) on the path. | `'shortest-path'`                                                      | -       |
| offset                    | Minimum distance between the node anchor point and the corner.                                                                                                                                                                                                                       | [Padding](#padding)                                                    | 0       |
| gridSize                  | Grid cell size.                                                                                                                                                                                                                                                                      | number                                                                 | 0       |
| maxAllowedDirectionChange | Maximum allowed rotation angle (radians).                                                                                                                                                                                                                                            | number                                                                 | 0       |
| startDirections           | Possible starting directions of the node.                                                                                                                                                                                                                                            | [Direction](#direction)[]                                              | 0       |
| endDirections             | Possible ending directions of the node.                                                                                                                                                                                                                                              | [Direction](#direction)[]                                              | 0       |
| directionMap              | Specifies the movable directions.                                                                                                                                                                                                                                                    | { [key in [Direction](#direction)]: { stepX: number; stepY: number } } | 0       |
| penalties                 | Represents additional costs for certain paths during path searching. The key is the radian value, and the value is the cost.                                                                                                                                                         | { [key: string]: number }                                              | 0       |
| distFunc                  | Specifies the function to calculate the distance between two points.                                                                                                                                                                                                                 | (p1: [Point](#point), p2: [Point](#point)) => number                   | 0       |
| maximumLoops              | Maximum number of iterations.                                                                                                                                                                                                                                                        | number                                                                 | 0       |
| enableObstacleAvoidance   | Whether to enable obstacle avoidance.                                                                                                                                                                                                                                                | boolean                                                                | false   |

#### Direction

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom';
```

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

#### Padding

```typescript
type Padding = number | [number, number] | [number, number, number, number];
```

## Example

### Built-in Polyline Edge Effect

<Playground path="element/edge/demo/polyline.js" rid="default-polyline-edge" height='520px'></Playground>
