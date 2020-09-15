const defaultCompare = (a, b) => {
  return a - b;
};

export default class MinBinaryHeap {
  list: any[];

  compareFn: (a: any, b: any) => number;

  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.list = [];
  }

  getLeft(index) {
    return 2 * index + 1;
  }

  getRight(index) {
    return 2 * index + 2;
  }

  getParent(index) {
    if (index === 0) {
      return null;
    }
    return Math.floor((index - 1) / 2);
  }

  isEmpty() {
    return this.list.length <= 0;
  }

  top() {
    return this.isEmpty() ? undefined : this.list[0];
  }

  delMin() {
    const top = this.top();
    const bottom = this.list.pop();
    if (this.list.length > 0) {
      this.list[0] = bottom;
      this.moveDown(0);
    }
    return top;
  }

  insert(value) {
    if (value !== null) {
      this.list.push(value);
      const index = this.list.length - 1;
      this.moveUp(index);
      return true;
    }
    return false;
  }

  moveUp(index) {
    let parent = this.getParent(index);
    while (index && index > 0 && this.compareFn(this.list[parent], this.list[index]) > 0) {
      // swap
      const tmp = this.list[parent];
      this.list[parent] = this.list[index];
      this.list[index] = tmp;
      // [this.list[index], this.list[parent]] = [this.list[parent], this.list[index]]
      index = parent;
      parent = this.getParent(index);
    }
  }

  moveDown(index) {
    let element = index;
    const left = this.getLeft(index);
    const right = this.getRight(index);
    const size = this.list.length;
    if (left !== null && left < size && this.compareFn(this.list[element], this.list[left]) > 0) {
      element = left;
    } else if (
      right !== null &&
      right < size &&
      this.compareFn(this.list[element], this.list[right]) > 0
    ) {
      element = right;
    }
    if (index !== element) {
      [this.list[index], this.list[element]] = [this.list[element], this.list[index]];
      this.moveDown(element);
    }
  }
}
