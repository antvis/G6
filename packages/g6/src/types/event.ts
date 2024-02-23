import type { Document } from '@antv/g';
import { Edge, Node } from './element';

export type Listener = (event: any) => void;

export type Target = Document | Node | Edge | null;
