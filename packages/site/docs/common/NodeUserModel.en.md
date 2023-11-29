### type

**Type**: `string`

Type: string The rendering type of the node. It can be a node type that has been registered with the graph class. Built-in and default registered types include `'circle-node'`, `'rect-node'`, and `'image-node'`.

### x

**Type**: `number`

Type: number The x-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### y

**Type**: `number`

The y-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### z

**Type**: `number`

For 2D graphs, there is no need to specify the z value. If it is specified, it may cause the node to be invisible under the WebGL renderer. In 3D graphs, the z value is required and represents the z-axis position of the node. If the node position is not specified and no `layout` is configured for the graph instance, the node may be rendered at the top left corner of the canvas.

### visible

**Type**: `boolean`

Whether the node is displayed by default.

### color

**Type**: `string`

The main color of the primary shape (keyShape) of the node, expressed as a hexadecimal string. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the keyShape and various shape styles are configured.

### label

**Type**: `string`

The text content of the label shape of the node. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the text value of the labelShape or other shape styles are configured.

<embed src="./Badges.en.md"></embed>

<embed src="./DataIcon.en.md"></embed>

### anchorPoints

**Type**: `number[][]`

The positions where the edges are connected to the node. If not configured, the edges will automatically find the nearest positions on the edge of the node for connection. For example, `[[0,0.5],[1,0.5]]`, where the numbers indicate the percentage position relative to the primary shape (keyShape) of the node in the x or y direction. This is provided for simple configuration. More style configurations should be done in the node mapper of the graph instance, where the shape styles of the anchorShapes are configured.

### parentId

**Type**: `string | number`

In a graph with combos, it indicates the ID of the combo to which the node belongs.

### isRoot

**Type**: `boolean`

If you want to display the data as a tree diagram and use tree layout at the same time, specify whether this node is one of the root nodes of the tree.

### preventPolylineEdgeOverlap

**Type**: `boolean`

Whether to treat this node as an obstacle and make it avoid the `'polyline-edge'` type of edges. The default value is `false`.
