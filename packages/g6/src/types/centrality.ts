import type { EdgeDirection } from './edge';

export type NodeCentralityOptions =
  | { type: 'degree'; direction?: EdgeDirection }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
