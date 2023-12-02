---
title: EdgeBundling
order: 11
---

In complex graph with large number of edges, edge bundling can help you to improve the visual clutter.

<img alt="edge filter lens" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*z9iXQq_kcrYAAAAAAAAAAABkARQnAQ" height='400'/>

## Configurations

### edgeBundles

**Type**：`Array<IEdge>`

**Default**：`[]`

|edges| arrays, each one stores the related edges' id, The default it will be generated based on edge's `target` and `source`. 

### edgePoints

**Type**：`Array<Array<Point>>`

**Default**：`[]`

|Point| Initial data array for dividing edge points.

### K

**Type**：`number`

**Default**：`0.1`

The strength of the bundling.

### lambda

**Type**：`number`

**Default**：`0.1`

The initial step length.

### divisions

**Type**：`number`

**Default**：`1`

The initial number of division on each edge. It will be multipled by `divRate` in each cycle.

### divRate

**Type**：`number`

**Default**：`2`

The rate of the divisions increasement. Large number means smoother result, but the performance will be worse when the number is too large.

### cycles

**Type**：`number`

**Default**：`6`

The number of outer interations.

### iterations

**Type**：`number`

**Default**：`90`

The initial number of inner interations. It will be multiplied by `iterRate` in each cycle.

### iterRate

**Type**：`number`

**Default**：`0.6666667`

The rate of the iterations decreasement.

### bundleThreshold

**Type**：`number`

**Default**：`0.6`

The edge similarity threshold for bundling. Large number means the edges in one bundle have smaller similarity, in other words, more edges in one bundle.

### eps

**Type**：`number`

**Default**：`1e-6`

Tolerance value for euclidean distance between polyline bend points.

### onTick

**Type**：`number`

**Default**：`undefined`

A callback executed when each iteration of the edge binding algorithm completes.

## API

### bundling

**Type**：`(data: GraphData) => void;`

**Description**：Execute edge binding algorithm.

### updateBundling

**Type**：`(cfg: BundlingConfig) => void;`

**Description**：Update the configuration items of the edge binding algorithm.

<embed src="../../common/PluginAPIDestroy.zh.md"></embed>
