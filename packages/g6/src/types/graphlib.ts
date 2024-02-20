import type {
  EdgeAdded,
  EdgeDataUpdated,
  EdgeRemoved,
  EdgeUpdated,
  NodeAdded,
  NodeDataUpdated,
  NodeRemoved,
  TreeStructureAttached,
  TreeStructureChanged,
  TreeStructureDetached,
} from '@antv/graphlib';
import type { EdgeData } from '../spec';
import type { NodeLikeData } from './data';

export type GraphLibGroupedChanges = {
  NodeRemoved: NodeRemoved<NodeLikeData>[];
  EdgeRemoved: EdgeRemoved<EdgeData>[];
  NodeAdded: NodeAdded<NodeLikeData>[];
  EdgeAdded: EdgeAdded<EdgeData>[];
  NodeDataUpdated: NodeDataUpdated<NodeLikeData>[];
  EdgeUpdated: EdgeUpdated<EdgeData>[];
  EdgeDataUpdated: EdgeDataUpdated<EdgeData>[];
  TreeStructureChanged: TreeStructureChanged[];
  ComboStructureChanged: TreeStructureChanged[];
  TreeStructureAttached: TreeStructureAttached[];
  TreeStructureDetached: TreeStructureDetached[];
};
