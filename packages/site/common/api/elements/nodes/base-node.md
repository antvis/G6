```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            fill: '#7e3feb',
            size: 40,
            label: true,
            labelText: 'node',
            labelBackground: false,
            icon: true,
            iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            donuts: [30, 30, 20, 20],
            donutPalette: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
            badge: true,
            badges: [{ placement: 'top-right', text: 'Important', offsetX: -4 }],
            port: true,
            ports: [{ placement: 'left' }, { placement: 'right' }],
            portFill: '#f9f0ff',
            portR: 3,
            portStroke: '#7e3feb',
          },
        },
      ],
    },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 600 },
  (gui, graph) => {
    const global = { type: 'circle' };
    gui
      .add(global, 'type', ['circle', 'diamond', 'donut', 'ellipse', 'hexagon', 'image', 'rect', 'star', 'triangle'])
      .onChange((v) => {
        graph.updateNodeData([{ id: 'node1', type: v }]);
        graph.render();
      });

    const options = {
      fill: '#7e3feb',
      fillOpacity: 1,
      lineWidth: 0,
      'size[0]': 40,
      'size[1]': 40,
      stroke: '#000000',
      strokeOpacity: 1,

      label: true,
      labelFill: '000000d9',
      labelMaxWidth: '200%',
      labelPadding: 0,
      labelPlacement: 'bottom',
      labelText: 'node',
      labelWordWrap: false,
      labelOpacity: 1,

      labelBackground: true,
      labelBackgroundFill: '#fff',
      labelBackgroundLineDash: 0,
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.5,
      labelBackgroundRadius: 0,
      labelBackgroundStroke: '#fff',

      halo: false,
      haloLineDash: 0,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.25,

      icon: true,
      iconFill: '#fff',
      iconFontSize: 16,
      iconOpacity: 1,
      iconText: '',
      iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      iconWidth: 20,
      iconHeight: 20,

      badge: true,
      badgeFill: '000000d9',
      badgeMaxWidth: '200%',
      badgeOpacity: 1,
      badgePadding: 0,
      badgePlacement: 'top-right',
      badgeText: 'Important',
      badgeWordWrap: false,

      badgeBackground: true,
      badgeBackgroundFill: '#fff',
      badgeBackgroundLineDash: 0,
      badgeBackgroundLineWidth: 0,
      badgeBackgroundOpacity: 0.5,
      badgeBackgroundRadius: 0,
      badgeBackgroundStroke: '#fff',

      port: true,
      portFill: '#f9f0ff',
      portR: 3,
      portStroke: '#7e3feb',
    };
    const optionFolder = gui.addFolder('node.style');

    optionFolder.add(options, 'size[0]', 0, 100).name('width(size[0])');
    optionFolder.add(options, 'size[1]', 0, 100).name('height(size[1])');
    optionFolder.add(options, 'lineWidth', 0, 20);
    optionFolder.addColor(options, 'fill');
    optionFolder.add(options, 'fillOpacity', 0, 1);
    optionFolder.addColor(options, 'stroke');
    optionFolder.add(options, 'strokeOpacity', 0, 1);

    optionFolder.add(options, 'label').onChange((v) => {
      [labelFill, labelMaxWidth, labelWordWrap, labelPadding, labelPlacement, labelText, labelOpacity].forEach((i) =>
        i.show(v),
      );
    });
    const labelFill = optionFolder.addColor(options, 'labelFill').hide();
    const labelMaxWidth = optionFolder.add(options, 'labelMaxWidth', ['200%', '20px', '80%']).hide();
    const labelWordWrap = optionFolder.add(options, 'labelWordWrap').hide();
    const labelPadding = optionFolder.add(options, 'labelPadding', 0, 20).hide();
    const labelPlacement = optionFolder
      .add(options, 'labelPlacement', [
        'left',
        'right',
        'top',
        'bottom',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'center',
      ])
      .hide();
    const labelText = optionFolder.add(options, 'labelText').hide();
    const labelOpacity = optionFolder.add(options, 'labelOpacity', 0, 1).hide();

    const labelBackground = optionFolder.add(options, 'labelBackground').onChange((v) => {
      [
        labelBackgroundFill,
        labelBackgroundStroke,
        labelBackgroundLineDash,
        labelBackgroundLineWidth,
        labelBackgroundOpacity,
        labelBackgroundRadius,
      ].forEach((i) => i.show(v));
    });
    const labelBackgroundFill = optionFolder.addColor(options, 'labelBackgroundFill').hide();
    const labelBackgroundStroke = optionFolder.addColor(options, 'labelBackgroundStroke').hide();
    const labelBackgroundLineDash = optionFolder.add(options, 'labelBackgroundLineDash', 0, 10).hide();
    const labelBackgroundLineWidth = optionFolder.add(options, 'labelBackgroundLineWidth', 0, 10).hide();
    const labelBackgroundOpacity = optionFolder.add(options, 'labelBackgroundOpacity', 0, 1).hide();
    const labelBackgroundRadius = optionFolder.add(options, 'labelBackgroundRadius', 0, 30).hide();

    const halo = optionFolder.add(options, 'halo').onChange((v) => {
      [haloStrokeOpacity, haloLineDash, haloLineWidth].forEach((i) => i.show(v));
    });
    const haloStrokeOpacity = optionFolder.add(options, 'haloStrokeOpacity', 0, 1).hide();
    const haloLineDash = optionFolder.add(options, 'haloLineDash', 0, 10).hide();
    const haloLineWidth = optionFolder.add(options, 'haloLineWidth', 0, 10).hide();

    const icon = optionFolder.add(options, 'icon').onChange((v) => {
      [iconSrc, iconText, iconFill, iconFontSize, iconOpacity, iconWidth, iconHeight].forEach((i) => i.show(v));
    });
    const iconSrc = optionFolder.add(options, 'iconSrc').hide();
    const iconText = optionFolder.add(options, 'iconText').hide();
    const iconFill = optionFolder.addColor(options, 'iconFill').hide();
    const iconFontSize = optionFolder.add(options, 'iconFontSize', 12, 20, 1).hide();
    const iconOpacity = optionFolder.add(options, 'iconOpacity', 0, 1).hide();
    const iconWidth = optionFolder.add(options, 'iconWidth', 0, 100, 1).hide();
    const iconHeight = optionFolder.add(options, 'iconHeight', 0, 100, 1).hide();

    const badge = optionFolder.add(options, 'badge').onChange((v) => {
      [badgeFill, badgeMaxWidth, badgeWordWrap, badgePadding, badgePlacement, badgeText, badgeOpacity].forEach((i) =>
        i.show(v),
      );
    });
    const badgeFill = optionFolder.addColor(options, 'badgeFill').hide();
    const badgeMaxWidth = optionFolder.add(options, 'badgeMaxWidth', ['200%', '20px', '80%']).hide();
    const badgeWordWrap = optionFolder.add(options, 'badgeWordWrap').hide();
    const badgePadding = optionFolder.add(options, 'badgePadding', 0, 20).hide();
    const badgePlacement = optionFolder
      .add(options, 'badgePlacement', [
        'left',
        'right',
        'top',
        'bottom',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ])
      .hide();
    const badgeText = optionFolder.add(options, 'badgeText').hide();
    const badgeOpacity = optionFolder.add(options, 'badgeOpacity', 0, 1).hide();

    const badgeBackground = optionFolder.add(options, 'badgeBackground').onChange((v) => {
      [
        badgeBackgroundFill,
        badgeBackgroundStroke,
        badgeBackgroundLineDash,
        badgeBackgroundLineWidth,
        badgeBackgroundOpacity,
        badgeBackgroundRadius,
      ].forEach((i) => i.show(v));
    });
    const badgeBackgroundFill = optionFolder.addColor(options, 'badgeBackgroundFill').hide();
    const badgeBackgroundStroke = optionFolder.addColor(options, 'badgeBackgroundStroke').hide();
    const badgeBackgroundLineDash = optionFolder.add(options, 'badgeBackgroundLineDash', 0, 10).hide();
    const badgeBackgroundLineWidth = optionFolder.add(options, 'badgeBackgroundLineWidth', 0, 10).hide();
    const badgeBackgroundOpacity = optionFolder.add(options, 'badgeBackgroundOpacity', 0, 1).hide();
    const badgeBackgroundRadius = optionFolder.add(options, 'badgeBackgroundRadius', 0, 30).hide();

    const port = optionFolder.add(options, 'port').onChange((v) => {
      [portR, portFill, portStroke].forEach((i) => i.show(v));
    });
    const portR = optionFolder.add(options, 'portR', 0, 20, 1).hide();
    const portFill = optionFolder.addColor(options, 'portFill').hide();
    const portStroke = optionFolder.addColor(options, 'portStroke').hide();

    optionFolder.onChange(({ property, value, object }) => {
      let updateStyle = { [property]: value };
      if (['size[0]', 'size[1]'].includes(property)) {
        updateStyle.size = [object['size[0]'], object['size[1]']];
      } else if (['badgePlacement', 'badgeText'].includes(property)) {
        const nodeData = graph.getNodeData('node1').badges;
        updateStyle.badges = [{ text: object.badgeText, placement: object.badgePlacement }];
      }
      graph.updateNodeData([{ id: 'node1', style: updateStyle }]);
      graph.render();
    });
  },
);
```
