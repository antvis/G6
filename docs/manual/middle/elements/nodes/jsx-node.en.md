---
title: Use JSX-like syntax to customize G6 nodes
order: 4
---

When using G6.registerNode to customize a node, if the second parameter is a string or a function that returns a string, we can use JSX-like syntax to customize the node.

#### Basic grammar

```
<[group|shape] [key]="value" style={{ [key]: value }}>
  <[more tag] /> ...
  <text>value</text>
</[group|shape]>
```

The basic syntax is basically the same as the familiar html markup language. Use shape or group by tag name. At the same time, when defining shape, you need to fill in the attributes of shape. Attrs that define the shape style are expressed by the style attribute. The structure in style is an Object, and the value of the object can be a string, number, and other data types supported by JSON (note that it cannot be a function here, and a function will only cause parsing errors).

Reference for the type and style of custom nodes: https://g6.antv.vision/zh/docs/api/nodeEdge/shapeProperties
Among them, for relative positioning, we newly added **marginTop** and **marginLeft** to define the gap between the left and top.

#### Recommended usage

- Wrap the group tag on the outermost layer
- use single quotes
- recommended to use the template syntax of ${}
- recommended to use marginTop and marginLeft for relative positioning in graphics

#### Supported tags

When using JSX-like syntax to customize G6 nodes, the following tags are supported:

- group
- rect
- circle
- text
- path
- line
- points
- polygon
- polyline
- image

Use tags to customize nodes. All style attributes are written in style. Name, keyShape, etc. are at the same level as style, and the supported attributes are exactly the same as those in addShape.

**Special Note**: When using JSX-like grammar to customize G6 node, the attribute in style does not support function, so when using JSX-like grammar to customize a node, the marker tag is currently not supported.

#### Case

using JSX-like syntax to customize a simple rectangle.

```javascript
G6.registerNode('rect-xml', (cfg) => `
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
`)
```

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*E3UGRq1m-wYAAAAAAAAAAAAAARQnAQ' />

using JSX-like syntax to customize a more complicated case.

```javascript
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
      width: ${width / 100 * used},
      height: ${height},
      fill: '#1890ff',
      stroke: '#1890ff'
    }}/>
  </rect>
`

const textXML = cfg => `
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
    <text style={{marginLeft: 10 ,fill: "red"}}>${FULL}</text>
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

G6.registerNode('test', textXML);

```

Results:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PM5zTa1u1usAAAAAAAAAAAAAARQnAQ' />
