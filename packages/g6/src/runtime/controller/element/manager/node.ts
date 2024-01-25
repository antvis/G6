import type { BaseManagerOptions } from './base';
import { BaseManager } from './base';

export interface NodeManagerOptions extends BaseManagerOptions {}

export class NodeManager extends BaseManager<NodeManagerOptions> {
  constructor(options: NodeManagerOptions) {
    super({ type: 'node', ...options });
  }
}
