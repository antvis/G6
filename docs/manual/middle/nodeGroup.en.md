---
title: Node Group
order: 8
---

> The title of Node Group is supported from G6 V3.1.2.


Node Group is a practical function for graph visualization. It is supported from G6 V3.0.5. Refer to the demo <a href='/zh/examples/interaction/nodeGroup' target='_blank'>Demo</a>. <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G1OBSJf672QAAAAAAAAAAABkARQnAQ' width=400/>

### Data Structure
In data, Node Group are defined as array `group`, and each node data has a property `groupId`.

The `title` for a group can be a string or an object:

- When the `title` is a string, it indicates the text of the group title. The styles and the position are fixed;
- When the `title` is an object, users are able to define the styles and position for the group title. The object contains:
  - text: required, a string indicates the text of the group title;
  - offsetX: the x offset of the title, `0` by default;
  - offsetY: the y offset of the title, `0` by default;
  - stroke: the stroke color. The `fill`, `fontSize`, and other [Label Styles on Node](/en/docs/manual/middle/elements/nodes/defaultNode/#label-and-labelcfg).



```javascript
{
  nodes: [
    {
      id: 'node1',
      label: 'node1',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node2',
      label: 'node2',
      groupId: 'group1',
      x: 150,
      y: 100
    },
    {
      id: 'node3',
      label: 'node3',
      groupId: 'group2',
      x: 300,
      y: 100
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
      	text: 'The 1st group',
        stroke: '#444',
        offsetX: 0,
        offsetY: 0
      },
      parentId: 'p1'
    },
    {
      id: 'group2',
      parentId: 'p1'
    },
    {
      id: 'p1'
    }
  ]
}
```

### Render the Node Group
If there are `groupId` in node data, G6 will render the group for the node automatically. You need to defined the `x` and `y` for nodes when there is no layout method for the graph.

```javascript
const data = {
  nodes: [
    {
      id: 'node6',
      groupId: 'group3',
      label: 'rect',
      x: 100,
      y: 300
    },
    {
      id: 'node1',
      label: 'fck',
      groupId: 'group1',
      x: 100,
      y: 100
    },
    {
      id: 'node9',
      label: 'noGroup1',
      groupId: 'p1',
      x: 300,
      y: 210
    },
    {
      id: 'node2',
      label: 'node2',
      groupId: 'group1',
      x: 150,
      y: 200
    },
    {
      id: 'node3',
      label: 'node3',
      groupId: 'group2',
      x: 300,
      y: 100
    },
    {
      id: 'node7',
      groupId: 'p1',
      label: 'node7-p1',
      x: 200,
      y: 200
    },
    {
      id: 'node10',
      label: 'noGroup',
      groupId: 'p2',
      x: 300,
      y: 210
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node3'
    }
  ],
  groups: [
    {
      id: 'group1',
      title: {
      	text: 'The first group',
        stroke: '#444',
        offsetX: -30,
        offsetY: 30
      },
      parentId: 'p1'
    },
    {
      id: 'group2',
      parentId: 'p1'
    },
    {
      id: 'group3',
      parentId: 'p2'
    },
    {
      id: 'p1'
    },
    {
      id: 'p2'
    }
  ]
};

const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  pixelRatio: 2,
  modes: {
    default: [ 'drag-canvas' ]
  },
  defaultNode: {
    shape: 'circleNode'
  },
  defaultEdge: {
    color: '#bae7ff'
  }
});

graph.data(data);
graph.render();
```

The result: <br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iftmRrdqR7cAAAAAAAAAAABkARQnAQ' width=400/>

<br />To controll the nodes and the groups, we now assign the behaviors to them.

### Manipulate the Group

The built-in [Behavior](/en/docs/manual/middle/states/defaultBehavior)s `drag-group`, `collapse-expand-group`, and `drag-node-with-group` allow user to manipulate the group:

- Drag the group;
- Unrelate the node and its group by dragging the node out of the group;
- Double click to expand/collapse the group:
  - When the group is collapsed, the edges linked to the inner nodes will link to the group;
  - When the group is expanded, the related edges are restored.
- When user is dragging a node, the node's group will be highlighted; when the node is dragged to another group, the corresponding group will be highlighted
- **Do not Support** ~~Dropping a node into another group~~.

#### drag-group
`drag-group` is a Behavior which supports the group dragging.

#### collapse-expand-group
`collapse-expand-group` is a Behavior which supports expand and collapse the group by double click.

Now, we only support collapse and expand the group by double click.

#### drag-node-with-group
`drag-node-with-group` is a Behavior that similar to `drag-node`. But it is applied on the node which has a group. The group of the node will be changed by dragging.

We do not support dragging multiple nodes in/out a group.

```javascript
const graph = new G6.Graph({
  container: 'mountNode',
  width: 800,
  height: 600,
  pixelRatio: 2,
  modes: {
    default: [ 'drag-group', 'collapse-expand-group', 'drag- node-with-group' ]
  },
  defaultNode: {
    shape: 'circleNode'
  },
  defaultEdge: {
    color: '#bae7ff'
  }
});
```

Assigning the three built-in Behavior into `modes` of the graph instance results in:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VsMbRqOJe2sAAAAAAAAAAABkARQnAQ' width=400/>

