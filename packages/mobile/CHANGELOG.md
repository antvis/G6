# ChangeLog

#### 4.0.3

- fix: state style restore for non-circle shapes;

#### 4.0.2

- fix: node and edge state style with update problem;
- fix: import lib problem;
- fix: import node module problem;
- fix: hidden shapes show up after zoom-canvas or drag-canvas with enableOptimize;
- fix: tooltip for combo;
- fix: update edge with false endArrow and startArrow;

#### 4.0.1

- fix: glslang problem;

#### 4.0.0-beta.0

- feat: fruchterman and gforce layout with gpu;
- feat: gforce;
- feat: updateChildren API for TreeGraph;
- feat: louvain clustering algorithm;
- feat: container of plugins with dom id;
- feat: label propagation clustering algorithm;
- feat: get color sets by subject color array;
- feat: canvas context menu;
- feat: stop gforce;
- feat: dark rules for colors;
- fix: text redidual problem, closes: #2045 #2193;
- fix: graph on callback parameter type problem, closes: #2250;
- fix: combo zIndex problem;
- fix: webworker updateLayoutCfg problem;
- fix: drag-canvas and click node on mobile;

#### 3.8.5

- fix: get fontFamily of the window in global leads to DOM depending when using bigfish;

#### 3.8.4

- feat: new version of basic styles for light version;
- feat: shortcuts-call behavior for calling a Graph function by shortcuts;
- feat: color generate util function getColorsWithSubjectColor;
- fix: drag-canvas on mobile problem;
- fix: style update problem with stateStyles in the options of registerNode;

#### 3.8.3

- feat: drag the viewport of the minimap out of the the view;
- fix: extend modelRect with description problem, closes: #2235;

#### 3.8.2

- feat: graph.setImageWaterMarker, graph.setTextWaterMarker API;
- feat: zoom-canvas support mobile;
- fix: drag-canvas behavior support scalable range, closes: #2136;
- fix: TreeGraph changeData clear all states, closes: #2173;
- chore: auto zoom tooltip & contextMenu component when zoom-canvas;
- chore: upgrade @antv/g-canvas;
- feat: destroyLayout API for graph, closes: #2140;
- feat: clustering for force layout, closes: #2196;
- fix: svg renderer minimap hidden elements probem, closes: #2174;
- feat: add extra parameter graph for menu plugin, closes: #2204;
- fix: tooltip plugin, crossing different shape cant execute the getContent function, closes: #2153;
- feat: add edgeConfig for create-edge behavior, closes: #2195;
- fix: remove the source node while creat-edge;
- feat: create-edge for combo, closes: #2211;
- fix: update the typings for G6Event;

#### 3.8.1

- fix: update edge states with updateItem problem, closes: #2142;
- fix: create-edge behavior with polyline problem, closes: #2165;
- fix: console.warn show duplicate ID, closes: #2163;
- feat: support the drag-canvas behavior on the mobile device, closes: #816;
- chore: timeBar component docs;

#### 3.8.0

- fix: treeGraph render with addItem and stack problem, closes: #2084;
- feat: G6 Interactive Document GraphMarker;
- feat: registerNode with jsx support afterDraw and setState;
- feat: edge filter lens plugin;
- feat: timebar plugin;

#### 3.7.3

- fix: update G to fix the shape disappear when it has been dragged out of the view port problem, closes: #2078, #2030, #2007;
- fix: redo undo with treeGraph problem;
- fix: remove item with itemType problem, closes: #2096.

#### 3.7.2

- fix: toolbar redo undo addItem with type problem, closes #2043;
- fix: optimized drag-canvas with hidden items;
- fix: state style with 0 value problem, closes: #2039;
- fix: layout with webworker leads to twice beforelayout, closes: #2052;
- fix: context menu with sibling doms of graph container leads to position problem, closes: #2053;
- fix: changeData with combos problem, closes: #2064;
- fix: improve the position of the context menu before showing up;
- feat: fisheye allows user to config the trigger of scaling range(r) and magnify factor(d) by scaleRBy and scaleDBy respectively;
- feat: add the percent text of magnify factor(d) for fisheye and users are allowed to configure it by show showDPercent.

#### 3.7.1

- fix: hide the tooltip plugin when drag node and contextmenu, closes #1975;
- fix: processParellelEdges without edge id problem;
- fix: label background with left, right position problem, closes #1861;
- fix: create-edge and redo undo problem, #1976;
- fix: tooltip plugin with shouldBegin problem, closes #2006;
- fix: tooltip behavior with shouldBegin problem, closes #2016;
- fix: the position of grid plugins when there is something on the top of the canvas, closes: #2012;
- fix: fisheye destroy and new problem, closes: #2018;
- fix: node event with wrong canvasX and canvasY problem, closes: #2027;
- fix: drag combo and drag node to drop on canvas/combo/node problem;
- feat: improve the performance on the combos;
- fix: redo and undo problem when update item after additem, closes #2019;
- feat: hide shapes beside keyShape while zooming;
- feat: improve the performance on the combos.

#### 3.7.0

- feat: chart node;
- feat: bubble set;
- feat: custom node with JSX;
- feat: minimum spanning tree algorithm;
- feat: path finding algorithm;
- feat: cycle finding algorithm;
- chore: update antv/hierarchy to fix indented tree with dropCap problem.

#### 3.6.2

- feat: find all paths and the shortest path between two nodes;
- feat: fisheye with dragging;
- feat: fisheye with scaling range and d;
- feat: click and drag to create an edge by create-edge behavior;
- feat: process multiple parallel edges to quadratic with proper curveOffset;
- fix: polyline with rect and radius=0 problem;
- fix: arrow state & linkpoint;
- fix: the position of the tooltip plugin;
- fix: drop a node onto a sub node of a combo;
- chore: update hierarchy to solve the children ordering problem for indented tree layout;
- chore: extract the public calculation to enhance the performance of fisheye.

