const testTemplate = ({ config, filename, dataFile }) => {
  return `import { Graph } from '@/src';
  import data from '@@/dataset/${dataFile}';
  import type { STDTestCase } from '../types';

  export const ${filename}: STDTestCase = async (context) => {
    const graph = new Graph({
      ...context,
      data,
      ${config}
    });

    await graph.render();

    return graph;
  };
  `;
};

module.exports = testTemplate;
