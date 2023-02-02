---
title: TreeGraph Functions
order: 4
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

### updateChild(data, parentId)

Incrementally update or add one child data of a parent node. If you want to update all the children of the parent, try [updateChildren]() instead. The following image illustrate the differences between `updateChild` and `updateChildren`: <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2_78TIFt7OoAAAAAAAAAAAAAARQnAQ' alt='img' width=400 /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*h2PkRKunMokAAAAAAAAAAAAAARQnAQ' alt='img' width=400 />

**Parameters**

| Name   | Type     | Required | Description                |
| ------ | -------- | -------- | -------------------------- |
| data   | TreeData | true     | The data of subtreee.      |
| parent | String   | false    | The id of the parent node. |

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

### updateChildren(data, parentId)

Update all the children of the parent. If you want to update or add one child of the parent, try [updateChild]() instead. The following image illustrate the differences between `updateChild` and `updateChildren`: <br />

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2_78TIFt7OoAAAAAAAAAAAAAARQnAQ' alt='img' width=400 />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*h2PkRKunMokAAAAAAAAAAAAAARQnAQ' alt='img' width=400 />

**Parameters**

| Name   | Type       | Required | Description                |
| ------ | ---------- | -------- | -------------------------- |
| data   | TreeData[] | true     | The data of subtreee.      |
| parent | String     | true     | The id of the parent node. |

**Usage**

```javascript
const data = [
  {
    id: 'subTree1',
    children: [...]
  },
  {
    id: 'subTree2',
    children: [...]
  }
];

treeGraph.updateChildren(data, 'root')
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
  direction: 'H',
  getSubTreeSep: () => 20,
  getVGap: () => 25,
  getHeight: () => 30,
  getWidth: () => 30,
};
treeGraph.changeLayout(layout);
```

### layout(fitView)

Refresh the layout. Usually, it is called after changing data. The `refreshLayout` is discarded by v4.x, call `layout` instead.

**Parameters**

| Name    | Type    | Required | Description                                  |
| ------- | ------- | -------- | -------------------------------------------- |
| fitView | Boolean | false    | Whether to fit view after refreshing layout. |

**Usage**

```javascript
treeGraph.layout(true);
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
