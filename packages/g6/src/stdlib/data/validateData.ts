import { uniqueId } from '@antv/util';
import { GraphCore, GraphDataChanges } from '../../types/data';
import {
  GraphData,
  ComboUserModel,
  EdgeUserModel,
  NodeUserModel,
} from '../../types';
import { deconstructData } from '../../util/data';

/**
 * Validate and format the graph data which will be added.
 * @param data input user data.
 * @param graphCore the graph core stores the previous data.
 * @returns formatted data.
 */
export const ValidateData = (
  data: GraphDataChanges,
  options = {},
  graphCore?: GraphCore,
): GraphDataChanges => {
  const { dataAdded, dataRemoved, dataUpdated } = data;
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataRemoved: handler(dataRemoved, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
  };
};

const handler = (
  data: GraphData,
  options = {},
  graphCore?: GraphCore,
): GraphData => {
  const { nodes, edges, combos } = data;
  const idMap = new Map();
  const nodeIdMap = new Map();
  const comboIdMap = new Map();

  const idAndDataCheck = (item, type, generateId = false) => {
    if (item.id === undefined) {
      if (generateId) {
        item.id = `${type}-${uniqueId()}`;
      } else {
        console.error(
          `Unique global id is neccessary for graph items. The ${type} ${JSON.stringify(
            item,
          )} without id will be ignored.`,
        );
        return false;
      }
    }
    if (idMap.has(item.id)) {
      console.error(
        `Unique global id is neccessary for graph nodes/edges/combos. The ${type} ${JSON.stringify(
          item,
        )} with id ${item.id} is duplicated.`,
      );
      return false;
    }
    if (item.data === undefined) {
      item.data = {};
    }
    return true;
  };

  const formattedCombos = combos
    ?.map((combo) => {
      if (!idAndDataCheck(combo, 'combo')) return false;
      idMap.set(combo.id, true);
      comboIdMap.set(combo.id, true);
      return combo;
    })
    .filter(Boolean) as ComboUserModel[];

  formattedCombos?.forEach((combo) => {
    const { parentId } = combo.data;
    if (
      parentId !== undefined &&
      !comboIdMap.has(parentId) &&
      (!graphCore || !graphCore.hasNode(parentId))
    ) {
      console.error(
        `The parentId of combo with id ${combo.id} will be removed since it is not exist in combos.`,
      );
      delete combo.data.parentId;
    }
  });

  const formattedNodes = nodes
    ?.map((node) => {
      if (!idAndDataCheck(node, 'node')) return false;
      const { parentId } = node.data;
      if (
        parentId !== undefined &&
        !comboIdMap.has(parentId) &&
        (!graphCore || !graphCore.hasNode(parentId))
      ) {
        // TODO: parentId is a node in graphCore
        console.error(
          `The parentId of node with id ${node.id} will be removed since it is not exist in combos.`,
        );
        delete node.data.parentId;
      }
      idMap.set(node.id, true);
      nodeIdMap.set(node.id, true);
      return node;
    })
    .filter(Boolean) as NodeUserModel[];

  const formattedEdges = edges
    ?.map((edge) => {
      const { id } = edge;
      let { source, target } = edge;
      if (!idAndDataCheck(edge, 'edge', true)) return false;

      if (graphCore?.hasEdge(id)) {
        const existEdge = graphCore?.getEdge(id);
        if (source === undefined) source = existEdge.source;
        if (target === undefined) target = existEdge.target;
      }

      if (source === undefined) {
        console.error(
          `The edge with id ${id} will be ignored since its source is undefined.`,
        );
        return false;
      }
      if (target === undefined) {
        console.error(
          `The edge with id ${id} will be ignored since its target is undefined.`,
        );
        return false;
      }
      if (
        !nodeIdMap.has(source) &&
        !comboIdMap.has(source) &&
        (!graphCore || !graphCore.hasNode(source))
      ) {
        console.error(
          `The edge with id ${id} will be ignored since its source ${source} is not existed in nodes and combos.`,
        );
        return false;
      }
      if (
        !nodeIdMap.has(target) &&
        !comboIdMap.has(target) &&
        (!graphCore || !graphCore.hasNode(target))
      ) {
        console.error(
          `The edge with id ${id} will be ignored since its target ${target} is not existed in nodes and combos.`,
        );
        return false;
      }
      idMap.set(id, true);
      return edge;
    })
    .filter(Boolean) as EdgeUserModel[];

  return {
    nodes: formattedNodes || [],
    edges: formattedEdges || [],
    combos: formattedCombos || [],
  };
};
