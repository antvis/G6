export function getTranslate(graph) {
  const matrix = graph.get('group').getMatrix();
  if (matrix) {
    return {
      x: matrix[6],
      y: matrix[7]
    };
  } 
  return {x: 0, y: 0};
}

export function getZoom(graph) {
  const matrix = graph.get('group').getMatrix();
  if (matrix) {
    return matrix[0];
  } 
  return 1;
}

export function simulateMouseEvent(dom, type, cfg) {
  const event = new MouseEvent(type, cfg);
  dom.dispatchEvent(event);
}