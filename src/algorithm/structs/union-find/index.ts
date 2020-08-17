/**
 * 并查集 Disjoint set to support quick union
 */
export default class UnionFind {
  count: number;

  parent: {};

  constructor(items: (number | string)[]) {
    this.count = items.length;
    this.parent = {};
    for (const i of items) {
      this.parent[i] = i;
    }
  }

  // find the root of the item
  find(item) {
    while (this.parent[item] !== item) {
      item = this.parent[item];
    }
    return item;
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);

    if (rootA === rootB) return;

    // make the element with smaller root the parent
    if (rootA < rootB) {
      if (this.parent[b] !== b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] !== a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  // whether a and b are connected, i.e. a and b have the same root
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}
