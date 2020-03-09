---
title: G6 状态管理的最佳实践
order: 5
---

### 背景
元素（节点/边）的状态（state）用于反馈用户交互、数据变化。通过状态，可以将「交互/数据变化」与视图中「元素的样式变化」快速关联。最常见的例子：鼠标进入节点，该节点为 hover 状态，并被高亮；离开节点，该节点为非 hover 状态，并复原样式。

乍看之下，状态似乎很简单，但从目前业务痛点与经验来看，“状态”有许多隐藏的需求和复杂性。简单的实现方式，会造成易用性低下的问题。

### 挑战
要解决业务中常见的状态问题，并提供清晰明了、简单易用的方案必须要考虑以下问题：

- **简单快速地设置目标状态**：当一个节点或一条边上已经设置了大量不同状态后，要再设置一个新状态时，能够快速将之前所有状态清除；
- **状态多值**，即一个状态量存在多个不同的值，如节点代表人，有“健康”、“疑似”、“确诊”、“死亡”四种状态；
- **状态间互斥**：“健康”、“疑似”、“确诊”、“死亡”四种状态中，“死亡”与其他三种就是互斥的，不可能同时存在“健康”和“死亡”两种状态；
- **节点或边中所有元素的状态更新**：如一个由文本和圆组成的节点，状态变化时不仅能设置圆的样式，也可以设置文本的样式；
- **更新状态样式**，当更新节点的样式时，能够同时更新状态的样式。

### 方案
为了解决以上问题，我们将 G6 的状态管理分为以下几层：

- 定义状态：统一的定义方式；
- 设置状态：setItemState 方法；
- 更新状态：updateItem 支持更新状态；
- 取消状态：clearItemStates 方法。

### 定义状态

#### 全局状态
G6 中定义全局状态是在实例化 Graph 时通过 nodeStateStyles 和 edgeStateStyles 来定义。

```javascript
const graph = new G6.Graph({
	container,
  width,
  height,
  nodeStateStyles: {
  	fill: 'red',
    'keyShape-name': {
    	fill: 'red'
    }
  },
  edgeStateStyles: {}
})
```

