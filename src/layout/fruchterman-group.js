/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const d3Force = require('d3-force');
const Layout = require('./layout');
const isArray = require('@antv/util/lib/type/is-array');


const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
Layout.registerLayout('fruchtermanGroup', {
  getDefaultCfg() {
    return {
      maxIteration: 1000,         // 停止迭代的最大迭代数
      center: [ 0, 0 ],           // 布局中心
      gravity: 1,                 // 重力大小，影响图的紧凑程度
      speed: 1,                   // 速度
      groupGravity: 1,            // 聚类力大小
      nodeRepulsiveCoefficient: 50,
      groupRepulsiveCoefficient: 10,
      nodeAttractiveCoefficient: 1,
      groupAttractiveCoefficient: 1,
      preventGroupOverlap: true,
      groupCollideStrength: 0.7         // 防止重叠的力强度

    };
  },
  /**
   * 初始化
   * @param {object} data 数据
   */
  init(data) {
    const self = this;
    self.nodes = data.nodes;
    self.edges = data.edges;
    self.graph = data.graph;
    self.groupsData = self.graph.get('groups'); // group data
    self.customGroup = self.graph.get('customGroup'); // shape group
    self.groupController = self.graph.get('customGroupControll'); // controller
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;

    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap = new Map();
    const nodeIndexMap = new Map();
    nodes.forEach((node, i) => {
      nodeMap.set(node.id, node);
      nodeIndexMap.set(node.id, i);
    });
    self.nodeMap = nodeMap;
    self.nodeIndexMap = nodeIndexMap;
    // layout
    self.run();

    self.graph.refreshPositions();

    // refresh groups' positions
    const customGroup = self.customGroup;
    const groupItems = customGroup.get('children');
    const groupController = self.groupController;
    const groupType = self.graph.get('groupType');

    groupItems.forEach(gItem => {
      const gid = gItem.get('id');
      const group = self.groupMap.get(gid);
      group.item = gItem;

      const paddingValue = groupController.getGroupPadding(gid);

      const { x: x1, y: y1, width, height } = groupController.calculationGroupPosition(group.nodeIds);
      const groupTitleShape = gItem.findByClassName('group-title');
      const gItemKeyShape = gItem.get('children')[0];

      let titleX = 0;
      let titleY = 0;
      if (groupType === 'circle') {
        const r = width > height ? width / 2 : height / 2;
        const x = (width + 2 * x1) / 2;
        const y = (height + 2 * y1) / 2;
        gItemKeyShape.attr({
          x,
          y,
          r: r + paddingValue
        });
        group.x = x;
        group.y = y;
        group.size = (r + paddingValue) * 2;
        titleX = x;
        titleY = y - r - paddingValue;
      } else if (groupType === 'rect') {
        const { default: defaultStyle } = groupController.styles;
        const rectPadding = paddingValue * defaultStyle.disCoefficient;
        const rectWidth = width + rectPadding * 2;
        const rectHeight = height + rectPadding * 2;
        const x = x1 - rectPadding;
        const y = y1 - rectPadding;
        gItemKeyShape.attr({
          x,
          y,
          width: rectWidth,
          height: rectHeight
        });
        group.x = x;
        group.y = y;
        group.size = [ rectWidth, rectHeight ];
        titleX = x1;
        titleY = y1;// - rectHeight / 2;
      }

      if (groupTitleShape) {
        const titleConfig = group.groupData.title;
        let offsetX = 0;
        let offsetY = 0;
        if (titleConfig) {
          offsetX = titleConfig.offsetox || 0;
          offsetY = titleConfig.offsetoy || 0;
          titleConfig.offsetX = offsetX;
          titleConfig.offsetY = offsetY;
          if (groupType === 'rect') {
            titleConfig.offsetX = 0;
            titleConfig.offsetY = 0;
          }
        }
        let x = titleX + offsetX;
        let y = titleY + offsetY;
        if (groupType === 'rect') {
          x = titleX;
          y = titleY;
        }
        groupTitleShape.attr({ x, y });
        group.titlePos = [ x, y ];
      }
    });

    // // find the levels of groups
    // const roots = [];
    // const groupMarks = {};
    // self.groupsData.forEach(gd => {
    //   const group = self.groupMap.get(gd.id);
    //   if (!gd.parentId) {
    //     const groupNodes = [];
    //     group.nodeIds.forEach(nid => {
    //       groupNodes.push(nodeMap.get(nid));
    //     });
    //     roots.push({
    //       id: gd.id,
    //       children: [],
    //       x: group.cx,
    //       y: group.cy,
    //       ox: group.cx,
    //       oy: group.cy,
    //       nodes: groupNodes,
    //       item: group.item,
    //       size: group.size
    //     });
    //     groupMarks[gd.id] = 1;
    //   }
    // });
    // const graphWidth = self.graph.get('width');
    // const graphHeight = self.graph.get('height');
    // self.BFSDivide(graphWidth, graphHeight, roots);

    // according to group's size to divide the canvas

    self.graph.paint();
  },
  run() {
    const self = this;
    const nodes = self.nodes;
    const groups = self.groupsData;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    let width = self.width;
    if (!width && typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    let height = self.height;
    if (!height && typeof height !== 'undefined') {
      height = window.innerHeight;
    }
    const center = self.center;
    const nodeMap = self.nodeMap;
    const nodeIndexMap = self.nodeIndexMap;
    const maxDisplace = width / 10;
    const k = Math.sqrt(width * height / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const groupMap = new Map();
    self.groupMap = groupMap;
    nodes.forEach(n => {
      if (groupMap.get(n.groupId) === undefined) {
        let parentId;
        let groupData;
        groups.forEach(g => {
          if (g.id === n.groupId) {
            parentId = g.parentId;
            groupData = g;
          }
        });
        const group = {
          name: n.groupId,
          cx: 0,
          cy: 0,
          count: 0,
          parentId,
          nodeIds: [],
          groupData
        };
        groupMap.set(n.groupId, group);
      }
      const c = groupMap.get(n.groupId);
      c.nodeIds.push(n.id);
      c.cx += n.x;
      c.cy += n.y;
      c.count++;
    });

    groupMap.forEach(c => {
      c.cx /= c.count;
      c.cy /= c.count;
    });

    self.DFSSetGroups();

    for (let i = 0; i < maxIteration; i++) {
      const disp = [];
      nodes.forEach((n, i) => {
        disp[i] = { x: 0, y: 0 };
      });
      self.getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k);

      // gravity for one group
      const groupGravity = self.groupGravity || gravity;
      nodes.forEach((n, i) => {
        const c = groupMap.get(n.groupId);
        const distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
        const gravityForce = self.groupAttractiveCoefficient * k * groupGravity;
        disp[i].x -= gravityForce * (n.x - c.cx) / distLength;
        disp[i].y -= gravityForce * (n.y - c.cy) / distLength;
      });

      groupMap.forEach(c => {
        c.cx = 0;
        c.cy = 0;
        c.count = 0;
      });
      nodes.forEach(n => {
        const c = groupMap.get(n.groupId);
        c.cx += n.x;
        c.cy += n.y;
        c.count++;
      });
      groupMap.forEach(c => {
        c.cx /= c.count;
        c.cy /= c.count;
      });

      // gravity
      nodes.forEach((n, i) => {
        const gravityForce = 0.01 * k * gravity;
        disp[i].x -= gravityForce * (n.x - center[0]);
        disp[i].y -= gravityForce * (n.y - center[1]);
      });
      // speed
      nodes.forEach((n, i) => {
        disp[i].dx *= speed / SPEED_DIVISOR;
        disp[i].dy *= speed / SPEED_DIVISOR;
      });

      // move
      nodes.forEach((n, i) => {
        const distLength = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y);
        if (distLength > 0) { // && !n.isFixed()
          const limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
          n.x += disp[i].x / distLength * limitedDist;
          n.y += disp[i].y / distLength * limitedDist;
        }
      });
    }
  },
  getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k) {
    const self = this;
    self.calRepulsive(nodes, disp, k);
    self.calAttractive(edges, nodeMap, nodeIndexMap, disp, k);
    self.calGroupRepulsive(disp, k);
  },
  calRepulsive(nodes, disp, k) {
    const self = this;
    nodes.forEach((v, i) => {
      disp[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i === j) return;
        const vecx = v.x - u.x;
        const vecy = v.y - u.y;
        let vecLengthSqr = vecx * vecx + vecy * vecy;
        if (vecLengthSqr === 0) vecLengthSqr = 1;
        const common = self.nodeRepulsiveCoefficient * (k * k) / vecLengthSqr;
        disp[i].x += vecx * common;
        disp[i].y += vecy * common;
      });
    });
  },
  calAttractive(edges, nodeMap, nodeIndexMap, disp, k) {
    const self = this;
    edges.forEach(e => {
      const uIndex = nodeIndexMap.get(e.source);
      const vIndex = nodeIndexMap.get(e.target);
      if (uIndex === vIndex) return;
      const u = nodeMap.get(e.source);
      const v = nodeMap.get(e.target);
      const vecx = v.x - u.x;
      const vecy = v.y - u.y;
      const vecLength = Math.sqrt(vecx * vecx + vecy * vecy);
      const common = self.nodeAttractiveCoefficient * vecLength * vecLength / k;
      disp[vIndex].x -= vecx / vecLength * common;
      disp[vIndex].y -= vecy / vecLength * common;
      disp[uIndex].x += vecx / vecLength * common;
      disp[uIndex].y += vecy / vecLength * common;
    });
  },
  calGroupRepulsive(disp, k) {
    const self = this;
    const groupMap = self.groupMap;
    const nodeIndexMap = self.nodeIndexMap;
    groupMap.forEach((gv, i) => {
      const gDisp = { x: 0, y: 0 };
      groupMap.forEach((gu, j) => {
        if (i === j) return;
        const vecx = gv.cx - gu.cx;
        const vecy = gv.cy - gu.cy;
        let vecLengthSqr = vecx * vecx + vecy * vecy;
        if (vecLengthSqr === 0) vecLengthSqr = 1;
        const common = self.groupRepulsiveCoefficient * (k * k) / vecLengthSqr;
        gDisp.x += vecx * common;
        gDisp.y += vecy * common;
      });
      // apply group disp to the group's nodes
      const groupNodeIds = gv.nodeIds;
      groupNodeIds.forEach(gnid => {
        const nodeIdx = nodeIndexMap.get(gnid);
        disp[nodeIdx].x += gDisp.x;
        disp[nodeIdx].y += gDisp.y;
      });
    });
  },
  DFSSetGroups() {
    const self = this;
    const groupMap = self.groupMap;
    groupMap.forEach(group => {
      const parentGroupId = group.parentId;

      if (parentGroupId) {
        let parentParentId;
        self.groupsData.forEach(g => {
          if (g.id === group.groupId) {
            parentParentId = g.parentId;
          }
        });
        const parentGroup = groupMap.get(parentGroupId);
        if (!parentGroup) {
          const pgroup = {
            name: parentGroupId,
            cx: 0,
            cy: 0,
            count: 0,
            parentId: parentParentId,
            nodeIds: group.nodeIds
          };
          groupMap.set(parentGroupId, pgroup);
        } else {
          group.nodeIds.forEach(n => {
            parentGroup.nodeIds.push(n);
          });
        }
      }
    });
  },
  BFSDivide(width, height, children) {
    const self = this;
    const nodeForce = d3Force.forceManyBody();
    nodeForce.strength(30);

    const simulation = d3Force.forceSimulation()
      .nodes(children)
      .force('center', d3Force.forceCenter(width / 2, height / 2))
      .force('charge', nodeForce)
      .alpha(0.3)
      .alphaDecay(0.01)
      .alphaMin(0.001)
      .on('tick', () => {
        children.forEach(child => {
          const groupNodes = child.nodes;
          groupNodes.forEach(gn => {
            gn.x += (child.x - child.ox);
            gn.y += (child.y - child.oy);
          });
          child.ox = child.x;
          child.oy = child.y;
          const gItem = child.item;
          const gItemKeyShape = gItem.get('children')[0];
          gItemKeyShape.attr({
            x: child.x,
            y: child.y
          });
        });
        self.graph.refreshPositions();
      })
      .on('end', () => {
      });
    self.groupOverlapProcess(simulation);
  },
  groupOverlapProcess(simulation) {
    const self = this;
    let nodeSize = self.nodeSize;
    const groupCollideStrength = self.groupCollideStrength;
    if (!nodeSize) {
      nodeSize = d => {
        if (d.size) {
          if (isArray(d.size)) {
            return d.size[0] / 2;
          }
          return d.size / 2;
        }
        return 10;
      };
    } else if (!isNaN(nodeSize)) {
      nodeSize /= 2;
    } else if (nodeSize.length === 2) {
      const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
      nodeSize = larger / 2;
    }
    // forceCollide's parameter is a radius
    simulation.force('collisionForce', d3Force.forceCollide(nodeSize).strength(groupCollideStrength));
  }
});
