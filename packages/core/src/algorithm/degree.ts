import { IGraph } from '../interface/graph';

const degree = (graph: IGraph) => {
  const degrees = {};

  graph.getNodes().forEach((node) => {
    degrees[node.getID()] = {
      degree: 0,
      inDegree: 0,
      outDegree: 0,
    };
  });

  graph.getEdges().forEach((edge) => {
    degrees[edge.getSource().getID()].degree++;
    degrees[edge.getSource().getID()].outDegree++;
    degrees[edge.getTarget().getID()].degree++;
    degrees[edge.getTarget().getID()].inDegree++;
  });

  return degrees;
};

export default degree;
