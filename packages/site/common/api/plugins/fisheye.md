```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        // 上部节点
        { id: 'Myriel', style: { x: 197, y: 58 } },
        { id: 'Napoleon', style: { x: 147, y: 22 } },
        { id: 'Mlle.Baptistine', style: { x: 225, y: 141 } },
        { id: 'Mme.Magloire', style: { x: 255, y: 120 } },
        { id: 'CountessdeLo', style: { x: 151, y: -3 } },
        { id: 'Geborand', style: { x: 136, y: 41 } },
        { id: 'Champtercier', style: { x: 227, y: 8 } },
        { id: 'Cravatte', style: { x: 172, y: -10 } },
        { id: 'Count', style: { x: 172, y: 12 } },
        { id: 'OldMan', style: { x: 198, y: -6 } },
        // 中上部节点
        { id: 'Labarre', style: { x: 266, y: 203 } },
        { id: 'Marguerite', style: { x: 265, y: 171 } },
        { id: 'Mme.deR', style: { x: 299, y: 133 } },
        { id: 'Isabeau', style: { x: 282, y: 191 } },
        { id: 'Gervais', style: { x: 334, y: 148 } },
        { id: 'Simplice', style: { x: 286, y: 227 } },
        { id: 'Scaufflaire', style: { x: 250, y: 231 } },
        { id: 'Woman1', style: { x: 375, y: 202 } },
        { id: 'Judge', style: { x: 370, y: 139 } },
        { id: 'Champmathieu', style: { x: 404, y: 216 } },
        // 中部主要节点
        { id: 'Valjean', style: { x: 322, y: 221 } },
        { id: 'Fantine', style: { x: 337, y: 187 } },
        { id: 'Cosette', style: { x: 343, y: 248 } },
        { id: 'Javert', style: { x: 368, y: 263 } },
        { id: 'Thenardier', style: { x: 317, y: 300 } },
        { id: 'Mme.Thenardier', style: { x: 283, y: 267 } },
        { id: 'Eponine', style: { x: 268, y: 365 } },
        { id: 'Gavroche', style: { x: 393, y: 380 } },
        { id: 'Marius', style: { x: 336, y: 350 } },
        { id: 'Enjolras', style: { x: 376, y: 371 } },
        // 右侧和右上节点
        { id: 'Gribier', style: { x: 437, y: 160 } },
        { id: 'Jondrette', style: { x: 510, y: 327 } },
        { id: 'Mme.Burgon', style: { x: 466, y: 368 } },
        { id: 'Brevet', style: { x: 399, y: 183 } },
        { id: 'Chenildieu', style: { x: 425, y: 194 } },
        { id: 'Cochepaille', style: { x: 419, y: 148 } },
        { id: 'Child1', style: { x: 361, y: 387 } },
        { id: 'Child2', style: { x: 415, y: 432 } },
        { id: 'Brujon', style: { x: 330, y: 394 } },
        { id: 'Mme.Hucheloup', style: { x: 394, y: 450 } },
        // 中部其他节点
        { id: 'Favourite', style: { x: 284, y: 153 } },
        { id: 'Dahlia', style: { x: 303, y: 170 } },
        { id: 'Zephine', style: { x: 286, y: 94 } },
        { id: 'Tholomyes', style: { x: 359, y: 158 } },
        { id: 'Listolier', style: { x: 308, y: 80 } },
        { id: 'Fameuil', style: { x: 329, y: 89 } },
        { id: 'Blacheville', style: { x: 351, y: 95 } },
        { id: 'Perpetue', style: { x: 234, y: 195 } },
        { id: 'Woman2', style: { x: 304, y: 254 } },
        { id: 'MotherInnocent', style: { x: 350, y: 214 } },
        // 下部节点
        { id: 'Pontmercy', style: { x: 375, y: 307 } },
        { id: 'Boulatruelle', style: { x: 260, y: 279 } },
        { id: 'Anzelma', style: { x: 234, y: 303 } },
        { id: 'Gillenormand', style: { x: 338, y: 286 } },
        { id: 'Magnon', style: { x: 277, y: 317 } },
        { id: 'Mlle.Gillenormand', style: { x: 257, y: 306 } },
        { id: 'Mme.Pontmercy', style: { x: 307, y: 318 } },
        { id: 'Mlle.Vaubois', style: { x: 197, y: 325 } },
        { id: 'Lt.Gillenormand', style: { x: 294, y: 296 } },
        { id: 'Toussaint', style: { x: 306, y: 277 } },
        { id: 'Gueulemer', style: { x: 344, y: 323 } },
        { id: 'Babet', style: { x: 367, y: 319 } },
        { id: 'Claquesous', style: { x: 303, y: 347 } },
        { id: 'Montparnasse', style: { x: 322, y: 330 } },
        // 最下部节点
        { id: 'Combeferre', style: { x: 397, y: 416 } },
        { id: 'Prouvaire', style: { x: 309, y: 426 } },
        { id: 'Feuilly', style: { x: 314, y: 456 } },
        { id: 'Courfeyrac', style: { x: 332, y: 435 } },
        { id: 'Bahorel', style: { x: 343, y: 466 } },
        { id: 'Bossuet', style: { x: 305, y: 382 } },
        { id: 'Joly', style: { x: 371, y: 415 } },
        { id: 'Grantaire', style: { x: 370, y: 466 } },
        { id: 'MotherPlutarch', style: { x: 424, y: 461 } },
      ],
      edges: [
        // 主要连接
        { id: 'e1', source: 'Valjean', target: 'Javert' },
        { id: 'e2', source: 'Valjean', target: 'Cosette' },
        { id: 'e3', source: 'Javert', target: 'Thenardier' },
        { id: 'e4', source: 'Cosette', target: 'Marius' },
        { id: 'e5', source: 'Eponine', target: 'Marius' },
        { id: 'e6', source: 'Enjolras', target: 'Marius' },
        { id: 'e7', source: 'Gavroche', target: 'Enjolras' },
        { id: 'e8', source: 'Valjean', target: 'Fantine' },
        { id: 'e9', source: 'Cosette', target: 'Thenardier' },
        { id: 'e10', source: 'Eponine', target: 'Thenardier' },
        // 上部连接
        { id: 'e11', source: 'Myriel', target: 'Napoleon' },
        { id: 'e12', source: 'Myriel', target: 'Mlle.Baptistine' },
        { id: 'e13', source: 'Mlle.Baptistine', target: 'Mme.Magloire' },
        { id: 'e14', source: 'CountessdeLo', target: 'Myriel' },
        { id: 'e15', source: 'Geborand', target: 'Myriel' },
        // 中部连接
        { id: 'e16', source: 'Favourite', target: 'Tholomyes' },
        { id: 'e17', source: 'Dahlia', target: 'Favourite' },
        { id: 'e18', source: 'Zephine', target: 'Favourite' },
        { id: 'e19', source: 'Tholomyes', target: 'Listolier' },
        { id: 'e20', source: 'Fameuil', target: 'Blacheville' },
        // 下部连接
        { id: 'e21', source: 'Combeferre', target: 'Enjolras' },
        { id: 'e22', source: 'Prouvaire', target: 'Combeferre' },
        { id: 'e23', source: 'Feuilly', target: 'Courfeyrac' },
        { id: 'e24', source: 'Bahorel', target: 'Bossuet' },
        { id: 'e25', source: 'Joly', target: 'Grantaire' },
        // 额外的中部连接
        { id: 'e26', source: 'Gueulemer', target: 'Thenardier' },
        { id: 'e27', source: 'Babet', target: 'Gueulemer' },
        { id: 'e28', source: 'Claquesous', target: 'Montparnasse' },
        { id: 'e29', source: 'Brujon', target: 'Babet' },
        { id: 'e30', source: 'Child1', target: 'Gavroche' },
        // 新增更多连接
        { id: 'e31', source: 'Valjean', target: 'Simplice' },
        { id: 'e32', source: 'Fantine', target: 'Simplice' },
        { id: 'e33', source: 'Javert', target: 'Simplice' },
        { id: 'e34', source: 'Marius', target: 'Gillenormand' },
        { id: 'e35', source: 'Cosette', target: 'Gillenormand' },
        { id: 'e36', source: 'Marius', target: 'Lt.Gillenormand' },
        { id: 'e37', source: 'Gillenormand', target: 'Lt.Gillenormand' },
        { id: 'e38', source: 'Cosette', target: 'Toussaint' },
        { id: 'e39', source: 'Javert', target: 'Toussaint' },
        { id: 'e40', source: 'Valjean', target: 'Toussaint' },
        // 随机添加更多连接
        ...Array.from({ length: 50 }, (_, i) => ({
          // 从40增加到50个随机连接
          id: `edge-${i + 41}`,
          source: [
            'Valjean',
            'Javert',
            'Cosette',
            'Marius',
            'Enjolras',
            'Fantine',
            'Thenardier',
            'Eponine',
            'Gavroche',
            'Gueulemer',
            'Babet',
            'Claquesous',
            'Favourite',
            'Tholomyes',
            'Simplice',
          ][Math.floor(Math.random() * 15)],
          target: [
            'Favourite',
            'Dahlia',
            'Tholomyes',
            'Combeferre',
            'Prouvaire',
            'Feuilly',
            'Courfeyrac',
            'Bahorel',
            'Bossuet',
            'Montparnasse',
            'Brujon',
            'Child1',
            'Simplice',
            'Toussaint',
            'Gillenormand',
          ][Math.floor(Math.random() * 15)],
        })),
      ],
    },
    autoFit: 'view',
    node: {
      style: {
        size: (datum) => datum.id.length * 2 + 10,
        label: false,
        labelText: (datum) => datum.id,
        labelBackground: true,
        icon: false,
        iconFontFamily: 'iconfont',
        iconText: '\ue6f6',
        iconFill: '#fff',
      },
      palette: {
        type: 'group',
        field: (datum) => datum.id,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#bfbfbf',
      },
    },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'fisheye',
        key: 'fisheye',
        r: 120,
        d: 1.5,
        nodeStyle: {
          label: true,
          icon: true,
        },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const TRIGGER_OPTIONS = ['pointermove', 'drag', 'click'];
    const SCALE_OPTIONS = ['wheel', 'drag', '-'];

    const options = {
      type: 'fisheye',
      trigger: 'pointermove',
      r: 120,
      d: 1.5,
      maxR: 200,
      minR: 50,
      maxD: 5,
      minD: 0.5,
      scaleRBy: '-',
      scaleDBy: '-',
      showDPercent: true,
      preventDefault: true,
    };

    const optionFolder = gui.addFolder('Fisheye Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', TRIGGER_OPTIONS);
    optionFolder.add(options, 'r', 50, 200, 10);
    optionFolder.add(options, 'd', 0.5, 5, 0.1);
    optionFolder.add(options, 'scaleRBy', SCALE_OPTIONS);
    optionFolder.add(options, 'scaleDBy', SCALE_OPTIONS);
    optionFolder.add(options, 'showDPercent');
    optionFolder.add(options, 'preventDefault');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'fisheye',
        [property]: value === '-' ? undefined : value,
      });
      graph.render();
    });
  },
);
```
