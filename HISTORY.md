# History

---


## v1.0.0

`2017-03-31`

* feat:    新增 fitView 视口配置项
* feat:    新增 graph.zoom() 缩放接口
* feat:    新增 wheelZoomHideEdges 滚轮缩放边隐藏行为
* feat:    新增 dragHideEdges 拖动边隐藏行为
* feat:    新增 graph.filterBehaviour() 过滤行为接口
* feat:    新增 graph.addBehaviour() 增加行为接口
* feat:    新增 graph.changeLayout() 更改布局
* feat:    新增 read 读接口，重定义 save 保存接口
* feat:    新增 graph.snapshot 快照功能 graph.downloadImage 导出图片功能
* feat:    新增 graph.autoSize() 自动缩放画布尺寸
* feat:    新增 graph.focusPoint() 聚焦某点
* feat:    新增 tree 树图、net 网图
* feat:    新增 交互机制 事件 => 行为 => 模式
* feat:    新增 动画机制
* feat:    新增 itemmouseleave、itemmouseenter 事件
* remove:  去除 graph.refresh()
* remove:  去除 graph.changeNodes()
* remove:  去除 graph属性 zoomable、dragable、resizeable、selectable
* improve: 锚点机制，更快、更强
* improve: 不再抛出 G6.GraphUtil 方法，全部统一成 G6.Util
* improve: 替换 g-canvas-core => g-canvas 性能提升
* improve: 移除 Global.nodeBoxStyle 改用 Global.nodeAcitveBoxStyle
* improve: 小写事件名 afterAdd => afteradd
* improve: G6.Graph 沉为抽象类

## v0.2.3

`2017-03-2`

* fix:     dragable 可用于控制默认模式下是否可拖动画布
* feat:    新增 graph.converPoint() 转置点方法
* feat:    新增 graph.autoSize()
* feat:    新增 rightmousedown leftmousedown wheeldown 事件
* improve: 用tyr catch 防御getPoint由于path长度为零出错

## v0.2.2

`2017-02-24`

* fix:     tooltip css padding 加px
* fix:     tooltip 单子段映射错误
* fix:     精确截取点错误
* fix:     双精屏下缩放点错误
* fix:     包围盒应该 apply keyShape 父元素
* feat:    新增 afterAdd 事件
* feat:    新增 dblclick 事件
* improve: width、height 默认null
* improve: 节点不再使用hovershape
* improve: tooltip 增加防御机制

## v0.2.1

`2017-02-14`

* fix:     添加节点时增加rollback
* fix:     计算包围盒apply父容器变换
* feat:    新增 waterPath 水波路径算法
* feat:    新增 tooltip 提示信息
* feat:    新增 mouseover 事件
* feat:    新增 multiSelectable 配置项，默认关闭，关闭时选择模式开启空白处拖动功能
* feat:    width 没设置时自动forceFit 为 true
* improve: zoomable、dragable、resizeable、selectable 默认为 true

## v0.2.0

`2017-02-07`

* feat:    新增 精确逼近锚点机制
* feat:    新增 GraphUtil.getEllipsePath 点集到椭圆Path
* feat:    新增 GraphUtil.pointsToPolygon 点集到多边形Path
* feat:    新增 GraphUtil.pointsToBezier 点集到贝塞尔曲线Path
* feat:    新增 GraphUtil.snapPreciseAnchor 获取精准锚点方法
* feat:    新增 GraphUtil.arrowTo  箭头旋转方法
* feat:    新增 GraphUtil.drawEdge 画边方法
* feat:    新增 bezierQuadratic 二阶贝塞尔曲线
* feat:    新增 node.show 显示节点
* feat:    新增 node.hide 隐藏节点
* feat:    新增 node.getLinkNodes 获取相连的节点
* feat:    新增 node.getUnLinkNodes 获取不相连的节点
* feat:    新增 node.getRelativeItems 获取相关的子项
* feat:    新增 node.getUnRelativeItems 获取不相关的子项
* feat:    新增 edge.show 显示边
* feat:    新增 edge.hide 隐藏边
* feat:    新增 Shape afterDraw 接口
* improve: 改进贝塞尔曲线控制点位置
* improve: grpah.delete => graph.del
* improve: 添加 id 重复抛出异常

## v0.1.4

`2017-01-17`

* fix:     拖动节点时委托中心应是bbox中心
* fix:     所有排序算法采用基数排序，保持层级稳定
* fix:     边的id自动生成机制才用随机数
* feat:    边支持层级排序，边文本会排在最上层
* feat:    注册边时，如果不指定继承形，则尝试从注册形获取继承形

## v0.1.3

`2017-01-15`

* fix:     所有assistGrid在进行操作时，判断该对象是否存在
* feat:    rollback 增加判断，默认不开启回退机制
* feat:    新增style 映射通道
* feat:    getAnchorPoints 不存在 或者 返回为假时 取线段交点
* feat:    新增边水平曲线bezierHorizontal、竖直曲线bezierVertical
* improve: 默认交互行为结束后触发 'eventEnd' 事件

## v0.1.2

`2017-01-12`

* fix:  更新网格时需要判定配置项grid
* fix:  graphContainer 不设置自己的宽高 由内部canvas撑大
* fix:  添加edges时若无target或source则不添加edge
* fix:  changeSize() 设置最大限容错
* feat: graph.get('el') 获取最上层canvas DOM
* feat: 事件抛出当前shape

## v0.1.1

`2017-01-09`

* feat: 修改 graph 的入口为 G6.Graph

## v0.1.0

`2017-01-07`

* feat: 抛出颜色计算库
* feat: 添加快捷键操作
* feat: updo、redo
* feat: 复制、粘贴
* feat: 重置缩放、自动缩放
* feat: 树图、线性图、桑基图、流图布局
* feat: 业务流程图封装
* feat: 时序图封装
* feat: 鼠标交互：单选、框选
* feat: 鼠标交互：节点变形
* feat: 鼠标交互：边变形
* feat: 鼠标交互：节点、边拖拽交互
* feat: 鼠标交互：边链接到锚点
* feat: 鼠标交互：画布拖拽
* feat: 鼠标交互：画布缩放
* feat: 添加模式选择
* feat: 集成 g-graph
