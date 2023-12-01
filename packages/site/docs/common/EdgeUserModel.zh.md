### type

**类型**：`string`

边的渲染类型，可以是已经注册到图类上的边类型，内置并默认注册的有 `'line-edge'`，`'loop-edge'`。默认为 `'line-edge'`。

### visible

**类型**：`boolean`

边是否默认展示出来。

### color

**类型**：`string`

该边的主图形（keyShape）的主题色，值为十六进制字符串。

### label

**类型**：`string`

边 labelShape 的文本内容。

<embed src="./DataIcon.zh.md"></embed>

### sourceAnchor

**类型**：`number`

起点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `sourceAnchor` 表示了这条边连入起点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。

### targetAnchor

**类型**：`number`

终点节点上 `anchorPoints` 表示允许相关边连入的位置，是一个数组。而边的 `targetAnchor` 表示了这条边连入终点时选择哪个锚点连入，对应了起点节点上 `anchorPoints` 对应位置的序号。
