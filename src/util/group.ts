import groupBy, { ObjectType } from '@antv/util/lib/group-by';
import { GraphData, GroupConfig, GroupNodeIds } from '../types';

export const getAllNodeInGroups = (data: GraphData): GroupNodeIds => {
  const groupById: ObjectType<GroupConfig> = groupBy(data.groups!, 'id');
  const groupByParentId: ObjectType<GroupConfig> = groupBy(data.groups!, 'parentId');

  const result: { [key: string]: GroupConfig[] } = {};

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
      const parentGroupNodes = [...subGroupIds, ...nodeInParentGroup];
      result[parentId] = parentGroupNodes;
    } else if (subGroupIds) {
      result[parentId] = subGroupIds;
    }
  }
  const allGroupsId = { ...groupById, ...result };

  // 缓存所有group包括的groupID
  const groupIds: { [key: string]: string[] } = {};
  for (const groupId in allGroupsId) {
    if (!groupId || groupId === 'undefined') {
      continue;
    }
    const subGroupIds = allGroupsId[groupId].map((node) => node.id);

    // const nodesInGroup = data.nodes.filter(node => node.groupId === groupId).map(node => node.id);
    groupIds[groupId] = subGroupIds;
  }

  // 缓存所有groupID对应的Node
  const groupNodes: GroupNodeIds = {} as GroupNodeIds;
  for (const groupId in groupIds) {
    if (!groupId || groupId === 'undefined') {
      continue;
    }

    const subGroupIds = groupIds[groupId];

    // const subGroupIds = allGroupsId[groupId].map(node => node.id);

    // 解析所有子群组
    const parentSubGroupIds: string[] = [];

    for (const subId of subGroupIds) {
      const tmpGroupId = allGroupsId[subId].map((node) => node.id);
      // const tmpNodes = data.nodes.filter(node => node.groupId === subId).map(node => node.id);
      parentSubGroupIds.push(...tmpGroupId);
    }

    const nodesInGroup = data.nodes
      ? data.nodes
          .filter(
            (node) =>
              parentSubGroupIds.indexOf(node.groupId!) > -1 ||
              parentSubGroupIds.indexOf(node.parentId as string) > -1,
          )
          .map((node) => node.id)
      : [];
    groupNodes[groupId] = nodesInGroup;
  }
  return groupNodes;
};
