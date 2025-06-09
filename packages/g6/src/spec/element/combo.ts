import type { AnimationOptions } from '../../animations/types';
import type { BaseComboStyleProps, CircleComboStyleProps, RectComboStyleProps } from '../../elements/combos';
import type { Graph } from '../../runtime/graph';
import { UnknownStruct } from '../../types/utility';
import type { ComboData } from '../data';
import type { AnimationStage } from './animation';
import type { PaletteOptions } from './palette';

type ComboDataFn<R, ComboType extends UnknownStruct = UnknownStruct> = (this: Graph, datum: ComboData<ComboType>) => R;

type StyleFieldComboDataFn<S, ComboType extends UnknownStruct = UnknownStruct> = {
  [K in keyof S]?: S[K] | ComboDataFn<S[K], ComboType>;
};

type ComboOptionsBuilder<
  NodeType extends UnknownStruct = UnknownStruct,
  ComboType extends UnknownStruct = UnknownStruct,
  Type extends string = string, 
  Style extends Partial<BaseComboStyleProps<NodeType, ComboType>> = Partial<BaseComboStyleProps<NodeType, ComboType>>
> = {
   /**
    * <zh/> 组合类型
    *
    * <en/> Combo type
    */
   type?: Type | ComboDataFn<Type, ComboType>;
   /**
    * <zh/> 组合样式
    *
    * <en/> Combo style
    */
   style?:
     | Style
     | ComboDataFn<Style, ComboType>
     | StyleFieldComboDataFn<Style, ComboType>;
   /**
    * <zh/> 组合状态样式
    *
    * <en/> Combo state style
    */
   state?: Record<
     string,
     | Style
     | ComboDataFn<Style, ComboType>
     | StyleFieldComboDataFn<Style, ComboType>
   >;
   /**
    * <zh/> 组合动画
    *
    * <en/> Combo animation
    */
   animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
   /**
    * <zh/> 色板
    *
    * <en/> Palette
    */
   palette?: PaletteOptions;
}

export interface ComboStyle<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> extends Partial<BaseComboStyleProps<NodeType, ComboType>> {
  [key: string]: unknown;
}

type CircleComboOptions<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> = ComboOptionsBuilder<
  NodeType,
  ComboType,
  'circle',
  CircleComboStyleProps<NodeType, ComboType>
>;

type RectComboOptions<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> = ComboOptionsBuilder<
  NodeType,
  ComboType,
  'rect',
  RectComboStyleProps<NodeType, ComboType>
>;

type CustomComboOptions<NodeType extends UnknownStruct = UnknownStruct, ComboType extends UnknownStruct = UnknownStruct> = ComboOptionsBuilder<
  NodeType,
  ComboType,
  string,
  ComboStyle<NodeType, ComboType>
>;


/**
 * <zh/> Combo 配置项
 *
 * <en/> Combo spec
 */
export type ComboOptions<
  NodeType extends UnknownStruct = UnknownStruct,
  ComboType extends UnknownStruct = UnknownStruct,
> = 
  | CircleComboOptions<NodeType, ComboType>
  | RectComboOptions<NodeType, ComboType>
  | CustomComboOptions<NodeType, ComboType>;

export interface StaticComboOptions {
  style?: ComboStyle;
  state?: Record<string, ComboStyle>;
  animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
  palette?: PaletteOptions;
}
