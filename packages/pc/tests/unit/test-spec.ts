import G6 from '../../src';
import Hierarchy from '@antv/hierarchy';
import { GridLayout } from '@antv/layout';
import zhidrenData from './zhirendata';
console.log('zhidrenData', zhidrenData)
const { zhidrenData: data0 } = zhidrenData

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);


const COMBO_WIDTH = 160;
const COMBO_HEIGHT = 160;
const MIDDLE_HEIGHT = 80;
const COMBO_SEP = 10;
const DEFAULT_NODE_SIZE = 10;
const NODE_SIZE_OPTIONS = [DEFAULT_NODE_SIZE, 8, 6, 4, 2, 1];
const TOP_COMBO_COLLAPSE_SIZE = [400, 50];
const TOP_COMBO_EXPAND_SIZE = [COMBO_WIDTH * 4, COMBO_HEIGHT * 3];
let isFirstLayout = true;
const DEFAULT_COMBO_COLLAPSE_LABEL_FONT_SIZE = 14;
const DEFAULT_COMBO_EXPAND_LABEL_FONT_SIZE = 12;
const DEFAULT_COMBO_COLLAPSED = true;
const DEFAULT_NONTOP_COMBO_PADDING = [8, 2, 2, 0];
const DEFAULT_TOP_COMBO_PADDING = [40, 10, 10, 10];
const UNCOLLECTED_LABEL = 'unknown';

const getOrBuildTopComboTreeNode = (idNodeMap, topComboMap, id) => {
  if (Object.keys(idNodeMap).includes(id)) {
    return idNodeMap[id];
  }

  const node = {
    id,
    isRoot: true,
    children: [],
    collapsedFlag: topComboMap[id].collapsed,
  };

  idNodeMap[id] = node;
  return node;
};

const buildTopComboTree = (data) => {
  const topCombos = data.combos.filter((combo) => !combo.parentId);
  const topComboMap = {};
  topCombos.forEach((combo) => (topComboMap[combo.id] = combo));
  const topComboEdges = data.comboEdges;
  const idNodeMap = {};
  topComboEdges.forEach((edge) => {
    const sourceNode = getOrBuildTopComboTreeNode(idNodeMap, topComboMap, edge.source);
    const targetNode = getOrBuildTopComboTreeNode(idNodeMap, topComboMap, edge.target);
    sourceNode.children.push(targetNode);
    targetNode.isRoot = false;
  });
  const roots = Object.values(idNodeMap).filter((node) => node.isRoot);
  return roots;
};

const dfsNodes = (root) => {
  const arr = [];
  if (!root) return arr;
  const stack = [root];
  let current;
  while ((current = stack.pop())) {
    const { children } = current;
    arr.push(current);
    for (let i = children.length - 1; i >= 0; i--) stack.push(children[i]);
  }
  return arr;
};

const getTopComboLayouts = (data) => {
  const roots = buildTopComboTree(data);
  let root;
  if (roots.length === 1) {
    root = roots[0];
  } else {
    root = {
      id: 'mockRoot',
      children: roots,
    };
  }

  const rootNode = Hierarchy.compactBox(root, {
    direction: 'LR',
    getId(d) {
      return d.id;
    },
    getHeight(d) {
      if (d.collapsedFlag) {
        return TOP_COMBO_COLLAPSE_SIZE[1];
      } else {
        return TOP_COMBO_EXPAND_SIZE[1];
      }
    },
    getWidth(d) {
      if (d.collapsedFlag) {
        return TOP_COMBO_COLLAPSE_SIZE[0];
      } else {
        return TOP_COMBO_EXPAND_SIZE[0];
      }
    },
    getHGap(d) {
      return 50;
    },
    getVGap(d) {
      return 50;
    },
  });
  const topComboNodes = dfsNodes(rootNode);
  const topComboLayouts = {};

  topComboNodes.forEach((topCombo) => {
    if (topCombo.id !== 'mockRoot') {
      topComboLayouts[topCombo.id] = {
        x: topCombo.x + topCombo.width / 2,
        y: topCombo.y + topCombo.height / 2,
      };
    }
  });
  return topComboLayouts;
};

