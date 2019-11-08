---
title: Item
order: 3
---

Item是G6中绘图元素实例，目前包含节点和边的实例。对于实例的变更建议在graph上进行。


## 更新

### update(model)
根据元素数据项，更新元素。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| model | object | true | 元素描述项，包括数据和样式 |


提示 其中参数model可包括以下属性：

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| id | string | true | 元素ID，必须唯一 |
| style | object | false | 元素样式 |
| shape | string | false | 元素的形状，不传则使用默认值 |
| label | string | false | 元素label，有该字段时默认会渲染label |


**用法**
```javascript
const model = {
	id: 'node',
  shape: 'rect',
  label: 'node',
  style: {
  	fill: 'red'
  }
}

item.update(model)
```


### refresh()
刷新元素，包括更新元素位置，更新元素样式，清除之前的缓存。

一般在以下情况时，会刷新元素：

- item model被改变；
- 边的位置发生改变，需要重新计算边。


**用法**
```javascript
item.refresh()
```


### updatePosition(cfg)
更新元素位置，避免整体重新绘制。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | object | true | 元素配置项，包括x、y属性，如果参数中无x、y属性，则更新时使用数据项中的值。 |



**用法**
```javascript
const cfg = {
	x: 100,
  y: 200
}
// 此时更新时，使用参数中的x、y坐标
item.updatePosition(cfg)

const cfg1 = {
	name: 'abc',
  dept: 'antv'
}
// 此时更新时，使用item.getModel()中的x、y坐标值
item.updatePosition(cfg1)
```


## 销毁

### destroy()
销毁元素，主要包括停止动画、删除group中的所有元素、清空配置项、设置destroyed为true等操作。


**用法**
```javascript
item.destroy()
```


## 通用

### getBBox()
获取元素的包围盒。


**返回值**

- 返回值类型：object。

返回值对象包括以下属性：

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| x | number | 视口x坐标 |
| y | number | 视口y坐标 |
| width | number | bbox宽度 |
| height | number | bbox高度 |
| centerX | number | 中心点x坐标 |
| centerY | number | 中心点y坐标 |



**用法**
```javascript
item.getBBox()
```


### getContainer()
获取元素的容器。


**返回值**

- 返回值类型：G.Group；
- 返回元素所在的group。


**用法**
```javascript
// 获取元素的容器
const group = item.getContainer()

// 等价于
const group = item.get('group')
```

### getKeyShape()
获取元素的关键形状，用于计算节点大小、连线截距等。


**返回值**

- 返回值类型：G.Shape；
- 返回元素的keyShape。


**用法**
```javascript
// 获取元素的容器
const keyShape = item.getKeyShape()

// 等价于
const keyShape = item.get('keyShape')
```


### getModel()
获取元素的数据模型。


**返回值**

- 返回值类型：object；
- 返回元素的数据模型。


**用法**
```javascript
// 获取元素的容器
const model = item.getModel()

// 等价于
const model = item.get('model')
```


### getType()
获取元素的类型。


**返回值**

- 返回值类型：string；
- 返回元素的类型。


**用法**
```javascript
// 获取元素的容器
const type = item.getType()

// 等价于
const type = item.get('type')
```


### enableCapture(enable)
是否拾取及触发该元素的交互事件。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| enable | boolean | true | 是否允许该元素响应事件的标识，如果为true，则允许，否则不允许 |



**用法**
```javascript
// 不允许元素响应事件
item.enableCapture(false)

// 允许元素响应事件
item.enableCapture(true)
```


### clearCache()
更新或刷新等操作后，清除缓存。


**用法**
```javascript
// 清除缓存
item.clearCache()
```


## 状态

### show()
显示元素。


**用法**
```javascript
item.show()
```


### hide()
隐藏元素。


**用法**
```javascript
item.hide()
```


### changeVisibility(visible)
更改元素是否显示。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| visible | boolean | true | 是否显示元素，true为显示，false为隐藏 |



**用法**
```javascript
// 显示元素
item.changeVisibility(true)

// 隐藏元素
item.changeVisibility(false)
```


### isVisible()
查询元素显示状态。


**返回值**

- 返回值类型：boolean；
- 返回值为true，则表示当前元素处于显示状态，否则处于隐藏状态。


**用法**
```javascript
const visible = item.isVisible()
```

### toFront()
将元素的层级设置到最上层，即当有元素重叠时，将元素置于顶层。。


**用法**
```javascript
item.toFront()
```


### toBack()
将元素的层级设置到最下层，即当有元素重叠时，将元素置于底层。


**用法**
```javascript
item.toBack()
```


### setState(state, enable)
更新元素的状态。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态，如selected、hover |
| enable | boolean | true | 是否启用状态的标识，为true表示启用该状态，否则不启用。 |



**用法**
```javascript
item.setState('selected', true)
item.setState('actived', false)
```


### clearStates(states)
清除指定的状态，如果不传states，则默认清除**第一个**状态。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| states | string | array | true | 要清除的元素状态 |



**用法**
```javascript
// 清除selected状态
item.clearStates('selected')

// 清除active的、hover状态
item.clearStates(['actived', 'hover'])
```



### getStates()
获取当前元素的所有状态。


**返回值**

- 返回值类型：array；
- 返回当前元素的所有状态，是一个字符串数组，数组中值表示元素的状态。


**用法**
```javascript
// 获取元素的所有状态
const states = item.getStates()
```


### hasState(state)
判断元素是否具有某种指定的状态。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态 |



**返回值**

- 返回值类型：boolean；
- 返回值表示是否具有指定的状态，如果返回true，则说明元素有指定的状态，否则没有。


**用法**
```javascript
// 获取元素的所有状态
const state = item.hasState('hover')
```


## 样式

### getStateStyle(state)
获取元素指定状态的样式，返回的样式会将全局样式、默认样式和元素自定义样式合并。


**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态 |



**返回值**

- 返回值类型：object；
- 返回的样式会将全局样式、默认样式和元素自定义样式合并。


**用法**
```javascript
// 获取元素的指定状态的样式
const style = item.getStateStyle('selected')
```


### getOriginStyle()
获取元素keyShape的样式。


**返回值**

- 返回值类型：object | undefined；
- 如果存在keyShape，则返回keyShape的样式，否则返回undefined。


**用法**
```javascript
const style = item.getKeyShapeStyle()
```


### getCurrentStatesStyle()
获取当前元素的所有状态的样式。


**返回值**

- 返回值类型：object；
- 返回值表示当前元素所有状态的样式。


**用法**
```javascript
const styles = item.getCurrentStatesStyle()
```
