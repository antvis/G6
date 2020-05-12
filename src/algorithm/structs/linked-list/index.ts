import Comparator from '../../comparator'
import GraphEdge from '../graph/GraphEdge';
import GraphVertex from '../graph/GraphVertex';

/**
 * 链表中单个元素节点
 */
export class LinkedListNode {
  public value: GraphEdge | GraphVertex
  public next: LinkedListNode
  constructor(value: GraphEdge, next: LinkedListNode = null) {
    this.value = value
    this.next = next
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

export default class LinkedList {
  public head: LinkedListNode
  public tail: LinkedListNode
  public compare: Comparator

  constructor(comparatorFunction = null) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * 将指定元素添加到链表头部
   * @param value 
   */
  prepend(value: GraphEdge) {
    // 在头部添加一个节点
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  /**
   * 将指定元素添加到链表中
   * @param value 
   */
  append(value: GraphEdge) {
    const newNode = new LinkedListNode(value)

    // 如果不存在头节点，则将创建的新节点作为头节点
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      
      return this
    }

    // 将新节点附加到链表末尾
    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  /**
   * 删除指定元素
   * @param value 要删除的元素
   */
  delete(value: GraphEdge): LinkedListNode {
    if (!this.head) {
      return null
    }

    let deleteNode = null

    // 如果删除的是头部元素，则将next作为头元素
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // 如果删除了节点以后，将next节点前移
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // 检查尾部节点是否被删除
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode
    }

    return deleteNode
  }

  /**
   * 查找指定的元素
   * @param param0 
   */
  find({ value = undefined, callback = undefined }): LinkedListNode {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while(currentNode) {
      // 如果指定了 callback，则按指定的 callback 查找
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      // 如果指定了 value，则按 value 查找
      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  /**
   * 删除尾部节点
   */
  deleteTail() {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      // 链表中只有一个元素
      this.head = null
      this.tail = null
      return deletedTail
    }

    let currentNode = this.head
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deletedTail
  }

  /**
   * 删除头部节点
   */
  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * 将一组元素转成链表中的节点
   * @param values 链表中的元素
   */
  fromArray(values: GraphEdge[]) {
    values.forEach(value => this.append(value))
    return this
  }

  /**
   * 将链表中的节点转成数组元素
   */
  toArray() {
    const nodes = []

    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * 反转链表中的元素节点
   */
  reverse() {
    let currentNode = this.head
    let prevNode = null
    let nextNode = null
    while (currentNode) {
      // 存储下一个元素节点
      nextNode = currentNode.next

      // 更改当前节点的下一个节点，以便将它连接到上一个节点上
      currentNode.next = prevNode

      // 将 prevNode 和 currentNode 向前移动一步
      prevNode = currentNode
      currentNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode
  }

  toString(callback = undefined) {
    return this.toArray().map(node => node.toString(callback)).toString()
  }
}
