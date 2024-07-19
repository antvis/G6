export class TupleMap<K1, K2, V> {
  private map = new Map<K1, Map<K2, V>>();

  has(key1: K1, key2: K2) {
    return this.map.has(key1) && this.map.get(key1)!.has(key2);
  }

  get(key1: K1, key2: K2) {
    return this.map.get(key1)?.get(key2);
  }

  set(key1: K1, key2: K2, value: V) {
    if (!this.map.has(key1)) {
      this.map.set(key1, new Map());
    }
    this.map.get(key1)!.set(key2, value);
  }

  clear() {
    this.map.clear();
  }
}
