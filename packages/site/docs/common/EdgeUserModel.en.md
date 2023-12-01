### type

**Type**: `string`

The rendering type of the edge, which can be a registered edge type on the graph, with the built-in and default registered types being `'line-edge'` and `'loop-edge'`. The default value is `'line-edge'`.

### visible

**Type**: `boolean`

Whether the edge is displayed by default.

### color

**Type**: `string`

The theme color of the main shape (keyShape) of the edge, with a value in hexadecimal string format.

### label

**Type**: `string`

The text content of the `labelShape` of the edge.

<embed src="./DataIcon.en.md"></embed>

### sourceAnchor

**Type**: `number`

The `anchorPoints` on the source node indicate the allowed positions where related edges can connect, and is an array. The `sourceAnchor` of the edge indicates which anchor point to connect to when the edge connects to the starting point, corresponding to the index of the corresponding position in the `anchorPoints` of the source node.

### targetAnchor

**Type**: `number`

The `anchorPoints` on the target node indicate the allowed positions where related edges can connect, and is an array. The `targetAnchor` of the edge indicates which anchor point to connect to when the edge connects to the ending point, corresponding to the index of the corresponding position in the `anchorPoints` of the target node.
