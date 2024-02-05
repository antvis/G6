import type { DisplayObject } from '@antv/g';
import type { BaseEdgeKeyStyleProps } from '../elements/edges/base-edge';
import { BaseNode } from '../elements/nodes';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<BaseEdgeKeyStyleProps<any>, DisplayObject>;
