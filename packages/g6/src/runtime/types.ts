import type { G6Spec } from '../spec';
import type { Canvas } from './canvas';
import type { DataController } from './data';
import type { Graph } from './graph';

export interface RuntimeContext {
  canvas: Canvas;
  graph: Graph;
  options: G6Spec;
  dataController: DataController;
}
