export interface BubblesetCfg {
  morphBuffer?: number; // DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles
  pixelGroupSize?: number; // the resolution of the algorithm in square pixels, 4 by default
  maxMarchingIterations?: number; // number of times to refine the boundary, 100 by default
  maxRoutingIterations?: number; // number of times to run the algorithm to refine the path finding in difficult areas
  nodeR0?: number; // the distance from nodes which energy is 1 (full influence)
  nodeR1?: number; // the distance from nodes at which energy is 0 (no influence)
  edgeR0?: number; // the distance from edges at which energy is 1 (full influence)
  edgeR1?: number; // the distance from edges at which energy is 0 (no influence)
  nodeInfluenceFactor?: number; // node influence factor
  negativeNodeInfluenceFactor?: number; // negativeNode influence factor
  edgeInfluenceFactor?: number; // edge influence factor
  memberInfluenceFactor?: number; // member influence factor
  nonMemberInfluenceFactor?: number; // nonMember influence factor
}
