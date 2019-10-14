/*
 * @Author: moyee
 * @Date: 2019-07-30 12:10:26
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:44:32
 * @Description: Group Controller
 */
const isString = require('@antv/util/lib/type/is-string');
const deepMix = require('@antv/util/lib/deep-mix');
class CustomGroup {
  getDefaultCfg() {
    return {
      default: {
        lineWidth: 1,
        stroke: '#A3B1BF',
        // lineDash: [ 5, 5 ],
        strokeOpacity: 0.9,
        fill: '#F3F9FF',
        fillOpacity: 0.8,
        opacity: 0.8,
        minDis: 20,
        maxDis: 40
      },
      hover: {
        stroke: '#faad14',
        fill: '#ffe58f',
        fillOpacity: 0.3,
        opacity: 0.3,
        lineWidth: 3
      },
      // 收起状态样式
      collapse: {
        r: 30,
        width: 80,
        height: 40,
        // lineDash: [ 5, 5 ],
        stroke: '#A3B1BF',
        lineWidth: 3,
        fill: '#F3F9FF',
        offsetX: -15,
        offsetY: 5
      },
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
      operatorBtn: {
        collapse: {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          width: 16,
          height: 16
        },
        expand: {
          width: 16,
          height: 16,
          img: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg'
        }
      },
      visible: false
    };
  }

  constructor(graph) {
    // const { cfg = {} } = options;
    this.graph = graph;
    window.graph = graph;
    const groupStyle = graph.get('groupStyle');
    this.styles = deepMix({}, this.getDefaultCfg(), groupStyle);
    // 创建的群组集合
    this.customGroup = {};
    // 群组初始位置集合
    this.groupOriginBBox = {};
    this.delegateInGroup = {};
  }

