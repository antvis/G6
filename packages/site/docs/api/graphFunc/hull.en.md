---
title: Hull for Clusters
order: 11
---

## createHull(cfg: HullCfg)

**Parameter**

| Name | Type    | Required | Description                 |
| ---- | ------- | -------- | --------------------------- |
| cfg  | HullCfg | true     | Configuration for the hull. |

Details for HullCfg:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | string | true | Hull id |
| type | `round-convex` / `smooth-convex` / `bubble` | false | Configuration for hull type: `round-convex` generates a rounded-convex contour, `smooth-convex` generates a smooth-convex contour / `bubble` generates a smooth concave contour that could avoids nonMembers ([algorithm](http://vialab.science.uoit.ca/portfolio/bubblesets). The default value is `round-convex`. |
| members | Item[] / string[] | true | Node Instances or Node Ids that should be included in the hull. |
| nonMembers | Item[] / string[] | false | Node Instances or Node Ids that should be excluded from the hull, it only works when the hull type is set to be `bubble`. |
| padding | number | false | The offset between the hull polygon and the inner members. |
| style | object | false | The style properties for hull, including `fill` ( the fill color), `stroke` ( the stroke color) and `opacity` (transparency of the hull shape). |

**Usage**

```javascript
let centerNodes = graph.getNodes().filter((node) => !node.getModel().isLeaf);
graph.on('afterlayout', () => {
  const hull1 = graph.createHull({
    id: 'centerNode-hull',
    type: 'bubble',
    members: centerNodes,
    padding: 10,
  });

  const hull2 = graph.createHull({
    id: 'leafNode-hull1',
    members: ['node6', 'node7'],
    padding: 10,
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });

  const hull3 = graph.createHull({
    id: 'leafNode-hull2',
    members: ['node8', 'node9', 'node10', 'node11', 'node12'],
    padding: 10,
    style: {
      fill: 'lightgreen',
      stroke: 'green',
    },
  });

  graph.on('afterupdateitem', (e) => {
    hull1.updateData(hull1.members);
    hull2.updateData(hull2.members);
    hull3.updateData(hull3.members);
  });
});
```

## getHulls()

Get all of the hulls in the current graph.

**Return**

- Type of return value: {[key: string]: Hull;
- The return object indicates the mapping of hull ID to the corresponding hull instance. Each key of the object is a string representing the ID of hull, and the value of the object is the corresponding hull instance.

**Usage**

```javascript
const hullMap = graph.getHulls();
```

## removeHull(id: string)

Remove a hull with id.

**Parameter**

| Name | Type          | Required | Description                            |
| ---- | ------------- | -------- | -------------------------------------- |
| hull | string / Hull | true     | hull id or hull instance to be removed |

**Usage**

```javascript
graph.removeHull('myHull');
```

## removeHulls()

Remove all the hulls on the graph.

**Parameter**

No parameters.

**Usage**

```javascript
graph.removeHulls();
```
