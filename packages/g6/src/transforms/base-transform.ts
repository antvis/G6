import { BaseExtension } from '../registry/extension';
import type { CustomBehaviorOption } from '../spec/behavior';
import type { DrawData } from './types';

export type BaseTransformOptions = CustomBehaviorOption;

export abstract class BaseTransform<T extends BaseTransformOptions = BaseTransformOptions> extends BaseExtension<T> {
  public beforeDraw(data: DrawData): DrawData {
    return data;
  }
}
