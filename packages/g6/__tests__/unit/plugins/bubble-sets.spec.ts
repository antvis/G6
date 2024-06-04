import type { BubbleSets, Graph, ID } from '@/src';
import { NodeEvent } from '@/src';
import { pluginBubbleSets } from '@@/demos';
import { createDemoGraph } from '@@/utils';

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
    const avoidMembers: ID[] = [];
    bubbleSets.updateMember(members);
    bubbleSets.updateAvoidMember(avoidMembers);
  };

  it('default', async () => {
    reset();
    await expect(graph).toMatchSnapshot(__filename, 'default');
  });

  it('add/remove/update member', async () => {
    bubbleSets.addMember(['node12', 'edge1']);
    await expect(graph).toMatchSnapshot(__filename, 'member-add');
    bubbleSets.removeMember(['node12', 'edge1']);
    await expect(graph).toMatchSnapshot(__filename, 'member-remove');
    bubbleSets.updateMember(['node3', 'node4', 'node5', 'node6', 'node7']);
    await expect(graph).toMatchSnapshot(__filename, 'member-update');
    expect(bubbleSets.getMember()).toEqual(['node3', 'node4', 'node5', 'node6', 'node7']);
    reset();
  });

  it('add/remove/update non-member', async () => {
    bubbleSets.addAvoidMember('node13');
    await expect(graph).toMatchSnapshot(__filename, 'non-member-add');
    bubbleSets.removeAvoidMember('node13');
    await expect(graph).toMatchSnapshot(__filename, 'non-member-remove');
    bubbleSets.updateAvoidMember(['node13', 'node2']);
    await expect(graph).toMatchSnapshot(__filename, 'non-member-update');
    expect(bubbleSets.getAvoidMember()).toEqual(['node13', 'node2']);
    reset();
  });

  it('update options', async () => {
    graph.updatePlugin({ key: 'bubble-sets', fill: 'pink' });
    graph.render();
    await expect(graph).toMatchSnapshot(__filename, 'options-update');
    reset();
  });

  it('update element', async () => {
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node11' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 50, dy: 50 });
    graph.emit(NodeEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'element-position-update');
  });
});
