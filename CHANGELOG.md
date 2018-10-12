# ChangeLog

---

#### 2.1.3

`2018-09-27`

* feat: add label rotate
* feat: if there is no items the graph box equal canvas size

#### 2.1.2

`2018-09-19`

* fix: dom getShape bug.Closes #472
* fix: template.maxSpanningForest bug

#### 2.1.1

`2018-09-17`

* fix: tool.highlightSubgraph calculate box bug
* fix: plugin.grid.Closes #479
* chore(dev): upgrade babel & torchjs

#### 2.1.0

`2018-09-03`

* feat: svg render
* feat: plugin.layout.forceAtlas2
* feat: plugin.tool.fisheye 
* feat: plugin.tool.textDisplay
* feat: plugin.tool.grid
* feat: plugin.template.tableSankey
* feat: plugin.edge.polyline

#### 2.0.5

`2018-07-12`

improve: add g6 arrow

#### 2.0.4

`2018-07-12`

* feat: layout export group.Closes #355
* feat(plugin): add tool.tooltip. Closes #360.
* style: change the calling way of forceAtlas2 on template.maxSpanningForest
* fix: origin tree data collapsed is true tree edge visible bug.Closes #357
* fix: remove the forceAtlas.js in template.maxSpanningForest, use forceAtlas from layout.forceAtlas2
* fix: add demos: plugin-fisheye, plugin-forceAtlas2, gallery-graphanalyzer
* fix: add demos: plugin-forceAtlas2, plugin-fisheye

#### 2.0.3

`2018-06-29`

* feat: update g to 3.0.x. Closes #346
* fix: group should use rect intersect box. Close #297
* fix(plugin): dagre edge controlpoints remove start point and end point
* style: remove some annotations
* chore: update torchjs && improve demo name

#### 2.0.2

`2018-06-13`

* chore(plugin): require g6 by src/index
* chore(dev test): remove useless test script
* fix(plugin) minimap destroy Closes #308
* fix(saveImage) saveImage bug
* fix(event): fix dom coord. Closes #305

## v2.0.1

`2018-06-11`

* fix:      reDraw edge after layout
* feat:     add quadraticCurve config cpd
* feat:     add beforelayout && afterlayout event
* chore:    .travis.yml add add Node.js
* chore:    .travis.yml cache node_modules

## v2.0.0

`2018-06-06`

* refactor: 重构架构 && 代码

## v1.2.1

`2018-03-15`

* feat:     新增 layout 接口

## v1.2.0

`2018-01-15`

* fix:      修复 nodeActivedBoxStyle 拼写错误
* fix:      修复 删除环时报错
* fix:      修复 右键后再移动鼠标触发 dragstart
* feat:     新增 统一布局机制到 Graph
* feat:     新增 插件机制
* feat:     新增 数据过滤机制
* feat:     新增 激活态接口
* feat:     新增 行为 wheelZoomAutoLabel
* feat:     新增 graph 配置项 preciseAnchor
* remove:   移除 Global.preciseAnchor
* remove:   移除 Layout.Flow、Layout.Force
* improve:  改进 html 容器策略

## v1.1.6

`2017-10-15`

* fix:      修复 布局算法包中的打包问题

## v1.1.5

`2017-09-15`

* fix:      修复 dragCanvas 在 mousemove 才设置拾取实效，否则会影响点击事件
* fix:      修复 将 node 的 activeRectBox 的拾取设置为false

## v1.1.4

`2017-08-15`

* feat:     新增 graph.invertPoint() 转置点
* feat:     新增 锚点第三个配置参数 此后锚点支持设置样式、悬浮样式、是否可以连接
* feat:     新增 item.getGroup()
* feat:     新增 事件 afteritemrender、itemremove、itemadd
* feat:     新增 行为信号量 behaviourSignal
* improve:  改进 画布聚焦时 mouseWheel 才生效

## v1.1.3

`2017-08-8`

* feat:     新增 Graph 配置项 useNodeSortGroup，用于配置节点组是否使用排序组
* feat:     新增 Global.nodeDelegationStyle, Global.edgeDelegationStyle 边和节点可独立配置委托图形
* fix:      修复 事件 itemremove 销毁前触发

## v1.1.2

`2017-08-01`

* feat:     新增 行为 dragBlankX dragBlankY

## v1.1.1
`2017-07-18`

* improve:  改进 添加 dragNode 保护机制

## v1.1.0

`2017-07-05`

