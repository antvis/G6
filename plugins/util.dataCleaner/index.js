/**
 * @fileOverview clean data
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

const dataCleaner = {
  cleanData(data) {
    const nodeMap = {};
    const invalidEdges = [];
    data.nodes.forEach(node => {
      nodeMap[node.id] = node;
    });
    data.edges.forEach(edge => {
      // console.log(edge, nodeMap[edge.source], nodeMap[edge.target]);
      if (!nodeMap[edge.source]) {
        console.warn('remove ', edge, 'because there is no source node');
        invalidEdges.push(edge);
        return;
      }
      if (!nodeMap[edge.target]) {
        console.warn('remove ', edge, 'because there is no target node');
        invalidEdges.push(edge);
        return;
      }
    });
    data.edges = data.edges.filter(edge => {
      return invalidEdges.indexOf(edge) === -1;
    });
  }
};
Util.mix(Util, dataCleaner);
