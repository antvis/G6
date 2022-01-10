import G6 from '@antv/g6';

const { Util } = G6;


const rawData = {
  label: 'Modeling Methods',
  id: '0',
  isRoot: true,
  children: [
    {
      label: 'Classification',
      id: '0-1',
      color: '#5AD8A6',
      children: [
        {
          label: 'Logistic regression',
          id: '0-1-1',
        },
        {
          label: 'Linear discriminant analysis',
          id: '0-1-2',
        },
        {
          label: 'Rules',
          id: '0-1-3',
        },
        {
          label: 'Decision trees',
          id: '0-1-4',
        },
        {
          label: 'Naive Bayes',
          id: '0-1-5',
        },
        {
          label: 'K nearest neighbor',
          id: '0-1-6',
        },
        {
          label: 'Probabilistic neural network',
          id: '0-1-7',
        },
        {
          label: 'Support vector machine',
          id: '0-1-8',
        },
      ],
    },
    {
      label: 'Consensus',
      id: '0-2',
      color: '#F6BD16',
      children: [
        {
          label: 'Models diversity',
          id: '0-2-1',
          children: [
            {
              label: 'Different initializations',
              id: '0-2-1-1',
            },
            {
              label: 'Different parameter choices',
              id: '0-2-1-2',
            },
            {
              label: 'Different architectures',
              id: '0-2-1-3',
            },
            {
              label: 'Different modeling methods',
              id: '0-2-1-4',
            },
            {
              label: 'Different training sets',
              id: '0-2-1-5',
            },
            {
              label: 'Different feature sets',
              id: '0-2-1-6',
            },
          ],
        },
        {
          label: 'Methods',
          id: '0-2-2',
          children: [
            {
              label: 'Classifier selection',
              id: '0-2-2-1',
            },
            {
              label: 'Classifier fusion',
              id: '0-2-2-2',
            },
          ],
        },
        {
          label: 'Common',
          id: '0-2-3',
          children: [
            {
              label: 'Bagging',
              id: '0-2-3-1',
            },
            {
              label: 'Boosting',
              id: '0-2-3-2',
            },
            {
              label: 'AdaBoost',
              id: '0-2-3-3',
            },
          ],
        },
      ],
    },
    {
      label: 'Regression',
      id: '0-3',
      color: '#269A99',
      children: [
        {
          label: 'Multiple linear regression',
          id: '0-3-1',
        },
        {
          label: 'Partial least squares',
          id: '0-3-2',
        },
        {
          label: 'Multi-layer feedforward neural network',
          id: '0-3-3',
        },
        {
          label: 'General regression neural network',
          id: '0-3-4',
        },
        {
          label: 'Support vector regression',
          id: '0-3-5',
        },
      ],
    },
  ],
};

const COLORS = ['#5B8FF9', '#F6BD16', '#5AD8A6', '#945FB9', '#E86452', '#6DC8EC', '#FF99C3', '#1E9493', '#FF9845', '#5D7092'];
const BaseConfig = {
  nameFontSize: 12,
  childCountWidth: 22,
  countMarginLeft: 0,
  propertyCountWidth: 30,
  itemPadding: 16,
  selectedIconWidth: 12,
  nameMarginLeft: 4,
  rootPadding: 18,
};
const KeyStyle = {
  background: {
    default: '',
    hover: '#e8f7ff',
    selected: '#e8f7ff',
    actived: '#e8f7ff',
  },
  borderColor: {
    default: '',
    hover: '#1890FF',
    selected: '#1890FF',
    actived: '#1890FF',
  },
};
const ChildCountStyle = {
  background: {
    default: '#fff',
    hover: '#E8F7FF',
    expanded: '#E6FFFB',
    expandedHover: '#CEF5EF',
  },
  borderColor: {
    default: '#1890ff',
    expanded: '#5CDBD3',
  },
};
const NameStyle = {
  color: {
    default: 'rgba(0, 0, 0, .65)',
    dash: 'rgba(0, 0, 0, .3)',
    hover: '#40A8FF',
    actived: '#40A8FF',
    selected: '#40A8FF',
  },
};
const MainStyle = {
  background: {
    default: '#fff',
    hover: '#e8f7ff',
    actived: '#e8f7ff',
    selected: '#e8f7ff',
  },
};


