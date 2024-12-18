import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Graph, MetaData } from '../src';
import { createGraph } from '../src';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchFile(path: string, meta?: MetaData): R;
    }
  }
}

expect.extend({
  toMatchFile: (received: Graph, path: string, meta?: MetaData) => {
    const _path = join(__dirname, path);

    const file = received.toBuffer(meta);
    const pass = existsSync(_path) ? file.equals(readFileSync(_path)) : true;

    const actualName = _path.replace('.', '-actual.');
    if (!pass) {
      writeFileSync(actualName, file);
    } else if (existsSync(actualName)) {
      unlinkSync(actualName);
    }

    if (pass) {
      return {
        message: () => 'passed',
        pass: true,
      };
    } else {
      return {
        message: () => 'expected files are equal',
        pass: false,
      };
    }
  },
});

describe('createGraph', () => {
  const fn = async (outputType?: any, imageType: any = 'png', options = {}) => {
    const data = {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
        { id: '11' },
        { id: '12' },
        { id: '13' },
        { id: '14' },
        { id: '15' },
        { id: '16' },
        { id: '17' },
        { id: '18' },
        { id: '19' },
        { id: '20' },
        { id: '21' },
        { id: '22' },
        { id: '23' },
        { id: '24' },
        { id: '25' },
        { id: '26' },
        { id: '27' },
        { id: '28' },
        { id: '29' },
        { id: '30' },
        { id: '31' },
        { id: '32' },
        { id: '33' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '5' },
        { source: '0', target: '7' },
        { source: '0', target: '8' },
        { source: '0', target: '9' },
        { source: '0', target: '10' },
        { source: '0', target: '11' },
        { source: '0', target: '13' },
        { source: '0', target: '14' },
        { source: '0', target: '15' },
        { source: '0', target: '16' },
        { source: '2', target: '3' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' },
        { source: '7', target: '13' },
        { source: '8', target: '14' },
        { source: '9', target: '10' },
        { source: '10', target: '22' },
        { source: '10', target: '14' },
        { source: '10', target: '12' },
        { source: '10', target: '24' },
        { source: '10', target: '21' },
        { source: '10', target: '20' },
        { source: '11', target: '24' },
        { source: '11', target: '22' },
        { source: '11', target: '14' },
        { source: '12', target: '13' },
        { source: '16', target: '17' },
        { source: '16', target: '18' },
        { source: '16', target: '21' },
        { source: '16', target: '22' },
        { source: '17', target: '18' },
        { source: '17', target: '20' },
        { source: '18', target: '19' },
        { source: '19', target: '20' },
        { source: '19', target: '33' },
        { source: '19', target: '22' },
        { source: '19', target: '23' },
        { source: '20', target: '21' },
        { source: '21', target: '22' },
        { source: '22', target: '24' },
        { source: '22', target: '25' },
        { source: '22', target: '26' },
        { source: '22', target: '23' },
        { source: '22', target: '28' },
        { source: '22', target: '30' },
        { source: '22', target: '31' },
        { source: '22', target: '32' },
        { source: '22', target: '33' },
        { source: '23', target: '28' },
        { source: '23', target: '27' },
        { source: '23', target: '29' },
        { source: '23', target: '30' },
        { source: '23', target: '31' },
        { source: '23', target: '33' },
        { source: '32', target: '33' },
      ],
    };

    return await createGraph({
      width: 500,
      height: 500,
      outputType,
      imageType,
      autoFit: 'view',
      background: 'rgba(100, 80, 180, 0.4)',
      data,
      node: {
        style: {
          labelText: (d) => d.id,
          labelFill: '#fff',
          labelPlacement: 'center',
        },
      },
      layout: {
        type: 'circular',
      },
      ...options,
    });
  };

  it('image png', async () => {
    const graph = await fn();

    expect(graph).toMatchFile('./assets/image.png');

    graph.exportToFile(join(__dirname, './assets/image'));

    graph.destroy();
  });

  it('image jpeg', async () => {
    const graph = await fn('image', 'jpeg');

    expect(graph).toMatchFile('./assets/image.jpeg');

    graph.exportToFile(join(__dirname, './assets/image'));

    graph.destroy();
  });

  it('file pdf', async () => {
    const graph = await fn('pdf');

    const metadata = {
      title: 'Chart',
      author: 'AntV',
      creator: 'Aaron',
      subject: 'Test',
      keywords: 'antv g2 chart pdf',
      creationDate: new Date(1730304000000), // 2024-10-31 00:00:00 UTC+8
      modDate: new Date(1730304000000), // 2024-10-31 00:00:00 UTC+8
    };

    expect(graph).toMatchFile('./assets/file.pdf', metadata);

    graph.exportToFile(join(__dirname, '/assets/file'), metadata);

    graph.destroy();
  });

  it('file svg', async () => {
    const graph = await fn('svg');

    expect(graph).toMatchFile('./assets/file.svg');

    graph.exportToFile(join(__dirname, './assets/file'));

    graph.destroy();
  });

  it('devicePixelRatio', async () => {
    const graph = await fn('image', 'jpeg', { devicePixelRatio: 1 });

    expect(graph).toMatchFile('./assets/image_x1.jpeg');

    graph.exportToFile(join(__dirname, './assets/image_x1'));

    graph.destroy();
  });

  it('node image', async () => {
    const graph = await fn('image', 'jpeg', {
      waitForRender: 1000,
      node: {
        style: {
          iconSrc: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        },
      },
    });

    expect(graph).toMatchFile('./assets/node-image.jpeg');

    graph.exportToFile(join(__dirname, './assets/node-image'));

    graph.destroy();
  });
});