const groupNodesByCombo = (nodes) => {
  const map = {};
  nodes.forEach((node) => {
    map[node.comboId] = map[node.comboId] || [];
    map[node.comboId].push(node);
  });
  return map;
};

const processUnknownLayout = (unknownCombos, parentComboLayout, comboLayouts) => {
  const layout = {
    xStart: parentComboLayout.x - COMBO_WIDTH / 2 + COMBO_SEP / 2,
    xEnd: parentComboLayout.x + COMBO_WIDTH / 2 - COMBO_SEP / 2,
    yStart: parentComboLayout.y - COMBO_HEIGHT / 2 + COMBO_SEP / 2,
    yEnd: parentComboLayout.y + COMBO_HEIGHT / 2 - COMBO_SEP / 2,
  };
  comboLayouts[unknownCombos[0].id] = layout;
  unknownCombos[0].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
};

const processDalLayout = (dalCombos, parentComboLayout, comboLayouts) => {
  if (!dalCombos || dalCombos.length === 0) {
    return;
  }

  if (dalCombos.length === 1) {
    const layout = {
      xStart: parentComboLayout.x - COMBO_WIDTH / 2 + COMBO_SEP / 2,
      xEnd: parentComboLayout.x + COMBO_WIDTH / 2 - COMBO_SEP / 2,
      yStart: parentComboLayout.y + MIDDLE_HEIGHT + COMBO_SEP / 2,
      yEnd: parentComboLayout.y + MIDDLE_HEIGHT + COMBO_HEIGHT - COMBO_SEP / 2,
    };
    comboLayouts[dalCombos[0].id] = layout;
    dalCombos[0].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
    return;
  }

  console.log('parentComboLayout', parentComboLayout);

  const dalComboWidth = (COMBO_WIDTH * 2) / dalCombos.length;
  for (let i = 0; i < dalCombos.length; ++i) {
    const combo = dalCombos[i];
    const layout = {
      xStart: parentComboLayout.x - COMBO_WIDTH + i * dalComboWidth + COMBO_SEP / 2,
      xEnd: parentComboLayout.x - COMBO_WIDTH + (i + 1) * dalComboWidth - COMBO_SEP / 2,
      yStart: parentComboLayout.y + MIDDLE_HEIGHT + COMBO_SEP / 2,
      yEnd: parentComboLayout.y + MIDDLE_HEIGHT + COMBO_HEIGHT - COMBO_SEP / 2,
    };
    comboLayouts[combo.id] = layout;
    dalCombos[i].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
  }
};

const processEntranceReqLayout = (entranceReqCombos, parentComboLayout, comboLayouts) => {
  if (!entranceReqCombos || entranceReqCombos.length === 0) {
    return;
  }
  //
  const offset = 5;
  const layout = {
    xStart: parentComboLayout.x - 2 * COMBO_WIDTH + COMBO_SEP / 2,
    xEnd: parentComboLayout.x - COMBO_WIDTH - COMBO_SEP / 2,
    yStart: parentComboLayout.y - COMBO_HEIGHT + COMBO_SEP / 2 - offset,
    yEnd: parentComboLayout.y - COMBO_SEP / 2 - offset,
  };
  comboLayouts[entranceReqCombos[0].id] = layout;
  entranceReqCombos[0].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
};

const processEntranceRspLayout = (entranceRspCombos, parentComboLayout, comboLayouts) => {
  if (!entranceRspCombos || entranceRspCombos.length === 0) {
    return;
  }
  //
  const offset = 5;
  const xEnd = parentComboLayout.x - COMBO_WIDTH - COMBO_SEP / 2;
  const layout = {
    xStart: xEnd - COMBO_WIDTH + COMBO_SEP,
    xEnd,
    yStart: parentComboLayout.y + COMBO_SEP / 2 + offset,
    yEnd: parentComboLayout.y + COMBO_HEIGHT - COMBO_SEP / 2 + offset,
  };
  comboLayouts[entranceRspCombos[0].id] = layout;
  entranceRspCombos[0].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
};

