
const ForceCal = require('./forceCalculator');
onmessage = function(event) {
  const forceCal = new ForceCal();
  const nodes = forceCal.updateNodesByForces(event.data);
  self.postMessage(nodes);
};
