import React, { useEffect } from 'react'
import G6 from '../../../src'
import { IGraph } from '../../../src/interface/graph'

let graph: IGraph = null

const DefaultShape = () => {
  const container = React.useRef()
  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500
      })
    }

    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100
        }
      ]
    }

    graph.data(data)
    graph.render()
  })
  return (
    <div ref={container}></div>
  )
}

export default DefaultShape