import each from '@antv/util/lib/each'
import Behavior from './behavior'
import DragCanvas from './drag-canvas'

const behaviors = {
  'drag-canvas': DragCanvas
}

each(behaviors, (behavior, type: string)  => {
  Behavior.registerBehavior(type, behavior)
})
