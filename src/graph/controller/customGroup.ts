/*
 * @Author: moyee
 * @Date: 2019-07-30 12:10:26
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-23 11:44:32
 * @Description: Group Controller
 */
import { IGroup } from '@antv/g-base/lib/interfaces';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import { Point } from '@antv/g-canvas/lib/types';
import deepMix from '@antv/util/lib/deep-mix';
import isString from '@antv/util/lib/is-string';
import { GraphData, IG6GraphEvent, Item } from '../../types';
import { IGraph } from '../../interface/graph';
import { IEdge, INode } from '../../interface/item';

interface ICustomGroup {
  nodeGroup: IGroup;
  groupStyle: {
    width: number;
    height: number;
    x: number;
    y: number;
    r: number;
    btnOffset: number;
  };
}

interface IGroupPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  maxX?: number;
}

interface IDelegate {
  [key: string]: {
    sourceOutTargetInEdges?: IEdge[];
    sourceInTargetOutEdges?: IEdge[];
    edgesOuts?: INode;
    edgesIn?: INode;
    delegateNode?: Item;
  };
}

export default class CustomGroup {
  private static getDefaultCfg() {
    return {
      default: {
        lineWidth: 1,
        stroke: '#A3B1BF',
        // lineDash: [ 5, 5 ],
        strokeOpacity: 0.9,
        fill: '#F3F9FF',
        fillOpacity: 0.8,
        opacity: 0.8,
        disCoefficient: 0.6,
        minDis: 40,
        maxDis: 100,
      },
      hover: {
        stroke: '#faad14',
        fill: '#ffe58f',
        fillOpacity: 0.3,
        opacity: 0.3,
        lineWidth: 3,
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
        offsetY: 5,
      },
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
      operatorBtn: {
        collapse: {
          img: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
          width: 16,
          height: 16,
        },
        expand: {
          width: 16,
          height: 16,
          img: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
        },
      },
      visible: false,
    };
  }

  private graph: IGraph;

  private styles: any;

  private customGroup: {
    [key: string]: ICustomGroup;
  };

  private delegateInGroup: IDelegate;

  private nodePoint: Point[];

  public destroyed: boolean;

  constructor(graph: IGraph) {
    this.graph = graph;
    const groupStyle = graph.get('groupStyle');
    this.styles = deepMix({}, CustomGroup.getDefaultCfg(), groupStyle);

    // 创建的群组集合
    this.customGroup = {};
    this.delegateInGroup = {};
    this.nodePoint = [];
    this.destroyed = false;
  }

