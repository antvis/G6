import { mat3 } from 'gl-matrix';

type mat3Type = [number, number, number, number, number, number, number, number, number];

export function leftTranslate(out, a, v) {
  const transMat: mat3Type = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  mat3.fromTranslation(transMat, v);
  return mat3.multiply(out, transMat, a);
}

export function leftRotate(out, a, rad) {
  const rotateMat: mat3Type = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  mat3.fromRotation(rotateMat, rad);
  return mat3.multiply(out, rotateMat, a);
}

export function leftScale(out, a, v) {
  const scaleMat: mat3Type = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  mat3.fromScaling(scaleMat, v);
  return mat3.multiply(out, scaleMat, a);
}

function leftMultiply(out, a, a1) {
  return mat3.multiply(out, a1, a);
}

/**
 * 根据 actions 来做 transform
 * @param m
 * @param actions
 */
export function transform(m: number[], actions: any[][]) {
  const matrix = m ? [].concat(m) : [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];

  for (let i = 0, len = actions.length; i < len; i++) {
    const action = actions[i];
    switch (action[0]) {
      case 't':
        leftTranslate(matrix, matrix, [ action[1], action[2] ]);
        break;
      case 's':
        leftScale(matrix, matrix, [ action[1], action[2] ]);
        break;
      case 'r':
        leftRotate(matrix, matrix, action[1]);
        break;
      case 'm':
        leftMultiply(matrix, matrix, action[1]);
        break;
      default:
        break;
    }
  }

  return matrix;
}