当设置 [keyShape](https://g6.antv.vision/zh/docs/manual/middle/elements/shape-keyshape/#keyshape) 的状态时，可以直接在 nodeStateStyles 或 edgeStateStyles 中定义样式，或者将 keyShape 的 name 属性值作为 key 定义样式，我们建议使用后者。

#### 节点/边状态
除过全局状态外，G6 也支持针对不同节点定义不同的状态，使用 graph.node(fn) / graph.edge(fn) 或在数据中设置 stateStyles 即可。

```javascript
graph.node(node => {
	return {
  	...node,
    stateStyles: {}
  }
})

const data = {
	nodes: [
    {
    	id: 'node',
      stateStyles: {}
    }
  ]
}
```

#### 子元素状态
在 G6 中，通常一个节点都是由多部分组成的，但 G6 3.3 之前的版本支持设置 keyShape 的状态，如果要设置其他部分元素的状态，就需要在自定义元素时复写 setState 方法，写过的同学都会知道有多么痛苦。G6 3.4 版本中，我们支持了定义子元素的状态，从此再也不用去复写 setState 方法 了。

子元素状态也支持两种设置方式，为了演示方便，在这里我们只演示在在全局状态中定义子元素状态。

```javascript
const graph = new G6.Graph({
	container,
  width,
  height,
  nodeStateStyles: {
    'selected': {
    	'sub-element': {
        fill: 'green'
      },
      'text-element': {
        stroke: 'red'
      }
    }
  },
  edgeStateStyles: {}
})
```

在「定义状态」部分，我们建议在 nodeStateStyles/edgeStateStyles 中定义状态时，使用 keyShape 的 name 属性作为 key 值来定义状态样式，因为我们在定义子元素的状态时也采用同样的方式，结构上比较统一。

如上示例代码所示，我们定义了节点中 name 属性值为 sub-element 和 text-element 两部分的样式，当我们通过 graph.setItemState(item, 'selected', true) 设置指定 item 的状态时，子元素 sub-element 和 text-element 的样式也会同步更新。

```javascript
// 执行下面语句以后，name 为 sub-element 和 name 为 text-element 
// 的元素填充色和描边色都会改变
graph.setItemState(item, 'selected', true)
```

另外，G6 也支持在使用 updateItem 更新节点或边的时候定义状态。

### 设置状态
G6 中状态支持多值和二值两种情况。
> 二值：值只能为 true / false，无其他选择，即要么有这个状态，要么没有；
> 多值：如节点代表人，有“健康”、“疑似”、“确诊”、“死亡”四种状态。


#### 二值状态
二值状态一般常用于交互过程中，如 hover、selected 等状态，当节点被选中时，节点应用 selected 状态的样式，取消选中时，去掉 selected 状态的样式。

在 G6 中，使用 graph.setItemState(item, 'selected', true) 来设置二值状态。

```javascript
const graph = new G6.Graph({
	//...
  nodeStateStyles: {
  	selected: {
    	fill: 'red'
    }
  }
})

graph.setItemState(item, 'selected', true)
```

#### 多值状态
除过像 hover、selected 这种交互状态外，还会存在很多的业务状态，如节点代表人，有“健康”、“疑似”、“确诊”、“死亡”四种状态，此时使用 true/false 的形式就不能满足，需要支持单个状态可以有多个值的情况。

```javascript
const graph = new Graph({
  // ... 其他配置
  // 节点在不同状态下的样式
  nodeStateStyles: {
    // 实现 bodyState 的【多值】【互斥】
   'bodyState:health': {
      // keyShape 该状态下的样式, 可以使用三种方式指定：
      fill: 'green'
    },
   'bodyState:suspect': {

    },
   'bodyState:ill': {

    }
  }
});

graph.setItemState(item, 'bodyState', 'health');
```

#### 互斥状态
上面的多值状态，也很好地解决了状态互斥的问题，还以上面的 bodyState 状态为例，该状态共有 health、dead、ill 等值。

```javascript
//【互斥】
graph.setItemState(item, 'bodyState', 'health');
// 执行下面这句话 bodyState 将会被改变成 dead，
// item.hasState('bodyState:health') 为 false
graph.setItemState(item, 'bodyState', 'dead');
```

执行上面的两句后， item 只会有 bodyState 状态 的 dead 一个值，而二值状态不能解决这个问题。

```javascript
graph.setItemState(item, 'select', true)
graph.setItemState(item, 'active', true)
```

执行上面的两句设置二值状态的语句后，item 具有 select 和 active 所有的属性值，不能满足互斥需求。

### 更新状态
G6 3.3 及 以下的版本中，不支持更新状态的样式，updateItem 方法只能更新 keyShape 的样式。从 G6 3.4 版本开始，updateItem 支持更新子元素、状态及子元素状态。

#### 子元素
使用 updateItem 更新子元素样式时，只需要在 style 中以 子元素的 name 属性作为为 key 即可。

```javascript
// 更新 item，除过更新 keyShape 外，还更新 name 值为 node-text 的元素
graph.updateItem(item, {
  style: {
    fill: 'green',
    stroke: 'green',
    opacity: 0.5,
    'node-text': {
      stroke: 'yellow'
    }
  }
})
```

#### 状态
updateItem 也支持更新状态属性及子元素的状态属性，使用 stateStyles 属性。

```javascript
graph.updateItem(item, {
  style: {
    stroke: 'green',
    'node-text': {
      stroke: 'yellow'
    }
  },
  stateStyles: {
    hover: {
      opacity: 0.1,
      'node-text': {
        stroke: 'blue'
      }
    }
  }
})
graph.setItemState(item, 'hover', true)
```

使用 updateItem 更新状态的样式时，会存在两种情况：

- 使用 updateItem 更新时，item 已有指定状态，即 item.hasState('hover') === true，此时状态值对应的属性会立即生效；
- 使用 updateItem 更新时，item 没有指定的状态，即 item.hasState('hover') === false，更新以后，当用户执行 graph.setItemState(item, 'hover', true) 后，hover 状态的 stroke 属性值为 updateItem 时设置的值。

### 取消状态
在 G6 中，我们建议使用 `graph.clearItemStates` 来取消 `graph.setItemState` 设置的状态，`graph.clearItemStates` 支持一次取消单个或多个状态。

```javascript
graph.setItemState(item, 'bodyState', 'health');
graph.setItemState(item, 'selected', true)
graph.setItemState(item, 'active', true)

// 取消单个状态
graph.clearItemStates(item, 'selected')
graph.clearItemStates(item, ['selected'])

// 取消多个状态
graph.clearItemStates(item, ['bodyState:health', 'selected', 'active'])
```

以上就是 G6 中状态的定义、设置和取消的全过程，很清晰明了，但总感觉缺少了点什么，没错，想必聪明的你已经发现了，缺少了更新子元素及和 updateItem 配合使用的方案。不要着急，接着放下看。

### 状态优先级
G6 中提供了 hasState 方法用于判断元素是否有某种状态，但具体哪个状态的优先级高，哪个状态值应该覆盖其他的类似问题我们就没有再做任何限制，完全由业务用户控制，实现这种控制也非常简单，如一般情况下，鼠标 hover 到某个节点后，该节点会高亮，但希望当该节点处于 active 状态时，鼠标 hover 上去后也不要覆盖 active 的状态，即 active 优先级高于 hover。

```javascript
// 设置节点处于 active 状态
graph.setItemState(item, 'active', true)

// 鼠标 hover
const hasActived = graph.hasState('active')

// 当节点没有 active 时才设置 hover 状态
if(!hasActived) {
	graph.setItemState(item, 'hover', true)
}
```
