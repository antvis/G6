import { getIntl } from './common';

export const PageTitle: Record<string, string[]> = {
  // graph
  GraphOptions: ['Options', '配置项'],
  GraphMethods: ['API', '方法'],
  GraphProperties: ['Properties', '属性'],
  // element
  ElementMethods: ['API', '方法'],
  // element/node
  BaseNode: ['BaseNode', '节点通用样式属性'],
  Circle: ['Circle', '圆形'],
  Diamond: ['Diamond', '菱形'],
  Donut: ['Donut', '甜甜圈'],
  Ellipse: ['Ellipse', '椭圆形'],
  Hexagon: ['Hexagon', '六边形'],
  Html: ['Html', 'HTML'],
  Image: ['Image', '图片'],
  Rect: ['Rect', '矩形'],
  Star: ['Star', '五角形'],
  Triangle: ['Triangle', '三角形'],
  // element/edge
  BaseEdge: ['BaseEdge', '边通用样式属性'],
  Cubic: ['Cubic', '三次贝塞尔曲线'],
  CubicHorizontal: ['CubicHorizontal', '水平三次贝塞尔曲线'],
  CubicVertical: ['CubicVertical', '垂直三次贝塞尔曲线'],
  Line: ['Line', '直线'],
  Polyline: ['Polyline', '折线'],
  Quadratic: ['Quadratic', '二次贝塞尔曲线'],
  // element/combo
  BaseCombo: ['BaseCombo', '组合基础样式属性'],
  CircleCombo: ['Circle', '圆形'],
  RectCombo: ['Rect', '矩形'],
  // layout
  AntvDagreLayout: ['AntvDagre', '布局'],
  CircularLayout: ['Circular', '环形布局'],
  ComboCombinedLayout: ['ComboCombined', '复合布局'],
  ConcentricLayout: ['Concentric', '同心圆布局'],
  D3Force3DLayout: ['D3Force3D', '3D 力导向布局'],
  D3ForceLayout: ['D3Force', '力导向布局'],
  DagreLayout: ['Dagre', '层次布局'],
  ForceAtlas2Layout: ['ForceAtlas2', '力导向布局'],
  ForceLayout: ['Force', '力导向布局'],
  FruchtermanLayout: ['Fruchterman', '力导向布局'],
  GridLayout: ['Grid', '网格布局'],
  MdsLayout: ['Mds', '高维数据降维布局'],
  RadialLayout: ['Radial', '镭射布局'],
  RandomLayout: ['Random', '随机布局'],
  // behaviors
  BaseBehavior: ['BaseBehavior', '基础交互'],
  BrushSelect: ['BrushSelect', '框选'],
  ClickElement: ['ClickElement', '点击选中'],
  CollapseExpand: ['CollapseExpand', '展开折叠Combo'],
  CreateEdge: ['CreateEdge', '创建边'],
  DragCanvas: ['DragCanvas', '拖拽画布'],
  DragElement: ['DragElement', '拖拽元素'],
  DragElementForce: ['DragElementForce', '力导向拖拽元素'],
  FocusElement: ['FocusElement', '聚焦元素'],
  HoverElement: ['HoverElement', '悬停激活'],
  LassoSelect: ['LassoSelect', '套索选择'],
  ZoomCanvas: ['ZoomCanvas', '缩放画布'],
  // plugins
  BubbleSets: ['BubbleSets', '气泡集'],
  CameraSetting: ['CameraSetting', '相机设置'],
  ContextMenu: ['ContextMenu', '右键菜单'],
  GridLine: ['GridLine', '网格线'],
  History: ['History', '历史记录'],
  Hull: ['Hull', '轮廓包围'],
  Legend: ['Legend', '图例'],
  Toolbar: ['Toolbar', '工具栏'],
  Tooltip: ['Tooltip', '提示框'],
  Watermark: ['Watermark', '水印'],
  Timebar: ['Timebar', '时间条'],
  Contextmenu: ['Contextmenu', '上下文菜单'],
};

// 节点、边、Combo 的中英文对照
export const ElementLocale: Record<string, string[]> = {
  node: ['Node', '节点'],
  edge: ['Edge', '边'],
  combo: ['Combo', '组合'],
};

export const getElementIntl = getIntl(ElementLocale);
