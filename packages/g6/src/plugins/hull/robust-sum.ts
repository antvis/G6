'use strict';

function scalarScalar(a: number, b: number): number[] {
  const x = a + b;
  const bv = x - a;
  const av = x - bv;
  const br = b - bv;
  const ar = a - av;
  const y = ar + br;

  if (y) {
    return [y, x];
  }
  return [x];
}

export function linearExpansionSum(e: number[], f: number[]): number[] {
  const ne = e.length | 0;
  const nf = f.length | 0;

  if (ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0]);
  }

  const n = ne + nf;
  const g = new Array(n);
  let count = 0;

  let ep_tr = 0;
  let fp_tr = 0;

  const abs = Math.abs;
  let ei = e[ep_tr];
  let ea = abs(ei);
  let fi = f[fp_tr];
  let fa = abs(fi);
  let a, b;

  if (ea < fa) {
    b = ei;
    ep_tr += 1;
    if (ep_tr < ne) {
      ei = e[ep_tr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fp_tr += 1;
    if (fp_tr < nf) {
      fi = f[fp_tr];
      fa = abs(fi);
    }
  }

  if ((ep_tr < ne && ea < fa) || fp_tr >= nf) {
    a = ei;
    ep_tr += 1;
    if (ep_tr < ne) {
      ei = e[ep_tr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fp_tr += 1;
    if (fp_tr < nf) {
      fi = f[fp_tr];
      fa = abs(fi);
    }
  }

  let x = a + b;
  let bv = x - a;
  let y = b - bv;
  let q0 = y;
  let q1 = x;

  let _x, _bv, _av, _br, _ar;

  while (ep_tr < ne && fp_tr < nf) {
    if (ea < fa) {
      a = ei;
      ep_tr += 1;
      if (ep_tr < ne) {
        ei = e[ep_tr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fp_tr += 1;
      if (fp_tr < nf) {
        fi = f[fp_tr];
        fa = abs(fi);
      }
    }

    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;

    if (y) {
      g[count++] = y;
    }

    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }

  while (ep_tr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;

    if (y) {
      g[count++] = y;
    }

    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;

    ep_tr += 1;
    if (ep_tr < ne) {
      ei = e[ep_tr];
    }
  }

  while (fp_tr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;

    if (y) {
      g[count++] = y;
    }

    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;

    fp_tr += 1;
    if (fp_tr < nf) {
      fi = f[fp_tr];
    }
  }

  if (q0) {
    g[count++] = q0;
  }
  if (q1) {
    g[count++] = q1;
  }
  if (!count) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g;
}