G6.registerNode('treeNode', {
  options: {
    style: {
      fill: '#e8f7ff',
    },
    stateStyles: {
      hover: {
        fillOpacity: 0.6,
      },
      selected: {},
    },
  },
  addLabel(group, label, x, y) {
    return group.addShape('text', {
      attrs: {
        text: label,
        x: x * 2,
        y,
        textAlign: 'left',
        textBaseline: 'top',
        fontFamily: 'PingFangSC-Regular',
      },
      cursor: 'pointer',
      name: 'name-text-shape',
    });
  },
  addBottomLine(group, rootNode, props) {
    if (!rootNode) {
      const { x, width, stroke, lineWidth } = props;
      return group.addShape('path', {
        attrs: {
          path: [
            ['M', x - 1, 0],
            ['L', width, 0],
          ],
          stroke,
          lineWidth,
        },
        name: 'node-path-shape',
      });
    }
  },
  addHoverBack(group, rootNode, props) {
    const {
      hasChildren,
      width,
      selectedIconWidth,
      childCountWidth,
      selected,
      fill,
      height,
      selectedUrl,
      x,
      y,
      mainX,
      mainY
    } = props;

    if (!rootNode) {
      // hover背景
      let backgroundWidth = hasChildren ? width - childCountWidth : width;

      if (!selected) {
        backgroundWidth -= selectedIconWidth;
      }
      group.addShape('rect', {
        attrs: {
          x: mainX,
          y: mainY,
          width: backgroundWidth,
          height,
          radius: 14,
          fill: fill,
          cursor: 'pointer',
        },
        // capture: false,
        name: 'main-shape',
      });

      // 选中状态
      group.addShape('image', {
        attrs: {
          img: selected ? selectedUrl : '',
          x,
          y: y - 6,
          width: selectedIconWidth,
          height: 12,
          cursor: 'pointer',
        },
        name: 'main-selected-shape',
      });
    }
  },
  addName(group, rootNode, props) {
    const {
      label,
      mainX,
      rootPadding,
      fill,
      selected,
      selectedIconWidth,
      nameMarginLeft,
      y
    } = props;
    if (rootNode) {
      group.addShape('text', {
        attrs: {
          text: label,
          x: mainX + rootPadding,
          y: 1,
          textAlign: 'left',
          textBaseline: 'middle',
          fill,
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular',
          cursor: 'pointer',
        },
        name: 'root-text-shape',
      });
    } else {
      group.addShape('text', {
        attrs: {
          text: label,
          x: selected ? mainX + 6 + selectedIconWidth + nameMarginLeft : mainX + 6,
          y: y - 5,
          textAlign: 'start',
          textBaseline: 'top',
          fill,
          fontSize: 12,
          fontFamily: 'PingFangSC-Regular',
          cursor: 'pointer'
        },
        name: 'not-root-text-shape',
      });
    }
  },
  addChildCount(group, rootNode, props) {
    const {
      hasChildren, width, childCountWidth, collapsed, schemaType
    } = props
    if (hasChildren && !rootNode) {
      const childCountHeight = 12;
      const childCountX = width - childCountWidth;
      const childCountY = -childCountHeight / 2;

      group.addShape('rect', {
        attrs: {
          width: childCountWidth,
          height: 12,
          stroke: collapsed
            ? ChildCountStyle.borderColor.default
            : ChildCountStyle.borderColor.expanded,
          fill: collapsed
            ? ChildCountStyle.background.default
            : ChildCountStyle.background.expanded,
          x: childCountX,
          y: childCountY,
          radius: 6,
          cursor: 'pointer',
        },
        name: 'child-count-rect-shape',
      });
      group.addShape('text', {
        attrs: {
          text: schemaType ? `${schemaType.subTypeCount}` : '0',
          fill: 'rgba(0, 0, 0, .65)',
          x: childCountX + childCountWidth / 2,
          y: childCountY + 12,
          fontSize: 10,
          width: childCountWidth,
          textAlign: 'center',
          cursor: 'pointer',
        },
        name: 'child-count-text-shape',
      });
    }
  },
  draw(model, group) {
    const { collapsed, selected, isInclude, children, label } = model;
    const schemaType = model.schemaType;
    const hasChildren = children?.length;
    const {
      childCountWidth,
      countMarginLeft,
      itemPadding,
      selectedIconWidth,
      nameMarginLeft,
      rootPadding,
    } = BaseConfig;

    let width = 0;
    const height = 28;
    // let x = -width / 2;
    const x = 0;
    const y = -height / 2;
    const borderRadius = 4;
    // 名称文本
    const text = this.addLabel(group, label, x, y);
    const textWidth = text.getBBox().width;
    width = textWidth + itemPadding + selectedIconWidth + nameMarginLeft;

    width = width < minWidth ? minWidth : width;

    if (!rootNode && hasChildren) {
      width += countMarginLeft;
      width += childCountWidth;
    }

    const keyShapeAttrs = {
      x,
      y,
      width,
      height,
      radius: borderRadius,
      fill: undefined,
      stroke: undefined,
    };
    // keyShape根节点选中样式
    if (rootNode && selected) {
      keyShapeAttrs.fill = KeyStyle.background.selected;
      keyShapeAttrs.stroke = KeyStyle.borderColor.selected;
    }
    const keyShape = group.addShape('rect', {
      attrs: keyShapeAttrs,
      name: 'root-key-shape-rect-shape',
    });

    this.addBottomLine(group, rootNode, {
      stroke: '#AAB7C4',
      lineWidth: 1,
      x,
      width
    })

    const mainX = x - 6;
    const mainY = -height - 1;

    const hoverBackProps = {
      hasChildren, width, selectedIconWidth,
      childCountWidth,
      selected,
      fill: MainStyle.background.default,
      height,
      selectedUrl,
      x,
      y,
      mainX,
      mainY
    };
    this.addHoverBack(group, rootNode, hoverBackProps);

    let nameColor = NameStyle.color.default;
    if (selected) {
      nameColor = NameStyle.color.selected;
    }

    if (model.showInclude && !isInclude) {
      nameColor = NameStyle.color.dash;
    }

    // 名称
    const nameProps = {
      label,
      mainX,
      rootPadding,
      fill: nameColor,
      selected,
      selectedIconWidth,
      nameMarginLeft,
      y
    };
    this.addName(group, rootNode, nameProps);

    // 子类数量
    const childCountProps = {
      hasChildren, width, childCountWidth, collapsed, schemaType
    }
    this.addChildCount(group, rootNode, childCountProps);

    return keyShape;
  },
});

