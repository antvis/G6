import { ItemShapeStyles, ShapeStyle } from "./item";

export interface ThemeOption { }
/**
 * Base behavior.
 * Two implementing ways: getSpec or getEvents
 */
export abstract class Theme {
  protected options: ThemeOption = {};
  constructor(options: ThemeOption) {
    this.options = options;
  };
  public updateConfig = (options: ThemeOption) => {
    this.options = Object.assign(this.options, options);
  }
  abstract destroy(): void;
}

/** Theme regisry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface ThemeRegistry {
  [type: string]: typeof Theme;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example ThemeOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type ThemeOptionsOf<T extends ThemeRegistry = {}> = Extract<keyof T, string> | {
  [K in keyof T]: T[K] extends { new(options: infer O): any } ? O & { type: K, key: string } : never;
}[Extract<keyof T, string>];

export type ThemeObjectOptionsOf<T extends ThemeRegistry = {}> = {
  [K in keyof T]: T[K] extends { new(options: infer O): any } ? O & { type: K, key: string } : never;
}[Extract<keyof T, string>];


export type ItemStyleSets = ItemStyleSet[] | { [dataTypeValue: string]: ItemStyleSet }

/** Default and stateStyle for an item */
export type ItemStyleSet = {
  default?: ItemShapeStyles;
  [stateName: string]: ItemShapeStyles;
};

export interface ItemThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: ItemStyleSet[] | {
    [dataTypeValue: string]: ItemStyleSet
  }
}

/**
 * Theme specification
 */
export interface ThemeSpecification {
  node?: ItemThemeSpecifications;
  edge?: ItemThemeSpecifications;
  combo?: ItemThemeSpecifications;
  canvas?: {
    [cssName: string]: unknown;
  }
}