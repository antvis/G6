---
title: Group
order: 1
---

Group 类似于 [SVG 中的 ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)[`<g>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)[ 标签](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)：元素 `g` 是用来组合图形对象的容器。在 group 上添加变换（例如剪裁、旋转、放缩、平移等）会应用到其所有的子元素上。在 group 上添加属性（例如颜色、位置等）会被其所有的子元素继承。此外， group 可以多层嵌套使用，因此可以用来定义复杂的对象。关于 Group 更详细的介绍请参考《[图形分组 Group](../manual/middle/nodeGroup)》。


## 声明实例
```javascript
const group = new Group(cfgs);
```


## 实例方法


### addGroup(param, cfg)
向分组中添加新的分组。


#### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| param | Function | Object | undefined |  |
| cfg | Object |  |



#### 用法

```javascript
group.addGroup({
	id: 'groupId'
})
```



### addShape(type, cfgs)
向分组中添加新的图形。<br />`注意`：在分组上添加的`clip`， `transform`等会影响到该分组中的所有图形。G支持的图形及其绘图属性请见shape小节。


#### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| type | String | 图元素类型，值可以为：rect、circle、fan、ellipse、marker、image等，具体参考[支持的Shape类型及属性](https://www.yuque.com/antv/g6/ffzwfp) |
| cfg | Object | 图元素的属性 |


#### 

#### 用法

```javascript
group.addShape('rect', {
	attrs: {
  	fill: 'red',
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowColor: 'blue',
    shadowBlur: 10,
    opacity: 0.8
  }
})
```


### contain(child)
该分组是否包含此元素。<br />返回值: boolean


#### 参数

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| child | Group | Shape | 子 Group 或 Shape 实例 |



#### 用法

```javascript
const has = group.contain(child)
```


### find(fn)
根据指定条件返回对应元素，**只返回符合条件的第一个元素**。


#### 参数


| 名称 | 类型 | 说明 |
| --- | --- | --- |
| fn | Function | 自定义回调函数 |



#### 用法

```javascript
const child = group.find(function(item) {
	return item.attr('fill') === 'red';    // 找到首个填充为红色的图形
});
```


### findById(id)
根据元素ID返回对应的实例。<br />返回值：Object。


#### 参数


| 名称 | 类型 | 说明 |
| --- | --- | --- |
| id | String | Group 实例ID |



#### 用法

```javascript
const group1 = group.findById('group1');
```



### findAll(fn)
返回所有符合条件的元素。<br />返回值: [ Object ]


#### 参数


| 名称 | 类型 | 说明 |
| --- | --- | --- |
| fn | Function | 自定义回调函数 |



#### 用法

```javascript
const children = group.findAll(function(item) {
    return item.get('id') < 10;       // 获取所有id小于10的元素
});
```


### getShape(x,y)
返回该坐标点最上层的元素。<br />返回值: Object


#### 参数


| 名称 | 类型 | 说明 |
| --- | --- | --- |
| x | number | x 坐标 |
| y | number | y 坐标 |



#### 用法

```javascript
// 获取 (10, 30) 坐标点上层的元素
const element = group.getShape(10, 30)
```


### getFirst()
获取该分组的第一个子元素。<br />返回值: Object


#### 用法

```javascript
const child = group.getFirst()

// 等价于
const childrens = group.get('children')
const child = childrens[0]
```


### getLast()
获取该分组的最后一个子元素。<br />返回值: Object


#### 用法

```javascript
const child = group.getLast()

// 等价于
const childrens = group.get('children')
const child = childrens[childrens.length - 1]
```


### getChildByIndex(index）
返回第 `index` 个子元素，从`0`开始计数。<br />返回值: Object


#### 参数


| 名称 | 类型 | 说明 |
| --- | --- | --- |
| index | number | 子元素的序号，默认为 0 |



#### 用法

```javascript
const child = group.getChildByIndex(2)
```


### removeChild(child)
从分组中删除一个分组或一个图形。


#### 参数说明

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| child | Group | Shape | 子 Group 或 Shape 实例 |



#### 用法

```javascript
group.removeChild(child)
```


### sort()
排序方法。<br />一般用于在设置子元素层叠顺序时使用。

典型使用场景：通过 group.addShape() 添加 shape 时，添加的每个 shape 都设置了 index，在最后调用 group.sort() 可以对添加的 shape 进行排序。


#### 用法

```javascript
group.sort()
```


### clear()
清除该组的所有子元素。


#### 用法

```javascript
group.clear()
```