G6.registerNode('indentedRoot', {
  draw(model, group) {
    const rootColor = '#576286';
    const keyShape = group.addShape('rect', {
      attrs: {
        x: -46,
        y: -16,
        width: 92,
        height: 32,
        fill: rootColor,
        radius: 2,
        stroke: '#5B8FF9',
        lineWidth: model.selected ? 2 : 0,
        cursor: 'pointer'
      },
      name: 'key-shape'
    })

    if (model.label) {
      const text = group.addShape('text', {
        attrs: {
          text: model.label,
          fill: "#fff",
          fontSize: 12,
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          cursor: 'pointer'
        },
        name: 'root-text-shape'
      });
      const textBBox = text.getBBox();
      const width = textBBox.width + 24;
      const height = textBBox.height + 12;
      keyShape.attr({
        x: -width / 2,
        y: -height / 2,
        width,
        height
      })
    }

    const { collapsed, children } = model;
    const hasChildren = children?.length;
    let clickCircleY = 22;
    // 子类数量，绘制圆点在节点正下方
    if (hasChildren) {
      const schemaType = model.schemaType;
      const childCountGroup = group.addGroup({
        name: 'child-count-group'
      })
      childCountGroup.setMatrix([1, 0, 0, 0, 1, 0, 0, clickCircleY, 1])
      const countBackWidth = collapsed ? 26 : 12;
      childCountGroup.addShape('rect', {
        attrs: {
          width: countBackWidth,
          height: 12,
          radius: 6,
          stroke: rootColor,
          lineWidth: 2,
          fill: collapsed ? rootColor : '#fff',
          x: -countBackWidth / 2,
          y: -6,
          cursor: 'pointer',
        },
        name: 'child-count-rect-shape',
      });
      const childCountText = childCountGroup.addShape('text', {
        attrs: {
          text: schemaType ? `${schemaType.subTypeCount}` : '0',
          fill: '#fff',
          x: 0,
          y: 0,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          cursor: 'pointer',
        },
        name: 'child-count-text-shape',
      });
      const childHoverIcon = childCountGroup.addShape('path', {
        attrs: {
          stroke: '#fff',
          lineWidth: 1,
          cursor: 'pointer',
          path: [['M', -3, 2], ['L', 0, -2], ['L', 3, 2]]
        },
        name: 'child-count-expand-icon',
        capture: false
      });
      childCountGroup.addShape('path', {
        attrs: {
          path: [['M', 0, -13], ['L', 0, -6]],
          stroke: rootColor,
          lineWidth: 2,
        }
      })
      childHoverIcon.hide();

      // 连接 count 的线段	
      const countLink = group.addShape('path', {
        attrs: {
          path: [['M', 0, 0], ['L', 0, 11]],
          stroke: model.branchColor,
          lineWidth: 2,
        },
        name: 'count-link'
      });
      countLink.toBack();

      if (collapsed) {
        childCountGroup.show();
        childCountText.show();
        countLink.show();
      }
      else {
        childCountGroup.hide();
        childCountText.hide();
        countLink.hide();
      }
      clickCircleY += 16;
    }

    // 增加子节点 icon	
    const addChildIcon = group.addShape('marker', {
      attrs: {
        x: 0,
        y: clickCircleY,
        r: 6,
        symbol: G6.Marker.expand,
        stroke: '#999',
        fill: '#fff',
        lineWidth: 1,
        cursor: 'pointer'
      },
      name: 'add-child-icon',
    });

    addChildIcon.hide();
    // 连接增加子节点 icon 的线段	
    const addChildLink = group.addShape('path', {
      attrs: {
        path: [['M', 0, clickCircleY - 10], ['L', 0, clickCircleY]],
        stroke: model.branchColor,
        lineWidth: 2,
      },
      name: 'add-child-link'
    });
    addChildLink.toBack();
    addChildLink.hide();

    const bbox = keyShape.getBBox();
    const backContainer = group.addShape('path', {
      attrs: {
        path: hasChildren ? [
          ['M', bbox.minX, bbox.minY],
          ['L', bbox.maxX, bbox.minY],
          ['L', bbox.maxX, bbox.maxY],
          ['L', 10, bbox.maxY],
          ['L', 10, bbox.maxY + 28],
          ['L', -10, bbox.maxY + 28],
          ['L', -10, bbox.maxY],
          ['L', bbox.minX, bbox.maxY],
          ['Z']
        ] : [
          ['M', bbox.minX, bbox.minY],
          ['L', bbox.maxX, bbox.minY],
          ['L', bbox.maxX, bbox.maxY],
          ['L', 10, bbox.maxY],
          ['L', 10, bbox.maxY + 14],
          ['L', -10, bbox.maxY + 14],
          ['L', -10, bbox.maxY],
          ['L', bbox.minX, bbox.maxY],
          ['Z']
        ],
        fill: '#fff',
        opacity: 0
      },
      draggable: true
    })
    backContainer.toBack();
    return keyShape;
  },
  getAnchorPoints() {
    return [
      [0.5, 1],
    ];
  },
  update: undefined,
  setState(name, value, node) {
    if (name === 'closest') {
      const keyShape = node.getKeyShape();
      if (value) keyShape.attr('lineWidth', 2);
      else if (!node.getModel().selected) keyShape.attr('lineWidth', 1);
    }
  }
});

