import { BaseTransform } from '@/src/transforms/base-transform';

describe('BaseTransform', () => {
  it('beforeDraw', () => {
    class Transform extends BaseTransform {}

    const baseTransform = new Transform({} as any, {});
    expect(baseTransform.beforeDraw({} as any, {})).toEqual({});
  });
});
