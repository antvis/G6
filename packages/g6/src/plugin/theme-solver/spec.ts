import { isArray, isObject } from '@antv/util';
import { EdgeStyleSets, NodeStyleSets, ThemeSpecification } from '../../types/theme';
import { mergeStyles } from '../../utils/shape';
import { BaseThemeSolver, ThemeSpecificationMap } from './base';

interface SpecThemeSolverOptions {
  base: 'light' | 'dark';
  specification?: {
    node?: {
      dataTypeField?: string;
      palette: string[] | { [dataType: string]: string };
      getStyleSets: (palette) => NodeStyleSets;
    };
    edge?: {
      dataTypeField?: string;
      palette: string[] | { [dataType: string]: string };
      getStyleSets: (palette) => EdgeStyleSets;
    };
    combo?: {
      dataTypeField?: string;
      palette: string[] | { [dataType: string]: string };
      getStyleSets: (palette) => NodeStyleSets;
    };
    canvas?: {
      [cssName: string]: unknown;
    };
  };
}
export class SpecThemeSolver extends BaseThemeSolver {
  public solver(options: SpecThemeSolverOptions, themes: ThemeSpecificationMap): ThemeSpecification {
    const { base = 'light', specification } = options;
    const baseSpec = themes[base];
    const mergedSpec = { ...baseSpec };
    if (specification) {
      ['node', 'edge', 'combo'].forEach((itemType) => {
        if (!specification[itemType]) return;
        const {
          palette = mergedSpec[itemType].palette,
          lodLevels = mergedSpec[itemType].lodLevels,
          dataTypeField,
        } = specification[itemType];
        let { getStyleSets } = specification[itemType];

        if (dataTypeField && !getStyleSets) {
          getStyleSets = (paletteProps) => {
            if (isArray(paletteProps)) {
              return paletteProps.map((color) => ({
                default: {
                  keyShape: itemType === 'edge' ? { stroke: color } : { fill: color },
                },
              }));
            }
            if (isObject(paletteProps)) {
              const res = {};
              Object.keys(paletteProps).map((dataType) => {
                res[dataType] = {
                  default: {
                    keyShape:
                      itemType === 'edge' ? { stroke: paletteProps[dataType] } : { fill: paletteProps[dataType] },
                  },
                };
              });
              return res;
            }
          };
        }

        // merge the custom part spec and the built-in spec
        const {
          styles: [baseStyles],
        } = baseSpec[itemType];
        const incomingStyles = getStyleSets?.(palette) || {};
        let mergedStyles;
        if (isArray(incomingStyles)) {
          mergedStyles = incomingStyles.map((incomingStyle) => {
            const mergedStatesStyles = { ...baseStyles };
            Object.keys(incomingStyle).forEach((stateName) => {
              mergedStatesStyles[stateName] = mergeStyles([baseStyles[stateName], incomingStyle[stateName]]);
            });
            return mergedStatesStyles;
          });
        } else {
          mergedStyles = { others: baseStyles };
          Object.keys(incomingStyles).forEach((dataType) => {
            const mergedStatesStyles = { ...baseStyles };
            const incomingStyle = incomingStyles[dataType];
            Object.keys(incomingStyle).forEach((stateName) => {
              mergedStatesStyles[stateName] = mergeStyles([baseStyles[stateName], incomingStyle[stateName]]);
            });
            mergedStyles[dataType] = mergedStatesStyles;
          });
        }
        mergedSpec[itemType] = {
          dataTypeField,
          palette,
          lodLevels,
          styles: mergedStyles,
        };
      });
      mergedSpec['canvas'] = {
        ...baseSpec.canvas,
        ...specification.canvas,
      };
    }
    return mergedSpec;
  }
}
