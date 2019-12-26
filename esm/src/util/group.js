import { __spreadArrays } from "tslib";
import groupBy from '@antv/util/lib/group-by';
export var getAllNodeInGroups = function (data) {
    var groupById = groupBy(data.groups, 'id');
    var groupByParentId = groupBy(data.groups, 'parentId');
    var result = {};
    for (var parentId in groupByParentId) {
        if (!parentId) {
            continue;
        }
        // 获取当前parentId的所有子group ID
        var subGroupIds = groupByParentId[parentId];
        // 获取在parentid群组中的节点
        var nodeInParentGroup = groupById[parentId];
        if (nodeInParentGroup && subGroupIds) {
            // 合并
            var parentGroupNodes = __spreadArrays(subGroupIds, nodeInParentGroup);
            result[parentId] = parentGroupNodes;
        }
        else if (subGroupIds) {
            result[parentId] = subGroupIds;
        }
    }
    var allGroupsId = Object.assign({}, groupById, result);
    // 缓存所有group包括的groupID
    var groupIds = {};
    for (var groupId in allGroupsId) {
        if (!groupId || groupId === 'undefined') {
            continue;
        }
        var subGroupIds = allGroupsId[groupId].map(function (node) { return node.id; });
        // const nodesInGroup = data.nodes.filter(node => node.groupId === groupId).map(node => node.id);
        groupIds[groupId] = subGroupIds;
    }
    // 缓存所有groupID对应的Node
    var groupNodes = {};
    var _loop_1 = function (groupId) {
        if (!groupId || groupId === 'undefined') {
            return "continue";
        }
        var subGroupIds = groupIds[groupId];
        // const subGroupIds = allGroupsId[groupId].map(node => node.id);
        // 解析所有子群组
        var parentSubGroupIds = [];
        for (var _i = 0, subGroupIds_1 = subGroupIds; _i < subGroupIds_1.length; _i++) {
            var subId = subGroupIds_1[_i];
            var tmpGroupId = allGroupsId[subId].map(function (node) { return node.id; });
            // const tmpNodes = data.nodes.filter(node => node.groupId === subId).map(node => node.id);
            parentSubGroupIds.push.apply(parentSubGroupIds, tmpGroupId);
        }
        var nodesInGroup = data.nodes.filter(function (node) { return parentSubGroupIds.indexOf(node.groupId) > -1; }).map(function (node) { return node.id; });
        groupNodes[groupId] = nodesInGroup;
    };
    for (var groupId in groupIds) {
        _loop_1(groupId);
    }
    return groupNodes;
};
//# sourceMappingURL=group.js.map