* feat:     新增 HTML 节点
* feat:     新增 映射支持直接传入 callback
* feat:     新增 Graph 接口 updateMatrix、changeSize、showAnchor、hideAnchor、updataNodesPosition
* feat:     新增 工具方法 Util.isNode()、Util.isEdge()
* feat:     新增 Shape polyLineFlow
* feat:     新增 行为 dragEdgeEndHideAnchor、dragNodeEndHideAnchor、hoverAnchorSetActived、hoverNodeShowAnchor

## v1.0.7

`2017-06-21`

* fix:      修复 第一次 draw 时 16ms 内多画一下
* improve:  改进 edit 模式下怎家滚轮缩放限制

## v1.0.6

`2017-06-15`

* fix:      修复 兼容部分 机型 window 下 chrome 首次点击出发 mousemove 导致click事件不正确
* feat:     新增 支持尺寸不变图形
* feat:     新增 analysis 分析模式
* feat:     新增 updateNodesPositon 批量更新节点位置方法
* improve:  改进 useAnchor 改为 边 edge 的配置项

## v1.0.5

`2017-06-01`

* feat:     新增 downloadImage 支持传入保存的文件名
* feat:     新增 tooltip 边距自动检测
* improve:  改进 拖拽移出画布时拖拽行为中止

## v1.0.4

`2017-05-20`

* fix:      修复 tree changeData Bug
* fix:      修复 getAnchorPoints 返回 auto 时锚点取直线与包围盒的截取点
* fix:      修复 node label 无法生成的判定条件为 isNull
* feat:     新增 增加视口参数 tl、tc、tr、rc、br、bc、bl、lc、cc
* improve:  改进 减小 tolerance 数值，以提高线段截取精准度
* improve:  改进 tooltip 事件机制，提升性能

## v1.0.3

`2017-05-10`

* feat:     新增 graph.guide().link() 添加 link 辅助元素

## v1.0.2

`2017-05-10`

* fix:      修复 Object.values => Util.getObjectValues
* fix:      修复 anchorPoints 为 auto 时，edge上就算传了anchorpoint，也返回截取点
* fix:      修复 tree 更新接口 Bug
* improve:  改进 位置信息用 group.transfrom() 来表示

## v1.0.1

`2017-04-22`

* fix:      修复 复制、粘贴 bug
* feat:     新增 控制 16s 内只 draw 一次
* feat:     新增 事件 itemactived itemunactived itemhover itemupdate itemmouseenter itemmouseleave
* improve:  改进 框选行为激活图形前，应清楚之前图形的激活
* improve:  改进 dragAddEdge 行为，可链接到锚点
* improve:  改进 优化动画性能

## v1.0.0

`2017-03-31`

* feat:     新增 fitView 视口配置项
* feat:     新增 graph.zoom() 缩放接口
* feat:     新增 wheelZoomHideEdges 滚轮缩放边隐藏行为
* feat:     新增 dragHideEdges 拖动边隐藏行为
* feat:     新增 graph.filterBehaviour() 过滤行为接口
* feat:     新增 graph.addBehaviour() 增加行为接口
* feat:     新增 graph.changeLayout() 更改布局
* feat:     新增 read 读接口，重定义 save 保存接口
* feat:     新增 graph.snapshot 快照功能 graph.downloadImage 导出图片功能
* feat:     新增 graph.autoSize() 自动缩放画布尺寸
* feat:     新增 graph.focusPoint() 聚焦某点
* feat:     新增 tree 树图、net 网图
* feat:     新增 交互机制 事件 => 行为 => 模式
* feat:     新增 动画机制
* feat:     新增 itemmouseleave、itemmouseenter 事件
* remove:   去除 graph.refresh()
* remove:   去除 graph.changeNodes()
* remove:   去除 graph属性 zoomable、dragable、resizeable、selectable
* improve:  改进 锚点机制，更快、更强
* improve:  改进 不再抛出 G6.GraphUtil 方法，全部统一成 G6.Util
* improve:  改进 替换 g-canvas-core => g-canvas 性能提升
* improve:  改进 移除 Global.nodeBoxStyle 改用 Global.nodeAcitveBoxStyle
* improve:  改进 小写事件名 afterAdd => afteradd
* improve:  改进 G6.Graph 沉为抽象类

## v0.2.3

`2017-03-2`

* fix:      修复 dragable 可用于控制默认模式下是否可拖动画布
* feat:     新增 graph.converPoint() 反置点方法
* feat:     新增 graph.autoSize()
* feat:     新增 rightmousedown leftmousedown wheeldown 事件
* improve:  改进 用tyr catch 防御getPoint由于path长度为零出错

## v0.2.2

`2017-02-24`

