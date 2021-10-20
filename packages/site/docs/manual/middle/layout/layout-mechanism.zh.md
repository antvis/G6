---
title: 布局的切换机制
order: 2
---

G6 提供了两种关于布局的切换机制：

- `updateLayout(params)`：布局方法或参数的切换；
- `changeData()`：数据的切换。

## 布局方法或参数切换

**接口定义：**

```javascript
/**
 * 更换布局或布局参数
 * @param {String | object} cfg 新布局配置项
 * 若 cfg 为 String 或含有 type 字段，且与之前的布局方法不同时将会更换布局
 * 否则只是更新原有布局的参数
 */
updateLayout(cfg);
```

**布局方法切换：**<br />若参数  `cfg` 为 `String` 或是含有 `type` 字段的对象，且与之前的布局方法名不同时将会更换布局。

**布局参数切换：**<br />若参数  `cfg`  是对象且其中不含有 `type` 字段，或指定的布局方法名称与之前的布局方法相同，则保持原有布局方法，仅更新该布局的参数。

## 数据切换

**接口定义：**

```javascript
/**
 * 更改源数据，根据新数据重新渲染视图
 * @param {object} data 源数据
 * @return {object} this
 */
changeData(data);
```

## 切换示例

### 期待效果

初始化时使用默认 random 布局，2000 ms 后更换为允许节点重叠的 force 布局，4000 ms 后更换为不允许节点重叠的 force 布局，6000 ms 后更换数据为 `data2`。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6k-iQ405hEEAAAAAAAAAAABkARQnAQ' width=600 alt='img'/>

### 完整代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tutorial Layout Demo</title>
  </head>
  <body>
    <div id="mountNode"></div>
    <script src="https://gw.alipayobjects.com/os/lib/antv/g6/4.3.11/dist/g6.min.js"></script>
    <script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
    <script>
      const data = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
          { id: '3', label: '3' },
          { id: '4', label: '4' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
          { source: '0', target: '3' },
          { source: '0', target: '4' },
          { source: '1', target: '2' },
          { source: '1', target: '3' },
        ],
      };

      const data2 = {
        nodes: [
          { id: '0', label: '0' },
          { id: '1', label: '1' },
          { id: '2', label: '2' },
        ],
        edges: [
          { source: '0', target: '1' },
          { source: '0', target: '2' },
        ],
      };

      const graph = new G6.Graph({
        container: 'mountNode', // String | HTMLElement，必须，容器 id 或容器本身
        width: 300, // Number，必须，图的宽度
        height: 300, // Number，必须，图的高度
        animate: true, // Boolean，可选，切换布局时是否使用动画过度
      });

      // 读取数据和渲染
      graph.data(data);
      graph.render();

      // 2000 ms 后切换为允许节点重叠的 force 布局
      setTimeout(() => {
        graph.updateLayout('force'); // 参数为 String 代表布局名称
      }, 8000);

      // 4000 ms 后切换为不允许节点重叠且边长为 100 的 force 布局。
      setTimeout(() => {
        graph.updateLayout({
          type: 'force', // 布局名称
          preventOverlap: true, // 布局参数，是否允许重叠
          nodeSize: 40, // 布局参数，节点大小，用于判断节点是否重叠
          linkDistance: 100, // 布局参数，边长
        });
      }, 10000);

      // 6000 ms 后切换数据为 data2
      setTimeout(() => {
        graph.changeData(data2);
      }, 12000);
    </script>
  </body>
</html>
```
