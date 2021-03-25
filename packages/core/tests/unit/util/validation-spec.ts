import { validationData } from '../../../src/util/validation';
import { GraphData, TreeGraphData } from '../../../src';

describe('validationData', () => {
  it('validation graph right nodes data', () => {
    const data: GraphData = {
      nodes: [
        {
          id: '12',
          label: 'xxx',
        },
        {
          id: 'xx',
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(true);
  });

  it('validation graph error nodes data', () => {
    const data: GraphData = {
      nodes: [
        {
          id: 123,
          label: 'xxx',
        },
        {
          id: 'xx',
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(false);
  });

  it('validation graph error edges data', () => {
    const data: GraphData = {
      nodes: [
        {
          id: '123',
          label: 'xxx',
        },
        {
          id: 'xx',
        },
      ],
      edges: [
        {
          source: '123',
          target: 'xx',
        },
        {
          source: 'xx',
          target: 'xx',
        },
        {
          source: '123',
          target: 'yy',
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(false);
  });

  it('validation graph error number edges data', () => {
    const data: GraphData = {
      nodes: [
        {
          id: '123',
          label: 'xxx',
        },
        {
          id: 'xx',
        },
      ],
      edges: [
        {
          source: 123,
          target: 'xx',
        },
        {
          source: 'xx',
          target: 'xx',
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(false);
  });

  it('validation Treegraph error data', () => {
    const data: TreeGraphData = {
      id: 'xx',
      children: [
        {
          id: 123,
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(false);
  });

  it('validation Treegraph right data', () => {
    const data: TreeGraphData = {
      id: 'xx',
      children: [
        {
          id: '234',
        },
      ],
    };

    const validated = validationData(data);
    expect(validated).toBe(true);
  });
});
