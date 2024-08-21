import type { BaseShapeStyleProps } from '@/src';
import { BaseShape } from '@/src';
import { Circle } from '@antv/g';

describe('element shape', () => {
  it('upsert hooks', () => {
    interface ShapeStyleProps extends BaseShapeStyleProps {
      shape: any;
    }

    const beforeCreate = jest.fn();
    const afterCreate = jest.fn();
    const beforeUpdate = jest.fn();
    const afterUpdate = jest.fn();
    const beforeDestroy = jest.fn();
    const afterDestroy = jest.fn();

    class Shape extends BaseShape<ShapeStyleProps> {
      render() {
        this.upsert('circle', Circle, this.attributes.shape, this, {
          beforeCreate,
          afterCreate,
          beforeUpdate,
          afterUpdate,
          beforeDestroy,
          afterDestroy,
        });
      }
    }

    const shape = new Shape({
      style: {
        shape: { r: 10 },
      },
    });

    expect(beforeCreate).toHaveBeenCalledTimes(1);
    expect(afterCreate).toHaveBeenCalledTimes(1);
    expect(beforeUpdate).toHaveBeenCalledTimes(0);
    expect(afterUpdate).toHaveBeenCalledTimes(0);
    expect(beforeDestroy).toHaveBeenCalledTimes(0);
    expect(afterDestroy).toHaveBeenCalledTimes(0);

    shape.update({ shape: { r: 20 } });

    expect(beforeCreate).toHaveBeenCalledTimes(1);
    expect(afterCreate).toHaveBeenCalledTimes(1);
    expect(beforeUpdate).toHaveBeenCalledTimes(1);
    expect(afterUpdate).toHaveBeenCalledTimes(1);
    expect(beforeDestroy).toHaveBeenCalledTimes(0);
    expect(afterDestroy).toHaveBeenCalledTimes(0);

    shape.update({ shape: false });

    expect(beforeCreate).toHaveBeenCalledTimes(1);
    expect(afterCreate).toHaveBeenCalledTimes(1);
    expect(beforeUpdate).toHaveBeenCalledTimes(1);
    expect(afterUpdate).toHaveBeenCalledTimes(1);
    expect(beforeDestroy).toHaveBeenCalledTimes(1);
    expect(afterDestroy).toHaveBeenCalledTimes(1);
  });
});