const processConstLayout = (constCombos, parentComboLayout, comboLayouts, noOther) => {
  if (!constCombos || constCombos.length === 0) {
    return;
  }
  //
  let layout;
  if (noOther) {
    layout = {
      xStart: parentComboLayout.x - COMBO_WIDTH / 2 + COMBO_SEP / 2,
      xEnd: parentComboLayout.x + COMBO_WIDTH / 2 - COMBO_SEP / 2,
      yStart: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_HEIGHT + COMBO_SEP / 2,
      yEnd: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_SEP / 2,
    };
  } else {
    layout = {
      xStart: parentComboLayout.x - COMBO_WIDTH + COMBO_SEP / 2,
      xEnd: parentComboLayout.x - COMBO_SEP / 2,
      yStart: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_HEIGHT + COMBO_SEP / 2,
      yEnd: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_SEP / 2,
    };
  }

  comboLayouts[constCombos[0].id] = layout;
  constCombos[0].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
};

const getTopComboByFullName = (combos, fullName) => {
  for (let i = 0; i < combos.length; i += 1) {
    if (combos[i].fullName === fullName) {
      return combos[i];
    }
  }
  return undefined;
};

const processSalLayout = (
  salCombos,
  parentComboLayout,
  comboLayouts,
  topComboLayouts,
  topCombos,
) => {
  if (!salCombos || salCombos.length === 0) {
    return;
  }
  //
  salCombos.sort((sal1, sal2) => {
    const combo1 = getTopComboByFullName(topCombos, sal1.fullName);
    const order1 = combo1 ? topComboLayouts[combo1.id].y : 0;
    const combo2 = getTopComboByFullName(topCombos, sal2.fullName);
    const order2 = combo2 ? topComboLayouts[combo2.id].y : 0;
    return order1 - order2;
  });
  //
  let salHeight = ((COMBO_HEIGHT + MIDDLE_HEIGHT) * 2) / salCombos.length;
  salHeight = Math.min(salHeight, COMBO_HEIGHT / 2);
  const salYStart = parentComboLayout.y - (salHeight * salCombos.length) / 2;
  for (let i = 0; i < salCombos.length; i++) {
    const layout = {
      xStart: parentComboLayout.x + COMBO_WIDTH + COMBO_SEP / 2,
      xEnd: parentComboLayout.x + COMBO_WIDTH * 2 - COMBO_SEP / 2,
      yStart: salYStart + i * salHeight + COMBO_SEP / 2,
      yEnd: salYStart + (i + 1) * salHeight - COMBO_SEP / 2,
    };
    comboLayouts[salCombos[i].id] = layout;
    salCombos[i].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
  }
};

const processOtherLayout = (categoryComboMap, parentComboLayout, comboLayouts) => {
  if (!categoryComboMap || Object.keys(categoryComboMap).length === 0) {
    return;
  }
  //
  let combos = [];
  let categories = Object.keys(categoryComboMap);
  categories.sort();
  categories.forEach((category) => (combos = combos.concat(categoryComboMap[category])));
  const comboWidth = (COMBO_WIDTH * 2) / combos.length;
  for (let i = 0; i < combos.length; i++) {
    const layout = {
      xStart: parentComboLayout.x - COMBO_WIDTH + i * comboWidth + COMBO_SEP / 2,
      xEnd: parentComboLayout.x - COMBO_WIDTH + (i + 1) * comboWidth - COMBO_SEP / 2,
      yStart: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_HEIGHT + COMBO_SEP / 2,
      yEnd: parentComboLayout.y - MIDDLE_HEIGHT - COMBO_SEP / 2,
    };
    comboLayouts[combos[i].id] = layout;
    combos[i].fixSize = [layout.xEnd - layout.xStart, layout.yEnd - layout.yStart];
  }
};

