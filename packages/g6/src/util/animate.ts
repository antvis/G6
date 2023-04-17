import { DisplayObject, Group, IAnimation } from '@antv/g';
import {
  AnimateTiming,
  IAnimate,
  IAnimates,
  IStateAnimate,
} from '../types/animate';
import { ItemShapeStyles, ShapeStyle } from '../types/item';
import { isArrayOverlap, replaceElements } from './array';

/**
 * Initial(timing = show) shape animation start from init shape styles, and end to the shape's style config.
 */
export const getShapeAnimateBeginStyles = (shape) => {
  if (!shape) return {};
  const shapeType = shape.nodeName;
  const commonStyles = {
    opacity: 0,
    strokeOpacity: 0,
    lineWidth: 1,
    offsetDistance: 0,
  };
  if (['line', 'polyline', 'path'].includes(shapeType)) {
    const totalLength = shape.getTotalLength();
    return {
      lineDash: [0, totalLength],
      ...commonStyles,
    };
  } else if (shapeType === 'circle') {
    return {
      r: 0,
      ...commonStyles,
    };
  } else if (shapeType === 'ellipse') {
    return {
      rx: 0,
      ry: 0,
      ...commonStyles,
    };
  } else if (shapeType === 'text') {
    return {
      fontSize: 0,
      opacity: 0,
      strokeOpacity: 0,
      offsetDistance: 0,
    };
  }
  return {
    width: 0,
    height: 0,
    ...commonStyles,
  };
};
/**
 * Initial(timing = show) group animation start from GROUP_ANIMATE_STYLES[0], and end to GROUP_ANIMATE_STYLES[1].
 */
const GROUP_ANIMATE_STYLES = [
  {
    opacity: 0,
    transform: 'scale(0)',
  },
  {
    opacity: 1,
    transform: 'scale(1)',
  },
];

/**
 * Default animate options for different timing.
 */
const DEFAULT_ANIMATE_CFG = {
  show: {
    duration: 500,
    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    iterations: 1,
    delay: 1500,
    fill: 'both',
  },
  update: {
    duration: 500,
    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    iterations: 1,
    fill: 'both',
  },
};

/**
 * Get different key value map between style1 and style2.
 * @param style1
 * @param style2
 * @returns
 */
const getStyleDiff = (style1: ShapeStyle, style2: ShapeStyle) => {
  const diff = [{}, {}];
  Object.keys(style1).forEach((key) => {
    if (style2[key] !== style1[key]) {
      diff[0][key] = style1[key];
      diff[1][key] = style2[key];
    }
  });
  return diff;
};

/**
 * Grouping the animates at a timing by order.
 * @param animates
 * @param timing
 * @returns
 */
const groupTimingAnimates = (
  animates: IAnimates,
  segmentedTiming: AnimateTiming | 'stateUpdate',
  changedStates: string[],
) => {
  const timingAnimateGroups = {};
  const isStateUpdate = segmentedTiming === 'stateUpdate';
  animates[isStateUpdate ? 'update' : segmentedTiming].forEach((item: any) => {
    const { order = 0 } = item;
    if (
      !isStateUpdate ||
      (isStateUpdate && isArrayOverlap(item.states, changedStates))
    ) {
      timingAnimateGroups[order] = timingAnimateGroups[order] || [];
      timingAnimateGroups[order].push(item);
    }
  });
  return timingAnimateGroups;
};

/**
 * Execute animations in order at a timing.
 * @param shapeMap
 * @param group
 * @param timingAnimates
 * @param targetStylesMap
 * @param timing
 * @param onfinish
 */
