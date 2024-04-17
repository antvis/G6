import type { BubbleSets, Graph } from '@/src';
import { pluginBubbleSets } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import type { ID } from '@antv/graphlib';

describe('plugin bubble-sets', () => {
  let graph: Graph;
  let bubbleSets: BubbleSets;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginBubbleSets, { animation: false });
    bubbleSets = graph.getPluginInstance<BubbleSets>('bubble-sets');
  });

  afterAll(() => {
    graph.destroy();
  });

  const reset = () => {
    const members: ID[] = ['node0', 'node1', 'node8', 'node9', 'node11'];
    const nonMembers: ID[] = [];
    bubbleSets.updateMembers(members);
    bubbleSets.updateNonMembers(nonMembers);
  };

  it('default', async () => {
    reset();
    await expect(graph).toMatchSnapshot(__filename, 'default');
  });

  it('add/remove/update member', async () => {
    bubbleSets.addMembers(['node12']);
    await expect(graph).toMatchSnapshot(__filename, 'member-add');
    bubbleSets.removeMembers(['node12']);
    await expect(graph).toMatchSnapshot(__filename, 'member-remove');
    bubbleSets.updateMembers(['node3', 'node4', 'node5', 'node6', 'node7']);
    await expect(graph).toMatchSnapshot(__filename, 'member-update');
    reset();
  });

  it('add/remove/update non-member', async () => {
    bubbleSets.addNonMembers('node13');
    await expect(graph).toMatchSnapshot(__filename, 'non-member-add');
    bubbleSets.removeNonMembers('node13');
    await expect(graph).toMatchSnapshot(__filename, 'non-member-remove');
    bubbleSets.updateNonMembers(['node13', 'node2']);
    await expect(graph).toMatchSnapshot(__filename, 'non-member-update');
    reset();
  });

  it('update options', async () => {
    bubbleSets.updateOptions({ fill: 'pink' });
    await expect(graph).toMatchSnapshot(__filename, 'options-update');
  });
});
