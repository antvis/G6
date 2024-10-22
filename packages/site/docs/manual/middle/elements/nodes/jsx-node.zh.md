---
title: 使用类 JSX 语法定义 G6 节点
order: 4
---

在 G6 3.7.0 及以后的版本中，用户以使用类似 JSX 的语法来定义节点。只需要在使用 G6.registerNode 自定义节点时，将第二个参数设置为字符串或一个返回值为 `string` 的 `function`。

#### 基础语法

```
<[group|shape] [key]="value" style={{ [key]: value }}>
  <[more tag] /> ...
  <text>value</text>
</[group|shape]>
```

基础语法和大家熟悉的 HTML 标记语言基本相同，通过标签名来使用 shape 或者 group，同时定义 shape 需要填写 shape 的各个 attributes，而定义形状样式的 attrs 则由 style 属性来进行表达。style 里面的结构是一个 Object，对象的值可以是字符串，数字等 JSON 支持的数据类型（注意，这里不能够是函数，函数只会导致解析错误）。

自定义节点的类型和 style 参考：https://g6-v4.antv.vision/api/shape-properties 其中，为了相对定位，我们新加入了 marginTop 和 marginLeft 来定义左边和上面的间隔。

#### 推荐用法

- 在最外层包裹 `group` 标签，保证节点里面图形树结构完整
- 字符串最好使用单引号包裹，以免遇到解析错误
- `style` 中随 node 变化的变量推荐使用 \${} 的模板语法加入
- 图形内的相对定位推荐使用 `marginTop` 和 `marginLeft` 进行设置，`x` 与 `y` 会破坏层级关系定位
- 如果涉及到需要横向排列的元素，在上一个元素使用`next: inline`来实现下一个元素跟随在上个元素后方

#### 支持的标签

使用类 JSX 语法来定义 G6 节点时，支持使用以下的标签：

- `<group />`
- `<rect />`
- `<circle />`
- `<text />`
- `<path />`
- `<line />`
- `<points />`
- `<polygon />`
- `<polyline />`
- `<image />`

使用标签的形式来定义节点，所有的样式属性都写到 style 里面，name、keyShape 等和 style 同级，所支持的属性和 addShape 中完全一致。

**特别说明**：使用类 HTML 语法定义节点时，style 里面属性不支持 function，因此使用类 HTML 语法定义节点时，目前不支持 marker 标签。

#### 案例

我们先来看一下，使用类 JSX 语法来定义一个简单的矩形。

```javascript
G6.registerNode(
  'rect-xml',
  (cfg) => `
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }} keyshape="true" name="test">
    <text style={{ 
			marginTop: 2, 
			marginLeft: 50, 
      textAlign: 'center', 
      fontWeight: 'bold', 
      fill: '#fff' }} 
			name="title">${cfg.label || cfg.id}</text>
    <polygon style={{
      points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
          fill: 'red'
    }} />
        <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
        <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
  </rect>
`,
);
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E3UGRq1m-wYAAAAAAAAAAAAAARQnAQ' />

我们再来看一个稍微复杂的案例。

```javascript
// 假设一个节点数据如下：
const data = {
  nodes: [
    {
      id: 'node1',
      type: 'xml-card', // 使用自定义的节点名称
      metric: 'CPU usage',
      cpuUsage: 80,
    },
  ],
};

// 定义进度条的绘制方式
const percentageBar = ({ width, used, height = 12 }) => `
  <rect style={{
    marginLeft: 10,
    marginTop: 3,
    width: ${width},
    height: ${height},
    fill: '#fff',
    stroke: '#1890ff'
  }} name="body" >
    <rect style={{
      marginLeft: 10,
      width: ${(width / 100) * used},
      height: ${height},
      fill: '#1890ff',
      stroke: '#1890ff'
    }}/>
  </rect>
`;

// 定义节点的 jsx 绘制方式
const textXML = (cfg) => `
<group>
  <rect style={{
    width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
  }}>
    <text style={{ marginTop: 2, marginLeft: 50, 
			textAlign: 'center',
			fontWeight: 'bold', 
			fill: '#fff' }}>${cfg.id}</text>
  </rect>
  <rect style={{ width: 100, height: 80, fill: 'rgba(24,144,255,0.15)', 
		radius: [0, 0, 6, 6] }} 
		keyshape="true" 
		cursor="move">
    <text style={{marginLeft: 10 ,fill: 'red'}}>FULL</text>
    <text style={{ marginTop: 5, marginLeft: 10, fill: '#333'}}>${cfg.metric}: </text>
    <text style={{
      marginTop: 1,
      marginLeft: ${cfg.cpuUsage * 0.8},
      fontSize: 10,
      fill: '#1890ff',
    }}>${cfg.cpuUsage}%</text>
    ${percentageBar({ width: 80, used: cfg.cpuUsage })}
  </rect>
</group>
`;

// 注册节点
G6.registerNode('xml-card', {
  jsx: textXML,
});
```

效果如下图所示：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PM5zTa1u1usAAAAAAAAAAAAAARQnAQ' />
