---
title: React 中使用 G6
order: 9
---

### 概述
G6 是一个纯 JS 库，不与任何框架耦合，也就是可以在任何前端框架中使用，如 React、Vue、Angular 等。由于我们内部绝大多数都是基于 React 技术栈的，所以我们也仅提供一个 G6 在 React 中使用的 Demo。

在 React 中使用 G6，和在 HTML 中使用基本相同，唯一比较关键的区分就是在实例化 Graph 时，要**保证 DOM 容器渲染完成，并能获取到 DOM 元素**。

在 Demo 中，我们以一个简单的流程图为例，实现如下的效果。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*L8pRS5HCPXUAAAAAAAAAAABkARQnAQ' width=800/>

### 功能及实现
Demo 包括以下功能点：

- 自定义节点；
- 自定义边；
- 节点的 tooltip；
- 边的 tooltip；
- 节点上面弹出右键菜单；
- tooltip 及 ContextMenu 如何渲染自定义的 React 组件。

在 React 中，通过 `ReactDOM.findDOMNode(ref.current)`获取到真实的 DOM 元素。

```javascript
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from './data';
import G6 from '@antv/g6';

export default function() {
  const ref = React.useRef(null)
  let graph = null

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: 1200,
        height: 800,
        modes: {
          default: ['drag-canvas']
        },
        layout: {
        	type: 'dagre',
          direction: 'LR'
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
          shape: 'polyline'
        }
      })
    }
    graph.data(data)
    graph.render()
  }, [])

  return (
    <div ref={ref}></div>
  );
}

```

### G6 中渲染 React 组件
节点和边的 tooltip、节点上的右键菜单，G6 中内置的很难满足样式上的需求，这个时候我们就可以通过渲染自定义的 React 组件来实现。Tooltip 和 ContextMenu 都是普通的 React 组件，样式完全由用户控制。交互过程中，在 G6 中需要做的事情就是确定何时渲染组件，以及渲染到何处。在 G6 中获取到是否渲染组件的标识值和渲染位置后，这些值就可以使用 React state 进行管理，后续的所有工作就全部由 React 负责了。

```javascript
// 边 tooltip 坐标
const [showNodeTooltip, setShowNodeTooltip] = useState(false)
const [nodeTooltipX, setNodeToolTipX] = useState(0)
const [nodeTooltipY, setNodeToolTipY] = useState(0)

// 监听 node 上面 mouse 事件
graph.on('node:mouseenter', evt => {
  const { item } = evt
  const model = item.getModel()
  const { x, y } = model
  const point = graph.getCanvasByPoint(x, y)

  setNodeToolTipX(point.x - 75)
  setNodeToolTipY(point.y + 15)
  setShowNodeTooltip(true)
})

// 节点上面触发 mouseleave 事件后隐藏 tooltip 和 ContextMenu
graph.on('node:mouseleave', () => {
  setShowNodeTooltip(false)
})

return (
  <div ref={ref}>
  { showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} /> }
 </div>
);
```

完整的 Demo 源码请戳 「<a href='https://github.com/baizn/g6-in-react' target='_blank'>这里</a>」。

关于 G6 如何在 Vue 及 Angular 中使用，还望社区中有相关实践的同学能提供一些，供其他同学学习和参考，非常感谢！
