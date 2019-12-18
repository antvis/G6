import each from '@antv/util/lib/each'
import Behavior from './behavior'
import DragCanvas from './drag-canvas'
import DragNode from './drag-node'

const behaviors = {
  'drag-canvas': DragCanvas,
  'drag-node': DragNode
}

each(behaviors, (behavior, type: string)  => {
  Behavior.registerBehavior(type, behavior)
})
