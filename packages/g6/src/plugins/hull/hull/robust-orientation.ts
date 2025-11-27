'use strict';

import { scaleLinearExpansion as robustScale } from './robust-scale';
import { robustSubtract } from './robust-subtract';
import { linearExpansionSum as robustSum } from './robust-sum';
import { twoProduct } from './two-product';

type PointND = number[];

const NUM_EXPAND = 5;
const EPSILON = 1.1102230246251565e-16;
const ERR_BOUND_3 = (3.0 + 16.0 * EPSILON) * EPSILON;
const ERR_BOUND_4 = (7.0 + 56.0 * EPSILON) * EPSILON;

function orientation_3(
  sum: typeof robustSum,
  prod: typeof twoProduct,
  scale: typeof robustScale,
  sub: typeof robustSubtract,
): (m0: PointND, m1: PointND, m2: PointND) => number {
  return function orientation3Exact(m0, m1, m2) {
    const p = sum(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])));
    const n = sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0]));
    const d = sub(p, n);
    return d[d.length - 1];
  };
}

function orientation_4(
  sum: typeof robustSum,
  prod: typeof twoProduct,
  scale: typeof robustScale,
  sub: typeof robustSubtract,
): (m0: PointND, m1: PointND, m2: PointND, m3: PointND) => number {
  return function orientation4Exact(m0, m1, m2, m3) {
    const p = sum(
      sum(
        scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]),
        sum(
          scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]),
          scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]),
        ),
      ),
      sum(
        scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]),
        sum(
          scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]),
          scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]),
        ),
      ),
    );
    const n = sum(
      sum(
        scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]),
        sum(
          scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]),
          scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]),
        ),
      ),
      sum(
        scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]),
        sum(
          scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]),
          scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]),
        ),
      ),
    );
    const d = sub(p, n);
    return d[d.length - 1];
  };
}

function orientation_5(
  sum: typeof robustSum,
  prod: typeof twoProduct,
  scale: typeof robustScale,
  sub: typeof robustSubtract,
): (...args: PointND[]) => number {
  return function orientation5Exact(m0, m1, m2, m3, m4) {
    const p = sum(
      sum(
        sum(
          scale(
            sum(
              scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m2[2]),
              sum(
                scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), -m3[2]),
                scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m4[2]),
              ),
            ),
            m1[3],
          ),
          sum(
            scale(
              sum(
                scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m1[2]),
                sum(
                  scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m3[2]),
                  scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m4[2]),
                ),
              ),
              -m2[3],
            ),
            scale(
              sum(
                scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m1[2]),
                sum(
                  scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m2[2]),
                  scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m4[2]),
                ),
              ),
              m3[3],
            ),
          ),
        ),
        sum(
          scale(
            sum(
              scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]),
              sum(
                scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]),
                scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]),
              ),
            ),
            -m4[3],
          ),
          sum(
            scale(
              sum(
                scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m1[2]),
                sum(
                  scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m3[2]),
                  scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m4[2]),
                ),
              ),
              m0[3],
            ),
            scale(
              sum(
                scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m0[2]),
                sum(
                  scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m3[2]),
                  scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), m4[2]),
                ),
              ),
              -m1[3],
            ),
          ),
        ),
      ),
      sum(
        sum(
          scale(
            sum(
              scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m1[2]),
                scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m4[2]),
              ),
            ),
            m3[3],
          ),
          sum(
            scale(
              sum(
                scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]),
                sum(
                  scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]),
                  scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]),
                ),
              ),
              -m4[3],
            ),
            scale(
              sum(
                scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m1[2]),
                sum(
                  scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), -m2[2]),
                  scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m3[2]),
                ),
              ),
              m0[3],
            ),
          ),
        ),
        sum(
          scale(
            sum(
              scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]),
                scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]),
              ),
            ),
            -m1[3],
          ),
          sum(
            scale(
              sum(
                scale(sum(prod(m1[1], m3[0]), prod(-m3[1], m1[0])), m0[2]),
                sum(
                  scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m1[2]),
                  scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m3[2]),
                ),
              ),
              m2[3],
            ),
            scale(
              sum(
                scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]),
                sum(
                  scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]),
                  scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]),
                ),
              ),
              -m3[3],
            ),
          ),
        ),
      ),
    );
    const n = sum(
      sum(
        sum(
          scale(
            sum(
              scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m2[2]),
              sum(
                scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), -m3[2]),
                scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m4[2]),
              ),
            ),
            m0[3],
          ),
          scale(
            sum(
              scale(sum(prod(m3[1], m4[0]), prod(-m4[1], m3[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m3[2]),
                scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), m4[2]),
              ),
            ),
            -m2[3],
          ),
        ),
        sum(
          scale(
            sum(
              scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m2[2]),
                scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m4[2]),
              ),
            ),
            m3[3],
          ),
          scale(
            sum(
              scale(sum(prod(m2[1], m3[0]), prod(-m3[1], m2[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m3[0]), prod(-m3[1], m0[0])), -m2[2]),
                scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m3[2]),
              ),
            ),
            -m4[3],
          ),
        ),
      ),
      sum(
        sum(
          scale(
            sum(
              scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m1[2]),
              sum(
                scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), -m2[2]),
                scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m4[2]),
              ),
            ),
            m0[3],
          ),
          scale(
            sum(
              scale(sum(prod(m2[1], m4[0]), prod(-m4[1], m2[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m2[2]),
                scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), m4[2]),
              ),
            ),
            -m1[3],
          ),
        ),
        sum(
          scale(
            sum(
              scale(sum(prod(m1[1], m4[0]), prod(-m4[1], m1[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m4[0]), prod(-m4[1], m0[0])), -m1[2]),
                scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m4[2]),
              ),
            ),
            m2[3],
          ),
          scale(
            sum(
              scale(sum(prod(m1[1], m2[0]), prod(-m2[1], m1[0])), m0[2]),
              sum(
                scale(sum(prod(m0[1], m2[0]), prod(-m2[1], m0[0])), -m1[2]),
                scale(sum(prod(m0[1], m1[0]), prod(-m1[1], m0[0])), m2[2]),
              ),
            ),
            -m4[3],
          ),
        ),
      ),
    );
    const d = sub(p, n);
    return d[d.length - 1];
  };
}

