## forceAtlas2

ForceAtlas2(https://medialab.sciencespo.fr/publications/Jacomy_Heymann_Venturini-Force_Atlas2.pdf) is a graph layout algorithm, whose parameters determine the result.

- kr: repulsive parameter, larger the kr, more loose the layout.
- kg: gravity parameter, larger the kg, more central the layout.
- mode: 'normal'/'linlog'
    'normal': normal layout
    'linlog': the cluster will be more compact
- preOverlapping: true/false. 
    true: prevents node overlapping, result in non-node-overlapping layout
    false: allows node overlapping.
- dissuadeHubs: true/false. whether active the dissuade hub mode
    true: grant authorities(nodes with a high indegree) a more central position than hubs(nodes with a high outdegree)
    false: without dissuade hub mode
- barnesHut: true/false. Whether active the barnes hut optimization on computing repulsive foces. We implemented the paper 'A hierarchical O(N log N) force-calculation algorithm strategy'(https://www.nature.com/articles/324446a0).
- ks: controls the global velocity. Default: 0.1
- ksmax: the max global velocity. Default: 10
- tao: the tolerance for the global swinging. Default: 0.1
- maxIteration: the iteration to terminate the algorithm. We suggest 700 for the graph with less than 50 nodes; 1000 for 100 nodes; Upper than 1500 for more nodes.

## use

simple use.

```js
$.getJSON('../../test/fixtures/viralMarketing.json', data => {
  const Plugin = G6.Plugins['layout.forceAtlas2'];
  const layoutParams = {
    maxIteration: 1500,
    prevOverlapping: true,
    kr: 15,
    mode: 'normal',
    barnesHut: false, // may be counter-productive on small networks
    ks: 0.1,
    dissuadeHubs: false
  };
  graph = new G6.Graph({
    id: 'mountNode', // dom id
    plugins: [new Plugin(layoutParams)],
    height: 1000,
  });
  graph.read(data);
}); 
```