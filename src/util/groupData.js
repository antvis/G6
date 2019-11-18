/*
 * @Author: moyee
 * @Date: 2019-07-30 10:39:59
 * @LastEditors: moyee
 * @LastEditTime: 2019-08-20 17:04:25
 * @Description: 群组数据格式转换
 */
const { cloneDeep, groupBy, merge } = require('lodash');

module.exports = {
  groupMapNodes: {},
  nodeArr: [],
  /**
  * 扁平的数据格式转成树形
  * @param {array} data 扁平结构的数据
  * @param {string} value 树状结构的唯一标识
  * @param {string} parentId 父节点的键值
  * @return {array} 转成的树形结构数据
  */
  flatToTree(data, value = 'id', parentId = 'parentId') {
    const children = 'children';
    const valueMap = [];
    const tree = [];

    const { groups } = data;

    groups.forEach(v => {
      valueMap[v[value]] = v;
    });

    groups.forEach(v => {
      const parent = valueMap[v[parentId]];
      if (parent) {
        !parent[children] && (parent[children] = []);
        parent[children].push(v);
      } else {
        tree.push(v);
      }
    });

    return tree;
  },

  addNodesToParentNode(originData, nodes) {
    const calcNodes = data => {
      data.forEach(row => {
        if (row.children) {
          this.nodeArr.push({
            id: row.id,
            parentId: row.parentId
          });
          this.addNodesToParentNode(row.children, nodes);
        } else {
          this.nodeArr.push({
            id: row.id,
            parentId: row.parentId
          });
        }
      });

      if (this.nodeArr.length > 0) {
        const nodeMap = groupIds => {
          if (groupIds.length === 0) {
            return;
          }
          // const selfIds = groupIds.map(node => node.id);
          // const parentIds = groupIds.map(node => node.parentId);
          // const ids = new Set(selfIds);
          // parentIds.forEach(pid => ids.add(pid));

          const first = groupIds.shift();
          const x = cloneDeep(groupIds);
          this.groupMapNodes[first.id] = x;
          nodeMap(groupIds);
        };

        nodeMap(this.nodeArr);
      }
      this.nodeArr.length = 0;
    };
    calcNodes(originData);
    return this.groupMapNodes;
  },

  /**
   * 获取各个group中的节点
   * @param {object} data G6的数据模型
   * @return {object} 各个group中的节点
   */
  getAllNodeInGroups(data) {
    const groupById = groupBy(data.groups, 'id');
    const groupByParentId = groupBy(data.groups, 'parentId');

    const result = {};
    for (const parentId in groupByParentId) {
      if (!parentId) {
        continue;
      }
      // 获取当前parentId的所有子group ID
      const subGroupIds = groupByParentId[parentId];

      // 获取在parentid群组中的节点
      const nodeInParentGroup = groupById[parentId];

      if (nodeInParentGroup && subGroupIds) {
        // 合并
        const parentGroupNodes = [ ...subGroupIds, ...nodeInParentGroup ];
        result[parentId] = parentGroupNodes;
      } else if (subGroupIds) {
        result[parentId] = subGroupIds;
      }
    }
    const allGroupsId = merge({}, groupById, result);

    // 缓存所有group包括的groupID
    const groupIds = {};
    for (const groupId in allGroupsId) {
      if (!groupId || groupId === 'undefined') {
        continue;
      }
      const subGroupIds = allGroupsId[groupId].map(node => node.id);

      // const nodesInGroup = data.nodes.filter(node => node.groupId === groupId).map(node => node.id);
      groupIds[groupId] = subGroupIds;
    }

    // 缓存所有groupID对应的Node
    const groupNodes = {};
    for (const groupId in groupIds) {
      if (!groupId || groupId === 'undefined') {
        continue;
      }

      const subGroupIds = groupIds[groupId];

      // const subGroupIds = allGroupsId[groupId].map(node => node.id);

      // 解析所有子群组
      const parentSubGroupIds = [];

      for (const subId of subGroupIds) {
        const tmpGroupId = allGroupsId[subId].map(node => node.id);
        // const tmpNodes = data.nodes.filter(node => node.groupId === subId).map(node => node.id);
        parentSubGroupIds.push(...tmpGroupId);
      }

      const nodesInGroup = data.nodes.filter(node => parentSubGroupIds.indexOf(node.groupId) > -1).map(node => node.id);
      groupNodes[groupId] = nodesInGroup;
    }
    return groupNodes;
  }
};