  /**
   * 生成群组
   * @param {string} groupId 群组ID
   * @param {array} nodes 群组中的节点集合
   * @param {string} type 群组类型，默认为circle，支持rect
   * @param {number} zIndex 群组层级，默认为0
   * @param {boolean} updateDataModel 是否更新节点数据，默认为false，只有当手动创建group时才为true
   * @param {object} title 分组标题配置
   * @memberof ItemGroup
   * @return {object} null
   */
  public create(
    groupId: string,
    nodes: string[],
    type = 'circle',
    zIndex = 0,
    updateDataModel = false,
    title = {},
  ) {
    const { graph } = this;
    const customGroup: IGroup = graph.get('customGroup');
    const hasGroupIds: string[] = customGroup.get('children').map(data => data.get('id'));

    if (hasGroupIds.indexOf(groupId) > -1) {
      // eslint-disable-next-line no-console
      console.warn(`已经存在ID为 ${groupId} 的分组，请重新设置分组ID！`);
      return;
    }

    const nodeGroup = customGroup.addGroup({
      id: groupId,
      zIndex,
    });

    const { default: defaultStyle } = this.styles;

    // 计算群组左上角左边、宽度、高度及x轴方向上的最大值
    const { x, y, width, height, maxX } = this.calculationGroupPosition(nodes);
    const paddingValue = this.getGroupPadding(groupId);

    const groupBBox = graph.get('groupBBoxs');
    groupBBox[groupId] = { x, y, width, height, maxX };

    // 根据groupId获取group数据，判断是否需要添加title
    let groupTitle = null;
    // 只有手动创建group时执行以下逻辑
    if (updateDataModel) {
      const groups = graph.get('groups');
      // 如果是手动创建group，则原始数据中是没有groupId信息的，需要将groupId添加到node中
      nodes.forEach(nodeId => {
        const node = graph.findById(nodeId);
        const model = node.getModel();
        if (!model.groupId) {
          model.groupId = groupId;
        }
      });

      // 如果是手动创建 group，则将 group 也添加到 groups 中
      if (!groups.find(data => data.id === groupId)) {
        groups.push({
          id: groupId,
          title,
        });
        graph.set({
          groups,
        });
      }
    }

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
      const lastR = r + paddingValue;
      keyShape = nodeGroup.addShape('circle', {
        attrs: {
          ...defaultStyle,
          x: cx,
          y: cy,
          r: lastR,
        },
        draggable: true,
        capture: true,
        zIndex,
        groupId,
        name: 'circle-group-shape',
      });

      titleX = cx;
      titleY = cy - lastR;

      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup, { width, height, x: cx, y: cy, r: lastR });
    } else {
      const rectPadding = paddingValue * defaultStyle.disCoefficient;
      keyShape = nodeGroup.addShape('rect', {
        attrs: {
          ...defaultStyle,
          x: x - rectPadding,
          y: y - rectPadding,
          width: width + rectPadding * 2,
          height: height + rectPadding * 2,
        },
        draggable: true,
        capture: true,
        zIndex,
        groupId,
        name: 'rect-group-shape',
      });

      titleX = x - rectPadding + 15;
      titleY = y - rectPadding + 15;

      // 更新群组及属性样式
      this.setDeletageGroupByStyle(groupId, nodeGroup, {
        x: x - rectPadding,
        y: y - rectPadding,
        width: width + rectPadding,
        height: height + rectPadding,
        btnOffset: maxX - 3,
      });
    }

    // 添加group标题
    if (groupTitle) {
      const { offsetX = 0, offsetY = 0, text = groupTitle, ...titleStyle } = groupTitle;
      const textShape = nodeGroup.addShape('text', {
        attrs: {
          text,
          stroke: '#444',
          x: titleX + offsetX,
          y: titleY + offsetY,
          ...titleStyle,
        },
        className: 'group-title',
        name: 'group-title-shape',
      });
      textShape.set('capture', false);
    }

    nodeGroup.set('keyShape', keyShape);

    // 设置graph中groupNodes的值
    graph.get('groupNodes')[groupId] = nodes;
  }

  /**
   * 修改Group样式
   * @param {Item} keyShape 群组的keyShape
   * @param {Object | String} style 样式
   */
  public setGroupStyle(keyShape: ShapeBase, style: string | object) {
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
    Object.keys(styles).forEach(s => {
      keyShape.attr(s, styles[s]);
    });
  }

  /**
   * 根据GroupID计算群组位置，包括左上角左边及宽度和高度
   *
   * @param {object} nodes 符合条件的node集合：选中的node或具有同一个groupID的node
   * @param {object} position delegate的坐标位置
   * @return {object} 根据节点计算出来的包围盒坐标
   * @memberof ItemGroup
   */
  public calculationGroupPosition(
    nodes: string[],
    position: Point = { x: 100, y: 100 },
  ): IGroupPosition {
    // hxy 可新增无节点group，适用于图编辑场景
    if (nodes.length === 0) {
      // 防止空group 无法计算大小
      return {
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
      };
    }

    const { graph } = this;

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    nodes.forEach(id => {
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
    });

    const x = Math.floor(minx);
    const y = Math.floor(miny);
    const width = Math.ceil(maxx) - x;
    const height = Math.ceil(maxy) - y;

    return {
      x,
      y,
      width,
      height,
      maxX: Math.ceil(maxx),
    };
  }

  /**
   * 当group中含有group时，获取padding值
   * @param {string} groupId 节点分组ID
   * @return {number} 在x和y方向上的偏移值
   */
  public getGroupPadding(groupId: string): number {
    const { graph } = this;
    const { default: defaultStyle } = this.styles;
    // 检测操作的群组中是否包括子群组
    const groups = graph.get('groups');
    const hasSubGroup = !!(groups.filter(g => g.parentId === groupId).length > 0);
    const paddingValue = hasSubGroup ? defaultStyle.maxDis : defaultStyle.minDis;
    return paddingValue;
  }

  /**
   * 设置群组对象及属性值
   *
   * @param {string} groupId 群组ID
   * @param {Group} deletage 群组元素
   * @param {object} property 属性值，里面包括width、height和maxX
   * @memberof ItemGroup
   */
  public setDeletageGroupByStyle(groupId: string, deletage: IGroup, property: any): void {
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
          btnOffset,
        },
      };
    } else {
      // 更新时候merge配置项
      const { groupStyle } = customGroupStyle;
      const styles = deepMix({}, groupStyle, property);
      this.customGroup[groupId] = {
        nodeGroup: deletage,
        groupStyle: styles,
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
  public getDeletageGroupById(groupId: string): ICustomGroup {
    return this.customGroup[groupId];
  }

  /**
   * 收起和展开群组
   * @param {string} groupId 群组ID
   */
  public collapseExpandGroup(groupId: string) {
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
  public setGroupTmpNode(groupId: string, tmpNodeId: string) {
    const { graph } = this;
    const graphNodes = graph.get('groupNodes');
    const groups = graph.get('groups');
    if (graphNodes[groupId].indexOf(tmpNodeId) < 0) {
      graphNodes[groupId].push(tmpNodeId);
    }
    // 获取groupId的父群组
    const parentGroup = groups.filter(g => g.id === groupId);
    let parentId = null;
    if (parentGroup.length > 0) {
      // eslint-disable-next-line prefer-destructuring
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
  public collapseGroup(id: string) {
    const customGroup = this.getDeletageGroupById(id);
    const { nodeGroup } = customGroup;

    // 收起群组后的默认样式
    const { collapse } = this.styles;
    const { graph } = this;
    const groupType = graph.get('groupType');

    const nodesInGroup = graph.get('groupNodes')[id];

    // 更新Group的大小
    const keyShape = nodeGroup.get('keyShape');
    const { r, width, height, offsetX, offsetY, ...otherStyle } = collapse;

    Object.keys(otherStyle).forEach(style => {
      keyShape.attr(style, otherStyle[style]);
    });

    let options: any = {
      groupId: id,
      id: `${id}-custom-node`,
      x: keyShape.attr('x'),
      y: keyShape.attr('y'),
      style: {
        r,
      },
      type: 'circle',
    };

    const titleShape = nodeGroup.find(element => element.get('className') === 'group-title');

    // 收起群组时候动画
    if (groupType === 'circle') {
      keyShape.animate(
        { r },
        {
          duration: 500,
          easing: 'easeCubic',
        },
      );
      if (titleShape) {
        titleShape.attr({
          x: keyShape.attr('x') + offsetX,
          y: keyShape.attr('y') + offsetY,
        });
      }
    } else if (groupType === 'rect') {
      keyShape.animate(
        { width, height },
        {
          duration: 500,
          easing: 'easeCubic',
        },
      );
      if (titleShape) {
        titleShape.attr({
          x: keyShape.attr('x') + 10,
          y: keyShape.attr('y') + height / 2 + 5,
        });
      }
      options = {
        groupId: id,
        id: `${id}-custom-node`,
        x: keyShape.attr('x') + width / 2,
        y: keyShape.attr('y') + height / 2,
        size: [width, height],
        type: 'rect',
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
        const { nodeGroup: currentNodeGroup } = currentGroup;
        currentNodeGroup.hide();
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
        delegateNode,
      };

      // 将临时添加的节点加入到群组中，以便拖动节点时候线跟着拖动
      this.setGroupTmpNode(id, `${id}-custom-node`);

      this.updateEdgeInGroupLinks(id, sourceOutTargetInEdges, sourceInTargetOutEdges);
    }
  }

  /**
   * 收起群组时生成临时的节点，用于连接群组外的节点
   *
   * @param {string} groupId 群组ID
   * @param {array} sourceOutTargetInEdges 出度的边
   * @param {array} sourceInTargetOutEdges 入度的边
   * @memberof ItemGroup
   */
  public updateEdgeInGroupLinks(
    groupId: string,
    sourceOutTargetInEdges: IEdge[],
    sourceInTargetOutEdges: IEdge[],
  ) {
    const { graph } = this;
    // 更新source在外的节点
    const edgesOuts = {};
    sourceOutTargetInEdges.map(edge => {
      const model = edge.getModel();
      const id = edge.get('id');
      const { target } = model;
      edgesOuts[id] = target;
      graph.updateItem(edge, {
        target: `${groupId}-custom-node`,
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
        source: `${groupId}-custom-node`,
      });
      return true;
    });

    // 缓存群组groupId下的edge和临时生成的node节点
    this.delegateInGroup[groupId] = deepMix(
      {
        sourceOutTargetInEdges,
        sourceInTargetOutEdges,
        edgesOuts,
        edgesIn,
      },
      this.delegateInGroup[groupId],
    );
  }

  /**
   * 展开群组，恢复群组中的节点及边
   *
   * @param {string} id 群组ID
   * @memberof ItemGroup
   */
  public expandGroup(id: string) {
    const { graph } = this;

    const groupType = graph.get<string>('groupType');

    // 显示之前隐藏的节点和群组
    const nodesInGroup = graph.get('groupNodes')[id];
    const noCustomNodes = nodesInGroup.filter(node => node.indexOf('custom-node') === -1);
    const { width, height } = this.calculationGroupPosition(noCustomNodes);
    const { nodeGroup } = this.getDeletageGroupById(id);
    const keyShape = nodeGroup.get('keyShape');

    const { default: defaultStyle, collapse } = this.styles;

    Object.keys(defaultStyle).forEach(style => {
      keyShape.attr(style, defaultStyle[style]);
    });

    const titleShape = nodeGroup.find(element => element.get('className') === 'group-title');

    // 检测操作的群组中是否包括子群组
    const paddingValue = this.getGroupPadding(id);
    if (groupType === 'circle') {
      const r = width > height ? width / 2 : height / 2;
      keyShape.animate(
        { r: r + paddingValue },
        {
          duration: 500,
          easing: 'easeCubic',
        },
      );
    } else if (groupType === 'rect') {
      const { width: w, height: h } = collapse;
      keyShape.animate(
        {
          width: w + width + paddingValue * defaultStyle.disCoefficient * 2,
          height: h + height + paddingValue * defaultStyle.disCoefficient * 2,
        },
        {
          duration: 500,
          easing: 'easeCubic',
        },
      );
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
        titleShape.animate(
          {
            x: keyShape.attr('x') + offsetX,
            y: keyShape.attr('y') - keyShape.attr('r') + offsetY,
          },
          {
            duration: 600,
            easing: 'easeCubic',
          },
        );
      } else if (groupType === 'rect') {
        titleShape.animate(
          {
            x: keyShape.attr('x') + (15 + offsetX),
            y: keyShape.attr('y') + (15 + offsetY),
          },
          {
            duration: 600,
            easing: 'easeCubic',
          },
        );
      }
    }

    // 群组动画一会后再显示节点和边
    setTimeout(() => {
      nodesInGroup.forEach(nodeId => {
        const node = graph.findById(nodeId);
        const model = node.getModel();
        const { groupId } = model;
        if (groupId && groupId !== id) {
          // 存在群组，则显示
          const currentGroup = this.getDeletageGroupById(groupId);
          const { nodeGroup: currentNodeGroup } = currentGroup;
          currentNodeGroup.show();
          const hasHidden = currentNodeGroup.get('hasHidden');
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
      const {
        sourceOutTargetInEdges,
        sourceInTargetOutEdges,
        edgesOuts,
        edgesIn,
        delegateNode,
      } = delegates;

      // 恢复source在外的节点
      sourceOutTargetInEdges.map(edge => {
        const edgeId = edge.get('id');
        const sourceOuts = edgesOuts[edgeId];
        graph.updateItem(edge, {
          target: sourceOuts,
        });
        return true;
      });

      // 恢复target在外的节点
      sourceInTargetOutEdges.map(edge => {
        const edgeId = edge.get('id');
        const sourceIn = edgesIn[edgeId];
        graph.updateItem(edge, {
          source: sourceIn,
        });
        return true;
      });

      // 删除群组中的临时节点ID
      const tmpNodeModel = delegateNode.getModel();

      this.deleteTmpNode(id, tmpNodeModel.id as string);
      graph.remove(delegateNode);
      delete this.delegateInGroup[id];
    }
  }

  public deleteTmpNode(groupId: string, tmpNodeId: string) {
    const { graph } = this;
    const groups = graph.get('groups');
    const nodesInGroup = graph.get('groupNodes')[groupId];

    const index = nodesInGroup.indexOf(tmpNodeId);
    nodesInGroup.splice(index, 1);

    // 获取groupId的父群组
    const parentGroup = groups.filter(g => g.id === groupId);
    let parentId = null;
    if (parentGroup.length > 0) {
      // eslint-disable-next-line prefer-destructuring
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
  public remove(groupId: string) {
    const { graph } = this;
    const customGroup = this.getDeletageGroupById(groupId);

    if (!customGroup) {
      // eslint-disable-next-line no-console
      console.warn(`请确认输入的groupId ${groupId} 是否有误！`);
      return;
    }
    const { nodeGroup } = customGroup;

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

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (groupId === group.id) {
        parentGroupId = group.parentId;
        parentGroupData = group;
        break;
      }
    }

    if (parentGroupData) {
      delete parentGroupData.parentId;
    }
    // 删除groupNodes中的groupId数据
    delete groupNodes[groupId];
    if (parentGroupId) {
      groupNodes[parentGroupId] = groupNodes[parentGroupId].filter(node => !nodes.includes(node));
    }
  }

  /**
   * 更新节点分组位置及里面的节点和边的位置
   * @param {string} groupId 节点分组ID
   * @param {object} position delegate的坐标位置
   */
  public updateGroup(groupId: string, position: Point, originPosition: Point) {
    const { graph } = this;
    const groupType = graph.get('groupType');

    // 更新群组里面节点和线的位置
    this.updateItemInGroup(groupId, position, originPosition);

    // 判断是否拖动出了parent group外面，如果拖出了parent Group外面，则更新数据，去掉group关联
    // 获取groupId的父Group的ID
    const { groups } = graph.save() as GraphData;
    let parentGroupId = null;
    let parentGroupData = null;

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (groupId === group.id) {
        parentGroupId = group.parentId;
        parentGroupData = group;
        break;
      }
    }

    if (parentGroupId) {
      const { nodeGroup: parentGroup } = this.getDeletageGroupById(parentGroupId);
      // const parentGroup = customGroup[parentGroupId].nodeGroup;
      const parentKeyShape = parentGroup.get('keyShape');
      this.setGroupStyle(parentKeyShape, 'default');

      const parentGroupBBox = parentKeyShape.getBBox();
      const { minX, minY, maxX, maxY } = parentGroupBBox;

      // 检查是否拖出了父Group
      const { nodeGroup: currentGroup } = this.getDeletageGroupById(groupId);
      // const currentGroup = customGroup[groupId].nodeGroup;
      const currentKeyShape = currentGroup.get('keyShape');
      const currentKeyShapeBBox = currentKeyShape.getBBox();
      const { x, y } = currentKeyShapeBBox;

      if (!(x < maxX && x > minX && y < maxY && y > minY)) {
        // 拖出了parent group，则取消parent group ID
        delete parentGroupData.parentId;
        // 同时删除groupID中的节点
        const groupNodes = graph.get('groupNodes');
        const currentGroupNodes = groupNodes[groupId];
        const parentGroupNodes = groupNodes[parentGroupId];

        groupNodes[parentGroupId] = parentGroupNodes.filter(
          node => currentGroupNodes.indexOf(node) === -1,
        );

        const { x: x1, y: y1, width, height } = this.calculationGroupPosition(
          groupNodes[parentGroupId],
        ); // x: x1, y: y1,
        // const { x: x1, y: y1 } = originPosition;
        const paddingValue = this.getGroupPadding(parentGroupId);

        const groupTitleShape = parentGroup.find(
          element => element.get('className') === 'group-title',
        );

        let titleX = 0;
        let titleY = 0;
        if (groupType === 'circle') {
          const r = width > height ? width / 2 : height / 2;
          const cx = x1;
          const cy = y1;
          parentKeyShape.attr({
            r: r + paddingValue,
            x: cx,
            y: cy,
          });

          titleX = cx;
          titleY = cy - parentKeyShape.attr('r');
        } else if (groupType === 'rect') {
          const { default: defaultStyle } = this.styles;
          const rectPadding = paddingValue * defaultStyle.disCoefficient;
          parentKeyShape.attr({
            x: x1 - rectPadding,
            y: y1 - rectPadding,
          });

          titleX = x1 - rectPadding + 15;
          titleY = y1 - rectPadding + 15;
        }

        if (groupTitleShape) {
          const titleConfig = parentGroupData.title;
          let offsetX = 0;
          let offsetY = 0;
          if (titleConfig) {
            offsetX = titleConfig.offsetX; // eslint-disable-line prefer-destructuring
            offsetY = titleConfig.offsetY; // eslint-disable-line prefer-destructuring
          }
          groupTitleShape.attr({
            x: titleX + offsetX,
            y: titleY + offsetY,
          });
        }
      }
    }
  }

  /**
   * 更新节点分组中节点和边的位置
   * @param {string} groupId 节点分组ID
   * @param {object} position delegate的坐标位置
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateItemInGroup(groupId: string, position: Point, originPosition: Point) {
    const { graph } = this;
    const groupType = graph.get('groupType');

    const groupNodes = graph.get('groupNodes');

    // step 1：先修改groupId中的节点位置
    const nodeInGroup = groupNodes[groupId];

    const { nodeGroup } = this.getDeletageGroupById(groupId);
    const originBBox = nodeGroup.getBBox();

    const otherGroupId = [];
    nodeInGroup.forEach((nodeId, index) => {
      const node = graph.findById(nodeId);
      const model = node.getModel();
      const nodeGroupId = model.groupId;
      if (nodeGroupId && !otherGroupId.includes(nodeGroupId)) {
        otherGroupId.push(nodeGroupId);
      }
      if (!this.nodePoint[index]) {
        this.nodePoint[index] = {
          x: model.x,
          y: model.y,
        };
      }

      // 群组拖动后节点的位置：deletateShape的最终位置-群组起始位置+节点位置
      const x = position.x - originBBox.x + this.nodePoint[index].x;
      const y = position.y - originBBox.y + this.nodePoint[index].y;

      this.nodePoint[index] = {
        x,
        y,
      };

      graph.updateItem(node, { x, y });
    });
    // step 2：修改父group中其他节点的位置

    // otherGroupId中是否包括当前groupId，如果不包括，则添加进去
    if (!otherGroupId.includes(groupId)) {
      otherGroupId.push(groupId);
    }

    // 更新完群组位置后，重新设置群组起始位置
    otherGroupId.forEach(id => {
      // 更新群组位置
      const { nodeGroup: othergroup } = this.getDeletageGroupById(id);
      const groupKeyShape = othergroup.get('keyShape');

      const noCustomNodes = groupNodes[id].filter(node => node.indexOf('custom-node') === -1);
      const { x, y, width, height } = this.calculationGroupPosition(noCustomNodes, position);
      let titleX = 0;
      let titleY = 0;
      if (groupType === 'circle') {
        const cx = (width + 2 * x) / 2;
        const cy = (height + 2 * y) / 2;
        groupKeyShape.attr({
          x: cx,
          y: cy,
        });

        titleX = cx;
        titleY = cy - groupKeyShape.attr('r');
      } else if (groupType === 'rect') {
        // 节点分组状态
        const hasHidden = othergroup.get('hasHidden');
        const paddingValue = this.getGroupPadding(id);

        let keyshapePosition = {};
        const { default: defaultStyle } = this.styles;
        const rectPadding = paddingValue * defaultStyle.disCoefficient;

        titleX = x - rectPadding + 15;
        titleY = y - rectPadding + 15;

        if (hasHidden) {
          // 无标题，或节点分组是展开的情况
          keyshapePosition = {
            x: x - rectPadding,
            y: y - rectPadding,
          };
          titleY = titleY + 10;
        } else {
          keyshapePosition = {
            x: x - rectPadding,
            y: y - rectPadding,
            width: width + rectPadding * 2,
            height: height + rectPadding * 2,
          };
        }
        groupKeyShape.attr(keyshapePosition);
      }
      // 如果存在标题，则更新标题位置
      this.updateGroupTitle(othergroup, id, titleX, titleY);
    });
  }

  /**
   * 更新节点分组的 Title
   * @param {Group} group 当前 Group 实例
   * @param {string} groupId 分组ID
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  public updateGroupTitle(group: IGroup, groupId: string, x: number, y: number) {
    const { graph } = this;

    const groupTitleShape = group.find(element => element.get('className') === 'group-title');

    if (groupTitleShape) {
      let titleConfig = null;
      const groupData = graph.get('groups').filter(data => data.id === groupId);

      if (groupData && groupData.length > 0) {
        titleConfig = groupData[0].title;
      }
      let offsetX = 0;
      let offsetY = 0;
      if (titleConfig) {
        offsetX = titleConfig.offsetX || 0;
        offsetY = titleConfig.offsetY || 0;
      }
      groupTitleShape.attr({
        x: x + offsetX,
        y: y + offsetY,
      });
    }
  }

  /**
   * 拖动节点时候动态改变节点分组大小
   * @param {Event} evt 事件句柄
   * @param {Group} currentGroup 当前操作的群组
   * @param {Item} keyShape 当前操作的keyShape
   * @description 节点拖入拖出后动态改变群组大小
   */
  public dynamicChangeGroupSize(evt: IG6GraphEvent, currentGroup: IGroup, keyShape: ShapeBase) {
    const { item } = evt;

    const model = item.getModel();
    // 节点所在的GroupId
    const { groupId } = model;

    const { graph } = this;
    const groupType = graph.get('groupType');
    const groupNodes = graph.get('groupNodes');
    const nodes = groupNodes[groupId];

    // 拖出节点后，根据最新的节点数量，重新计算群组大小
    // 如果只有一个节点，拖出后，则删除该组
    if (nodes.length === 0) {
      // step 1: 从groupNodes中删除
      delete groupNodes[groupId];

      // step 2: 从groups数据中删除
      const groupsData = graph.get('groups');
      graph.set(
        'groups',
        groupsData.filter(gdata => gdata.id !== groupId),
      );

      // step 3: 删除原来的群组
      currentGroup.remove();
    } else {
      const { x, y, width, height } = this.calculationGroupPosition(nodes);
      // 检测操作的群组中是否包括子群组
      const paddingValue = this.getGroupPadding(groupId);

      let titleX = 0;
      let titleY = 0;
      if (groupType === 'circle') {
        const r = width > height ? width / 2 : height / 2;
        const cx = (width + 2 * x) / 2;
        const cy = (height + 2 * y) / 2;
        keyShape.attr({
          r: r + paddingValue,
          x: cx,
          y: cy,
        });
        titleX = cx;
        titleY = cy - keyShape.attr('r');
      } else if (groupType === 'rect') {
        const { default: defaultStyle } = this.styles;
        const rectPadding = paddingValue * defaultStyle.disCoefficient;
        keyShape.attr({
          x: x - rectPadding,
          y: y - rectPadding,
          width: width + rectPadding * 2,
          height: height + rectPadding * 2,
        });
        titleX = x - rectPadding + 15;
        titleY = y - rectPadding + 15;
      }

      // 如果存在标题，则更新标题位置
      this.updateGroupTitle(currentGroup, groupId, titleX, titleY);
    }
    this.setGroupStyle(keyShape, 'default');
  }

  public resetNodePoint() {
    this.nodePoint.length = 0;
  }

  public destroy() {
    this.graph = null;
    this.styles = {};
    this.customGroup = {};
    this.delegateInGroup = {};
    this.resetNodePoint();
    this.destroyed = true;
  }
}
