/**
 * random
 */

/**
 * [randn_bm description]
 * @Author   NinoLau from https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/36481059#36481059
 * @param    {number}                 min  min value
 * @param    {number}                 max  max value
 * @param    {number}                 skew skew value
 */
function randn_bm(min: number, max: number, skew: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

let nodeNum = Math.floor(20 + Math.random() * 30);
let edgeNum = Math.floor(nodeNum + Math.floor(randn_bm(nodeNum,  nodeNum * (nodeNum - 1) / 2, 10)));

let nodes = [];
for (let i = 0; i < nodeNum; i++) {
  nodes.push({
    id: i.toString(),
    label: i.toString(),
  })
}

let edges = [];
for (let i = 0; i < nodeNum; i++) {
  edges.push({
    source: i.toString(),
    target: ((i+1)%10).toString(),
  })
}

for (let i = 0; i < edgeNum; i++) {
  let s = Math.floor(Math.random() * nodeNum);
  let t = Math.floor(Math.random() * nodeNum);
  while (t === s) {
    t = Math.floor(Math.random() * nodeNum);
  }
  edges.push({
    source: s.toString(),
    target: t.toString(),
  })
}

export default {
    nodes: nodes,
    edges: edges,
};