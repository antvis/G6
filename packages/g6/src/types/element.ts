import type { BaseStyleProps } from '@antv/g';
import type { BaseCombo } from '../elements/combos';
import type { BaseEdge } from '../elements/edges';
import type { BaseNode } from '../elements/nodes';
import type { RuntimeContext } from '../runtime/types';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<any>;

export type Edge = BaseEdge;

export type Combo = BaseCombo<any>;

export type Element = Node | Edge | Combo;

export interface BaseElementStyleProps extends BaseStyleProps {
  /**
   * @internal
   */
  context?: RuntimeContext;
}
