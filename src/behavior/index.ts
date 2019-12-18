import each from '@antv/util/lib/each'
import Behavior from './behavior'
import DragCanvas from './drag-canvas'
import DragNode from './drag-node'
import activateRelations from './activate-relations'

const behaviors = {
  'drag-canvas': DragCanvas,
  'drag-node': DragNode,
  'activate-relations': activateRelations
}

each(behaviors, (behavior, type: string)  => {
  Behavior.registerBehavior(type, behavior)
})
