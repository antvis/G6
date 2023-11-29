### type

**类型**：`string`

节点的渲染类型，可以是已经注册到图类上的节点类型，内置并默认注册的有 `'circle-node'`，`'rect-node'`，`'image-node'`。

### x

**类型**：`number`

节点的 x 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### y

**类型**：`number`

节点的 y 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### z

**类型**：`number`

对于 2D 的图，不需要指定 z 值。若指定可能导致 WebGL 渲染器下节点看不见。在 3D 图中，z 值是必须的，代表节点的 z 轴位置。若未指定节点位置，且未为图实例配置 `layout`（布局），则节点可能被渲染在画布左上角。

### visible

**类型**：`boolean`

节点是否默认展示出来。

### color

**类型**：`string`

该节点主图形（keyShape）的主题色，值为十六进制字符串。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 keyShape 以及各种图形的图形样式。

### label

**类型**：`string`

节点 labelShape 的文本内容。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 labelShape 的 text 值或其他图形样式。

<embed src="./Badges.zh.md"></embed>

<embed src="./DataIcon.zh.md"></embed>

### anchorPoints

**类型**：`number[][]`

该节点四周连接图形的位置，也是边连入的位置。若不配置，边则自动寻找节点边缘最近的位置进行连接。例如 `[[0,0.5],[1,0.5]]`，数字表示在 x 或 y 方向上相对于节点主图形（keyShape）的百分比位置。为方便简单配置而提供，更多的样式配置应当在 Graph 实例的节点 mapper 中配置 anchorShapes 的图形样式。

### parentId

**类型**：`string | number`

在有 combo 的图上表示该节点所属的 combo 的 id。

### isRoot

**类型**：`boolean`

若要将该份数据作为树图展示，同时使用树图布局时，指定该节点是否为树的根节点之一。

### preventPolylineEdgeOverlap

**类型**：`boolean`

是否将该节点作为一个障碍物，使 `'polyline-edge'` 类型的边躲避。默认为 `false`。
