---
title: 状态量与图表联动
order: 1
---

## 状态量

<br/>
状态量被用于驱动图表内各元素元子级的UI状态变化。在g2plot中，元子级UI状态是可以枚举的，共有以下四种：

- 图形 default 状态: `normal`
- 图形高亮:  `active`
- 图形置灰:  `disable`
- 图形选中:  `selected`

UI 状态的变化是数据驱动的，能够响应状态量的图表元素记录所对应的数据，而状态量本身是一个数据判断条件。当图表元素对应的数据符合状态量的判断条件时，它的 UI 就会切换到状态量所对应的图形样式。

## 状态量的使用

### 快捷方法

g2plot 提供了状态量变化的快捷方法：`setActive()`  `setDisable()`  `setSelected()` `setNormal()`

#### setActive(condition,style?)

`condition`: function | object  设置状态量的条件<br/>
`condition: function`  通过回调函数设置状态量条件<br/>
`condition: { name: string, exp: string | number }`  设置单值的状态量条件，name 一般为图表数据中的字段名称，exp 为单值数据<br/>
`condition: { name: string, exp: function }` 设置多值的状态量，name 一般为图表数据中的字段名称，exp 为一个回调函数

`style: object`  可选，设置状态量驱动的 UI 样式。如不配置，则会默认去取 theme 中的状态样式。

代码示例:

```
// 通过回调函数设置状态量
plot.setActive((shapeData)=>{
  return shapeData.type !== 'a';
});

// 设置单值状态量
plot.setActive({ name: 'type', exp: 'a'});

// 设置多值状态量
plot.setActive({
  name: 'type',
  exp:(value)=>{
    return value !== 'a'
  }
});

// 设置状态量样式
plot.setActive( { name:'type', exp:'a' }, { stroke:'black', lineWidth:2 });

```

#### setDisable(condition,style?)

配置项与用法同 setActive。

#### setSelected(condition,style?)

配置项与用法同 setActive。

#### setNormal(condition)

清空状态样式，使图表元素回到 default 状态。g2plot 会记录图表元素的 default 样式，因此不需另外配置 style。

用法同 setActive。

### 初始化设置

通过`defaultState`配置项配置图表初始化时的状态。

#### defaultState: object

`active: object`<br />
`condition: { name: string, exp: string | number | function }`  设置状态量条件<br />
`related: string[]`  设置同状态量联动的组件，如 axis、label、tooltip 等<br />

`disable: object`    用法同 active<br />
`selected: object`    用法同 active<br />

用法：

```
defaultState:{
    active:{
      condition:{
        name: 'value',
        exp: 5
      },
      related: ['axis','label']
    },
    disable:{
      condition: {
        name: 'type',
        exp: (d)=>{
          return d !== 'a';
        }
      },
      related: ['tooltip','label','axis']
    }
}


```

### 在图表主题中定义状态样式

```
plot.registerTheme('line',{
    lineStyle:{
      normal: {} | Function,
      active: {} | Function,
      disable: {} | Function,
      selected: {} | Function
    }
});
```

## stateManager - 状态管理机

stateManager 是一个可插拔的抽象中间层，主要负责三件事：(1). 状态量的存储 （2). 状态量的更新和更新事件的分发   （3). 获取状态量。

stateManager 可用于多个图表之间，以及图表与外部组件的联动。g2plot 提供`bindStateManager()`方法用以将 stateManager 实例绑定到图表。

### stateManager 的创建与使用

新建一个 stateManager 实例：

```
import { StateManager } from '@antv/g2plot';

const stateManager = new StateManager();
```

#### setState(name,exp)

设置和更新状态量。

`name: string`  状态量名字<br />
`exp: string | number | function`    状态量条件，可以设为一个值或回调函数

#### getState(name)

获取状态量。

`name: string`  状态量名字

#### getAllState()

获取 stateManager 存储的当前所有状态量。

#### clear()

清空状态量。

### 将 stateManager 绑定到图表

图表支持 bindStateManager 方法，将一个 stateManager 实例绑定到图表，并传入相应的配置项。一个 stateManager 实例可以绑定到多个图表，从而支持多图表联动。

#### bindStateManager(cfg)

可配置属性如下：

- `setState`:  更新状态量 <br/>
  `event:string`:  可选，指定 event 时，状态量的更新由事件驱动，如不指定，则直接更新 stateManager 中的状态量<br />
  `state`: 要更新的状态量 name 和 value，支持函数式<br />
  `state: function`   通过回调函数设置状态量条件<br />
  `state: { name: string, exp: string | number }`  设置单值的状态量条件，name 一般为图表数据中的字段名称，exp 为单值数据<br />
  `state: { name: string, exp: function }`   设置多值的状态量，name 一般为图表数据中的字段名称，exp 为一个回调函数

- `onStateChange`:  状态量更新时如何响应 <br/>
  `name:string`:  状态量的名字  <br />
  `callback: function`: 状态量更新后图表如何响应

代码示例：

```
plot.bindStateManager(manager,{
  setState:[
    {
      event:'column:click',
      state: {name:'xxx',exp } || ()=>{}
    }
  ],
  onStateChange: [
    {
      name:'xxx',
      callback:()=>{}
    }
  ]
});
```
