import { ExtensionController } from '../registry/extension';
import type { CustomTransformOption, TransformOptions } from '../spec/transform';
import { BaseTransform } from '../transforms';
import type { RuntimeContext } from './types';

export const REQUIRED_TRANSFORMS: TransformOptions = [
  'update-related-edges',
  'collapse-expand-node',
  'collapse-expand-combo',
  'get-edge-actual-ends',
  'arrange-draw-order',
];

export class TransformController extends ExtensionController<BaseTransform<CustomTransformOption>> {
  public category = 'transform' as const;

  constructor(context: RuntimeContext) {
    super(context);
    this.setTransforms(this.context.options.transforms || []);
  }

  protected getTransforms() {}

  public setTransforms(transforms: TransformOptions) {
    this.setExtensions([
      ...REQUIRED_TRANSFORMS.slice(0, REQUIRED_TRANSFORMS.length - 1),
      ...transforms,
      REQUIRED_TRANSFORMS[REQUIRED_TRANSFORMS.length - 1],
    ]);
  }

  public getTransformInstance(key?: string) {
    return key ? this.extensionMap[key] : this.extensionMap;
  }
}
