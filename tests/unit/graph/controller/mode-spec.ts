import { Mode } from '../../../../src/graph/controller'
import Graph from '../../../../src/graph/graph'
import { IGraph, IGraphOptions } from '../../../../src/interface/graph';

describe('Mode Controller', () => {
  it('signle mode', () => {
    const cfg: IGraphOptions = {
      container: 'x',
      width: 200,
      height: 100
    }
    const graph: IGraph = new Graph(cfg)
    const modeController = new Mode(graph)
    expect(Object.keys(modeController.modes).length).toBe(1);
    expect(modeController.modes.default).not.toBe(undefined);
    expect(modeController.modes.default.length).toBe(0);
    expect(modeController.mode).toBe('default');
  })
})