---
title: treeGraph 实例方法
order: 4
---

### data()

### addChild(data, parent)

在指定的父节点下添加子树。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 将会直接使用 `data` 对象作为新增节点/边的数据模型，G6 内部可能会对其增加或修改一些必要的字段。若不希望原始参数被修改，建议在使用深拷贝后的 `data`。

**参数**

| 名称   | 类型   | 是否必选 | 描述       |
| ------ | ------ | -------- | ---------- |
| data   | Object | true     | 子树的数据 |
| parent | Node   | String   | true       | 父节点或父节点 ID |

**用法**

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

更新数据，差量更新子树。

**参数**

| 名称   | 类型   | 是否必选 | 描述       |
| ------ | ------ | -------- | ---------- |
| data   | Object | true     | 子树的数据 |
| parent | Node   | String   | false      | 父节点或父节点 ID |

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 当 `parent` 参数为空时，则全量更新。

**用法**

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

删除指定的子树。

**参数**

| 名称 | 类型   | 是否必选 | 描述              |
| ---- | ------ | -------- | ----------------- |
| id   | String | true     | 要删除的子树的 ID |

**用法**

```javascript
treeGraph.removeChild('sub');
```

## 布局

### changeLayout(layout)

更改并应用指定的布局。

**参数**

| 名称   | 类型   | 是否必选 | 描述                               |
| ------ | ------ | -------- | ---------------------------------- |
| layout | Object | false    | 指定的布局配置，如不传，则不做变更 |

**用法**

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

数据变更后，重新布局，刷新视图，并更新到画布。

**参数**

| 名称    | 类型    | 是否必选 | 描述                           |
| ------- | ------- | -------- | ------------------------------ |
| fitView | Boolean | false    | 更新布局后，是否需要自适应窗口 |

**用法**

```javascript
treeGraph.refreshLayout(true);
```

## 查找

### findDataById(id, target)

根据指定的 ID 获取对应的源数据。

**参数**

| 名称   | 类型   | 是否必选 | 描述                                         |
| ------ | ------ | -------- | -------------------------------------------- |
| id     | String | true     | 指定的元素 ID                                |
| target | Object | false    | 从指定的节点开始查找，为空时从根节点开始查找 |

**返回值**

- 返回值类型：Object；
- 返回值为查找到的节点的源数据。

**用法**

```javascript
const target = {
	id: 'sub1',
  children: [...]
}

// 从 target 节点开始查找 sub1.1 节点
const subData = treeGraph.findDataById('sub1.1', target)

// 从根节点开始查找 sub1.1 节点
const subData = treeGraph.findDataById('sub1.1')
```
