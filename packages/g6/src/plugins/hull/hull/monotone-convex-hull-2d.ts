'use strict';

import type { Point } from '../../../types';
import robustOrientation from './robust-orientation';

const orient = robustOrientation[3];

export function monotoneConvexHull2D(points: Point[]): number[] {
  const n = points.length;

  // Handle special cases when the input contains fewer than 3 points
  if (n < 3) {
    const result = new Array(n);
    for (let i = 0; i < n; ++i) {
      result[i] = i;
    }

    // Special case for exactly 2 identical points
    if (n === 2 && points[0][0] === points[1][0] && points[0][1] === points[1][1]) {
      return [0];
    }

    return result;
  }

  // Sort point indices along the x-axis (breaking ties with y-axis)
  const sorted = new Array(n);
  for (let i = 0; i < n; ++i) {
    sorted[i] = i;
  }
  sorted.sort((a, b) => {
    const d = points[a][0] - points[b][0];
    if (d) {
      return d;
    }
    return points[a][1] - points[b][1];
  });

  // Construct the upper and lower hulls
  const lower: number[] = [sorted[0], sorted[1]];
  const upper: number[] = [sorted[0], sorted[1]];

  for (let i = 2; i < n; ++i) {
    const idx = sorted[i];
    const p = points[idx];

    // Insert into the lower hull
    let m = lower.length;
    while (m > 1 && orient(points[lower[m - 2]], points[lower[m - 1]], p) <= 0) {
      m -= 1;
      lower.pop();
    }
    lower.push(idx);

    // Insert into the upper hull
    m = upper.length;
    while (m > 1 && orient(points[upper[m - 2]], points[upper[m - 1]], p) >= 0) {
      m -= 1;
      upper.pop();
    }
    upper.push(idx);
  }

  // Merge the lower and upper hulls into the final result
  const result = new Array(upper.length + lower.length - 2);
  let ptr = 0;
  for (let i = 0, nl = lower.length; i < nl; ++i) {
    result[ptr++] = lower[i];
  }
  for (let j = upper.length - 2; j > 0; --j) {
    result[ptr++] = upper[j];
  }

  // Return the final convex hull
  return result;
}
