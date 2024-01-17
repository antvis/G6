import { createNodeGCanvas } from './createNodeGCanvas';

export function createContext(width: number, height: number) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const backgroundCanvas = createNodeGCanvas(container, width, height);
  const canvas = createNodeGCanvas(container, width, height);
  const labelCanvas = createNodeGCanvas(container, width, height);
  const transientCanvas = createNodeGCanvas(container, width, height);
  const transientLabelCanvas = createNodeGCanvas(container, width, height);

  return {
    backgroundCanvas,
    canvas,
    container,
    labelCanvas,
    transientCanvas,
    transientLabelCanvas,
  };
}
