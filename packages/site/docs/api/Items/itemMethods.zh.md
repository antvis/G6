---
title: 元素实例方法
order: 0
---

Item 是 G6 中绘图元素实例，目前包含节点和边的实例。对于实例的变更建议在 graph 上进行。


## 更新

### item.update(model)


根据元素数据项，更新元素。

**参数**


| 名称  | 类型   | 是否必选 | 描述                       |
| ----- | ------ | -------- | -------------------------- |
| model | Object | true     | 元素描述项，包括数据和样式 |


<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong> 提示：</strong></span>

其中参数 model 可包括以下属性，下面属性的详细描述参见 [元素配置项](/zh/docs/api/Items/itemProperties)：


| 名称     | 类型   | 是否必选 | 描述                                       |
| -------- | ------ | -------- | ------------------------------------------ |
| style    | Object | false    | 元素样式                                   |
| type     | String | false    | 元素的类型，不传则使用默认值               |
| label    | String | false    | 元素的文本标签，有该字段时默认会渲染 label |
| labelCfg | Object | false    | 元素文本标签的样式                         |


**用法**

```javascript
const model = {
  id: 'node',
  type: 'rect',
  label: 'node',
  style: {
    fill: 'red',
  },
};

item.update(model);
```

### item.refresh()

刷新元素，包括更新元素位置，更新元素样式，清除之前的缓存。

一般在以下情况时，会刷新元素：

- item model 被改变；
- 边的位置发生改变，需要重新计算边。

**用法**

```javascript
item.refresh();
```

### item.updatePosition(cfg)

更新元素位置，避免整体重新绘制。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | Object | true | 元素配置项，包括 `x`、`y` 属性，如果参数中无 `x`、`y` 属性，则更新时使用数据项中的值。 |

**用法**

```javascript
const cfg = {
  x: 100,
  y: 200,
};
// 由于 cfg 中存在 x 与 y，则下面操作将会使用 cfg 中的 x、y 坐标
item.updatePosition(cfg);

const cfg1 = {
  name: 'abc',
  dept: 'antv',
};
// 由于 cfg 中不存在 x 与 y，下面才做将会使用 item.getModel() 中的 x、y 坐标值
item.updatePosition(cfg1);
```

## 销毁

### item.destroy()

销毁元素，主要包括停止动画、删除 group 中的所有元素、清空配置项、设置 `destroyed` 为 `true` 等操作。

**用法**

```javascript
item.destroy();
```

## 通用

### item.getBBox()

获取元素的包围盒。

**返回值**

- 返回值类型：Object。

返回值对象包括以下属性：

| 名称    | 类型   | 描述          |
| ------- | ------ | ------------- |
| x       | number | 视口 x 坐标   |
| y       | number | 视口 y 坐标   |
| width   | number | bbox 宽度     |
| height  | number | bbox 高度     |
| centerX | number | 中心点 x 坐标 |
| centerY | number | 中心点 y 坐标 |

**用法**

```javascript
item.getBBox();
```

### item.getContainer()

获取元素的容器。

**返回值**

- 返回值类型：G.Group；
- 返回元素所在的 graphics group。

**用法**

```javascript
// 获取元素的容器
const group = item.getContainer();

// 等价于
const group = item.get('group');
```

### item.getKeyShape()

获取元素的关键形状，用于计算节点大小、连线截距等。

**返回值**

- 返回值类型：G.Shape；
- 返回元素的 keyShape。

**用法**

```javascript
// 获取元素的 keyShape
const keyShape = item.getKeyShape();

// 等价于
const keyShape = item.get('keyShape');
```

### item.getModel()

获取元素的数据模型。

**返回值**

- 返回值类型：Object；
- 返回元素的数据模型。

**用法**

```javascript
// 获取元素的数据模型
const model = item.getModel();

// 等价于
const model = item.get('model');
```

### item.getType()

获取元素的类型。

**返回值**

- 返回值类型：String；
- 返回元素的类型，可能是 `'node'` 或 `'edge'`。

**用法**

```javascript
// 获取元素的类型
const type = item.getType();

// 等价于
const type = item.get('type');
```

### item.enableCapture(enable)

是否拾取及触发该元素的交互事件。

**参数**

| 名称   | 类型    | 是否必选 | 描述                                                            |
| ------ | ------- | -------- | --------------------------------------------------------------- |
| enable | Boolean | true     | 是否允许该元素响应事件的标识，如果为 `true`，则允许，否则不允许 |

**用法**

