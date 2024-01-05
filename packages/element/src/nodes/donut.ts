import { IGroup, IShape } from '@antv/g-base';
import {
  registerNode,
  Item,
  NodeConfig,
  BaseGlobal as Global,
  UpdateType,
  Util,
} from '@antv/g6-core';
import { deepMix } from '@antv/util';

const { defaultSubjectColors } = Util;

const FAN_NAME_PREFIX = 'fan-shape-';

type DonutAttrs = {
  [propKey: string]: number;
};

type DonutColorMap = {
  [propKey: string]: string;
};

interface DonutNodeConfig extends NodeConfig {
  // values for fan shapes on the donut
  donutAttrs?: DonutAttrs;
  // assign the color for a fan, propKey corresponds to the keys in donutAttrs. If not assigned, default palette will be used
  donutColorMap?: DonutColorMap;
}

type FanValue = {
  key: string; // key of the fan, came from the key of corresponding property of donutAttrs
  value: number; // format number value of the single fan
  color: string; // color from corresponding position of donutColorMap
};

type FanConfig = {
  arcR: number; // the radius of the fan
  arcBegin: [number, number]; // the beginning position of the arc
  beginAngle: number; // the beginning angle of the arc
  config: FanValue; // value and color of the fan
  fanIndex: number; // the index of the fan at the donut fans array
  lineWidth: number; // the line width for the arc path
  totalValue: number; // the total value of the donut configs
  drawWhole?: boolean; // whether draw a arc with radius 2*PI to represent a circle
  updateShape?: IShape; // the shape to be updated, if not assgined, draw a new fan shape
};

/**
 * calculate the total value and format single value for each fan
 * @param donutAttrs
 * @param donutColorMap
 * @returns
 */
const getDonutConfig = (
  donutAttrs: DonutAttrs,
  donutColorMap: DonutColorMap,
): {
  totalValue: number;
  configs: FanValue[];
} => {
  let totalValue = 0;
  const configs = [];
  Object.keys(donutAttrs).forEach((name) => {
    const value = +donutAttrs[name];
    if (isNaN(value)) return;
    configs.push({
      key: name,
      value,
      color: donutColorMap[name],
    });
    totalValue += value;
  });
  return { totalValue, configs };
};

/**
 * calculate the lineWidth and radius for fan shapes according to the keyShape's radius
 * @param keyShape
 * @returns
 */
const getDonutSize = (
  keyShape: IShape,
): {
  lineWidth: number;
  arcR: number;
} => {
  const keyShapeR = keyShape.attr('r');
  const innerR = 0.6 * keyShapeR; // 甜甜圈的内环半径
  const arcR = (keyShapeR + innerR) / 2; // 内环半径与外环半径的平均值
  const lineWidth = keyShapeR - innerR;
  return { lineWidth, arcR };
};

/**
 * draws one fan shape and returns the next position and angle
 * @param group
 * @param fanConfig
 * @returns
 */
const drawFan = (
  group: IGroup,
  fanConfig: FanConfig,
): {
  beginAngle: number; // next begin iangle
  arcBegin: [number, number]; // next begin position
  shape: IShape | undefined; // shape added by this function
  shouldEnd: boolean; // finish fans drawing
} => {
  const {
    arcR,
    arcBegin,
    beginAngle,
    config,
    fanIndex,
    lineWidth,
    totalValue,
    drawWhole = false,
    updateShape = undefined,
  } = fanConfig;
  const percent = config.value / totalValue;
  if (percent < 0.001) {
    // too small to add a fan
    return {
      beginAngle,
      arcBegin,
      shape: undefined,
      shouldEnd: false,
    };
  }
  let arcEnd, endAngle, isBig;
  // draw a path represents the whole circle, or the percentage is close to 1
  if (drawWhole || percent > 0.999) {
    arcEnd = [arcR, 0.0001]; // [arcR * cos(2 * PI), -arcR * sin(2 * PI)]
    isBig = 1;
  } else {
    const angle = percent * Math.PI * 2;
    endAngle = beginAngle + angle;
    arcEnd = [arcR * Math.cos(endAngle), -arcR * Math.sin(endAngle)];
    isBig = angle > Math.PI ? 1 : 0;
  }
  const style = {
    path: [
      ['M', arcBegin[0], arcBegin[1]],
      ['A', arcR, arcR, 0, isBig, 0, arcEnd[0], arcEnd[1]],
    ],
    stroke:
      config.color ||
      updateShape?.attr('stroke') ||
      defaultSubjectColors[fanIndex % defaultSubjectColors.length],
    lineWidth,
  };
  if (updateShape) {
    // update
    updateShape.attr(style);
  } else {
    // draw
    group['shapeMap'][`${FAN_NAME_PREFIX}${fanIndex}`] = group.addShape('path', {
      attrs: style,
      name: `${FAN_NAME_PREFIX}${fanIndex}`,
      draggable: true,
    });
  }
  return {
    beginAngle: endAngle,
    arcBegin: arcEnd,
    shape: group['shapeMap'][`${FAN_NAME_PREFIX}${fanIndex}`],
    shouldEnd: drawWhole || percent > 0.999,
  };
};

/**
 * draws the fan shapes
 * @param cfg
 * @param group
 * @param keyShape
 * @returns
 */
