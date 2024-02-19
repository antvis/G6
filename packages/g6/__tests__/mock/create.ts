import type { G6Spec } from '../../src';
import { Graph } from '../../src';
import { createNodeGCanvas } from '../integration/utils/create-node-g-canvas';

/**
 * Create a graph with the given options, and use mock Canvas.
 * @param options - options
 * @returns Graph instance
 */
export function createGraph(options: G6Spec) {
  const { width, height } = options;
  const canvas = createNodeGCanvas(undefined, width, height);

  return new Graph({
    ...options,
    container: canvas, // Use mock Canvas.
  });
}
