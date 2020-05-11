# ChangeLog

#### 3.4.10
- fix: TreeGraphData type with style and stateStyles;
- fix: wrong controlpoint position for bezier curves with getControlPoint.

#### 3.4.9
- fix: transplie d3-force to support IE11.

#### 3.4.8
- feat: update the keyShape type minimap when the node or edge's style is updated;
- fix: problem about switching to another applications or browser menu and then switch back, the drag-canvas does not take effect;
- fix: fix the problem about fail to render the graph when the animate and fitView are true by turn off the animate for rendering temporary;
- fix: curveOffset for arc, quadratic, cubic edge.

#### 3.4.7
- feat: downloadFullImage when the (part of) graph is out of the screen;
- feat: With pre-graph has no layout configurations and no positions in data, calling changeData to change into a new data with positions, results in show the node with positions in data;
- feat: allow user to assign curveOffset and curvePostion for Bezier curves;
- fix: moveTo wrong logic problem;
- fix: removeItem to update the minimap.

#### 3.4.6
- same as 3.4.5, published wrongly.

#### 3.4.5

- feat: background of the label on node or edge;
- feat: better performance of minimap;
- fix: minimap viewport displace problem;
- feat: offset of tooltip;
- fix: the length of the node's name affects the tree layout;
- fix: toFront does not work for svg renderer;
- fix: error occurs when the fontSize is smaller than 12 with svg renderer;
- fix: changeData clears states;
- fix: state does not work when default labelCfg is not assigned.

#### 3.4.4

- feat: background color for downloadImage and toDataURL;
- feat: support configure image for grid plugin;
- fix: initial position for fruchterman layout;
- refactor: clip for image node.
- fix: cubic with only one controlPoint error;
- fix: polyline without L attributes.

#### 3.4.3

- fix: support extends BehaviorOption;
- fix: click-select Behavior support multiple selection using ctrl key.

#### 3.4.2

