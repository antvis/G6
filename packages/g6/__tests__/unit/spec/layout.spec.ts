import type { LayoutOptions } from '@/src';

describe('spec layout', () => {
  it('layout 1', () => {
    const layout: LayoutOptions = {
      type: 'force',
      linkDistance: 50,
      maxSpeed: 100,
      animated: true,
      clustering: true,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 70,
    };

    expect(layout).toBeTruthy();
  });

  it('layout 2', () => {
    const layout: LayoutOptions = {
      type: 'antv-dagre',
      nodesep: 100,
      ranksep: 70,
      controlPoints: true,
    };

    expect(layout).toBeTruthy();
  });

  it('custom layout', () => {
    const layout: LayoutOptions = {
      type: 'any',
      value: 1,
    };

    expect(layout).toBeTruthy();
  });

  it('register', () => {
    const builtInLayout: LayoutOptions = {
      type: 'concentric',
      clockwise: true,
      height: 100,
    };
    expect(builtInLayout).toBeTruthy();

    type RegisterLayout = LayoutOptions;

    const registerLayout1: RegisterLayout = {
      type: 'layout1',
      param: 1,
    };
    expect(registerLayout1).toBeTruthy();

    const registerLayout2: RegisterLayout = {
      type: 'layout2',
      args: true,
    };
    expect(registerLayout2).toBeTruthy();

    const pipeLayout: LayoutOptions = [
      {
        type: 'force',
        nodeFilter: (node) => (node.data as { value: number }).value > 1,
      },
    ];
    expect(pipeLayout).toBeTruthy();
  });
});
