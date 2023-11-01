import { GraphCore, GraphDataChanges } from '../../types/data';
import {
  GraphData,
  ComboUserModel,
  EdgeUserModel,
  NodeUserModel,
} from '../../types';

/**
 * Validate and format the graph data.
 * @param data input user data.
 * @param graphCore the graph core stores the previous data.
 * @returns formatted data.
 */

export const MapNodeSize = (
  data: GraphDataChanges,
  options: {
    field?: string;
    range?: [number, number];
  } = {},
  graphCore?: GraphCore,
): GraphDataChanges => {
  const { dataAdded, dataUpdated, dataRemoved } = data;
  return {
    dataAdded: handler(dataAdded || {}, options, graphCore),
    dataUpdated: handler(dataUpdated || {}, options, graphCore),
    dataRemoved: dataRemoved,
  };
};

const handler = (
  data: GraphData,
  options: {
    field?: string;
    range?: [number, number];
  } = {},
  graphCore?: GraphCore,
): GraphData => {
  const { field, range = [8, 40] } = options;
  if (!field) return data;
  const { nodes } = data;

  if (!nodes) return data;

  const nodeMap = new Map();
  // map the value to node size
  let maxValue = -Infinity,
    minValue = Infinity;
  nodes.forEach((n) => {
    nodeMap.set(n.id, n);
    if (maxValue < (n.data[field] as number))
      maxValue = n.data[field] as number;
    if (minValue > (n.data[field] as number))
      minValue = n.data[field] as number;
  });
  const valueRange = [minValue, maxValue];
  const sizeMap = scaleNodeProp(nodes, field, valueRange, range);
  sizeMap.forEach((val, id) => {
    let value = val;
    if (isNaN(val) || !val) value = range[0];
    const node = nodeMap.get(id);
    node.data.keyShape = {
      ...node.data.keyShape,
      r: Math.round(value / 2),
      width: value,
      height: value,
    };
  });

  return data;
};

const scaleNodeProp = (nodes, field, valueRange, mappedRange) => {
  const outLength = mappedRange[1] - mappedRange[0];
  const dataLength = valueRange[1] - valueRange[0];
  const map = new Map();
  nodes.forEach((n) => {
    map.set(
      n.id,
      ((n.data[field] - valueRange[0]) * outLength) / dataLength +
        mappedRange[0],
    );
  });
  return map;
};