- feat: zoom-canvas behavior supports hiding non-keyshape elements when scaling canvas;
- refactor: when the second parameter is null, clearItemStates will clear all states of the item;
- fix: (changeData bug)[https://github.com/antvis/G6/issues/1323];
- fix: update antv/hierarchy to fix fixedRoot for TreeGraph;
- fix: problem of a graph has multiple polyline edges;
- fix: problem of dagre with controlPoints and loop edges.

#### 3.4.1

- feat: force layout clone original data model to allow the customized properties;
- fix: BehaviorOptions type error;
- fix: fitView the graph with data whose nodes and edges are empty arrays;
- fix: rect node positions are changed after calling graph.changeData;
- fix: drag behavior is disabled when the keys are released invalidly;
- refactor: update G and the fill of custom arrow should be assigned by user.

#### 3.4.0

- feat: SVG renderer;
- refactor: new state mechanism with multiple values, sub graphics shape style settings.

#### 3.3.7

- feat: beforeaddchild and afteraddchild emit for TreeGraph;
- feat: built-in nodes' labels can be captured;
- fix: drag shadow caused by localRefresh, update the g-canvas version;
- fix: abnormal polyline bendding;
- fix: collapse-expand trigger problem;
- fix: update nodes with empty string label;
- fix: abnormal rendering when a graph has image nodes and other type nodes.

#### 3.3.6

- feat: support edge weight for dagre layout;
- feat: automatically add draggable to keyShape, users do not need to assign it when custom a node or an edge;
- fix: cannot read 0 or null problem in getPointByCanvas;
- fix: brush-select bug;
- fix: set autoDraw to canvas when graph's setAutoPaint is called;
- fix: modify the usage of bbox in view controller since the interface is chagned by G;
- fix: the shape.attr error in updateShapeStyle;
- fix: local refresh influence on changeData;
- refactor: upgrade g-canvas to 0.3.23 to solve lacking of removeChild function;
- doc: update the demo fo custom behavior doc;
- doc: add plugin demos and cases for site;
- doc: fix shouldUpdate problem in treeWithLargeData demo on the site.

#### 3.3.5

- fix: 3.3.4 is not published successfully;

#### 3.3.4

- fix: 3.3.3 is not published successfully;
- fix: delegate or keyShape type minimap does not display bug;
- fix: dragging bug on minimap with a graph whose bbox is nagtive;
- fix: null matrix bug, create a unit matrix for null.

#### 3.3.3

- fix: delegate or keyShape type minimap does not display bug;
- fix: null matrix in focus() and getLoopCfgs() bug.

#### 3.3.2

- fix: ts type export problem;
- fix: edge with endArrow and autoRotate label bug;
- fix: code prettier;
- fix: line with control points bug;
- fix: matrix null bug.

#### 3.3.1

- fix: resolve 3.3.0 compatibility problem.

#### 3.3.0

- Graph API
  - refactor: delete removeEvent function, use off;
- refactor: parameters of Shape animate changed, shape.animate(toAttrs, animateCfg) or shape.animate(onFrame, animateCfg);
- feat: descriptionCfg for modelRect to define the style of description by user;
- feat: update a node from without some shapes to with them, such as linkPoints, label, logo icon and state icon for modelRect;
- feat: the callback paramter of event nodeselectchange is changed to { target, selectedItems, ... };
- feat: support stateStyles in node and edge data;
- feat: calculate pixelRatio by G automatically, user do not need to assign it to graph instance;
- chore: G 4.0
- refactor: refreshLayout of TreeGraph is renamed as layout
- fix: no fan shape in G any more
- feat: recommand to assign name for each shape when addShape
- fix: do not support SVG renderer anymore. no renderer for graph configuration anymore
- refactor: plugins usage is changed into new G6.PluginName()

#### 3.2.7

- feat: supports create the group without nodes in node-group;
- fix: supports destoryed properties and fix issue 1094;

#### 3.2.6

- feat: supports sort the nodes on one circle according to the data ordering or some attribute in radial layout
- fix: grid layout with cols and rows
- feat: fix the nodes with position information in their original data and random the positions of others when the layout is not defined for graph

#### 3.2.5

- fix: click-select trigger error
- fix: solved position problem for minimap

#### 3.2.4

- fix: typescript compile error
- fix: delete sankey lib

#### 3.2.3

- fix: group position error
- fix: supports not set layout type

#### 3.1.5

- feat: supports g6 types file
- fix: set brush-select trigger param to ctrl not work
- fix: when set fitView to true, drag-group Behavior not get desired positon

#### 3.1.3

- feat: radial layout nonoverlap iterations can be controlled by user
- feat: add lock, unlock and hasLocked function, supports lock and unlock node
- fix: mds with discrete points problem
- fix: fruchterman-group layout title position for rect groups

#### 3.1.2

- feat: default behavior supports configuration trigger mode
- feat: node combining supports configuration title
- fix: update demo state styles

#### 3.1.1

- fix: update node use custom config
- fix: update demo
- feat: default node implement getShapeStyle function

#### 3.1.0

- feat: support for rich layouts：random, radial, mds, circular, fruchterman, force, dagre
- feat: more flexible configuration for shape
- feat: build-in rich default nodes
- feat: cases that provide layout and default nodes

#### 3.0.7-beta.1

`2019-09-11`

- fix: zoom-canvas support IE and Firefox

#### 3.0.6

`2019-09-11`

- fix: group data util function use module.exports
- feat: update @antv/hierarchy version

#### 3.0.5

`2019-09-10`

- feat: support add and remove group
- feat: support collapse and expand group
- feat: add graph api: collapseGroup and expandGroup

#### 3.0.5-beta.12

- feat: add rect group
- feat: add rect group demo
- feat: add chart node

---

#### 3.0.5-beta.10

- feat: add 5 chart node
- feat: collapse-expand tree support click and dblclick by trigger option
- fix: drag group bug fix

#### 3.0.5-beta.9

- feat: support render group
- feat: support drag group, collapse and expand group, drag node in/out group
- feat: add drag-group、collapse-expand-group and drag-node-with-group behavior
- feat: add drag-group and collapse-expand-group demo
- feat: add register list node demo

#### 3.0.5-beta.8

`2019-07-19`

- feat: add five demos
- refactor: update three behaviors

#### 2.2.5

`2018-12-20`

- feat: add saveimage limitRatio

#### 2.2.4

`2018-12-20`

- fix: bug fix

#### 2.2.3

`2018-12-10`

- fix: bug fix

#### 2.2.2

`2018-11-30`

- fix: tree remove guide will not getEdges.closes #521

#### 2.2.1

`2018-11-25`

- fix: Compatible with MOUSEWHEEL
- fix: fadeIn aniamtion
- fix: fix wheelZoom behaviour by removing the deprecated mousewheel event

#### 2.2.0

`2018-11-22`

- fix: Graph read zIndex
- refactor: Animation

#### 2.1.5

`2018-10-26`

- fix: svg pixelRatio bug
- feat: add wheel event

#### 2.1.4

`2018-10-06`

- fix: custom math.sign to compatible with ie browser.Closes #516.
- fix: legend component from @antv/component
- feat: update svg minimap && fix svg dom event

#### 2.1.3

`2018-09-27`

- feat: add label rotate
- feat: if there is no items the graph box equal canvas size

#### 2.1.2

`2018-09-19`

- fix: dom getShape bug.Closes #472
- fix: template.maxSpanningForest bug

#### 2.1.1

`2018-09-17`

- fix: tool.highlightSubgraph calculate box bug
- fix: plugin.grid.Closes #479
- chore(dev): upgrade babel & torchjs

#### 2.1.0

`2018-09-03`

- feat: svg render
- feat: plugin.layout.forceAtlas2
- feat: plugin.tool.fisheye
- feat: plugin.tool.textDisplay
- feat: plugin.tool.grid
- feat: plugin.template.tableSankey
- feat: plugin.edge.polyline

#### 2.0.5

`2018-07-12`

- improve: add g6 arrow

#### 2.0.4

`2018-07-12`

- feat: layout export group.Closes #355
- feat(plugin): add tool.tooltip. Closes #360.
- style: change the calling way of forceAtlas2 on template.maxSpanningForest
- fix: origin tree data collapsed is true tree edge visible bug.Closes #357
- fix: remove the forceAtlas.js in template.maxSpanningForest, use forceAtlas from layout.forceAtlas2
- fix: add demos: plugin-fisheye, plugin-forceAtlas2, gallery-graphanalyzer
- fix: add demos: plugin-forceAtlas2, plugin-fisheye

#### 2.0.3

`2018-06-29`

- feat: update g to 3.0.x. Closes #346
- fix: group should use rect intersect box. Close #297
- fix(plugin): dagre edge controlpoints remove start point and end point
- style: remove some annotations
- chore: update torchjs && improve demo name

#### 2.0.2

`2018-06-13`

- chore(plugin): require g6 by src/index
- chore(dev test): remove useless test script
- fix(plugin) minimap destroy Closes #308
- fix(saveImage) saveImage bug
- fix(event): fix dom coord. Closes #305

#### 2.0.1

`2018-06-11`

- fix: reDraw edge after layout
- feat: add quadraticCurve config cpd
- feat: add beforelayout && afterlayout event
- chore: .travis.yml add add Node.js
- chore: .travis.yml cache node_modules

#### 2.0.0

`2018-06-06`

- refactor: refactor architecture && code

#### 1.2.1

`2018-03-15`

- feat:    layout interface

#### 1.2.0

`2018-01-15`

- fix: nodeActivedBoxStyle spelling error
- fix: error when deleting a circle
- fix: trigger dragstart while right clicking and moveing
- feat: Unify Layout mechanism
- feat: Plugin mechanism
- feat: Data filter mechanism
- feat: Activated interface
- feat: Action wheelZoomAutoLabel
- feat: configuration of graph -- preciseAnchor
- remove: Global.preciseAnchor
- remove: Layout.Flow、Layout.Force
- improve: html container strategy

#### 1.1.6

`2017-10-15`

- fix: pack problem in layout algorithm

#### 1.1.5

`2017-09-15`

- fix: dragCanvas is effective while mousemove, prevent it from affecting click events
- fix: unactivate pick-up in activeRectBox of node

#### 1.1.4

`2017-08-15`

- feat: graph.invertPoint()
- feat: third configuration of anchor to support style setting, float style, connection
- feat: item.getGroup()
- feat: events -- afteritemrender、itemremove、itemadd
- feat: behaviourSignal
- improve: mouseWheel is affective after focusing the canvas

#### 1.1.3

`2017-08-8`

- feat: Graph configuration -- useNodeSortGroup
- feat: Global.nodeDelegationStyle, Global.edgeDelegationStyle, isolate the delegation of edge and node on graph
- fix: itemremove is triggered before destroying a graph

#### 1.1.2

`2017-08-01`

- feat: dragBlankX dragBlankY

#### 1.1.1

`2017-07-18`

- improve: dragNode protect mechanism

#### 1.1.0

`2017-07-05`

- feat: HTML node
- feat: mapper support callback function
- feat: Graph interfaces -- updateMatrix、changeSize、showAnchor、hideAnchor、updataNodesPosition
- feat:  tool functions -- Util.isNode()、Util.isEdge()
- feat: Shape polyLineFlow
- feat:  dragEdgeEndHideAnchor、dragNodeEndHideAnchor、hoverAnchorSetActived、hoverNodeShowAnchor

#### 1.0.7

`2017-06-21`

- fix: draw one more time in 16ms after first draw
- improve: add zoom by scroll in edit mode

#### 1.0.6

`2017-06-15`

- fix: compatible in chrome in windows. triggering mousemove after first click leads to wrong click event.
- feat: support fix size graphics
- feat: analysis mode
- feat: updateNodesPositon update a set of nodes' position
- improve: change useAnchor to be a configuration of edge

#### 1.0.5

`2017-06-01`

- feat: downloadImage support saving with name
- feat: automatically detect tooltip padding
- improve:  stop the action while mouse dragging out of the canvas

#### 1.0.4

`2017-05-20`

- fix: tree changeData Bug
- fix:  when getAnchorPoints returns auto, anchor is the intersection of edge and the bounding box
- fix: generate node label according to isNull
- feat: viewport parameters -- tl、tc、tr、rc、br、bc、bl、lc、cc
- improve: reduce tolerance to improve the accuracy of interception
- improve: improve tooltip event mechanisom to enhance performance

#### 1.0.3

`2017-05-10`

- feat: graph.guide().link()

#### 1.0.2

`2017-05-10`

- fix: Object.values => Util.getObjectValues
- fix:  when anchorPoints is auto, there is only anchorpoint on edge, it will also return the intersection
- fix: tree update interface Bug
- improve:  represent positions information by group.transfrom()

#### 1.0.1

`2017-04-22`

- fix: copy and paste bug
- feat: draw once in 16ms
- feat: itemactived itemunactived itemhover itemupdate itemmouseenter itemmouseleave
- improve: be clear the status of graphics before activating graphics by frame selection
- improve: dragAddEdge, linkable to anchor
- improve: performance of animation

#### 1.0.0

`2017-03-31`

- feat: fitView configurations
- feat:  graph.zoom()
- feat: wheelZoomHideEdges hide the edges while zooming by wheel
- feat: dragHideEdges hide the edge while dragging edge
- feat: graph.filterBehaviour()
- feat: graph.addBehaviour()
- feat:   graph.changeLayout()
- feat:  read interface, re-define save interface
- feat:  graph.snapshot, graph.downloadImage
- feat:  graph.autoSize()
- feat:  graph.focusPoint()
- feat: tree graph、net graph
- feat: interaction mechanism -- event => action => mode
- feat: animation mechanism
- feat: itemmouseleave、itemmouseenter
- remove: graph.refresh()
- remove: graph.changeNodes()
- remove: graph attributes -- zoomable、dragable、resizeable、selectable
- improve: anchor mechanism
- improve: hide G6.GraphUtil functions, unified in G6.Util
- improve: replace g-canvas-core to g-canvas to improve performance
- improve: Global.nodeAcitveBoxStyle instead of Global.nodeBoxStyle
- improve: afterAdd => afteradd
- improve: G6.Graph to be an abstract class

#### 0.2.3

`2017-03-2`

- fix: dragable for controlling dragable under default mode
- feat: graph.converPoint()
- feat: graph.autoSize()
- feat: rightmousedown leftmousedown wheeldown
- improve: use try catch to prevent the length of getPoint of path equals zero

#### 0.2.2

`2017-02-24`

- fix: add px totooltip css padding
- fix: tooltip mapping error
- fix: accurate intersection
- fix: zoom error on double accuracy screen
- fix: buonding box extended from keyShape
- feat:   afterAdd
- feat: dblclick
- improve: width、height default null
- improve: remove hovershape on node
- improve: tooltip defense mechanism

#### 0.2.1

`2017-02-14`

- fix: rollback when add node
- fix: apply tranformation of parent container while calculating bounding box
- feat: waterPath
- feat: tooltip tip information
- feat: mouseover
- feat: multiSelectable, default false
- feat:  set forceFit to true while width is undefined
- improve: zoomable、dragable、resizeable、selectable default true

#### 0.2.0

`2017-02-07`

- feat: accurate anchor mechanism
- feat: GraphUtil.getEllipsePath
- feat:  GraphUtil.pointsToPolygon
- feat: GraphUtil.pointsToBezier
- feat: GraphUtil.snapPreciseAnchor
- feat: GraphUtil.arrowTo
- feat: GraphUtil.drawEdge
- feat: bezierQuadratic
- feat: node.show
- feat: node.hide
- feat: node.getLinkNodes
- feat:  node.getUnLinkNodes
- feat: node.getRelativeItems
- feat: node.getUnRelativeItems
- feat: edge.show
- feat: edge.hide
- feat: Shape afterDraw
- improve:  the controlling point positions of Bezier Curve 改进贝塞尔曲线控制点位置
- improve: grpah.delete => graph.del
- improve: error when adding id

#### 0.1.4

`2017-01-17`

- fix: delegator of dragging a node is the center of bbox
- fix: use cardinality sort for all the sorting algorithm
- fix: random id on edges
- feat: level sort on edges, edge labels on the top level
- feat:  while extending shape is undefined when register an edge, find the extending shaoe automatically

#### 0.1.3

`2017-01-15`

- fix: judge the existance of the object while operating assistGrid
- feat: rollback judgement, default unactivate
- feat:  style mapping channel
- feat: return the intersections while getAnchorPoints is null or returns false
- feat:  bezierHorizontal、bezierVertical
- improve: 'eventEnd'

#### 0.1.2

`2017-01-12`

- fix: judge the configuration before updating grid
- fix: the size of graphContainer in unsetable, setted by inner canvas
- fix: will not add an edge if the target or source is undefined
- fix: changeSize() maximum tolerance for error
- feat: graph.get('el')  to get canvas DOM
- feat: event exposures shape

#### 0.1.1

`2017-01-09`

- feat: entrance of graph is G6.Graph

#### 0.1.0

`2017-01-07`

- feat: color calculation library
- feat: hot key
- feat: updo, redo
- feat: copy, paste
- feat: reset zoom, auto zoom
- feat: tree graph, linear graph, sankey graph, flow laout
- feat: flow chart package
- feat: timing diagram package
- feat: single selection, frame selection
- feat: node deformation
- feat:  edge deformation
- feat: drag node and edge
- feat: link edge and node
- feat: drag canvas
- feat: zoom
- feat: select mode
- feat: integrate g-graph
