---
title: Item
order: 1
---

Item是G6中绘图元素实例，目前包含节点和边的实例。对于实例的变更建议在graph上进行。

<a name="p79Ru"></a>
## 更新
<a name="hjpjs"></a>
### update(model)
根据元素数据项，更新元素。

<a name="zZ7VH"></a>
#### 参数

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


<a name="Cwi3b"></a>
#### 用法
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

<a name="HyqSZ"></a>
### refresh()
刷新元素，包括更新元素位置，更新元素样式，清除之前的缓存。

一般在以下情况时，会刷新元素：

- item model被改变；
- 边的位置发生改变，需要重新计算边。

<a name="4ISwq"></a>
#### 用法
```javascript
item.refresh()
```

<a name="XoMRH"></a>
### updatePosition(cfg)
更新元素位置，避免整体重新绘制。

<a name="Pj9D3"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| cfg | object | true | 元素配置项，包括x、y属性，如果参数中无x、y属性，则更新时使用数据项中的值。 |


<a name="ijQj3"></a>
#### 用法
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

<a name="7jlaA"></a>
## 销毁
<a name="ghPQg"></a>
### destroy()
销毁元素，主要包括停止动画、删除group中的所有元素、清空配置项、设置destroyed为true等操作。

<a name="hCFRr"></a>
#### 用法
```javascript
item.destroy()
```

<a name="NVm3i"></a>
## 通用
<a name="9S0zG"></a>
### getBBox()
获取元素的包围盒。

<a name="2GNVZ"></a>
#### 返回值

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


<a name="gXIqm"></a>
#### 用法
```javascript
item.getBBox()
```

<a name="rPHBF"></a>
### getContainer()
获取元素的容器。

<a name="LQfe7"></a>
#### 返回值

- 返回值类型：G.Group；
- 返回元素所在的group。

<a name="L4uWm"></a>
#### 用法
```javascript
// 获取元素的容器
const group = item.getContainer()

// 等价于
const group = item.get('group')
```
<a name="0mbNA"></a>
### getKeyShape()
获取元素的关键形状，用于计算节点大小、连线截距等。

<a name="hMmmQ"></a>
#### 返回值

- 返回值类型：G.Shape；
- 返回元素的keyShape。

<a name="nMWS4"></a>
#### 用法
```javascript
// 获取元素的容器
const keyShape = item.getKeyShape()

// 等价于
const keyShape = item.get('keyShape')
```

<a name="sBZZ5"></a>
### getModel()
获取元素的数据模型。

<a name="vwU19"></a>
#### 返回值

- 返回值类型：object；
- 返回元素的数据模型。

<a name="TZtpm"></a>
#### 用法
```javascript
// 获取元素的容器
const model = item.getModel()

// 等价于
const model = item.get('model')
```

<a name="vuXST"></a>
### getType()
获取元素的类型。

<a name="tMso4"></a>
#### 返回值

- 返回值类型：string；
- 返回元素的类型。

<a name="dbjFT"></a>
#### 用法
```javascript
// 获取元素的容器
const type = item.getType()

// 等价于
const type = item.get('type')
```

<a name="3W1B9"></a>
### enableCapture(enable)
是否拾取及触发该元素的交互事件。

<a name="NzvEJ"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| enable | boolean | true | 是否允许该元素响应事件的标识，如果为true，则允许，否则不允许 |


<a name="UbEM4"></a>
#### 用法
```javascript
// 不允许元素响应事件
item.enableCapture(false)

// 允许元素响应事件
item.enableCapture(true)
```

<a name="pvNYQ"></a>
### clearCache()
更新或刷新等操作后，清除缓存。

<a name="YkCBn"></a>
#### 用法
```javascript
// 清除缓存
item.clearCache()
```

<a name="SGGnf"></a>
## 状态
<a name="3vRbZ"></a>
### show()
显示元素。

<a name="PJP5O"></a>
#### 用法
```javascript
item.show()
```

<a name="hErRH"></a>
### hide()
隐藏元素。

<a name="ksnJm"></a>
#### 用法
```javascript
item.hide()
```