```javascript
// 不允许元素响应事件
item.enableCapture(false);

// 允许元素响应事件
item.enableCapture(true);
```

### item.clearCache()

更新或刷新等操作后，清除缓存。

**用法**

```javascript
// 清除缓存
item.clearCache();
```

## 状态

### item.show()

显示元素。只显示 item 自身，若需要在显示节点的同时显示相关边，应调用 [graph.showItem(item)](/zh/docs/api/Graph#showitemitem)。

**用法**

```javascript
item.show();
```

### item.hide()

隐藏元素。只隐藏 item 自身，若需要在隐藏节点的同时隐藏相关边，应调用 [graph.hideItem(item)](/zh/docs/api/Graph#hideitemitem)。

**用法**

```javascript
item.hide();
```

### item.changeVisibility(visible)

更改元素是否显示。

**参数**

| 名称    | 类型    | 是否必选 | 描述                                        |
| ------- | ------- | -------- | ------------------------------------------- |
| visible | Boolean | true     | 是否显示元素，`true` 为显示，`false` 为隐藏 |

**用法**

```javascript
// 显示元素
item.changeVisibility(true);

// 隐藏元素
item.changeVisibility(false);
```

### item.isVisible()

查询元素显示状态。

**返回值**

- 返回值类型：Boolean；
- 返回值为 true，则表示当前元素处于显示状态，否则处于隐藏状态。

**用法**

```javascript
const visible = item.isVisible();
```

### item.toFront()

将元素的层级设置到最上层，即当有元素重叠时，将元素置于顶层。

**用法**

```javascript
item.toFront();
```

### item.toBack()

将元素的层级设置到最下层，即当有元素重叠时，将元素置于底层。

**用法**

```javascript
item.toBack();
```

### item.setState(state, enable)

更新元素的状态。

**参数**

| 名称   | 类型    | 是否必选 | 描述                                                       |
| ------ | ------- | -------- | ---------------------------------------------------------- |
| state  | String  | true     | 元素的状态名，如 `'selected'`、`'hover'`                   |
| enable | Boolean | true     | 是否启用状态的标识，为 `true` 表示启用该状态，否则不启用。 |

**用法**

```javascript
item.setState('selected', true);
item.setState('actived', false);
```

### item.clearStates(states)

清除指定的状态，如果不传 states ，则默认清除**第一个**状态。

**参数**

| 名称   | 类型           | 是否必选 | 描述               |
| ------ | -------------- | -------- | ------------------ |
| states | String / Array | true     | 要清除的元素状态名 |

**用法**

```javascript
// 清除 'selected' 状态
item.clearStates('selected');

// 清除 'active' 与 'hover' 状态
item.clearStates(['actived', 'hover']);
```

### item.getStates()

获取当前元素的所有状态。

**返回值**

- 返回值类型：Array；
- 返回当前元素的所有状态，是一个字符串数组，数组中值表示元素的状态。

**用法**

```javascript
// 获取元素的所有状态
const states = item.getStates();
```

### item.hasState(state)

判断元素是否具有某种指定的状态。

**参数**

| 名称  | 类型   | 是否必选 | 描述         |
| ----- | ------ | -------- | ------------ |
| state | String | true     | 元素的状态名 |

**返回值**

- 返回值类型：Boolean；
- 返回值表示是否具有指定的状态，如果返回 `true`，则说明元素有指定的状态，否则没有。

**用法**

```javascript
// 获取元素的 'hover' 状态值
const state = item.hasState('hover');
```

## 样式

### item.getStateStyle(state)

获取元素指定状态的样式，返回的样式会将全局样式、默认样式和元素自定义样式合并。

**参数**

| 名称  | 类型   | 是否必选 | 描述         |
| ----- | ------ | -------- | ------------ |
| state | String | true     | 元素的状态名 |

**返回值**

- 返回值类型：Object；
- 返回的样式会将全局样式、默认样式和元素自定义样式合并。

**用法**

```javascript
// 获取元素的指定状态的样式
const style = item.getStateStyle('selected');
```

### item.getOriginStyle()

获取元素 keyShape 的样式。

**返回值**

- 返回值类型：Object | undefined；
- 如果存在 keyShape ，则返回 `keyShape` 的样式，否则返回 `undefined` 。

**用法**

```javascript
const style = item.getOriginStyle();
```

### item.getCurrentStatesStyle()

获取当前元素的所有状态的样式。

**返回值**

- 返回值类型：Object；
- 返回值表示当前元素所有状态的样式。

**用法**

```javascript
const styles = item.getCurrentStatesStyle();
```
