---
title: Use JSX-like syntax to customize G6 nodes
order: 4
---

In G6 V3.7.0 and later version, user are allow to use JSX-like syntax to customize the node by assigning the second parameter of G6.registerNode a string or function that returns a string.

#### Basic Grammar

```
<[group|shape] [key]="value" style={{ [key]: value }}>
  <[more tag] /> ...
  <text>value</text>
</[group|shape]>
```

The basic syntax is almost the same as the familiar HTML markup language, where you can use shape or group by a tag. At the same time, you need to assign the attributes for defining a shape. Style attributes are grouped to an object, whose items' value can be `string`, `number`, and others supported by JSON (note that it cannot be a function here, which will cause parsing errors).

Reference for the type and style of custom nodes: https://g6-v4.antv.vision/api/shape-properties Among them, for relative positioning, we newly added **marginTop** and **marginLeft** to define the gap between the left and top.

#### Recommended Usage

- Wrap the group tag on the outermost layer
- Use single quotes
- Use the template syntax of \${}
- Use `marginTop` and `marginLeft` for relative position graphics
- Using `next: inline` on last shape let next shape follow on the right

#### Supported tags

When using JSX-like syntax to customize G6 nodes, the following tags are supported:

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

Use tags to customize nodes. All style attributes are written in style. Name, keyShape, etc. are at the same level as style, and the supported attributes are exactly the same as those in addShape.

**Special Note**: When using JSX-like grammar to customize a G6 node, the attributes in style do not support function. That is, the marker tag is currently not supported.

#### Case

Using JSX-like syntax to customize a simple rectangle.

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

Using JSX-like syntax to customize a complicated node.

```javascript
// Propose the data for a node as following:
const data = {
  nodes: [
    {
      id: 'node1',
      type: 'xml-card', // the custom node's type name
      metric: 'CPU usage',
      cpuUsage: 80,
    },
  ],
};

// def for the drawing of the percentage bar
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

// def for the drawing of the jsx node
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

// register the custom node to G6
G6.registerNode('test', {
  jsx: textXML,
});
```

Results:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PM5zTa1u1usAAAAAAAAAAAAAARQnAQ' />
