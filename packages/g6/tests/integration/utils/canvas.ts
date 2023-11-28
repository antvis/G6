import { RendererName } from '../../../src/types/render';
import { createNodeGCanvas } from './createNodeGCanvas';

export function createContext(
  rendererName: RendererName,
  width: number,
  height: number,
) {
  const backgroundCanvas = createNodeGCanvas(rendererName, width, height);
  const canvas = createNodeGCanvas(rendererName, width, height);
  const labelCanvas = createNodeGCanvas(rendererName, width, height);
  const transientCanvas = createNodeGCanvas(rendererName, width, height);
  const transientLabelCanvas = createNodeGCanvas(rendererName, width, height);

  const container = document.createElement('div');
  container.id = 'container';
  document.body.appendChild(container);

  return {
    backgroundCanvas,
    canvas,
    container,
    labelCanvas,
    transientCanvas,
    transientLabelCanvas,
  };
}
