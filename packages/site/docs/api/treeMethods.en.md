---
title: TreeGraph Functions
order: 5
---

### data()

### addChild(data, parent)

Add sub tree to the parent node.

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ Attention:</strong></span> G6 will use the `data` object as the model of the newly added item, and the `data` might be modified. If you do not want it to be modified, use the deep cloned `data` instead.

**Parameters**

| Name   | Type   | Required | Description          |
| ------ | ------ | -------- | -------------------- | ---------------------------------- |
| data   | Object | true     | The data of subtree. |
| parent | Node   | String   | true                 | The id or instance of parent node. |

**Usage**

```javascript
const data = {
  id: 'sub1',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};

treeGraph.addChild(data, 'root')
```

### updateChild(data, parent)

Incrementally update the children data of the parent.

**Parameters**

| Name   | Type   | Required | Description           |
| ------ | ------ | -------- | --------------------- | ---------------------------------- |
| data   | Object | true     | The data of subtreee. |
| parent | Node   | String   | false                 | The id or instance of parent node. |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️Attention:</strong></span> When the `parent` is null, this operation will update the graph fully.

**Usage**

```javascript
const data = {
  id: 'sub1',
  children: [
    {
      id: 'subTree1',
      children: [...]
    },
    {
      id: 'subTree2',
      children: [...]
    }
  ]
};

treeGraph.updateChild(data, 'root')
```

### removeChild(id)

Remove the subtree started from a child node with the id.

**Parameters**

| Name | Type   | Required | Description                          |
| ---- | ------ | -------- | ------------------------------------ |
| id   | String | true     | The id of the subtree to be removed. |

**Usage**

```javascript
treeGraph.removeChild('sub');
```

## Layout

### changeLayout(layout)

Change the layout.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| layout | Object | false | The new layout configurations. If the `layout` is null, the layout will not be changed. |

**Usage**

```javascript
const layout = {
  type: 'mindmap',
  dirction: 'H',
  getSubTreeSep: () => 20,
  getVGap: () => 25,
  getHeight: () => 30,
  getWidth: () => 30,
};
treeGraph.changeLayout(layout);
```

### refreshLayout(fitView)

Refresh the layout. Usually, it is called after changing data.

**Parameters**

| Name    | Type    | Required | Description                                  |
| ------- | ------- | -------- | -------------------------------------------- |
| fitView | Boolean | false    | Whether to fit view after refreshing layout. |

**Usage**

```javascript
treeGraph.refreshLayout(true);
```

## Search

### findDataById(id, target)

Find data model according to the id.

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| id | String | true | The id of the item. |
| target | Object | false | Search from the target. If the target is null, this operation will search from the root node. |

**Return**

- The type of return value: Object;
- The return value is the data model of the found node.

**Usage**

```javascript
const target = {
	id: 'sub1',
  children: [...]
}

// Search the node with id 'sub1.1' from target
const subData = treeGraph.findDataById('sub1.1', target)

// Search the node with id 'sub1.1' from root node
const subData = treeGraph.findDataById('sub1.1')
```
