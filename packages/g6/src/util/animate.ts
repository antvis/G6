import {
  DisplayObject,
  Group,
  IAnimation,
  Line,
  Path,
  Polyline,
} from '@antv/g';
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
export const GROUP_ANIMATE_STYLES = [
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
export const DEFAULT_ANIMATE_CFG = {
  buildIn: {
    duration: 500,
    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    iterations: 1,
    delay: 1000,
    fill: 'both',
  },
  show: {
    duration: 500,
    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    iterations: 1,
    fill: 'both',
  },
  update: {
    duration: 500,
    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    iterations: 1,
    fill: 'both',
  },
  zoom: {
    duration: 200,
    easing: 'linear',
    iterations: 1,
    delay: 0,
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
    const { order = 0, states } = item;
    if (
      !isStateUpdate ||
      (isStateUpdate && isArrayOverlap(states, changedStates))
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
  const isOut = timing === 'buildOut' || timing === 'hide';
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
      const usingFields = [];
      let hasOpacity = false;
      fields?.forEach((field) => {
        if (field === 'size') usingFields.push('transform');
        else if (field !== 'opacity') usingFields.push(field);
        else hasOpacity = true;
      });
      const targetStyle =
        targetStylesMap.group || GROUP_ANIMATE_STYLES[isOut ? 0 : 1];
      if (hasCanceled) {
        Object.keys(targetStyle).forEach((key) => {
          group.style[key] = targetStyle[key];
        });
      } else {
        if (hasOpacity) {
          // opacity on group, animate on all shapes
          Object.keys(shapeMap).forEach((shapeId) => {
            const { opacity: targetOpaicty = 1 } =
              targetStylesMap[shapeId] ||
              targetStylesMap.otherShapes?.[shapeId] ||
              {};
            animation = runAnimateOnShape(
              shapeMap[shapeId],
              ['opacity'],
              { opacity: targetOpaicty },
              getShapeAnimateBeginStyles(shapeMap[shapeId]),
              animateConfig,
            );
          });
        }
        if (usingFields.length) {
          animation = runAnimateOnShape(
            group,
            usingFields,
            targetStyle,
            GROUP_ANIMATE_STYLES[isOut ? 1 : 0],
            animateConfig,
          );
        }
      }
    } else {
      const shape = shapeMap[shapeId];
      if (shape && shape.style.display !== 'none') {
        const targetStyle =
          targetStylesMap[shapeId] ||
          targetStylesMap.otherShapes?.[shapeId] ||
          {};
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
  if (!shape.isVisible()) return;
  let animateArr;
  if (!fields?.length) {
    animateArr = getStyleDiff(shape.attributes, targetStyle);
  } else {
    animateArr = [{}, {}];
    fields.forEach((key) => {
      animateArr[0][key] = shape.attributes.hasOwnProperty(key)
        ? shape.style[key]
        : beginStyle[key];
      animateArr[1][key] =
        targetStyle[key] === undefined ? animateArr[0][key] : targetStyle[key];
      if (key === 'lineDash' && animateArr[1][key].includes('100%')) {
        const totalLength = (shape as Line | Polyline | Path).getTotalLength();
        replaceElements(animateArr[1][key], '100%', totalLength);
      }
    });
  }
  if (JSON.stringify(animateArr[0]) === JSON.stringify(animateArr[1])) return;
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
  timing: AnimateTiming = 'buildIn',
  changedStates: string[] = [],
  onAnimatesFrame: Function = () => {},
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
    ).filter(Boolean);
    groupAnimations.forEach((animation) => {
      animation.onframe = onAnimatesFrame;
      animations.push(animation);
    });
    i++;
  };
  onfinish();
  // only animations with order 0 will be returned
  return animations;
};

export const getAnimatesExcludePosition = (animates) => {
  if (!animates.update) return animates;
  const isGroupId = (id) => !id || id === 'group';
  // const groupUpdateAnimates = animates.update.filter(
  //   ({ shapeId }) => isGroupId(shapeId),
  // );
  const excludedAnimates = [];
  animates.update.forEach((animate) => {
    const { shapeId, fields } = animate;
    if (!isGroupId(shapeId)) {
      excludedAnimates.push(animate);
      return;
    }
    const newFields = fields;
    let isGroupPosition = false;
    if (fields.includes('x')) {
      const xFieldIdx = newFields.indexOf('x');
      newFields.splice(xFieldIdx, 1);
      isGroupPosition = true;
    }
    if (fields.includes('y')) {
      const yFieldIdx = newFields.indexOf('y');
      newFields.splice(yFieldIdx, 1);
      isGroupPosition = true;
    }

    if (isGroupPosition) {
      if (newFields.length !== 0) {
        // group animation but not on x and y
        excludedAnimates.push({
          ...animate,
          fields: newFields,
        });
      }
    } else {
      excludedAnimates.push(animate);
    }
  });

  return {
    ...animates,
    update: excludedAnimates,
  };
};

export const fadeIn = (id, shape, style, hiddenShape, animateConfig) => {
  // omit inexist shape and the shape which is not hidden by zoom changing
  if (!shape || !hiddenShape[id]) return;
  if (!shape?.isVisible()) {
    shape.style.opacity = 0;
    shape.show();
  }
  const { opacity: oriOpacity = 1 } = shape.attributes;
  if (oriOpacity === 1) return;
  const { opacity = 1 } = style;
  shape.animate([{ opacity: 0 }, { opacity }], animateConfig);
};

export const fadeOut = (id, shape, hiddenShape, animateConfig) => {
  if (!shape?.isVisible()) return;
  hiddenShape[id] = true;
  const { opacity = 1 } = shape.attributes;
  if (opacity === 0) return;
  const animation = shape.animate([{ opacity }, { opacity: 0 }], animateConfig);
  animation.onfinish = () => shape.hide();
};

/**
 * Make the animation to the end frame and clear it from the target shape.
 * @param animation
 */
export const stopAnimate = (animation) => {
  const timing = animation.effect.getTiming();
  animation.currentTime = Number(timing.duration) + Number(timing.delay || 0);
  animation.cancel();
};
