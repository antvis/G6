import { Util } from '@antv/g6-core';

type RatioUnit = [number, number] | [number[], number];

const getRatioByArray = (arr: RatioUnit[], ratio: number) => {
  let usingArr: [number, number][] = [];
  arr.forEach((item) => {
    if (item[0] instanceof Array) {
      item[0].forEach((subR) => usingArr.push([subR, item[1]]));
    } else {
      usingArr.push([Number(item[0]), item[1]]);
    }
  });
  usingArr = usingArr.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < usingArr.length; i++) {
    const now = usingArr[i];
    const next = usingArr[i + 1];
    if (!next) {
      return now[1];
    }
    if (ratio > now[0] && ratio <= next[0]) {
      const deltaRatio = ratio - now[0];
      const allRatio = next[0] - now[0];
      const deltaVal = next[1] - now[1];
      return now[1] + (deltaVal * deltaRatio) / allRatio;
    }
  }
};

export const animations = {
  spin: (ratio: number) => {
    const toMatrix = Util.transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [['r', Math.PI * 2 * ratio]],
    );
    return {
      matrix: toMatrix,
    };
  },
  flash: (ratio: number) => ({ opacity: Math.abs(1 - ratio * 2) }),
  pulse: (ratio: number) => {
    const uRatio = getRatioByArray(
      [
        [[0, 1], 1],
        [0.5, 1.25],
      ],
      ratio,
    );
    const toMatrix = Util.transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [['s', uRatio, uRatio]],
    );

    return {
      matrix: toMatrix,
    };
  },
  rubber: (ratio: number) => {
    const xratio = getRatioByArray(
      [
        [0, 1],
        [0.3, 1.25],
        [0.4, 0.75],
        [0.5, 1.15],
        [0.65, 0.95],
        [0.75, 1.05],
        [1, 1],
      ],
      ratio,
    );
    const yratio = getRatioByArray(
      [
        [0, 1],
        [0.3, 0.75],
        [0.4, 1.25],
        [0.5, 0.95],
        [0.65, 1.05],
        [0.75, 0.95],
        [1, 1],
      ],
      ratio,
    );

    const toMatrix = Util.transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [['s', xratio, yratio]],
    );

    return {
      matrix: toMatrix,
    };
  },
  tada: (ratio: number) => {
    const scaleRatio = getRatioByArray(
      [
        [0, 1],
        [[0.1, 0.2], 0.9],
        [[0.8, 0.9], 1.1],
        [1, 1],
      ],
      ratio,
    );
    const tadaRatio = getRatioByArray(
      [
        [0, 0],
        [[0.3, 0.5, 0.7, 0.9], 1],
        [[0.1, 0.2, 0.4, 0.6, 0.8], -1],
        [1, 0],
      ],
      ratio,
    );

    const toMatrix = Util.transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [
        ['s', scaleRatio, scaleRatio],
        ['r', ((tadaRatio || 0) * Math.PI) / 60],
      ],
    );

    return {
      matrix: toMatrix,
    };
  },
  bounce: (ratio: number) => {
    const yNum = getRatioByArray(
      [
        [[0, 1], 0],
        [[0.4, 0.43], -30],
        [0.7, -15],
        [0.8, 10],
        [0.9, -3],
      ],
      ratio,
    );
    const scaleY = getRatioByArray(
      [
        [[0, 1], 1],
        [[0.4, 0.43], 1.1],
        [0.7, 1.05],
        [0.8, 0.95],
        [0.9, 1.02],
      ],
      ratio,
    );
    const toMatrix = Util.transform(
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [
        ['t', 0, yNum],
        ['s', 1, scaleY],
      ],
    );

    return {
      matrix: toMatrix,
    };
  },
};
