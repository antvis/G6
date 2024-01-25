import type { NodeManagerOptions } from './node';
import { NodeManager } from './node';

export interface ComboManagerOptions extends NodeManagerOptions {}

export class ComboManager extends NodeManager {
  constructor(options: ComboManagerOptions) {
    super({ type: 'combo', ...options });
  }
}
