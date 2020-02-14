import { getAllNodeInGroups } from '../../../src/util/group';

describe('group util test', () => {
  it('getAllNodeInGroups', () => {
    const nodes = [
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group2',
      },
      {
        id: 'node6',
        groupId: 'p1',
      },
      {
        id: 'node6',
        groupId: 'bym',
      },
    ];

    const data = {
      nodes,
      groups: [
        {
          id: 'group1',
          title: 'group1',
          parentId: 'p1',
        },
        {
          id: 'group2',
          title: 'group2',
          parentId: 'p1',
        },
        {
          id: 'bym',
        },
        {
          id: 'p1',
        },
      ],
    };

    const nodesInGroup = getAllNodeInGroups(data);
    expect(Object.keys(nodesInGroup).length).toBe(4);
    const bym = nodesInGroup.bym;
    expect(bym.length).toBe(1);
    expect(bym[0]).toBe('node6');

    const group1 = nodesInGroup.group1;
    expect(Object.keys(group1).length).toBe(2);
    expect(group1[0]).toBe('node1');
    expect(group1[1]).toBe('node2');

    const p1 = nodesInGroup.p1;
    expect(Object.keys(p1).length).toBe(4);
  });
});