<a name="EudUz"></a>
### changeVisibility(visible)
更改元素是否显示。

<a name="WssxO"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| visible | boolean | true | 是否显示元素，true为显示，false为隐藏 |


<a name="1Qn7N"></a>
#### 用法
```javascript
// 显示元素
item.changeVisibility(true)

// 隐藏元素
item.changeVisibility(false)
```

<a name="1nPrU"></a>
### isVisible()
查询元素显示状态。

<a name="RBpyK"></a>
#### 返回值

- 返回值类型：boolean；
- 返回值为true，则表示当前元素处于显示状态，否则处于隐藏状态。

<a name="GAsHF"></a>
#### 用法
```javascript
const visible = item.isVisible()
```
<a name="l6YrE"></a>
### toFront()
将元素的层级设置到最上层，即当有元素重叠时，将元素置于顶层。。

<a name="k6ANj"></a>
#### 用法
```javascript
item.toFront()
```

<a name="SQczc"></a>
### toBack()
将元素的层级设置到最下层，即当有元素重叠时，将元素置于底层。

<a name="e4su4"></a>
#### 用法
```javascript
item.toBack()
```

<a name="KKFdv"></a>
### setState(state, enable)
更新元素的状态。

<a name="QGKRy"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态，如selected、hover |
| enable | boolean | true | 是否启用状态的标识，为true表示启用该状态，否则不启用。 |


<a name="AeVmj"></a>
#### 用法
```javascript
item.setState('selected', true)
item.setState('actived', false)
```

<a name="mPx1X"></a>
### clearStates(states)
清除指定的状态，如果不传states，则默认清除**第一个**状态。

<a name="1cEIv"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| states | string | array | true | 要清除的元素状态 |


<a name="B9Ba8"></a>
#### 用法
```javascript
// 清除selected状态
item.clearStates('selected')

// 清除active的、hover状态
item.clearStates(['actived', 'hover'])
```


<a name="Zl9VC"></a>
### getStates()
获取当前元素的所有状态。

<a name="UUPEV"></a>
#### 返回值

- 返回值类型：array；
- 返回当前元素的所有状态，是一个字符串数组，数组中值表示元素的状态。

<a name="xYzpX"></a>
#### 用法
```javascript
// 获取元素的所有状态
const states = item.getStates()
```

<a name="bfE9q"></a>
### hasState(state)
判断元素是否具有某种指定的状态。

<a name="8PxjH"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态 |


<a name="G9efr"></a>
#### 返回值

- 返回值类型：boolean；
- 返回值表示是否具有指定的状态，如果返回true，则说明元素有指定的状态，否则没有。

<a name="vuIzs"></a>
#### 用法
```javascript
// 获取元素的所有状态
const state = item.hasState('hover')
```

<a name="4PJEw"></a>
## 样式
<a name="lf7Up"></a>
### getStateStyle(state)
获取元素指定状态的样式，返回的样式会将全局样式、默认样式和元素自定义样式合并。

<a name="3HePf"></a>
#### 参数

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| state | string | true | 元素的状态 |


<a name="pHP51"></a>
#### 返回值

- 返回值类型：object；
- 返回的样式会将全局样式、默认样式和元素自定义样式合并。

<a name="0w6S4"></a>
#### 用法
```javascript
// 获取元素的指定状态的样式
const style = item.getStateStyle('selected')
```

<a name="Phjsj"></a>
### getOriginStyle()
获取元素keyShape的样式。

<a name="y1ode"></a>
#### 返回值

- 返回值类型：object | undefined；
- 如果存在keyShape，则返回keyShape的样式，否则返回undefined。

<a name="W59BU"></a>
#### 用法
```javascript
const style = item.getKeyShapeStyle()
```

<a name="2f7X8"></a>
### getCurrentStatesStyle()
获取当前元素的所有状态的样式。

<a name="jNkgR"></a>
#### 返回值

- 返回值类型：object；
- 返回值表示当前元素所有状态的样式。

<a name="LPA0f"></a>
#### 用法
```javascript
const styles = item.getCurrentStatesStyle()
```
