import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/music-festival.json')
  .then((res) => res.json())
  .then((data) => {
    const map = new Map();

    data.forEach((datum) => {
      const { actors, venuecity } = datum;
      actors.forEach((actor) => {
        if (!map.has(actor)) map.set(actor, new Set([venuecity]));
        else map.get(actor).add(venuecity);
      });
    });

    const nodes = Array.from(map)
      .filter(([, city]) => city.size >= 2)
      .sort((a, b) => -a[1].size + b[1].size)
      .map(([name, city]) => ({
        id: name,
        data: {
          city: Array.from(city),
          value: city.size,
        },
      }));

    return { nodes };
  })
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      node: {
        type: 'rect',
        style: {
          size: [100, 20],
          radius: 5,
          iconText: (d) => d.id,
          iconFill: '#000',
          iconWordWrap: true,
          iconWordWrapWidth: 80,
          iconFontSize: 15,
          iconTextOverflow: '...',
          iconMaxLines: 1,
          labelText: (d) => d.data.city.join('\n'),
          labelFontSize: 12,
          labelDy: 2,
          labelFill: '#fff',
        },
        palette: {
          type: 'group',
          field: 'value',
          color: [
            '#FCE75A',
            '#F5DB75',
            '#EFCF90',
            '#E8C3AB',
            '#E1B7C6',
            '#DBABE0',
            '#D49FFB',
            '#CD93FF',
            '#B981F2',
            '#7E45E8',
          ],
        },
      },
      layout: {
        type: 'grid',
        nodeSize: [100, 120],
        sortBy: 'order',
        cols: 5,
      },
      behaviors: [{ type: 'scroll-canvas', direction: 'y' }],
      plugins: [
        {
          type: 'background',
          background: '#000',
        },
      ],
    });

    graph.render();
  });
