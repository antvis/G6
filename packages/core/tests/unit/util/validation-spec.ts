import { validationData, validationSingleData } from '../../../src/util/validation';
import { GraphData, TreeGraphData } from '../../../src';

describe('validationData', () => {
  it('no data', () => {
    const validated = validationData();
    expect(validated).toBe(false);
  });
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

describe('validationSingleData', () => {
  it('add single node with error data', () => {
    const data = {
      id: 123,
      label: 'test',
    };
    expect(validationSingleData('node', data as any)).toBe(false);
  });

  it('add single node with right data', () => {
    const data = {
      id: '123',
      label: 'test',
    };

    const data1 = {
      label: 'xxx',
    };
    expect(validationSingleData('node', data as any)).toBe(true);
    expect(validationSingleData('node', data1 as any)).toBe(true);
  });

  it('add single edge with error data', () => {
    const data = {
      source: '123',
      label: 'xxx',
    };

    const data1 = {
      target: '234',
    };
    expect(validationSingleData('edge', data as any)).toBe(false);
    expect(validationSingleData('edge', data1 as any)).toBe(false);
  });

  it('add single edge with right data', () => {
    const data = {
      source: '123',
      target: '234',
    };
    expect(validationSingleData('edge', data as any)).toBe(true);
  });

  it('add single combo with error data', () => {
    const data = {
      id: 123,
      label: 'test',
    };

    expect(validationSingleData('combo', data as any)).toBe(false);
  });

  it('add single combo with right data', () => {
    const data = {
      id: '123',
      label: 'test',
    };
    const data1 = {
      label: 'xxx',
    };
    expect(validationSingleData('combo', data1 as any)).toBe(true);
    expect(validationSingleData('combo', data as any)).toBe(true);
  });
});