const groupCombosByByParent = (combos) => {
  const map = {};
  combos.forEach((combo) => {
    map[combo.parentId] = map[combo.parentId] || [];
    map[combo.parentId].push(combo);
  });
  return map;
};

const groupCombosByCategory = (combos) => {
  const map = {};
  combos.forEach((combo) => {
    map[combo.category] = map[combo.category] || [];
    map[combo.category].push(combo);
  });
  return map;
};

const getSecondComboLayouts = (data, topComboLayouts) => {
  //
  const combos = data.combos.filter((combo) => combo.parentId);
  const topCombos = data.combos.filter((combo) => !combo.parentId);
  const comboLayouts = {};
  const parentComboMap = groupCombosByByParent(combos);
  Object.keys(parentComboMap).forEach((parentId) => {
    console.log('topComboLayouts', topComboLayouts, parentId)
    const parentComboLayout = topComboLayouts[parentId] || { x: 0, y: 0 };
    const categoryComboMap = groupCombosByCategory(parentComboMap[parentId]);
    //
    if (categoryComboMap.UNKNOWN) {
      processUnknownLayout(categoryComboMap.UNKNOWN, parentComboLayout, comboLayouts);
      return;
    }
    processDalLayout(categoryComboMap.DAL, parentComboLayout, comboLayouts);
    delete categoryComboMap.DAL;
    //
    processEntranceReqLayout(categoryComboMap.ENTRANCE_REQ, parentComboLayout, comboLayouts);
    delete categoryComboMap.ENTRANCE_REQ;
    //
    processEntranceRspLayout(categoryComboMap.ENTRANCE_RSP, parentComboLayout, comboLayouts);
    delete categoryComboMap.ENTRANCE_RSP;
    //
    processSalLayout(
      categoryComboMap.SAL,
      parentComboLayout,
      comboLayouts,
      topComboLayouts,
      topCombos,
    );
    delete categoryComboMap.SAL;
    processOtherLayout(categoryComboMap, parentComboLayout, comboLayouts);
  });
  combos.forEach((combo) => {
    const layout = comboLayouts[combo.id];
    layout.x = (layout.xEnd + layout.xStart) / 2;
    layout.y = (layout.yEnd + layout.yStart) / 2;
  });
  return comboLayouts;
};

const computeLayoutContext = (data) => {
  const layoutContext = {};
  layoutContext.topComboLayouts = getTopComboLayouts(data);
  layoutContext.secondComboLayouts = getSecondComboLayouts(data, layoutContext.topComboLayouts);
  //由于第一次渲染时，只显示最外层combo，故内层combo位置不再计算
  if (!isFirstLayout) {
    layoutContext.comboNodeMap = groupNodesByCombo(data.nodes);
  }
  return layoutContext;
};

const getNodeSize = (nodesNum, x, y) => {
  for (let i = 0; i < NODE_SIZE_OPTIONS.length; i++) {
    const nodeSep = 3;
    const largestNum =
      (Math.floor(x / (NODE_SIZE_OPTIONS[i] + nodeSep)) - 3) *
      (Math.floor(y / (NODE_SIZE_OPTIONS[i] + nodeSep)) - 3);
    if (largestNum > nodesNum) {
      return NODE_SIZE_OPTIONS[i];
    }
  }
  return NODE_SIZE_OPTIONS[NODE_SIZE_OPTIONS.length - 1];
};

const processNodeSize = (nodes, comboLayout) => {
  const nodeSize = getNodeSize(
    nodes.length,
    comboLayout.xEnd - comboLayout.xStart,
    comboLayout.yEnd - comboLayout.yStart,
  );
  nodes.forEach((node) => {
    node.size = nodeSize;
  });
};

