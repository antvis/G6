import LinkedList from '../linked-list'

export default class Queue {
  public linkedList: LinkedList
  constructor() {
    this.linkedList = new LinkedList()
  }

  /**
   * 队列是否为空
   */
  public isEmpty() {
    return !this.linkedList.head
  }

  /**
   * 读取队列头部的元素， 不删除队列中的元素
   */
  public peek() {
    if (!this.linkedList.head) {
      return null
    }
    return this.linkedList.head.value
  }

  /**
   * 在队列的尾部新增一个元素
   * @param value 
   */
  public enqueue(value) {
    this.linkedList.append(value)
  }

  /**
   * 删除队列中的头部元素，如果队列为空，则返回 null
   */
  public dequeue() {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  public toString(callback) {
    return this.linkedList.toString(callback)
  }
}