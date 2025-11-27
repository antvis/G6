```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'Quality',
          depth: 0,
          children: ['Machine', 'Method', 'Material', 'Man Power', 'Measurement', 'Milieu'],
        },
        {
          id: 'Machine',
          depth: 1,
          children: ['Mill', 'Mixer', 'Metal Lathe'],
        },
        {
          id: 'Mill',
          depth: 2,
        },
        {
          id: 'Mixer',
          depth: 2,
        },
        {
          id: 'Metal Lathe',
          depth: 2,
          children: ['Milling'],
        },
        {
          id: 'Milling',
          depth: 3,
        },
        {
          id: 'Method',
          depth: 1,
        },
        {
          id: 'Material',
          depth: 1,
          children: ['Masonite', 'Marscapone', 'Meat'],
        },
        {
          id: 'Masonite',
          depth: 2,
          children: ['spearMint', 'pepperMint', 'test1'],
        },
        {
          id: 'spearMint',
          depth: 3,
        },
        {
          id: 'pepperMint',
          depth: 3,
          children: ['test3'],
        },
        {
          id: 'test3',
          depth: 4,
        },
        {
          id: 'test1',
          depth: 3,
          children: ['test4'],
        },
        {
          id: 'test4',
          depth: 4,
        },
        {
          id: 'Marscapone',
          depth: 2,
          children: ['Malty', 'Minty'],
        },
        {
          id: 'Malty',
          depth: 3,
        },
        {
          id: 'Minty',
          depth: 3,
        },
        {
          id: 'Meat',
          depth: 2,
          children: ['Mutton'],
        },
        {
          id: 'Mutton',
          depth: 3,
        },
        {
          id: 'Man Power',
          depth: 1,
          children: ['Manager', "Master's Student", 'Magician', 'Miner', 'Magister', 'Massage Artist'],
        },
        {
          id: 'Manager',
          depth: 2,
        },
        {
          id: "Master's Student",
          depth: 2,
        },
        {
          id: 'Magician',
          depth: 2,
        },
        {
          id: 'Miner',
          depth: 2,
        },
        {
          id: 'Magister',
          depth: 2,
          children: ['Malpractice'],
        },
        {
          id: 'Malpractice',
          depth: 3,
        },
        {
          id: 'Massage Artist',
          depth: 2,
          children: ['Masseur', 'Masseuse'],
        },
        {
          id: 'Masseur',
          depth: 3,
        },
        {
          id: 'Masseuse',
          depth: 3,
        },
        {
          id: 'Measurement',
          depth: 1,
          children: ['Malleability'],
        },
        {
          id: 'Malleability',
          depth: 2,
        },
        {
          id: 'Milieu',
          depth: 1,
          children: ['Marine'],
        },
        {
          id: 'Marine',
          depth: 2,
        },
      ],
      edges: [
        {
          source: 'Quality',
          target: 'Machine',
        },
        {
          source: 'Quality',
          target: 'Method',
        },
        {
          source: 'Quality',
          target: 'Material',
        },
        {
          source: 'Quality',
          target: 'Man Power',
        },
        {
          source: 'Quality',
          target: 'Measurement',
        },
        {
          source: 'Quality',
          target: 'Milieu',
        },
        {
          source: 'Machine',
          target: 'Mill',
        },
        {
          source: 'Machine',
          target: 'Mixer',
        },
        {
          source: 'Machine',
          target: 'Metal Lathe',
        },
        {
          source: 'Metal Lathe',
          target: 'Milling',
        },
        {
          source: 'Material',
          target: 'Masonite',
        },
        {
          source: 'Material',
          target: 'Marscapone',
        },
        {
          source: 'Material',
          target: 'Meat',
        },
        {
          source: 'Masonite',
          target: 'spearMint',
        },
        {
          source: 'Masonite',
          target: 'pepperMint',
        },
        {
          source: 'Masonite',
          target: 'test1',
        },
        {
          source: 'pepperMint',
          target: 'test3',
        },
        {
          source: 'test1',
          target: 'test4',
        },
        {
          source: 'Marscapone',
          target: 'Malty',
        },
        {
          source: 'Marscapone',
          target: 'Minty',
        },
        {
          source: 'Meat',
          target: 'Mutton',
        },
        {
          source: 'Man Power',
          target: 'Manager',
        },
        {
          source: 'Man Power',
          target: "Master's Student",
        },
        {
          source: 'Man Power',
          target: 'Magician',
        },
        {
          source: 'Man Power',
          target: 'Miner',
        },
        {
          source: 'Man Power',
          target: 'Magister',
        },
        {
          source: 'Man Power',
          target: 'Massage Artist',
        },
        {
          source: 'Magister',
          target: 'Malpractice',
        },
        {
          source: 'Massage Artist',
          target: 'Masseur',
        },
        {
          source: 'Massage Artist',
          target: 'Masseuse',
        },
        {
          source: 'Measurement',
          target: 'Malleability',
        },
        {
          source: 'Milieu',
          target: 'Marine',
        },
      ],
    },
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
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    autoFit: 'view',
    layout: {
      type: 'fishbone',
      direction: 'RL',
      hGap: 50,
      vGap: 50,
      getRibSep: () => 60,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'fishbone',
      direction: 'RL',
      hGap: 50,
      vGap: 50,
      getRibSep: 60,
    };

    const optionFolder = gui.addFolder('Fishbone Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'direction', ['RL', 'LR']);
    optionFolder.add(options, 'hGap', 20, 100, 10);
    optionFolder.add(options, 'vGap', 20, 100, 10);
    optionFolder.add(options, 'getRibSep', 30, 100, 10);

    optionFolder.onChange(async ({ property, value }) => {
      graph.setLayout(
        Object.assign({}, graph.getLayout(), {
          [property]: property === 'getRibSep' ? () => value : value,
        }),
      );
      await graph.layout();
      // 调整 direction 后部分node可能会溢出屏幕，重新执行下fitView
      if (property === 'direction') {
        graph.fitView();
      }
    });
  },
);
```