const processNodeLayouts = (nodes, comboLayout) => {
  const nodeSize = nodes[0].size;
  const layoutConf = {
    type: 'grid',
    begin: [comboLayout.xStart + nodeSize, comboLayout.yStart + nodeSize],
    width: comboLayout.xEnd - comboLayout.xStart - nodeSize * 2,
    height: comboLayout.yEnd - comboLayout.yStart - nodeSize * 2,
    preventOverlap: false,
    nodeSize,
  };
  const gridLayout = new GridLayout(layoutConf);
  gridLayout.layout({ nodes });
  return nodes;
};

const doLayout = (data) => {
  const layoutContext = computeLayoutContext(data);
  if (!isFirstLayout) {
    Object.keys(layoutContext.comboNodeMap).forEach((comboId) => {
      processNodeSize(layoutContext.comboNodeMap[comboId], layoutContext.secondComboLayouts[comboId]);
    });
    Object.keys(layoutContext.comboNodeMap).forEach((comboId) => {
      const nodes = processNodeLayouts(
        layoutContext.comboNodeMap[comboId],
        layoutContext.secondComboLayouts[comboId],
      );
      nodes.forEach((node) => {
        node.layoutX = node.x;
        node.layoutY = node.y;
      });
    });
  }
  data.combos.forEach((combo) => {
    const comboId = combo.id;
    let comboLayout;
    if (layoutContext.topComboLayouts && layoutContext.topComboLayouts[comboId]) {
      comboLayout = layoutContext.topComboLayouts[comboId];
    } else if (layoutContext.secondComboLayouts && layoutContext.secondComboLayouts[comboId]) {
      comboLayout = layoutContext.secondComboLayouts[comboId];
    }

    if (comboLayout) {
      combo.layoutX = comboLayout.x;
      combo.layoutY = comboLayout.y;
    }
  });
  //
  if (isFirstLayout) {
    isFirstLayout = false;
  }
};

const initProcessData = (data) => {
  data.nodes.forEach((item) => (item.rawLabel = item.shortName));
  data.combos.forEach((item) => (item.rawLabel = item.shortName));
  data.combos.forEach((combo) => {
    if (combo.parentId === '') {
      delete combo.parentId;
    }
    combo.collapsed = DEFAULT_COMBO_COLLAPSED;
  });
  const topCombos = data.combos.filter((combo) => !combo.parentId);
  topCombos.forEach((topCombo) => {
    topCombo.fixCollapseSize = TOP_COMBO_COLLAPSE_SIZE;
    topCombo.padding = DEFAULT_TOP_COMBO_PADDING;
    topCombo.type = 'methodRect';
  });

  const topComboIds = topCombos.map((topCombo) => topCombo.id);
  if (topComboIds && topComboIds.length > 0) {
    data.edges.forEach((edge) => {
      if (topComboIds.includes(edge.source) || topComboIds.includes(edge.target)) {
        edge.type = 'cubic-horizontal';
        edge.style = {
          opacity: 1,
          lineWidth: 3,
          stroke: '#666666',
        };
      }
    });
  }
  const secondCombos = data.combos.filter((combo) => combo.parentId);
  secondCombos.forEach((combo) => {
    combo.padding = DEFAULT_NONTOP_COMBO_PADDING;
    combo.style = combo.style || {};
    combo.style.lineWidth = 2;
    switch (combo.direction) {
      case 'source':
        combo.style.stroke = '#90AACB';
        break;
      case 'sink':
        combo.style.stroke = '#F0A500';
        break;
      case 'mix':
        combo.style.stroke = '#C6D57E';
        break;
      default:
        break;
    }
  });
};

