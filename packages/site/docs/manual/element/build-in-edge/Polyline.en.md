---
title: Polyline
---

> Before reading this section, please first read the [API - Edge Configuration chapter](/api/elements/edges/base-edge).

<embed src="@/common/api/elements/edges/polyline.md"></embed>

> If the element has its specific properties, we will list them below. For all generic style attributes, see[BaseEdge](./BaseEdge.en.md)

## style.controlPoints

> _[number, number] \| [number, number, number] \| Float32Array\_\_[]_

Control point array

## style.radius

> _number_ **Default:** `0`

The radius of the rounded corner

## style.router

> _false \| [OrthRouter](#orthrouter) \| [ShortestPathRouter](#shortestpathrouter)_ **Default:** `false`

Whether to enable routing, it is enabled by default and controlPoints will be automatically included

### OrthRouter

| Property | Description                                                                                                                | Type                | Default |
| -------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| type     | Orthogonal router, adds extra control points to the path to ensure each segment of the edge remains horizontal or vertical | `'orth'`            | -       |
| padding  | Minimum distance between node connection points and corners                                                                | [Padding](#padding) | `0`     |

### ShortestPathRouter

| Property                  | Description                                                                                                                                                                                                                                                                                 | Type                                                                   | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| type                      | Shortest path router, an intelligent version of the orthogonal router (`'orth'`). This router consists of horizontal or vertical orthogonal line segments. It uses the A\* algorithm to calculate the shortest path and supports automatically avoiding other nodes (obstacles) on the path | `'shortest-path'`                                                      | -       |
| offset                    | Minimum distance between node anchor points and corners                                                                                                                                                                                                                                     | [Padding](#padding)                                                    | 0       |
| gridSize                  | Size of the grid cells                                                                                                                                                                                                                                                                      | number                                                                 | 0       |
| maxAllowedDirectionChange | Maximum allowed rotation angle (in radians)                                                                                                                                                                                                                                                 | number                                                                 | 0       |
| startDirections           | Possible starting directions from the node                                                                                                                                                                                                                                                  | [Direction](#direction)[]                                              | 0       |
| endDirections             | Possible ending directions to the node                                                                                                                                                                                                                                                      | [Direction](#direction)[]                                              | 0       |
| directionMap              | Specifies the directions that can be moved                                                                                                                                                                                                                                                  | { [key in [Direction](#direction)]: { stepX: number; stepY: number } } | 0       |
| penalties                 | Represents additional costs for certain paths during path search. Keys are radian values, values are costs                                                                                                                                                                                  | { [key: string]: number }                                              | 0       |
| distFunc                  | Function that specifies how to calculate the distance between two points                                                                                                                                                                                                                    | (p1: [Point](#point), p2: [Point](#point)) => number                   | 0       |
| maximumLoops              | Maximum number of iterations                                                                                                                                                                                                                                                                | number                                                                 | 0       |
| enableObstacleAvoidance   | Whether to enable obstacle avoidance                                                                                                                                                                                                                                                        | boolean                                                                | false   |

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