  /**
   * 生成群组
   * @param {string} groupId 群组ID
   * @param {array} nodes 群组中的节点集合
   * @param {string} type 群组类型，默认为circle，支持rect
   * @param {number} zIndex 群组层级，默认为0
   * @param {boolean} updateDataModel 是否更新节点数据，默认为false，只有当手动创建group时才为true
   * @memberof ItemGroup
   */
  create(groupId, nodes, type = 'circle', zIndex = 0, updateDataModel = false) {
    const graph = this.graph;
    const customGroup = graph.get('customGroup');
    const nodeGroup = customGroup.addGroup({
      id: groupId,
      zIndex
    });

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const { default: defaultStyle } = this.styles;

    // 计算群组左上角左边、宽度、高度及x轴方向上的最大值
    const { x, y, width, height, maxX } = this.calculationGroupPosition(nodes);
    const paddingValue = this.getGroupPadding(groupId);

    const groupBBox = graph.get('groupBBoxs');
    groupBBox[groupId] = { x, y, width, height, maxX };

    // 根据groupId获取group数据，判断是否需要添加title
    let groupTitle = null;
    const groupData = graph.get('groups').filter(data => data.id === groupId);

    if (groupData && groupData.length > 0) {
      groupTitle = groupData[0].title;
    }
    // group title 坐标
    let titleX = 0;
    let titleY = 0;

    // step 1：绘制群组外框
    let keyShape = null;
    if (type === 'circle') {
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;
      const lastR = r + nodes.length * 10 + paddingValue;
      keyShape = nodeGroup.addShape('circle', {
        attrs: {
          ...defaultStyle,
          x: cx,
          y: cy,
          r: lastR
        },
        capture: true,
        zIndex,
        groupId
      });

      titleX = cx;
      titleY = cy - lastR;

      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup,
        { width, height, x: cx, y: cy, r });
    } else {
      keyShape = nodeGroup.addShape('rect', {
        attrs: {
          ...defaultStyle,
          x: x - paddingValue,
          y: y - paddingValue,
          width: width + nodes.length * 10 + paddingValue,
          height: height + nodes.length * 10 + paddingValue
        },
        capture: true,
        zIndex,
        groupId
      });

      titleX = x - paddingValue + 15;
      titleY = y - paddingValue + 15;

      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup,
        { width, height, x, y, btnOffset: maxX - 3 });
    }

    // 添加group标题
    if (groupTitle) {
      const { offsetX = 0, offsetY = 0, text = groupTitle, ...titleStyle } = groupTitle;
      const textShape = nodeGroup.addShape('text', {
        attrs: {
          text,
          x: titleX + offsetX,
          y: titleY + offsetY,
          ...titleStyle
        },
        className: 'group-title'
      });
      textShape.set('capture', false);
    }

    nodeGroup.set('keyShape', keyShape);

    // 设置graph中groupNodes的值
    graph.get('groupNodes')[groupId] = nodes;

    // 只有手动创建group时执行以下逻辑
    if (updateDataModel) {
      // 如果是手动创建group，则原始数据中是没有groupId信息的，需要将groupId添加到node中
      nodes.forEach(nodeId => {
        const node = graph.findById(nodeId);
        const model = node.getModel();
        if (!model.groupId) {
          model.groupId = groupId;
        }
      });
    }

    this.setGroupOriginBBox(groupId, keyShape.getBBox());

    graph.setAutoPaint(autoPaint);
    graph.paint();
  }

  /**
   * 修改Group样式
   * @param {Item} keyShape 群组的keyShape
   * @param {Object | String} style 样式
   */
  setGroupStyle(keyShape, style) {
    if (!keyShape || keyShape.get('destroyed')) {
      return;
    }
    let styles = {};
    const { hover: hoverStyle, default: defaultStyle } = this.styles;
    if (isString(style)) {
      if (style === 'default') {
        styles = deepMix({}, defaultStyle);
      } else if (style === 'hover') {
        styles = deepMix({}, hoverStyle);
      }
    } else {
      styles = deepMix({}, defaultStyle, style);
    }
    for (const s in styles) {
      keyShape.attr(s, styles[s]);
    }
  }

  /**
   * 根据GroupID计算群组位置，包括左上角左边及宽度和高度
   *
   * @param {object} nodes 符合条件的node集合：选中的node或具有同一个groupID的node
   * @return {object} 根据节点计算出来的包围盒坐标
   * @memberof ItemGroup
   */
  calculationGroupPosition(nodes) {
    const graph = this.graph;

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (const id of nodes) {
      const element = isString(id) ? graph.findById(id) : id;
      const bbox = element.getBBox();
      const { minX, minY, maxX, maxY } = bbox;
      if (minX < minx) {
        minx = minX;
      }

      if (minY < miny) {
        miny = minY;
      }

      if (maxX > maxx) {
        maxx = maxX;
      }

      if (maxY > maxy) {
        maxy = maxY;
      }
    }
    const x = Math.floor(minx);
    const y = Math.floor(miny);
    const width = Math.ceil(maxx) - x;
    const height = Math.ceil(maxy) - y;

    return {
      x,
      y,
      width,
      height,
      maxX: Math.ceil(maxx)
    };
  }

  /**
   * 当group中含有group时，获取padding值
   * @param {string} groupId 节点分组ID
   * @return {number} 在x和y方向上的偏移值
   */
  getGroupPadding(groupId) {
    const graph = this.graph;
    const { default: defaultStyle } = this.styles;
    // 检测操作的群组中是否包括子群组
    const groups = graph.get('groups');
    const hasSubGroup = !!groups.filter(g => g.parentId === groupId).length > 0;
    const paddingValue = hasSubGroup ? defaultStyle.maxDis : defaultStyle.minDis;
    return paddingValue;
  }

  /**
   * 设置群组初始位置的bbox，使用rect模拟
   *
   * @param {string} groupId 群组ID
   * @param {object} bbox 群组keyShape包围盒
   * @memberof ItemGroup
   */
  setGroupOriginBBox(groupId, bbox) {
    this.groupOriginBBox[groupId] = bbox;
  }

  /**
   * 获取群组初始位置及每次拖动后的位置
   *
   * @param {string} groupId 群组ID
   * @return {object} 指定groupId的原始BBox
   * @memberof ItemGroup
   */
  getGroupOriginBBox(groupId) {
    return this.groupOriginBBox[groupId];
  }

  /**
   * 设置群组对象及属性值
   *
   * @param {string} groupId 群组ID
   * @param {Group} deletage 群组元素
   * @param {object} property 属性值，里面包括width、height和maxX
   * @memberof ItemGroup
   */
  setDeletageGroupByStyle(groupId, deletage, property) {
    const { width, height, x, y, r, btnOffset } = property;
    const customGroupStyle = this.customGroup[groupId];
    if (!customGroupStyle) {
      // 首次赋值
      this.customGroup[groupId] = {
        nodeGroup: deletage,
        groupStyle: {
          width,
          height,
          x,
          y,
          r,
          btnOffset
        }
      };
    } else {
      // 更新时候merge配置项
      const { groupStyle } = customGroupStyle;
      const styles = deepMix({}, groupStyle, property);
      this.customGroup[groupId] = {
        nodeGroup: deletage,
        groupStyle: styles
      };
    }
  }

  /**
   * 根据群组ID获取群组及属性对象
   *
   * @param {string} groupId 群组ID
   * @return {Item} 群组
   * @memberof ItemGroup
   */
  getDeletageGroupById(groupId) {
    return this.customGroup[groupId];
  }

  /**
   * 收起和展开群组
   * @param {string} groupId 群组ID
   */
  collapseExpandGroup(groupId) {
    const customGroup = this.getDeletageGroupById(groupId);
    const { nodeGroup } = customGroup;

    const hasHidden = nodeGroup.get('hasHidden');
    // 该群组已经处于收起状态，需要展开
    if (hasHidden) {
      nodeGroup.set('hasHidden', false);
      this.expandGroup(groupId);
    } else {
      nodeGroup.set('hasHidden', true);
      this.collapseGroup(groupId);
    }
  }
  /**
   * 将临时节点递归地设置到groupId及父节点上
   * @param {string} groupId 群组ID
   * @param {string} tmpNodeId 临时节点ID
   */
  setGroupTmpNode(groupId, tmpNodeId) {
    const graph = this.graph;
    const graphNodes = graph.get('groupNodes');
    const groups = graph.get('groups');
    if (graphNodes[groupId].indexOf(tmpNodeId) < 0) {
      graphNodes[groupId].push(tmpNodeId);
    }
    // 获取groupId的父群组
    const parentGroup = groups.filter(g => g.id === groupId);
    let parentId = null;
    if (parentGroup.length > 0) {
      parentId = parentGroup[0].parentId;
    }

    // 如果存在父群组，则把临时元素也添加到父群组中
    if (parentId) {
      this.setGroupTmpNode(parentId, tmpNodeId);
    }
  }
  /**
   * 收起群组，隐藏群组中的节点及边，群组外部相邻的边都连接到群组上
   *
   * @param {string} id 群组ID
   * @memberof ItemGroup
   */
  collapseGroup(id) {
    const self = this;
    const customGroup = this.getDeletageGroupById(id);
    const { nodeGroup } = customGroup;

    // 收起群组后的默认样式
    const { collapse } = this.styles;
    const graph = this.graph;
    const groupType = graph.get('groupType');

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const nodesInGroup = graph.get('groupNodes')[id];
    const { width: w, height: h } = this.calculationGroupPosition(nodesInGroup);

    // 更新Group的大小
    const keyShape = nodeGroup.get('keyShape');
    const { r, width, height, offsetX, offsetY, ...otherStyle } = collapse;
    for (const style in otherStyle) {
      keyShape.attr(style, otherStyle[style]);
    }

    let options = {
      groupId: id,
      id: `${id}-custom-node`,
      x: keyShape.attr('x'),
      y: keyShape.attr('y'),
      style: {
        r
      },
      shape: 'circle'
    };

    const titleShape = nodeGroup.findByClassName('group-title');

    // 收起群组时候动画
    if (groupType === 'circle') {
      const radius = w > h ? w / 2 : h / 2;
      // const radius = wh + nodesInGroup.length * 10
      keyShape.animate({
        onFrame(ratio) {
          if (ratio === 1) {
            self.setGroupOriginBBox(id, keyShape.getBBox());
          }
          return {
            r: radius - ratio * (radius - r)
          };
        }
      }, 500, 'easeCubic');
      if (titleShape) {
        titleShape.attr({
          x: keyShape.attr('x') + offsetX,
          y: keyShape.attr('y') + offsetY
        });
      }
    } else if (groupType === 'rect') {
      keyShape.animate({
        onFrame(ratio) {
          if (ratio === 1) {
            self.setGroupOriginBBox(id, keyShape.getBBox());
          }
          return {
            width: w - ratio * (w - width),
            height: h - ratio * (h - height)
          };
        }
      }, 500, 'easeCubic');
      if (titleShape) {
        titleShape.attr({
          x: keyShape.attr('x') + 10,
          y: keyShape.attr('y') + height / 2 + 5
        });
      }
      options = {
        groupId: id,
        id: `${id}-custom-node`,
        x: keyShape.attr('x') + width / 2,
        y: keyShape.attr('y') + height / 2,
        size: [ width, height ],
        shape: 'rect'
      };
    }

    const edges = graph.getEdges();
    // 获取所有source在群组外，target在群组内的边
    const sourceOutTargetInEdges = edges.filter(edge => {
      const model = edge.getModel();
      return !nodesInGroup.includes(model.source) && nodesInGroup.includes(model.target);
    });

    // 获取所有source在群组外，target在群组内的边
    const sourceInTargetOutEdges = edges.filter(edge => {
      const model = edge.getModel();
      return nodesInGroup.includes(model.source) && !nodesInGroup.includes(model.target);
    });

    // 获取群组中节点之间的所有边
    const edgeAllInGroup = edges.filter(edge => {
      const model = edge.getModel();
      return nodesInGroup.includes(model.source) && nodesInGroup.includes(model.target);
    });

    // 隐藏群组中的所有节点
    nodesInGroup.forEach(nodeId => {
      const node = graph.findById(nodeId);
      const model = node.getModel();
      const { groupId } = model;
      if (groupId && groupId !== id) {
        // 存在群组，则隐藏
        const currentGroup = this.getDeletageGroupById(groupId);
        const { nodeGroup } = currentGroup;
        nodeGroup.hide();
      }
      node.hide();
    });

    edgeAllInGroup.forEach(edge => {
      const source = edge.getSource();
      const target = edge.getTarget();
      if (source.isVisible() && target.isVisible()) {
        edge.show();
      } else {
        edge.hide();
      }
    });

    // 群组中存在source和target其中有一个在群组内，一个在群组外的情况
    if (sourceOutTargetInEdges.length > 0 || sourceInTargetOutEdges.length > 0) {
      const delegateNode = graph.add('node', options);
      delegateNode.set('capture', false);
      delegateNode.hide();
      this.delegateInGroup[id] = {
        delegateNode
      };

      // 将临时添加的节点加入到群组中，以便拖动节点时候线跟着拖动
      this.setGroupTmpNode(id, `${id}-custom-node`);

      this.updateEdgeInGroupLinks(id, sourceOutTargetInEdges, sourceInTargetOutEdges);
    }

    graph.paint();
    graph.setAutoPaint(autoPaint);
  }

  /**
   * 收起群组时生成临时的节点，用于连接群组外的节点
   *
   * @param {string} groupId 群组ID
   * @param {array} sourceOutTargetInEdges 出度的边
   * @param {array} sourceInTargetOutEdges 入度的边
   * @memberof ItemGroup
   */
  updateEdgeInGroupLinks(groupId, sourceOutTargetInEdges, sourceInTargetOutEdges) {
    const graph = this.graph;
    // 更新source在外的节点
    const edgesOuts = {};
    sourceOutTargetInEdges.map(edge => {
      const model = edge.getModel();
      const id = edge.get('id');
      const { target } = model;
      edgesOuts[id] = target;
      graph.updateItem(edge, {
        target: `${groupId}-custom-node`
      });
      return true;
    });

    // 更新target在外的节点
    const edgesIn = {};
    sourceInTargetOutEdges.map(edge => {
      const model = edge.getModel();
      const id = edge.get('id');
      const { source } = model;
      edgesIn[id] = source;
      graph.updateItem(edge, {
        source: `${groupId}-custom-node`
      });
      return true;
    });

    // 缓存群组groupId下的edge和临时生成的node节点
    this.delegateInGroup[groupId] = deepMix({
      sourceOutTargetInEdges,
      sourceInTargetOutEdges,
      edgesOuts,
      edgesIn
    }, this.delegateInGroup[groupId]);
  }

  /**
   * 展开群组，恢复群组中的节点及边
   *
   * @param {string} id 群组ID
   * @memberof ItemGroup
   */
  expandGroup(id) {
    const graph = this.graph;
    const groupType = graph.get('groupType');
    const self = this;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 显示之前隐藏的节点和群组
    const nodesInGroup = graph.get('groupNodes')[id];
    const noCustomNodes = nodesInGroup.filter(node => node.indexOf('custom-node') === -1);
    const { width, height } = this.calculationGroupPosition(noCustomNodes);
    const { nodeGroup } = this.getDeletageGroupById(id);
    const keyShape = nodeGroup.get('keyShape');

    const { default: defaultStyle, collapse } = this.styles;

    for (const style in defaultStyle) {
      keyShape.attr(style, defaultStyle[style]);
    }

    const titleShape = nodeGroup.findByClassName('group-title');

    // 检测操作的群组中是否包括子群组
    const paddingValue = this.getGroupPadding(id);
    if (groupType === 'circle') {
      const r = width > height ? width / 2 : height / 2;
      keyShape.animate({
        onFrame(ratio) {
          if (ratio === 1) {
            self.setGroupOriginBBox(id, keyShape.getBBox());
          }
          return {
            r: collapse.r + ratio * (r + nodesInGroup.length * 10 - collapse.r + paddingValue)
          };
        }
      }, 500, 'easeCubic');
    } else if (groupType === 'rect') {
      const { width: w, height: h } = collapse;
      keyShape.animate({
        onFrame(ratio) {
          if (ratio === 1) {
            self.setGroupOriginBBox(id, keyShape.getBBox());
          }
          return {
            width: w + ratio * (width - w + paddingValue + noCustomNodes.length * 10),
            height: h + ratio * (height - h + paddingValue + noCustomNodes.length * 10)
          };
        }
      }, 500, 'easeCubic');
    }

    if (titleShape) {
      // 根据groupId获取group数据，判断是否需要添加title
      let groupTitle = null;
      const groupData = graph.get('groups').filter(data => data.id === id);

      if (groupData && groupData.length > 0) {
        groupTitle = groupData[0].title;
      }
      const { offsetX = 0, offsetY = 0 } = groupTitle;
      if (groupType === 'circle') {
        titleShape.animate({
          onFrame(ratio) {
            return {
              x: keyShape.attr('x') + offsetX,
              y: keyShape.attr('y') - ratio * keyShape.attr('r') + offsetY
            };
          }
        }, 600, 'easeCubic');
      } else if (groupType === 'rect') {
        titleShape.animate({
          onFrame(ratio) {
            return {
              x: keyShape.attr('x') + ratio * (15 + offsetX),
              y: keyShape.attr('y') + ratio * (15 + offsetY)
            };
          }
        }, 600, 'easeCubic');
      }
    }
    // cy - lastR
    // 群组动画一会后再显示节点和边
    setTimeout(() => {
      nodesInGroup.forEach(nodeId => {
        const node = graph.findById(nodeId);
        const model = node.getModel();
        const { groupId } = model;
        if (groupId && groupId !== id) {
          // 存在群组，则显示
          const currentGroup = this.getDeletageGroupById(groupId);
          const { nodeGroup } = currentGroup;
          nodeGroup.show();
          const hasHidden = nodeGroup.get('hasHidden');
          if (!hasHidden) {
            node.show();
          }
        } else {
          node.show();
        }
      });

      const edges = graph.getEdges();
      // 获取群组中节点之间的所有边
      const edgeAllInGroup = edges.filter(edge => {
        const model = edge.getModel();
        return nodesInGroup.includes(model.source) || nodesInGroup.includes(model.target);
      });

      edgeAllInGroup.forEach(edge => {
        const source = edge.getSource();
        const target = edge.getTarget();
        if (source.isVisible() && target.isVisible()) {
          edge.show();
        }
      });
    }, 300);

    const delegates = this.delegateInGroup[id];
    if (delegates) {
      const { sourceOutTargetInEdges,
        sourceInTargetOutEdges,
        edgesOuts,
        edgesIn,
        delegateNode } = delegates;

      // 恢复source在外的节点
      sourceOutTargetInEdges.map(edge => {
        const id = edge.get('id');
        const sourceOuts = edgesOuts[id];
        graph.updateItem(edge, {
          target: sourceOuts
        });
        return true;
      });

      // 恢复target在外的节点
      sourceInTargetOutEdges.map(edge => {
        const id = edge.get('id');
        const sourceIn = edgesIn[id];
        graph.updateItem(edge, {
          source: sourceIn
        });
        return true;
      });

      // 删除群组中的临时节点ID
      const tmpNodeModel = delegateNode.getModel();

      this.deleteTmpNode(id, tmpNodeModel.id);
      graph.remove(delegateNode);
      delete this.delegateInGroup[id];
    }
    graph.setAutoPaint(autoPaint);
    graph.paint();
  }

  deleteTmpNode(groupId, tmpNodeId) {
    const graph = this.graph;
    const groups = graph.get('groups');
    const nodesInGroup = graph.get('groupNodes')[groupId];

    const index = nodesInGroup.indexOf(tmpNodeId);
    nodesInGroup.splice(index, 1);

    // 获取groupId的父群组
    const parentGroup = groups.filter(g => g.id === groupId);
    let parentId = null;
    if (parentGroup.length > 0) {
      parentId = parentGroup[0].parentId;
    }

    // 如果存在父群组，则把临时元素也添加到父群组中
    if (parentId) {
      this.deleteTmpNode(parentId, tmpNodeId);
    }
  }

  /**
   * 删除节点分组
   * @param {string} groupId 节点分组ID
   * @memberof ItemGroup
   */
  remove(groupId) {
    const graph = this.graph;
    const customGroup = this.getDeletageGroupById(groupId);

    if (!customGroup) {
      console.warn(`请确认输入的groupId ${groupId} 是否有误！`);
      return;
    }
    const { nodeGroup } = customGroup;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const groupNodes = graph.get('groupNodes');
    const nodes = groupNodes[groupId];
    // 删除原群组中node中的groupID
    nodes.forEach(nodeId => {
      const node = graph.findById(nodeId);
      const model = node.getModel();
      const gId = model.groupId;
      if (!gId) {
        return;
      }
      if (groupId === gId) {
        delete model.groupId;
        // 使用没有groupID的数据更新节点
        graph.updateItem(node, model);
      }
    });
    nodeGroup.destroy();
    // 删除customGroup中groupId的数据
    delete this.customGroup[groupId];
    // 删除groups数据中的groupId
    const groups = graph.get('groups');
    if (groups.length > 0) {
      const filterGroup = groups.filter(group => group.id !== groupId);
      graph.set('groups', filterGroup);
    }

    let parentGroupId = null;
    let parentGroupData = null;
    for (const group of groups) {
      if (groupId !== group.id) {
        continue;
      }
      parentGroupId = group.parentId;
      parentGroupData = group;
      break;
    }

    if (parentGroupData) {
      delete parentGroupData.parentId;
    }
    // 删除groupNodes中的groupId数据
    delete groupNodes[groupId];
    if (parentGroupId) {
      groupNodes[parentGroupId] = groupNodes[parentGroupId].filter(node => !nodes.includes(node));
    }

    graph.setAutoPaint(autoPaint);
    graph.paint();
  }

  destroy() {
    this.graph = null;
    this.styles = {};
    this.customGroup = {};
    this.groupOriginBBox = {};
    this.delegateInGroup = {};
  }
}

module.exports = CustomGroup;
