import { isArray } from '@antv/util';
import {
  NodeStyleSets,
  EdgeStyleSets,
  ThemeSpecification,
} from '../../types/theme';
import { mergeStyles } from '../../util/shape';
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
  public solver(
    options: SpecThemeSolverOptions,
    themes: ThemeSpecificationMap,
  ): ThemeSpecification {
    const { base = 'light', specification } = options;
    const baseSpec = themes[base];
    const mergedSpec = { ...baseSpec };
    if (specification) {
      ['node', 'edge', 'combo'].forEach((itemType) => {
        if (!specification[itemType]) return;
        const {
          palette = mergedSpec[itemType].palette,
          lodStrategy = mergedSpec[itemType].lodStrategy,
          dataTypeField,
        } = specification[itemType];
        let { getStyleSets } = specification[itemType];

        if (dataTypeField && !getStyleSets) {
          getStyleSets = (paletteProps) => {
            return paletteProps.map((color) => ({
              default: {
                keyShape:
                  itemType === 'edge' ? { stroke: color } : { fill: color },
              },
            }));
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
              mergedStatesStyles[stateName] = mergeStyles([
                baseStyles[stateName],
                incomingStyle[stateName],
              ]);
            });
            return mergedStatesStyles;
          });
        } else {
          mergedStyles = { others: baseStyles };
          Object.keys(incomingStyles).forEach((dataType) => {
            const mergedStatesStyles = { ...baseStyles };
            const incomintStyle = incomingStyles[dataType];
            Object.keys(incomintStyle).forEach((stateName) => {
              mergedStatesStyles[stateName] = mergeStyles([
                baseStyles[stateName],
                incomintStyle[stateName],
              ]);
            });
            mergedStyles[dataType] = mergedStatesStyles;
          });
        }
        mergedSpec[itemType] = {
          dataTypeField,
          palette,
          lodStrategy,
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