G6.registerNode('indentedNode', {
  addChildCount(group, tag, props) {
    const { collapsed, branchColor, count } = props;
    let clickCircleY = 10;
    // 子类数量 icon，绘制圆点在节点正下方
    if (tag) {
      const childCountGroup = group.addGroup({
        name: 'child-count-group'
      });
      childCountGroup.setMatrix([1, 0, 0, 0, 1, 0, 0, clickCircleY, 1])
      const countBackWidth = collapsed ? 26 : 12;
      childCountGroup.addShape('rect', {
        attrs: {
          width: countBackWidth,
          height: 12,
          radius: 6,
          stroke: branchColor,
          lineWidth: 2,
          fill: collapsed ? branchColor : '#fff',
          x: -countBackWidth / 2,
          y: -6,
          cursor: 'pointer',
        },
        name: 'child-count-rect-shape',
      });
      const childCountText = childCountGroup.addShape('text', {
        attrs: {
          text: count,
          fill: '#fff',
          x: 0,
          y: 0,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          cursor: 'pointer',
        },
        name: 'child-count-text-shape',
      });
      const childHoverIcon = childCountGroup.addShape('path', {
        attrs: {
          stroke: '#fff',
          lineWidth: 1,
          cursor: 'pointer',
          path: [['M', -3, 2], ['L', 0, -2], ['L', 3, 2]]
        },
        name: 'child-count-expand-icon',
        capture: false
      });
      childHoverIcon.hide();

      // 连接 count 的线段
      const countLink = group.addShape('path', {
        attrs: {
          path: [['M', 0, 0], ['L', 0, 11]],
          stroke: branchColor,
          lineWidth: 2,
        },
        name: 'count-link'
      });
      countLink.toBack();

      if (collapsed) {
        childCountGroup.show();
        childCountText.show();
        countLink.show();
      }
      else {
        childCountGroup.hide();
        childCountText.hide();
        countLink.hide();
      }

      clickCircleY += 16;
    }

    // 增加子节点 icon
    const addChildIcon = group.addShape('marker', {
      attrs: {
        x: 0,
        y: clickCircleY,
        r: 6,
        symbol: G6.Marker.expand,
        stroke: '#999',
        fill: '#fff',
        lineWidth: 1,
        cursor: 'pointer'
      },
      name: 'add-child-icon',
    });
    addChildIcon.hide();

    // 连接增加子节点 icon 的线段
    const addChildLink = group.addShape('path', {
      attrs: {
        path: [['M', 0, clickCircleY - 10], ['L', 0, clickCircleY]],
        stroke: branchColor,
        lineWidth: 2,
      },
      name: 'add-child-link'
    });
    addChildLink.toBack();
    addChildLink.hide();
  },
  addHoverBack(group, props) {
    const { mainX, mainY, width, height, fill } = props
    group.addShape('rect', {
      attrs: {
        x: mainX,
        y: mainY,
        width,
        height,
        radius: 11,
        fill,
        cursor: 'pointer'
      },
      // capture: false,
      name: 'main-shape',
      draggable: true
    });
  },
  addName(group, props) {
    const { label, x = 0, y, fill } = props;
    return group.addShape('text', {
      attrs: {
        text: label,
        x,
        y,
        textAlign: 'start',
        textBaseline: 'top',
        fill,
        fontSize: 14,
        fontFamily: 'PingFangSC-Regular',
        cursor: 'pointer',
      },
      name: 'not-root-text-shape',
      draggable: true
    });
  },
  draw(model, group) {
    const { collapsed, selected, depth, label } = model;
    // 是否为根节点
    const rootNode = depth === 0;
    // 子节点数量
    const childCount = model.children?.length || 0;

    const {
      itemPadding,
      nameMarginLeft,
    } = BaseConfig;

    let width = 0;
    const height = 24;
    // let x = -width / 2;
    const x = 0;
    const y = -height / 2;
    const borderRadius = 4;
    // 名称文本
    const text = this.addName(group, { label, x, y });

    let textWidth = text.getBBox().width;
    width = textWidth + itemPadding + nameMarginLeft;

    const keyShapeAttrs = {
      x,
      y,
      width,
      height,
      radius: borderRadius,
      fill: undefined,
      stroke: undefined,
    };

    const keyShape = group.addShape('rect', {
      attrs: keyShapeAttrs,
      name: 'root-key-shape-rect-shape',
    });

    // 底部横线
    // const branchThick = model.depth <= 2 ? 3 : model.depth <= 4 ? 2 : 1;
    const bottomLine = this.addBottomLine(group, false, {
      stroke: model.branchColor || '#AAB7C4',
      lineWidth: 3, // model.lineWidth || branchThick || 1,
      x,
      width
    });

    const mainX = x - 6;
    const mainY = -height - 6;

    // hover背景
    this.addHoverBack(group, {
      fill: selected ? MainStyle.background.hover : MainStyle.background.default,
      height,
      width,
      mainX,
      mainY,
    });

    let nameColor = NameStyle.color.default;
    if (selected) {
      nameColor = NameStyle.color.hover;
    }

    // 名称
    text.attr({
      y: y - 12,
      fill: nameColor
    });
    text.toFront();
    textWidth = text.getBBox().width;

    if (bottomLine) bottomLine.toFront();

    this.addChildCount(group, childCount && !rootNode, {
      collapsed,
      branchColor: model.branchColor,
      count: childCount ? `${childCount}` : undefined,
    });

    const bbox = group.getBBox();
    const backContainer = group.addShape('path', {
      attrs: {
        path: childCount ? [
          ['M', bbox.minX, bbox.minY],
          ['L', bbox.maxX, bbox.minY],
          ['L', bbox.maxX, bbox.maxY],
          ['L', bbox.minX + 20, bbox.maxY],
          ['L', bbox.minX + 20, bbox.maxY + 20],
          ['L', bbox.minX, bbox.maxY + 20],
          ['Z']
        ] : [
          ['M', bbox.minX, bbox.minY],
          ['L', bbox.maxX, bbox.minY],
          ['L', bbox.maxX, bbox.maxY],
          ['L', bbox.minX, bbox.maxY],
          ['Z']
        ],
        fill: '#fff',
        opacity: 0
      },
      draggable: true
    })
    backContainer.toBack();
    return keyShape;
  },
  setState(name, value, node) {
    if (name === 'closest' || name === 'selected') {
      const group = node.getContainer();
      const textShape = group.find(child => child.get('name') === 'not-root-text-shape');
      const mainShape = group.find(child => child.get('name') === 'main-shape');
      if (value) {
        if (textShape) {
          textShape.attr('fill', NameStyle.color.hover);
        }
        if (mainShape) {
          mainShape.attr('fill', MainStyle.background.hover);
        }
      } else {
        const selected = node.hasState('selected');
        if (selected) {
          if (textShape) {
            textShape.attr('fill', NameStyle.color.selected);
          }
          if (mainShape) {
            mainShape.attr('fill', MainStyle.background.default);
          }
        } else {
          if (textShape) {
            textShape.attr('fill', NameStyle.color.default);
          }
          if (mainShape) {
            mainShape.attr('fill', MainStyle.background.default);
          }
        }
      }
    }
  }
}, 'treeNode');

