import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Graph } from '../src';
import { createGraph } from '../src';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchFile(path: string): R;
    }
  }
}

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

  expect.extend({
    toMatchFile: (received: Graph, path: string) => {
      const pass = existsSync(path) ? received.toBuffer().equals(readFileSync(path)) : true;
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

  it('image image', async () => {
    const graph = await fn();

    expect(graph).toMatchFile('./assets/image.png');

    graph.writeToFile(join(__dirname, './assets/image'));

    graph.destroy();
  });

  it('file pdf', async () => {
    const graph = await fn('pdf');

    graph.writeToFile(join(__dirname, '/assets/file'));

    graph.destroy();
  });

  it('file svg', async () => {
    const graph = await fn('svg');

    expect(graph).toMatchFile('./assets/file.svg');

    graph.writeToFile(join(__dirname, './assets/file'));

    graph.destroy();
  });
});
