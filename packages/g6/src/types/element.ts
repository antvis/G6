import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;