G6.registerEdge('indentedEdge', {
  afterDraw: (cfg, group) => {
    const sourceNode = cfg.sourceNode?.getModel();
    const targetNode = cfg.targetNode?.getModel();
    const color = sourceNode.branchColor || targetNode.branchColor || cfg.color || '#000';
    // const branchThick = sourceNode.depth <= 1 ? 3 : sourceNode.depth <= 3 ? 2 : 1;
    const keyShape = group.get('children')[0];
    keyShape.attr({
      stroke: color,
      lineWidth: 3 // branchThick
    });
    group.toBack();
  },
  getControlPoints: (cfg) => {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    return [
      startPoint,
      {
        x: startPoint.x,
        y: endPoint.y,
      },
      endPoint,
    ];
  },
  update: undefined
}, 'polyline');


G6.registerBehavior('wheel-scroll', {
  getDefaultCfg() {
    return {
      direction: 'y',
      zoomKey: 'ctrl',
      sensitivity: 3,
      // wheel-scroll 可滚动的扩展范围，默认为 0，即最多可以滚动一屏的位置
      // 当设置的值大于 0 时，即滚动可以超过一屏
      // 当设置的值小于 0 时，相当于缩小了可滚动范围
      // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
      scalableRange: -64,
    };
  },

  getEvents() {
    if (!this.zoomKey || ['shift', 'ctrl', 'alt', 'control'].indexOf(this.zoomKey) === -1) this.zoomKey = 'ctrl';
    return {
      wheel: 'onWheel',
    };
  },

  onWheel(ev) {
    const graph = this.graph;
    let keyDown = ev[`${this.zoomKey}Key`];
    if (this.zoomKey === 'control') keyDown = ev.ctrlKey;
    if (keyDown) {
      const sensitivity = this.get('sensitivity');
      const canvas = graph.get('canvas');
      const point = canvas.getPointByClient(ev.clientX, ev.clientY);
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio *= (1 + 0.01 * sensitivity);
      } else {
        ratio *= (1 - 0.01 * sensitivity);
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
      graph.emit('wheelzoom', ev);
    } else {
      let dx = ev.deltaX || ev.movementX;
      let dy = ev.deltaY || ev.movementY;
      if (!dy && navigator.userAgent.indexOf('Firefox') > -1) dy = (-ev.wheelDelta * 125) / 3

      const width = this.graph.get('width');
      const height = this.graph.get('height');
      const graphCanvasBBox = this.graph.get('group').getCanvasBBox();

      let expandWidth = this.scalableRange;
      let expandHeight = this.scalableRange;
      // 若 scalableRange 是 0~1 的小数，则作为比例考虑
      if (expandWidth < 1 && expandWidth > -1) {
        expandWidth = width * expandWidth;
        expandHeight = height * expandHeight;
      }

      const { minX, maxX, minY, maxY } = graphCanvasBBox;

      if (dx > 0) {
        if (maxX < -expandWidth) {
          dx = 0
        } else if (maxX - dx < -expandWidth) {
          dx = maxX + expandWidth
        }
      } else if (dx < 0) {
        if (minX > width + expandWidth) {
          dx = 0
        } else if (minX - dx > width + expandWidth) {
          dx = minX - (width + expandWidth)
        }
      }

      if (dy > 0) {
        if (maxY < -expandHeight) {
          dy = 0
        } else if (maxY - dy < -expandHeight) {
          dy = maxY + expandHeight
        }
      } else if (dy < 0) {
        if (minY > height + expandHeight) {
          dy = 0
        } else if (minY - dy > height + expandHeight) {
          dy = minY - (height + expandHeight)
        }
      }

      if (this.get('direction') === 'x') {
        dy = 0;
      } else if (this.get('direction') === 'y') {
        dx = 0;
      }

      graph.translate(-dx, -dy);
    }
    ev.preventDefault();
  },
});
G6.registerBehavior('drag-branch', {

  getEvents: function getEvents() {
    return {
      'node:dragstart': 'dragstart',
      'node:drag': 'drag',
      'node:dragend': 'dragend',
      'node:dragenter': 'dragenter',
      'node:dragleave': 'dragleave',
    };
  },
  dragstart: function dragstart(e) {
    this.set('foundNode', undefined)
    this.origin = {
      x: e.x,
      y: e.y,
    };
    this.target = e.item;
    const graph = this.get('graph');
    // 未配置 shouldBegin 时 默认为 true
    if (this.shouldBegin && !this.shouldBegin(graph.findDataById(this.target?.getID()))) {
      this.began = false;
      return;
    }
    this.began = true;
  },
  dragenter: function dragenter(e) {
    if (!this.began) {
      return;
    }
    const graph = this.get('graph');
    const foundNode = e.item;
    if (foundNode) graph.setItemState(foundNode, 'closest', true);
    this.set('foundNode', foundNode);
  },
  dragleave: function dragleave(e) {
    if (!this.began) {
      return;
    }
    const graph = this.get('graph');
    const foundNode = this.get('foundNode');
    if (foundNode) graph.setItemState(foundNode, 'closest', false);
    this.set('foundNode', foundNode);
  },
  drag: function drag(e) {
    if (!this.began) {
      return;
    }
    // move the delegate
    this.updateDelegate(e);
  },
  dragend: function dragend(e) {
    const graph = this.get('graph');
    const foundNode = this.get('foundNode');
    if (foundNode) {
      graph.setItemState(foundNode, 'closest', false);
    }
    if (!this.began) {
      return;
    }
    this.began = false;
    const { item } = e;
    const id = item.getID();
    const data = graph.findDataById(id);

    // remove delegate
    if (this.delegateRect) {
      this.delegateRect.remove();
      this.delegateRect = null;
    }

    if (!foundNode) {
      graph.emit('afterdragbranch', { success: false, message: 'Failed. No node close to the dragged node.', branch: data })
      return;
    }

    const foundNodeId = foundNode.getID();

    let oriParentData;
    Util.traverseTree(graph.get('data'), (d) => {
      if (oriParentData) return false;
      if (d.children?.filter(child => child.id === id)?.length) {
        oriParentData = d;
      }
      return true;
    });

    // 未配置 shouldEnd，则默认为 true
    if (this.shouldEnd && !this.shouldEnd(data, graph.findDataById(foundNodeId), oriParentData)) {
      return;
    }

    // if the foundNode is a descent of the dragged node, return
    let isDescent = false;

    Util.traverseTree(data, (d) => {
      if (d.id === foundNodeId) isDescent = true;
    });
    if (isDescent) {
      const newParentData = graph.findDataById(foundNodeId);
      graph.emit('afterdragbranch', { success: false, message: 'Failed. The target node is a descendant of the dragged node.', newParentData, branch: data })
      return;
    }

    const newParentData = graph.findDataById(foundNodeId);
    // 触发外部对数据的改变
    graph.emit('afterdragbranch', { success: true, message: 'Success.', newParentData, oriParentData, branch: data })
    graph.removeChild(data.id);
    setTimeout(() => {
      let newChildren = newParentData.children;
      if (newChildren) newChildren.push(data);
      else newChildren = [data];
      // 更新正在被操作的子树颜色
      Util.traverseTree(data, d => {
        d.branchColor = newParentData.branchColor
      })
      graph.updateChildren(newChildren, newParentData.id);
    }, 600);
  },
  updateDelegate(e) {
    const { graph } = this;
    if (!this.delegateRect) {
      // 拖动多个
      const parent = graph.get('group');
      const attrs = {
        fill: '#F3F9FF',
        fillOpacity: 0.5,
        stroke: '#1890FF',
        strokeOpacity: 0.9,
        lineDash: [5, 5],
      };

      const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition(e);
      this.originPoint = { x: cx, y: cy, width, height, minX, minY };
      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      this.delegateRect = parent.addShape('rect', {
        attrs: {
          width,
          height,
          x: cx,
          y: cy,
          ...attrs,
        },
        name: 'rect-delegate-shape',
      });
      this.delegateRect.set('capture', false);
    } else {
      const clientX = e.x - this.origin.x + this.originPoint.minX;
      const clientY = e.y - this.origin.y + this.originPoint.minY;
      this.delegateRect.attr({
        x: clientX,
        y: clientY,
      });
    }
  },
  calculationGroupPosition(evt) {
    let node = this.target;
    if (!node) {
      node = evt.item;
    }

    const bbox = node.getBBox();
    const { minX, minY, maxX, maxY } = bbox;

    return {
      x: Math.floor(minX),
      y: Math.floor(minY),
      width: Math.ceil(maxX) - Math.floor(minX),
      height: Math.ceil(maxY) - Math.floor(minY),
      minX,
      minY,
    };
  },
});
G6.registerBehavior('hover-node', {
  getEvents() {
    return {
      'node:mouseover': 'onNodeMouseOver',
      'node:mouseleave': 'onNodeMouseLeave',
      'node:mouseenter': 'onNodeMouseEnter'
    };
  },
  onNodeMouseEnter(ev) {
    const { item } = ev;
    if (!item || item.get('destroyed')) return;
    item.toFront();
    const model = item.getModel();
    const { collapsed, depth } = model;
    const rootNode = depth === 0 || model.isRoot;
    const group = item.getContainer();

    if (rootNode) return;

    // 控制子节点个数标记
    if (!collapsed) {
      const childCountGroup = group.find(e => e.get('name') === 'child-count-group');
      if (childCountGroup) {
        childCountGroup.show();
      }
    }
    this.graph.setItemState(item, 'hover', true);
  },
  onNodeMouseOver(ev) {
    const shape = ev.target;

    // tooltip显示、隐藏
    this.graph.emit('tooltip: show', ev);

    // expand 状态下，若 hover 到子节点个数标记，填充背景+显示收起 icon
    const { item } = ev;
    const group = item.getContainer();
    const model = item.getModel();
    if (!model.collapsed) {
      const childCountGroup = group.find(e => e.get('name') === 'child-count-group');
      if (childCountGroup) {
        childCountGroup.show();
        const back = childCountGroup.find(e => e.get('name') === 'child-count-rect-shape');
        const expandIcon = childCountGroup.find(e => e.get('name') === 'child-count-expand-icon');
        const rootNode = model.depth === 0 || model.isRoot;
        const branchColor = rootNode ? '#576286' : model.branchColor;
        if (shape.get('parent').get('name') === 'child-count-group') {
          if (back) {
            back.attr('fill', branchColor || '#fff');
          }
          if (expandIcon) {
            expandIcon.show();
          }
        } else {
          if (back) {
            back.attr('fill', '#fff');
          }
          if (expandIcon) {
            expandIcon.hide();
          }
        }
      }
    }

    const addChildIcon = group.find(e => e.get('name') === 'add-child-icon');
    if (addChildIcon) {
      addChildIcon.show();
    }
    const addChildLink = group.find(e => e.get('name') === 'add-child-link');
    if (addChildLink) {
      addChildLink.show();
    }
  },
  onNodeMouseLeave(ev) {
    const { item } = ev;
    const model = item.getModel();
    const group = item.getContainer();
    const { collapsed } = model;

    if (!collapsed) {
      const childCountGroup = group.find(e => e.get('name') === 'child-count-group');
      if (childCountGroup) {
        childCountGroup.hide();
      }

      const iconsLinkPath = group.find(e => e.get('name') === 'icons-link-path');
      if (iconsLinkPath) {
        iconsLinkPath.hide();
      }
    }

    const addChildIcon = group.find(e => e.get('name') === 'add-child-icon');
    if (addChildIcon) {
      addChildIcon.hide();
    }

    const addChildLink = group.find(e => e.get('name') === 'add-child-link');
    if (addChildLink) {
      addChildLink.hide();
    }

    this.graph.emit('tooltip: hide', ev);
  },
});
G6.registerBehavior('click-node', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'canvas:click': 'onCanvasClick'
    };
  },
  onNodeClick(e) {
    const { item, target } = e;
    const shape = target;
    const shapeName = shape.cfg.name;

    // 点击增加节点
    if (shapeName === 'add-child-icon') {
      const data = this.graph.findDataById(item.getID());
      if (!data.children) data.children = [];
      data.children.push({
        id: `node-${Math.random()}`,
        label: 'new node',
        branchColor: data.branchColor,
        type: 'indentedNode'
      });
      this.graph.updateChildren(data.children, data.id)
      return;
    }
    // 点击收起/展开 icon
    if (shapeName === 'child-count-rect-shape' || shapeName === 'child-count-text-shape') {
      const model = item.getModel();
      const updatedCollapsed = !model.collapsed;
      this.graph.updateItem(item, { collapsed: updatedCollapsed });
      this.graph.layout();
      return;
    }

    // 选中节点
    this.graph.getNodes().forEach(node => {
      this.graph.setItemState(node, 'selected', false);
    });
    this.graph.setItemState(item, 'selected', true);

    return;
  },
  onCanvasClick(e) {
    this.graph.getNodes().forEach(node => {
      this.graph.setItemState(node, 'selected', false);
    })
  }
})

