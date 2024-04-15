import { ExtensionController } from '../registry/extension';
import type { CustomTransformOption, TransformOptions } from '../spec/transform';
import { BaseTransform } from '../transforms';
import type { RuntimeContext } from './types';

export const REQUIRED_TRANSFORMS: TransformOptions = [
  'update-related-edges',
  'arrange-draw-order',
  'collapse-expand-combo',
];

export class TransformController extends ExtensionController<BaseTransform<CustomTransformOption>> {
  public category = 'transform' as const;

  constructor(context: RuntimeContext) {
    super(context);
    this.setTransforms(this.context.options.transforms || []);
  }

  public setTransforms(transforms: TransformOptions) {
    this.setExtensions([...transforms, ...REQUIRED_TRANSFORMS]);
  }

  public getTransformInstance(key?: string) {
    return key ? this.extensionMap[key] : this.extensionMap;
  }
}