const drawFans = (cfg: DonutNodeConfig, group: IGroup, keyShape: IShape) => {
  const { donutAttrs = {}, donutColorMap = {} } = cfg;
  const attrNum = Object.keys(donutAttrs).length;
  if (donutAttrs && attrNum > 1) {
    const { configs, totalValue } = getDonutConfig(donutAttrs, donutColorMap);
    if (totalValue) {
      const { lineWidth, arcR } = getDonutSize(keyShape);
      let arcBegin: [number, number] = [arcR, 0];
      let beginAngle = 0;
      if (attrNum === 1) {
        // draw a path represents a circle
        drawFan(group, {
          arcR,
          arcBegin,
          beginAngle,
          config: configs[0],
          fanIndex: 0,
          lineWidth,
          totalValue,
          drawWhole: true,
        });
        return;
      }
      for (let i = 0; i < configs.length; i++) {
        const result = drawFan(group, {
          arcR,
          arcBegin,
          beginAngle,
          config: configs[i],
          fanIndex: i,
          lineWidth,
          totalValue,
        });
        if (result.shouldEnd) return;
        arcBegin = result.arcBegin;
        beginAngle = result.beginAngle;
      }
    }
  }
};

/**
 * utilizes the existing fan shapes, update them with new configs
 * removes the redundent fan shapes
 * or adds more fan shapes
 * @param cfg
 * @param item
 * @param keyShape
 */
const updateFans = (cfg: DonutNodeConfig, item: Item, keyShape: IShape) => {
  const { donutAttrs, donutColorMap = {} } = cfg;
  const visitMap = {};
  const group = item.getContainer();
  if (donutAttrs) {
    const { configs, totalValue } = getDonutConfig(donutAttrs, donutColorMap);
    if (totalValue) {
      const { lineWidth, arcR } = getDonutSize(keyShape);
      let arcBegin: [number, number] = [arcR, 0];
      let beginAngle = 0;
      for (let i = 0; i < configs.length; i++) {
        const shapeName = `${FAN_NAME_PREFIX}${i}`;
        const result = drawFan(group, {
          arcR,
          arcBegin,
          beginAngle,
          config: configs[i],
          fanIndex: i,
          lineWidth,
          totalValue,
          drawWhole: configs.length === 1,
          updateShape: group['shapeMap'][shapeName],
        });
        if (result.shape) visitMap[shapeName] = true;
        if (result.shouldEnd) break;
        arcBegin = result.arcBegin;
        beginAngle = result.beginAngle;
      }
    }
  }
  // remove the old shapes which are not visited, including the situation taht donutAttrs is empty
  const fanKeys = Object.keys(group['shapeMap']).filter((key) => key.includes(FAN_NAME_PREFIX));
  fanKeys.forEach((key) => {
    if (!visitMap[key]) {
      group['shapeMap'][key].remove(true);
      delete group['shapeMap'][key];
    }
  });
};

// 饼图节点
registerNode(
  'donut',
  {
    // 自定义节点时的配置
    options: {
      size: Global.defaultNode.size,
      style: {
        x: 0,
        y: 0,
        stroke: Global.defaultNode.style.stroke,
        fill: Global.defaultNode.style.fill,
        lineWidth: Global.defaultNode.style.lineWidth,
      },
      labelCfg: {
        style: {
          fill: Global.nodeLabel.style.fill,
          fontSize: Global.nodeLabel.style.fontSize,
          fontFamily: Global.windowFontFamily,
        },
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        right: false,
        bottom: false,
        left: false,
        // circle的大小
        size: Global.defaultNode.linkPoints.size,
        lineWidth: Global.defaultNode.linkPoints.lineWidth,
        fill: Global.defaultNode.linkPoints.fill,
        stroke: Global.defaultNode.linkPoints.stroke,
      },
      // 节点中icon配置
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
        width: 20,
        height: 20,
      },
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'circle',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: DonutNodeConfig, group: IGroup): IShape {
      const { icon: defaultIcon = {} } = this.mergeStyle || (this.getOptions(cfg) as NodeConfig);
      const style = this.getShapeStyle!(cfg);
      const icon = deepMix({}, defaultIcon, cfg.icon);
      const keyShape: IShape = group.addShape('circle', {
        attrs: style,
        className: `${this.type}-keyShape`,
        draggable: true,
        name: `${this.type}-keyShape`,
      });
      group['shapeMap'][`${this.type}-keyShape`] = keyShape;

      const { width, height, show, text } = icon;
      if (show) {
        if (text) {
          group['shapeMap'][`${this.type}-icon`] = group.addShape('text', {
            attrs: {
              x: 0,
              y: 0,
              fontSize: 12,
              fill: '#000',
              stroke: '#000',
              textBaseline: 'middle',
              textAlign: 'center',
              ...icon,
            },
            className: `${this.type}-icon`,
            name: `${this.type}-icon`,
            draggable: true,
          });
        } else {
          group['shapeMap'][`${this.type}-icon`] = group.addShape('image', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              ...icon,
            },
            className: `${this.type}-icon`,
            name: `${this.type}-icon`,
            draggable: true,
          });
        }
      }

      // draw the fan shapes
      drawFans(cfg, group, keyShape);

      (this as any).drawLinkPoints(cfg, group);

      return keyShape;
    },
    updateShape(
      cfg: DonutNodeConfig,
      item: Item,
      keyShapeStyle: object,
      hasIcon: boolean,
      updateType: UpdateType,
    ) {
      // here cfg is merged configure including old model and new configs
      const keyShape = item.get('keyShape');
      keyShape.attr({
        ...keyShapeStyle,
      });

      updateFans(cfg, item, keyShape);

      if (!undefined || updateType?.includes('label')) {
        (this as any).updateLabel(cfg, item, updateType);
      }

      if (hasIcon) {
        (this as any).updateIcon(cfg, item);
      }
    },
  },
  'circle',
);