const runAnimateGroupOnShapes = (
  shapeMap: { [shapeId: string]: DisplayObject },
  group: Group,
  timingAnimates: IAnimate[],
  targetStylesMap: ItemShapeStyles,
  timing: AnimateTiming,
  onfinish: Function,
  cancelAnimations: Function,
  canceled: Boolean,
) => {
  let maxDuration = -Infinity;
  let maxDurationIdx = -1;
  let hasCanceled = canceled;
  const animations = timingAnimates.map((animate: any, i) => {
    const { fields, shapeId, order, states, ...animateCfg } = animate;
    const animateConfig = {
      ...DEFAULT_ANIMATE_CFG[timing],
      ...animateCfg,
    };
    const { duration } = animateConfig;

    let animation;
    if (!shapeId || shapeId === 'group') {
      // animate on group
      const usingFields = fields?.map((field) =>
        field === 'size' ? 'transform' : field,
      );
      const targetStyle = targetStylesMap.group || GROUP_ANIMATE_STYLES[1];
      if (hasCanceled) {
        Object.keys(targetStyle).forEach((key) => {
          group.style[key] = targetStyle[key];
        });
      } else {
        animation = runAnimateOnShape(
          group,
          usingFields,
          targetStyle,
          GROUP_ANIMATE_STYLES[0],
          animateConfig,
        );
      }
    } else {
      const shape = shapeMap[shapeId];
      if (shape && shape.style.display !== 'none') {
        const targetStyle =
          targetStylesMap[shapeId] || targetStylesMap.otherShapes[shapeId];
        if (hasCanceled) {
          Object.keys(targetStyle).forEach((key) => {
            shape.style[key] = targetStyle[key];
          });
        } else {
          animation = runAnimateOnShape(
            shape,
            fields,
            targetStyle,
            getShapeAnimateBeginStyles(shape),
            animateConfig,
          );
        }
      }
    }
    if (maxDuration < duration && animation) {
      maxDuration = duration;
      maxDurationIdx = i;
    }
    if (animation) {
      animation.oncancel = () => {
        hasCanceled = true;
        cancelAnimations();
      };
    }
    return animation;
  });
  if (maxDurationIdx > -1) animations[maxDurationIdx].onfinish = onfinish;
  return animations;
};

/**
 * Execute one animation.
 * @param shape
 * @param fields
 * @param targetStyle
 * @param beginStyle
 * @param animateConfig
 * @returns
 */
const runAnimateOnShape = (
  shape: DisplayObject,
  fields: string[],
  targetStyle: ShapeStyle,
  beginStyle: ShapeStyle,
  animateConfig,
) => {
  let animateArr;
  if (!fields?.length) {
    animateArr = getStyleDiff(shape.attributes, targetStyle);
  } else {
    animateArr = [{}, {}];
    fields.forEach((key) => {
      animateArr[0][key] = shape.attributes.hasOwnProperty(key)
        ? shape.style[key]
        : beginStyle[key];
      animateArr[1][key] = targetStyle[key];
      if (key === 'lineDash' && animateArr[1][key].includes('100%')) {
        const totalLength = shape.getTotalLength();
        replaceElements(animateArr[1][key], '100%', totalLength);
      }
    });
  }
  if (JSON.stringify(animateArr[0]) === JSON.stringify(animateArr[1])) return;
  console.log('animateArr', shape, animateArr);
  return shape.animate(animateArr, animateConfig);
};

/**
 * Handle shape and group animations.
 * Should be called after canvas ready and shape appended.
 * @param animates
 * @param mergedStyles
 * @param shapeMap
 * @param group
 * @param timing timing to match 'when' in the animate config in style
 * @returns
 */
export const animateShapes = (
  animates: IAnimates,
  mergedStyles: ItemShapeStyles,
  shapeMap: { [shapeId: string]: DisplayObject },
  group: Group,
  timing: AnimateTiming = 'show',
  changedStates: string[] = [],
  onAnimatesEnd: Function = () => {},
): IAnimation[] => {
  if (!animates?.[timing]) {
    onAnimatesEnd();
    return;
  }
  const segmentedTiming =
    timing === 'update' && changedStates?.length ? 'stateUpdate' : timing;
  const timingAnimateGroups = groupTimingAnimates(
    animates,
    segmentedTiming,
    changedStates,
  );
  let i = 0;
  const groupKeys = Object.keys(timingAnimateGroups);
  if (!groupKeys.length) return;
  let animations = [];
  let canceled = false;
  const onfinish = () => {
    if (i >= groupKeys.length) {
      onAnimatesEnd();
      return;
    }
    const groupAnimations = runAnimateGroupOnShapes(
      shapeMap,
      group,
      timingAnimateGroups[groupKeys[i]],
      mergedStyles,
      timing,
      onfinish, // execute next order group
      () => (canceled = true),
      canceled,
    );
    if (i === 0) {
      // collect the first group animations
      animations = groupAnimations.filter(Boolean);
    }
    i++;
  };
  onfinish();
  // only animations with order 0 will be returned
  return animations;
};