* fix:      修复 tooltip css padding 加px
* fix:      修复 tooltip 单子段映射错误
* fix:      修复 精确截取点错误
* fix:      修复 双精屏下缩放点错误
* fix:      修复 包围盒应该 apply keyShape 父元素
* feat:     新增 afterAdd 事件
* feat:     新增 dblclick 事件
* improve:  改进 width、height 默认null
* improve:  改进 节点不再使用hovershape
* improve:  改进 tooltip 增加防御机制

## v0.2.1

`2017-02-14`

* fix:      新增 添加节点时增加rollback
* fix:      新增 计算包围盒apply父容器变换
* feat:     新增 waterPath 水波路径算法
* feat:     新增 tooltip 提示信息
* feat:     新增 mouseover 事件
* feat:     新增 multiSelectable 配置项，默认关闭，关闭时选择模式开启空白处拖动功能
* feat:     新增 width 没设置时自动forceFit 为 true
* improve:  改进 zoomable、dragable、resizeable、selectable 默认为 true

## v0.2.0

`2017-02-07`

* feat:     新增 精确逼近锚点机制
* feat:     新增 GraphUtil.getEllipsePath 点集到椭圆Path
* feat:     新增 GraphUtil.pointsToPolygon 点集到多边形Path
* feat:     新增 GraphUtil.pointsToBezier 点集到贝塞尔曲线Path
* feat:     新增 GraphUtil.snapPreciseAnchor 获取精准锚点方法
* feat:     新增 GraphUtil.arrowTo  箭头旋转方法
* feat:     新增 GraphUtil.drawEdge 画边方法
* feat:     新增 bezierQuadratic 二阶贝塞尔曲线
* feat:     新增 node.show 显示节点
* feat:     新增 node.hide 隐藏节点
* feat:     新增 node.getLinkNodes 获取相连的节点
* feat:     新增 node.getUnLinkNodes 获取不相连的节点
* feat:     新增 node.getRelativeItems 获取相关的子项
* feat:     新增 node.getUnRelativeItems 获取不相关的子项
* feat:     新增 edge.show 显示边
* feat:     新增 edge.hide 隐藏边
* feat:     新增 Shape afterDraw 接口
* improve:  改进 改进贝塞尔曲线控制点位置
* improve:  改进 grpah.delete => graph.del
* improve:  改进 添加 id 重复抛出异常

## v0.1.4

`2017-01-17`

* fix:      修复 拖动节点时委托中心应是bbox中心
* fix:      修复 所有排序算法采用基数排序，保持层级稳定
* fix:      修复 边的id自动生成机制才用随机数
* feat:     新增 边支持层级排序，边文本会排在最上层
* feat:     新增 注册边时，如果不指定继承形，则尝试从注册形获取继承形

## v0.1.3

`2017-01-15`

* fix:      修复 所有assistGrid在进行操作时，判断该对象是否存在
* feat:     新增 rollback 增加判断，默认不开启回退机制
* feat:     新增 新增style 映射通道
* feat:     新增 getAnchorPoints 不存在 或者 返回为假时 取线段交点
* feat:     新增 新增边水平曲线bezierHorizontal、竖直曲线bezierVertical
* improve:  改进 默认交互行为结束后触发 'eventEnd' 事件

## v0.1.2

`2017-01-12`

* fix:      修复 更新网格时需要判定配置项grid
* fix:      修复 graphContainer 不设置自己的宽高 由内部canvas撑大
* fix:      修复 添加edges时若无target或source则不添加edge
* fix:      修复 changeSize() 设置最大限容错
* feat:     新增 graph.get('el') 获取最上层canvas DOM
* feat:     新增 事件抛出当前shape

## v0.1.1

`2017-01-09`

* feat:     新增 graph 的入口为 G6.Graph

## v0.1.0

`2017-01-07`

* feat:     新增 抛出颜色计算库
* feat:     新增 添加快捷键操作
* feat:     新增 updo、redo
* feat:     新增 复制、粘贴
* feat:     新增 重置缩放、自动缩放
* feat:     新增 树图、线性图、桑基图、流图布局
* feat:     新增 业务流程图封装
* feat:     新增 时序图封装
* feat:     新增 鼠标交互：单选、框选
* feat:     新增 鼠标交互：节点变形
* feat:     新增 鼠标交互：边变形
* feat:     新增 鼠标交互：节点、边拖拽交互
* feat:     新增 鼠标交互：边链接到锚点
* feat:     新增 鼠标交互：画布拖拽
* feat:     新增 鼠标交互：画布缩放
* feat:     新增 添加模式选择
* feat:     新增 集成 g-graph
