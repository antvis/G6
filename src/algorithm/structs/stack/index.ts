import LinkedList from '../linked-list'

export default class Stack {
  private linkedList: LinkedList;
  private maxStep: number;

  constructor(maxStep: number = 10) {
    this.linkedList = new LinkedList()
    this.maxStep = maxStep
  }

  get length() {
    return this.linkedList.toArray().length
  }

  /**
   * 判断栈是否为空，如果链表中没有头部元素，则栈为空
   */
  isEmpty() {
    return !this.linkedList.head
  }

  /**
   * 是否到定义的栈的最大长度，如果达到最大长度后，不再允许入栈
   */
  isMaxStack() {
    return this.toArray().length >= this.maxStep
  }

  /**
   * 访问顶端元素
   */
  peek() {
    if (this.isEmpty()) {
      return null
    }

    // 返回头部元素，不删除元素
    return this.linkedList.head.value
  }

  push(value) {
    this.linkedList.prepend(value)
    if (this.length > this.maxStep) {
      this.linkedList.deleteTail()
    }
  }

  pop() {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  toArray() {
    return this.linkedList.toArray().map(node => node.value)
  }

  clear() {
    while(!this.isEmpty()) {
      this.pop()
    }
  }
}