const registerG6Graph = () => {
  G6.registerLayout('dta-trace-layout', {
    execute() {
      doLayout({
        nodes: this.nodes,
        combos: this.combos,
        comboEdges: this.comboEdges,
      });
    },
  });
  G6.registerEdge(
    'circle-running',
    {
      afterDraw(cfg, group) {
        const shape = group.get('children')[0];
        const startPoint = shape.getPoint(0);

        const circle = group.addShape('circle', {
          attrs: {
            x: startPoint.x,
            y: startPoint.y,
            fill: '#1890ff',
            r: 3,
            opacity: cfg.style.opacity,
          },
          name: 'circle-move-shape',
        });

        circle.animate(
          (ratio) => {
            const tmpPoint = shape.getPoint(ratio);
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat: true,
            duration: 3000,
          },
        );
      },
    },
    'cubic',
  );

  const topComboTextFontSize = 14;
  const topComboTextHeight = topComboTextFontSize - 2;
  G6.registerCombo(
    'methodRect',
    {
      drawShape: function drawShape(cfg, group) {
        const self = this;
        cfg.padding = cfg.padding || [50, 20, 20, 20];
        const style = self.getShapeStyle(cfg);
        const rect = group.addShape('rect', {
          attrs: {
            ...style,
            x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
            y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
            width: style.width,
            height: style.height,
          },
          draggable: true,
          name: 'combo-method-keyShape',
        });

        group.addShape('text', {
          attrs: {
            ...style,
            text: cfg.app,
            x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
            y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2 - topComboTextHeight,
            fill: '#ff7900',
            fontSize: topComboTextFontSize,
            fontWeight: 'bold',
          },
          draggable: true,
          name: 'combo-app-text',
        });

        const { hasNext } = cfg;
        if (hasNext) {
          group.addShape('rect', {
            attrs: {
              ...style,
              text: cfg.app,
              x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2 - 9,
              y: -style.height / 2 + 25,
              width: 18,
              height: 18,
              fill: '#fff',
              fontSize: topComboTextFontSize,
              fontWeight: 'bold',
            },
            draggable: true,
            name: 'collapse-back',
            zIndex: 100,
          });

          group.addShape('text', {
            attrs: {
              ...style,
              x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2 - 9,
              y: -style.height / 2 + 45,
              cursor: 'pointer',
              fontSize: 18,
              text: '+',
              fill: 'rgba(0, 0, 0, 0.25)',
            },
            draggable: true,
            zIndex: 100,
            name: 'collapse-back-text',
          });
        }

        group.addShape('text', {
          attrs: {
            ...style,
            text: cfg.category,
            x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2,
            y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2 - topComboTextHeight,
            fill: '#ff7900',
            fontSize: topComboTextFontSize,
            textAlign: 'right',
            fontWeight: 'bold',
          },
          draggable: true,
          name: 'combo-entranceType-text',
        });
        return rect;
      },
      afterUpdate: function afterUpdate(cfg, combo) {
        const self = this;
        const group = combo.get('group');
        const appText = group.find((ele) => ele.get('name') === 'combo-app-text');
        const style = self.getShapeStyle(cfg);
        appText.attr({
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2 - topComboTextHeight,
        });
        const entranceTypeText = group.find((ele) => ele.get('name') === 'combo-entranceType-text');
        entranceTypeText.attr({
          x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2 - topComboTextHeight,
        });

        const collapseBack = group.find((ele) => ele.get('name') === 'collapse-back');
        const collapseBackText = group.find((ele) => ele.get('name') === 'collapse-back-text');
        if (collapseBack) {
          collapseBack.attr({
            x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2 - 9,
          });
          collapseBackText.attr({
            x: style.width / 2 + (cfg.padding[1] - cfg.padding[3]) / 2 - 9,
          });
        }
      },
    },
    'rect',
  );
}
const transformComboLabelView = (rawLabel) => {
  switch (rawLabel) {
    case 'CONST':
      return '常量';
    case 'SERVICE_REQ':
    case 'MOBILE_GW_REQ':
      return '入参';
    case 'SERVICE_RSP':
    case 'MOBILE_GW_RSP':
      return '出参';
    case UNCOLLECTED_LABEL:
      return '未接入';
    default:
      return rawLabel;
  }
};

const getComboLabel = (combo, collapsed) => {
  const labelMaxWidth = combo.getKeyShape().attrs.width;
  const { rawLabel } = combo.getModel();
  //
  const transLabel = transformComboLabelView(rawLabel);
  //

  if (collapsed) {
    return transLabel;
  } else {
    return transLabel;
  }
};

