import { existsSync, readFileSync } from 'fs';
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
    const pass = existsSync(_path) ? received.toBuffer(meta).equals(readFileSync(_path)) : true;
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
  const fn = async (outputType?: any) => {
    const data = (await fetch('https://assets.antv.antgroup.com/g6/circular.json').then((res) => res.json())) as any;

    return await createGraph({
      width: 500,
      height: 500,
      outputType,
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
    });
  };

  it('image png', async () => {
    const graph = await fn();

    expect(graph).toMatchFile('./assets/image.png');

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
});