const dataTransform = (data) => {
  const changeData = (d, level = 0, color) => {
    const data = {
      ...d,
    };
    data.type = level === 0 ? 'indentedRoot' : 'indentedNode';
    data.hover = false;

    if (color) {
      data.color = color;
    }

    if (level === 1 && !d.direction) {
      if (!d.direction) {
        data.direction = d.id.charCodeAt(d.id.length - 1) % 2 === 0 ? 'right' : 'left';
      }
    }

    if (d.children) {
      data.children = d.children.map((child) => changeData(child, level + 1, data.color));
    }
    // 给定 branchColor 和 0-2 层节点 depth
    if (data.children?.length) {
      data.depth = 0;
      data.children.forEach((subtree, i) => {
        subtree.branchColor = COLORS[i % COLORS.length];
        // dfs
        let currentDepth = 1;
        subtree.depth = currentDepth;
        Util.traverseTree(subtree, child => {
          child.branchColor = COLORS[i % COLORS.length];

          if (!child.depth) {
            child.depth = currentDepth + 1;
          }
          else currentDepth = subtree.depth;
          if (child.children) {
            child.children.forEach(subChild => {
              subChild.depth = child.depth + 1;
            })
          }
          // 把没有 children 但有 schemaType.subTypeCount 的节点设置为 collapsed
          // 说明展开需要增量请求 children，未请求前展示 collapsed 状态
          if (!child.children?.length && child.schemaType?.subTypeCount) {
            child.collapsed = true;
          }
          return true;
        })
      });
    }

    return data;
  };
  return changeData(data);
};

