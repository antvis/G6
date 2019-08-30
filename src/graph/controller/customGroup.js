/*
 * @Author: moyee
 * @Date: 2019-07-30 12:10:26
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:44:32
 * @Description: Group Controller
 */
const { merge, isString } = require('lodash');

class CustomGroup {
  getDefaultCfg() {
    return {
      default: {
        lineWidth: 1,
        stroke: '#A3B1BF',
        radius: 10,
        lineDash: [ 5, 5 ],
        strokeOpacity: 0.9,
        fill: '#F3F9FF',
        fillOpacity: 0.8,
        opacity: 0.8
      },
      hover: {
        stroke: '#faad14',
        fill: '#ffe58f',
        fillOpacity: 0.3,
        opacity: 0.3,
        lineWidth: 3
      },
      // 收起状态样式
      collapseStyle: {
        r: 30,
        lineDash: [ 5, 5 ],
        stroke: '#ffa39e',
        lineWidth: 3,
        fill: '#ffccc7'
      },
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
      text: {
        text: '新建群组',
        stroke: '#444'
      },
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
    this.styles = this.getDefaultCfg();
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
   * @memberof ItemGroup
   */
  create(groupId, nodes, type = 'circle', zIndex = 0) {
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

    const groupBBox = graph.get('groupBBoxs');
    groupBBox[groupId] = { x, y, width, height, maxX };

    // step 1：绘制群组外框
    let keyShape = null;

    if (type === 'circle') {
      const r = width > height ? width / 2 : height / 2;
      const cx = (width + 2 * x) / 2;
      const cy = (height + 2 * y) / 2;
      keyShape = nodeGroup.addShape('circle', {
        attrs: {
          ...defaultStyle,
          x: cx,
          y: cy,
          r: r + nodes.length * 10
        },
        capture: true,
        zIndex,
        groupId
      });
      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup,
        { width, height, x: cx, y: cy, r });
    } else {
      keyShape = nodeGroup.addShape('rect', {
        attrs: {
          ...defaultStyle,
          x,
          y,
          width,
          height
        },
        capture: true,
        zIndex,
        groupId
      });
      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup,
        { width, height, x, y, btnOffset: maxX - 3 });
    }
    nodeGroup.set('keyShape', keyShape);

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
        styles = merge({}, defaultStyle);
      } else if (style === 'hover') {
        styles = merge({}, hoverStyle);
      }
    } else {
      styles = merge({}, defaultStyle, style);
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

    const minx = [];
    const maxx = [];
    const miny = [];
    const maxy = [];

    // 获取已节点的所有最大最小x y值
    for (const id of nodes) {
      const element = isString(id) ? graph.findById(id) : id;
      const bbox = element.getBBox();
      const { minX, minY, maxX, maxY } = bbox;
      minx.push(minX);
      miny.push(minY);
      maxx.push(maxX);
      maxy.push(maxY);
    }

    // 从上一步获取的数组中，筛选出最小和最大值
    const minX = Math.floor(Math.min(...minx));
    const maxX = Math.floor(Math.max(...maxx));
    const minY = Math.floor(Math.min(...miny));
    const maxY = Math.floor(Math.max(...maxy));

    // const x = minX - 20;
    // const y = minY - 30;
    // const width = maxX - minX + 40;
    // const height = maxY - minY + 40;
    const x = minX;
    const y = minY;
    const width = maxX - minX;
    const height = maxY - minY;

    return {
      x,
      y,
      width,
      height,
      maxX
    };
  }

  /**
   * 拖动群组里面的节点，更新群组属性样式
   *
   * @param {string} groupId 群组ID
   * @return {boolean} null
   * @memberof ItemGroup
   */
  updateGroupStyleByNode(groupId) {
    const graph = this.graph;
    const customGroup = graph.get('customGroup');
    const groupChild = customGroup.get('children');
    const currentGroup = groupChild.filter(child => child.get('id') === groupId);

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 获取所有具有同一个groupID的节点，计算群组大小
    const nodes = graph.getNodes();
    const groupNodes = nodes.filter(node => {
      const currentModel = node.getModel();
      const gId = currentModel.groupId;
      return gId === groupId;
    });

    const { x, y, width, height, maxX } = this.calculationGroupPosition(groupNodes);

    const current = currentGroup[0];
    if (!current) {
      return false;
    }

    // 更新rect属性样式
    const rect = current.getChildByIndex(0);
    rect.attr('x', x);
    rect.attr('y', y);
    rect.attr('width', width);
    rect.attr('height', height);

    // 更新群组图标属性样式
    const logoIcon = current.getChildByIndex(1);
    logoIcon.attr('x', x + 8);
    logoIcon.attr('y', y + 8);

    // 更新群组名称属性样式
    const text = current.getChildByIndex(2);
    text.attr('x', x + 35);
    text.attr('y', y + 21);

    // 更新收起和展开按钮属性样式
    const operatorBtn = current.getChildByIndex(3);
    operatorBtn.attr('x', maxX - 3);
    operatorBtn.attr('y', y + 8);

    // 更新群组及属性样式
    this.setDeletageGroupByStyle(groupId, current, { width, height, btnOffset: maxX - 3 });

    // 更新群组初始位置的bbox
    this.setGroupOriginBBox(groupId, rect.getBBox());

    graph.setAutoPaint(autoPaint);
    graph.paint();
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
      const styles = merge({}, groupStyle, property);
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
    const { nodeGroup, groupStyle } = customGroup;

    // 收起群组后的默认样式
    const { collapseStyle } = this.styles;
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const nodesInGroup = graph.get('groupNodes')[id];

    // 更新Group的大小
    const keyShape = nodeGroup.get('keyShape');
    const { r, ...otherStyle } = collapseStyle;
    for (const style in otherStyle) {
      keyShape.attr(style, otherStyle[style]);
    }

    // 收起群组时候动画
    keyShape.animate({
      onFrame(ratio) {
        if (ratio === 1) {
          self.setGroupOriginBBox(id, keyShape.getBBox());
        }
        return {
          r: groupStyle.r - ratio * (groupStyle.r - r)
        };
      }
    }, 1000, 'easeCubic');

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

    // 群组中存在source和target其中有一个在群组内，一个在群组外的情况
    if (sourceOutTargetInEdges.length > 0 || sourceInTargetOutEdges.length > 0) {
      const options = {
        groupId: id,
        id: `${id}-custom-node`,
        x: keyShape.attr('x'),
        y: keyShape.attr('y'),
        style: {
          r: 30
        },
        shape: 'circle'
      };
      const delegateNode = graph.add('node', options);
      delegateNode.set('capture', false);
      delegateNode.hide();
      this.delegateInGroup[id] = {
        delegateNode
      };

      // 将临时添加的节点加入到群组中，以便拖动节点时候线跟着拖动
      // nodesInGroup.push(`${id}-custom-node`);
      this.setGroupTmpNode(id, `${id}-custom-node`);

      this.updateEdgeInGroupLinks(id, sourceOutTargetInEdges, sourceInTargetOutEdges);
    }

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
      const { id, target } = model;
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
      const { id, source } = model;
      edgesIn[id] = source;
      graph.updateItem(edge, {
        source: `${groupId}-custom-node`
      });
      return true;
    });

    // 缓存群组groupId下的edge和临时生成的node节点
    this.delegateInGroup[groupId] = merge({
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
    const self = this;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    // 显示之前隐藏的节点和群组
    const nodesInGroup = graph.get('groupNodes')[id];
    const { nodeGroup } = this.getDeletageGroupById(id);
    const { width, height } = this.calculationGroupPosition(nodesInGroup);
    // 检测操作的群组中是否包括子群组
    const groups = graph.get('groups');
    const hasSubGroup = !!groups.filter(g => g.parentId === id).length > 0;
    const r = width > height ? width / 2 : height / 2 + (hasSubGroup ? 20 : 0);

    // const cx = (width + 2 * x) / 2;
    // const cy = (height + 2 * y) / 2;
    const keyShape = nodeGroup.get('keyShape');

    const { default: defaultStyle } = this.styles;

    // const styles = merge({}, defaultStyle, { x: cx, y: cy });
    for (const style in defaultStyle) {
      keyShape.attr(style, defaultStyle[style]);
    }
    // keyShape.attr('r', groupStyle.r + nodesInGroup.length * 10);
    keyShape.animate({
      onFrame(ratio) {
        if (ratio === 1) {
          self.setGroupOriginBBox(id, keyShape.getBBox());
        }
        return {
          r: 30 + ratio * (r + nodesInGroup.length * 10 - 30)
        };
      }
    }, 1000, 'easeCubic');

    // this.setGroupOriginBBox(id, keyShape.getBBox());
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
    }, 800);

    const delegates = this.delegateInGroup[id];
    if (delegates) {
      const { sourceOutTargetInEdges,
        sourceInTargetOutEdges,
        edgesOuts,
        edgesIn,
        delegateNode } = delegates;

      // 恢复source在外的节点
      sourceOutTargetInEdges.map(edge => {
        const model = edge.getModel();
        const sourceOuts = edgesOuts[model.id];
        graph.updateItem(edge, {
          target: sourceOuts
        });
        return true;
      });

      // 恢复target在外的节点
      sourceInTargetOutEdges.map(edge => {
        const model = edge.getModel();
        const sourceIn = edgesIn[model.id];
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
   * 拆分群组
   *
   * @memberof ItemGroup
   */
  unGroup() {
    const graph = this.graph;
    const group = graph.get('customGroup');
    const groupChild = group.get('children');
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);

    const currentGroup = groupChild.filter(child => child.get('selected'));
    if (currentGroup.length > 0) {
      const nodes = graph.getNodes();
      for (const current of currentGroup) {
        const id = current.get('id');
        // 删除原群组中node中的groupID
        nodes.forEach(node => {
          const model = node.getModel();
          const gId = model.groupId;
          if (!gId) {
            return;
          }
          if (id === gId) {
            delete model.groupId;
            // 使用没有groupID的数据更新节点
            graph.updateItem(node, model);
          }
        });
        current.destroy();
      }
      graph.setAutoPaint(autoPaint);
      graph.paint();
    }
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
