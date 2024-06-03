import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Sphere, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, 'light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);

const graph = new Graph({
  renderer,
  data: {
    nodes: [
      {
        id: 'sum',
        style: {
          x: 300,
          y: 300,
          radius: 100,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*-mZfQr8LtPUAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'mars',
        style: {
          x: 430,
          y: 300,
          z: 0,
          radius: 20,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*mniGTZktpecAAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'earth',
        style: {
          x: 500,
          y: 300,
          z: 0,
          radius: 30,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
        },
      },
      {
        id: 'jupiter',
        style: {
          x: 600,
          y: 300,
          z: 0,
          radius: 50,
          texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*t_mQSZYAT70AAAAAAAAAAAAADmJ7AQ/original',
        },
      },
    ],
  },
  node: {
    type: 'sphere',
    style: {
      materialShininess: 0,
      labelText: (d) => d.id,
      labelFill: '#fff',
    },
  },
  plugins: [
    {
      type: '3d-light',
      directional: {
        direction: [0, 0, 1],
      },
    },
    {
      type: 'background',
      backgroundImage:
        'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M_OaRrzIZOEAAAAAAAAAAAAADmJ7AQ/original)',
      backgroundPosition: 'center',
    },
  ],
});

graph.draw().then(() => {
  const element = graph.context.element;

  const sum = element.getElement('sum');
  const mars = element.getElement('mars');
  const earth = element.getElement('earth');
  const jupiter = element.getElement('jupiter');

  const setRotation = (element, speed) => {
    setInterval(() => {
      element.rotate(0, -speed, 0);
    }, 30);
  };
  setRotation(sum, 0.1);
  setRotation(mars, 0.8);
  setRotation(earth, 1);
  setRotation(jupiter, 0.5);

  const setRevolution = (element, center, speed) => {
    setInterval(() => {
      const [x, y, z] = element.getPosition();
      const [cx, , cz] = center;
      const angle = (speed * Math.PI) / 180;

      const newX = (x - cx) * Math.cos(angle) + (z - cz) * Math.sin(angle) + cx;
      const newZ = -(x - cx) * Math.sin(angle) + (z - cz) * Math.cos(angle) + cz;

      element.setPosition(newX, y, newZ);
    }, 30);
  };

  setRevolution(mars, [300, 300, 0], 1.5);
  setRevolution(earth, [300, 300, 0], 1);
  setRevolution(jupiter, [300, 300, 0], 0.5);
});