const bindEvents = (graph) => {
  // 监听combo双击
  graph.on('combo:dblclick', (evt) => {
    if (evt.item.getModel().rawLabel !== UNCOLLECTED_LABEL) {
      graph.collapseExpandCombo(evt.item);
    }
  });

  graph.on('afterlayout', () => {
    const topCombos = graph.getCombos().filter((combo) => combo.getModel().collapsed && !combo.getModel().parentId);
    const secCombos = graph.getCombos().filter((combo) => combo.getModel().collapsed && combo.getModel().parentId);

    topCombos.concat(secCombos).forEach((combo) => {
      if (combo.getModel().layoutX) {
        graph.updateItem(combo, {
          x: combo.getModel().layoutX,
          y: combo.getModel().layoutY,
        });
      }
    });
  });
};

const updateCollapsedComboLabel = (graph, combo) => {
  const comboLabel = getComboLabel(combo, true);
  graph.updateItem(combo, {
    label: comboLabel,
    labelCfg: {
      refX: combo.getKeyShape().attrs.width / 2,
      refY: combo.getKeyShape().attrs.height / 2,
      style: {
        textAlign: 'center',
        fontSize: 5,
      },
    },
  });
  return comboLabel;
}

const initCollapsedComboLabel = (graph) => {
  const combos = graph.getCombos();
  combos.forEach(combo => {
    updateCollapsedComboLabel(graph, combo);
  })
}

const bindEventsAfterRender = (graph) => {
  // 监听combo展开收起
  graph.on('aftercollapseexpandcombo', (evt) => {
    const model = evt.item.getModel();
    // 重新布局
    graph.layout();
    //因为combo展开合上动画延时，等待动画完成后才能取到最终的宽度，再调整label
    let waitTime = 300;
    if (model.fixSize && !model.fixCollapseSize) {
      waitTime = 10;
    }
    setTimeout(() => {
      if (evt.action === 'collapse') {
        const comboLabel = getComboLabel(evt.item, true);
        graph.updateItem(evt.item, {
          label: comboLabel,
          labelCfg: {
            refX: evt.item.getKeyShape().attrs.width / 2,
            refY: evt.item.getKeyShape().attrs.height / 2,
            style: {
              textAlign: 'center',
              fontSize: 5,
            },
          },
        });
      } else {
        graph.updateItem(evt.item, {
          label: getComboLabel(evt.item, false),
          labelCfg: {
            refX: 3,
            refY: 2,
            style: {
              textAlign: 'start',
              fontSize: 5,
            },
          },
        });
      }
      graph.updateCombos();
    }, waitTime);
  });
}

describe('combo states', () => {
  it('combo state bug', () => {
    registerG6Graph();
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      groupByTypes: false,
      layout: {
        type: 'dta-trace-layout',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      defaultCombo: {
        type: 'rect',
        labelCfg: {
          position: 'top',
          refX: 3,
          refY: 1,
        },
        animate: false,
      },
      defaultNode: {
        type: 'circle',
        size: DEFAULT_NODE_SIZE,
        labelCfg: {
          style: {
            position: 'top',
          },
        },
      },
      defaultEdge: {
        type: 'circle-running',
        style: {
          opacity: 0,
          endArrow: true,
          lineAppendWidth: 0,
        },
      },
      edgeStateStyles: {
        selected: {
          opacity: 1,
          'circle-move-shape': {
            opacity: 1,
          },
        },
      },
    });

    initProcessData(data0);
    bindEvents(graph);
    graph.on('canvas:click', e => {

      console.log('canvas')
      graph.data(data0);
      graph.render();
      // setTimeout(() => {
      //   bindEventsAfterRender(graph);
      //   graph.layout();
      //   graph.fitView();
      //   initCollapsedComboLabel(graph);
      //   setTimeout(() => {
      //     graph.updateCombos();
      //   }, 100)
      // }, 1000)
    })
  });
});