const tree = new G6.TreeGraph({
  container: 'container',
  width: 800,
  height: 800,
  layout: {
    type: 'indented',
    direction: 'LR',
    isHorizontal: true,
    indent: 40,
    getHeight: (d) => {
      if (d.isRoot) {
        return 30;
      }
      if (d.collapsed && d.children?.length) {
        return 36;
      }
      return 22;
    },
    getVGap: () => {
      return 10;
    },
  },
  defaultEdge: {
    type: 'indentedEdge',
    style: {
      lineWidth: 2,
      radius: 16,
    },
  },
  nodeStateStyles: {
    closest: {
      fill: '#f00',
      'node-label': {
        fill: '#f00',
      }
    },
  },
  minZoom: 0.5,
  modes: {
    default: [
      'drag-canvas',
      'wheel-scroll',
      'hover-node',
      'click-node',
      'drag-branch', {
        type: 'collapse-expand',
        trigger: 'dblclick'
      }
    ],
  },
});

tree.on('afterrender', e => {
  tree.getEdges().forEach(edge => {
    const targetNode = edge.getTarget().getModel();
    const color = targetNode.branchColor;
    tree.updateItem(edge, { color });
  });
  setTimeout(() => {
    tree.moveTo(32, 32);
    tree.zoomTo(0.7)
  }, 16);
});

tree.data(dataTransform(rawData));

tree.render();