function orientation(n: number) {
  const fn = n === 3 ? orientation_3 : n === 4 ? orientation_4 : orientation_5;
  return fn(robustSum, twoProduct, robustScale, robustSubtract);
}

const orientation3Exact = orientation(3);
const orientation4Exact = orientation(4);

const CACHED: Array<Function> = [
  function orientation0() {
    return 0;
  },
  function orientation1() {
    return 0;
  },
  function orientation2(a: PointND, b: PointND) {
    return b[0] - a[0];
  },
  function orientation3(a: PointND, b: PointND, c: PointND) {
    const l = (a[1] - c[1]) * (b[0] - c[0]);
    const r = (a[0] - c[0]) * (b[1] - c[1]);
    const det = l - r;
    let s: number;
    if (l > 0) {
      if (r <= 0) {
        return det;
      } else {
        s = l + r;
      }
    } else if (l < 0) {
      if (r >= 0) {
        return det;
      } else {
        s = -(l + r);
      }
    } else {
      return det;
    }
    const tol = ERR_BOUND_3 * s;
    if (det >= tol || det <= -tol) {
      return det;
    }
    return orientation3Exact(a, b, c);
  },
  function orientation4(a: PointND, b: PointND, c: PointND, d: PointND) {
    const adx = a[0] - d[0];
    const bdx = b[0] - d[0];
    const cdx = c[0] - d[0];
    const ady = a[1] - d[1];
    const bdy = b[1] - d[1];
    const cdy = c[1] - d[1];
    const adz = a[2] - d[2];
    const bdz = b[2] - d[2];
    const cdz = c[2] - d[2];
    const bdx_cdy = bdx * cdy;
    const cdx_bdy = cdx * bdy;
    const cdx_ady = cdx * ady;
    const adx_cdy = adx * cdy;
    const adx_bdy = adx * bdy;
    const bdx_ady = bdx * ady;
    const det = adz * (bdx_cdy - cdx_bdy) + bdz * (cdx_ady - adx_cdy) + cdz * (adx_bdy - bdx_ady);
    const permanent =
      (Math.abs(bdx_cdy) + Math.abs(cdx_bdy)) * Math.abs(adz) +
      (Math.abs(cdx_ady) + Math.abs(adx_cdy)) * Math.abs(bdz) +
      (Math.abs(adx_bdy) + Math.abs(bdx_ady)) * Math.abs(cdz);
    const tol = ERR_BOUND_4 * permanent;
    if (det > tol || -det > tol) {
      return det;
    }
    return orientation4Exact(a, b, c, d);
  },
];

function slowOrient(args: Array<PointND | PointND>): number {
  let proc = CACHED[args.length];
  if (!proc) {
    proc = CACHED[args.length] = orientation(args.length);
  }
  return proc.apply(undefined, ...args);
}

function proc(
  slow: typeof slowOrient,
  o0: Function,
  o1: Function,
  o2: Function,
  o3: Function,
  o4: Function,
  o5: Function,
): (...args: Array<PointND | PointND>) => number {
  return function getOrientation(...args: Array<PointND | PointND>) {
    switch (args.length) {
      case 0:
      case 1:
        return 0;
      case 2:
        return o2(args[0], args[1]);
      case 3:
        return o3(args[0], args[1], args[2]);
      case 4:
        return o4(args[0], args[1], args[2], args[3]);
      case 5:
        return o5(args[0], args[1], args[2], args[3], args[4]);
    }

    return slow(args);
  };
}

function generateOrientationProc(): any {
  while (CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length));
  }
  // @ts-ignore
  const orientationProc = proc(undefined, slowOrient, ...CACHED);
  for (let i = 0; i <= NUM_EXPAND; ++i) {
    // @ts-ignore
    orientationProc[i] = CACHED[i];
  }
  return orientationProc;
}

export default generateOrientationProc();
