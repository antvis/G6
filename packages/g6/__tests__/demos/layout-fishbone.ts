import { Graph, treeToGraphData } from '@antv/g6';

const data = {
  id: 'Quality',
  children: [
    {
      id: 'Machine',
      children: [{ id: 'Mill' }, { id: 'Mixer' }, { id: 'Metal Lathe', children: [{ id: 'Milling' }] }],
    },
    { id: 'Method' },
    {
      id: 'Material',
      children: [
        {
          id: 'Masonite',
          children: [
            { id: 'spearMint' },
            { id: 'pepperMint', children: [{ id: 'test3' }] },
            { id: 'test1', children: [{ id: 'test4' }] },
          ],
        },
        {
          id: 'Marscapone',
          children: [{ id: 'Malty' }, { id: 'Minty' }],
        },
        { id: 'Meat', children: [{ id: 'Mutton' }] },
      ],
    },
    {
      id: 'Man Power',
      children: [
        { id: 'Manager' },
        { id: "Master's Student" },
        { id: 'Magician' },
        { id: 'Miner' },
        { id: 'Magister', children: [{ id: 'Malpractice' }] },
        {
          id: 'Massage Artist',
          children: [{ id: 'Masseur' }, { id: 'Masseuse' }],
        },
      ],
    },
    {
      id: 'Measurement',
      children: [{ id: 'Malleability' }],
    },
    {
      id: 'Milieu',
      children: [{ id: 'Marine' }],
    },
  ],
};

export const layoutFishbone: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      type: 'rect',
      style: {
        size: [32, 32],
        // fill: () => randomColor(),
        label: false,
        labelFill: '#262626',
        labelFontFamily: 'Gill Sans',
        labelMaxLines: 2,
        labelMaxWidth: '100%',
        labelPlacement: 'center',
        labelText: (d) => d.id,
        labelWordWrap: true,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        lineWidth: 3,
      },
    },
    layout: {
      type: 'fishbone',
      vGap: 48,
      hGap: 48,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    animation: false,
  });

  await graph.render();

  layoutFishbone.form = (panel) => {
    const config = {
      type: 'fishbone',
      direction: 'LR',
    };

    return [
      panel
        .add(config, 'direction', ['LR', 'RL'])
        .name('Direction')
        .onChange((value: string) => {
          graph.setLayout((prev) => ({ ...prev, direction: value }));
          graph.layout();
        }),
    ];
  };

  return graph;
};
