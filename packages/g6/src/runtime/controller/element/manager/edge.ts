import type { BaseManagerOptions } from './base';
import { BaseManager } from './base';

export interface EdgeManagerOptions extends BaseManagerOptions {}

export class EdgeManager extends BaseManager<EdgeManagerOptions> {
  constructor(options: EdgeManagerOptions) {
    super({ type: 'edge', ...options });
  }
}