#### 3.6.1-beta

- chore: update g-canvas to support quickHit and pruning the rendering of the graph outside the viewport;
- feat: add statistical chart nodes;
- feat: add hull for create smooth contour to include specific items;
- fix: clear combos before render;
- fix: menu plugin with clickHandler problem.

#### 3.6.1

- feat: image minimap;
- feat: visible can be controlled in the data;
- feat: item type for tooltip plugin;
- feat: menu plugin with shouldUpdate;
- fix: tooltip plugin position and hidden by removeItem;
- fix: tooltip behavior hidden by removeItem;
- fix: menu plugin with clicking on canvas problem;
- fix: menu plugin with clickHandler problem;
- fix: createCombo with double nodes problem.

#### 3.6.0

- feat: fisheye lens plugin;
- feat: lasso-select behavior;
- feat: TimeBar plugin;
- feat: ToolBar plugin.

#### 3.5.12

- fix: node:click is triggered twice while clicking a node;
- fix: update combo edge when drag node out of it problem;
- feat: animate configuration for combo, true by default;
- fix: calling canvas.on('\*', ...) instead of origin way in event controller leads to malposition while dragging nodes with zoomed graph.

#### 3.5.11

- feat: graph.priorityState api;
- feat: graph.on support name:event mode.
- fix: combo edge with uncorrect end points;
- fix: combo polyline edge with wrong path;
- fix: getViewCenter with padding problem;
- fix: cannot read property 'getModel' of null problem on contextmenu when the target is not an item;
- feat: allow user to configure the initial positions for empty combos;
- feat: optimize by hiding edges and shapes which are not keyShape while dragging canvas;
- feat: fix the initial positions by equably distributing for layout to produce similar result.

#### 3.5.10

- fix: fitView and fitCenter with animate in the initial state;
- fix: dulplicated edges in nodeselectchange event of brush-select;
- fix: triple click and drag canvas problem;
- fix: sync the minZoom and maxZoom in drag-canvas and graph;
- fix: integrate getSourceNeighbors and getTargetNeighbors to getNeighbors(node, type);
- feat: initial x and y for combo data;
- feat: dagre layout supports sortByCombo;
- feat: allow user to disable relayout in collapse-expand-combo behavior;
- feat: dijkstra shortest path lenght algorithm.

#### 3.5.9

- fix: multiple animate update shape for combo;
- fix: removeItem from a combo.

#### 3.5.8

- fix: combo edge problem, issues #1722;
- feat: adjacency matrix algorithm;
- feat: Floyd Warshall shortest path algorithm;
- feat: built-in arrows;
- feat: built-in markers;
- fix: force layout with addItem and relayout;
- fix: create combo with parentId problem;
- feat: allow user to configure the pixelRatio for Canvas;
- chore: update G to resolve the blur canvas problem.

#### 3.5.7

- feat: shouldBegin for click-select behavior;
- feat: graph.getGroup, graph.getContainer, graph.getMinZoom, graph.setMinZoom, graph.getMaxZoom, graph.setMaxZoom, graph.getWidth, graph.getHeight API;
- fix: combo edge dashLine attribute;
- fix: combo collapse and expand with edges problem;
- fix: destroy the tooltip DOMs when destroy the graph;
- fix: unify the shape names for custom node and extended node;
- fix: update the edges after first render with collapsed combos.

#### 3.5.6

- feat: dropCap for indented TreeGraph layout.

#### 3.5.5

- fix: custom node with setState problem;
- fix: validationCombo in drag-combo and drag-node.

#### 3.5.3

- feat: focusItem with animation;
- feat: generate the image url of the full graph by graph.toFullDataUrl;
- fix: graph dispears after being dragged out of the canvas and back;
- fix: the graph cannot be dragged back if it is already out of the view;
- fix: size and radius of the linkPoints problem;
- fix: combo graph with unused state name in comboStateStyles;
- fix: preventDefault in drag-canvas behavior.

#### 3.5.2

- feat: degree algorithm;
- feat: graph.getNodeDegree;
- fix: downloadFullImage changes the matrix of the graph problem;
- fix: circular layout modifies the origin data with infinite hierarchy problem.

#### 3.5.1

- feat: graph.fitCenter to align the graph center to canvas center;
- fix: getType is not a function error occurs when addItem with point;
- fix: checking comboTrees avaiability;
- fix: error occurs when createCombo into the graph without any combos;
- fix: endPoint and startPoint are missing in modelConfig type;
- fix: edge background leads to empty canvas when the autoRotate is false;
- fix: combo state style bug.

#### 3.5.0

- feat: combo and combo layout;
- feat: graph algorithms: DFS, BFS and circle detection;
- feat: add `getNeighbors`, `getSourceNeighbors`, `getTargetNeighbors` methods on Graph and Node;
- feat: add `getID` method on Item;
- fix: All Configuration type declarations are migrated to types folder, refer [here](https://github.com/antvis/G6/commit/3691cb51264df8529f75222147ac3f248b71f2f6?diff=unified#diff-76cf0eb5e3d8032945f1ac79ffc5e815R6);
- fix: Some configuration type declarations have removed the `I` prefix, refer [here](https://github.com/antvis/G6/commit/3691cb51264df8529f75222147ac3f248b71f2f6?diff=unified#diff-aa582974831cee2972b8c96cfcce503aR16);
- feat: Util.getLetterWidth and Util.getTextSize.

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
- fix: [changeData bug](https://github.com/antvis/G6/issues/1323);
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
