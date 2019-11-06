---
title: 关键概念-图形分组 Group
order: 1
---

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"> &nbsp;&nbsp;注意：</span>
<br />图形分组 Group 与 [节点分组 Group](https://www.yuque.com/antv/g6/inxeg8) 虽然都名为 Group，但属于不同层次的概念。

- 图形分组针对 [图形 Shape](https://www.yuque.com/antv/g6/shape-crycle) 层次的分组；
- [节点分组 Group](https://www.yuque.com/antv/g6/inxeg8) 是针对 [节点](https://www.yuque.com/antv/g6/internal-node) 的分组，与数据结构中的层次、分组对应。

<a name="vnARN"></a>
<br />
# 什么是图形分组 Group
图形分组 group 类似于 [SVG 中的 ](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)[`<g>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)[ 标签](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/g)：元素 `g` 是用来组合图形对象的容器。在 group 上添加变换（例如剪裁、旋转、放缩、平移等）会应用到其所有的子元素上。在 group 上添加属性（例如颜色、位置等）会被其所有的子元素继承。此外， group 可以多层嵌套使用，因此可以用来定义复杂的对象。

在 G6 中，Graph 的一个实例中的所有节点属于同一个变量名为 `nodeGroup` 的 group，所有的边属于同一个变量名为 `edgeGroup` 的 group。节点 group 在视觉上的层级（zIndex）高于边 group，即所有节点会绘制在所有边的上层。<br />如下图（左）三个节点属于 `nodeGroup`  ，两条边属于 `edgeGroup` ， `nodeGroup` 层级高于 `edgeGroup` ，三个节点绘制在三条边的上层。下图（右）是（左）图的节点降低透明度后的效果，可以更清晰看到边绘制在节点下方。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571022038208-ed60e526-4024-4296-a701-10baf12c1a96.png#align=left&display=inline&height=49&name=image.png&originHeight=98&originWidth=234&search=&size=11663&status=done&width=117)![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571022296480-7e52e970-eaf6-457c-a36e-bbe736f201d3.png#align=left&display=inline&height=39&name=image.png&originHeight=78&originWidth=228&search=&size=11263&status=done&width=114)
> （左）节点和边的图形分组 Group 演示。（右）给左图的节点降低了透明度。


<a name="HIj1j"></a>
<br />
# 何时使用图形分组 Group
[自定义节点](https://www.yuque.com/antv/g6/self-node)、[自定义边](https://www.yuque.com/antv/g6/self-edge)时将会涉及到图形分组 Group 的概念。图形分组 Group 方便了用户对节点或边上元素的组合和管理。<br />例如，如下图中的节点 A 有一个包含节点 A 中所有图形的 group，该 group 中包含了一个 circle 图形和一个文本图形。节点 B 是一个自定义节点，有一个包含节点 B 中所有图形的 group，该 group 包含了 circle 图形、rect 图形、文本图形。<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571022867752-327b0c7e-6794-4e13-89d0-12f0639ca02b.png#align=left&display=inline&height=51&name=image.png&originHeight=102&originWidth=100&search=&size=8111&status=done&width=50)![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571023091514-246a313d-1018-43f8-b8c2-f830d4756df1.png#align=left&display=inline&height=56&name=image.png&originHeight=112&originWidth=104&search=&size=10499&status=done&width=52)

<a name="8iKCK"></a>
<br />
# 如何使用图形分组 Group
以下方法将会在[自定义节点](https://www.yuque.com/antv/g6/self-node)、[自定义边](https://www.yuque.com/antv/g6/self-edge)时用到。

<a name="ysaTR"></a>
<br />
## 声明实例
```
const group = new Group(cfgs);
```

<a name="AtpFD"></a>
<br />
## 实例方法

- addGroup(cfgs)

向分组中添加新的分组。

```javascript
const subGroup = group.addGroup({
  id: 'rect'
})
```

- addShape(type, cfgs)

向分组中添加新的图形。

```javascript
const keyShape = group.addShape('rect', {
  attrs: {
  	stroke: 'red'
  }
})
```


提示：在分组上添加的 `clip`， `transform` 等会影响到该分组中的所有图形。
