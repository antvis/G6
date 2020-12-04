import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'watermarker-spec';
document.body.appendChild(div);

describe('add addWatermark', () => {
  it('text watermark', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'drag-canvas']
      }
    })

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'nodeWithWatermark',
          x: 100,
          y: 100
        }
      ]
    }
    
    graph.data(data)
    graph.render()

    // 此时没有水印，也就没有水印的容器
    let waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).toBe(undefined)

    let children = document.getElementById('watermarker-spec').children
    expect(children.length).toBe(1)

    graph.setTextWaterMarker(['antv', 'G6'])
    waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).not.toBe(undefined)
    children = document.getElementById('watermarker-spec').children
    expect(children.length).toBe(3)
    expect(children[1].style.display).toEqual('none')
    expect(children[1].style.width).toEqual('150px')
    expect(children[1].style.height).toEqual('100px')
    // expect(children[2].style.backgroundImage).toEqual("url(\"data:image/png;base64,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\")")

    graph.destroy()
  })

  it('image watermark', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'drag-canvas']
      }
    })

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'nodeWithWatermark',
          x: 100,
          y: 100
        }
      ]
    }
    
    graph.data(data)
    graph.render()

    // 此时没有水印，也就没有水印的容器
    let waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).toBe(undefined)

    let children = document.getElementById('watermarker-spec').children
    expect(children.length).toBe(1)

    graph.setImageWaterMarker()
    waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).not.toBe(undefined)
    children = document.getElementById('watermarker-spec').children
    // 此时 div 元素还没有被创建
    expect(children.length).toBe(2)
    expect(children[1].style.display).toEqual('none')
    expect(children[1].style.width).toEqual('150px')
    expect(children[1].style.height).toEqual('130px')
    graph.destroy()
  })

  it('text watermark width config param', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node', 'drag-canvas']
      }
    })

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'nodeWithWatermark',
          x: 100,
          y: 100
        }
      ]
    }
    
    graph.data(data)
    graph.render()

    // 此时没有水印，也就没有水印的容器
    let waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).toBe(undefined)

    let children = document.getElementById('watermarker-spec').children
    expect(children.length).toBe(1)

    graph.setTextWaterMarker(['antv', 'G6'], {
      width: 80,
      height: 60,
      text: {
        fill: 'red',
        rotate: 45
      }
    })
    waterMarker = graph.get('graphWaterMarker')
    expect(waterMarker).not.toBe(undefined)
    children = document.getElementById('watermarker-spec').children
    expect(children.length).toBe(3)
    expect(children[1].style.display).toEqual('none')
    expect(children[1].style.width).toEqual('80px')
    expect(children[1].style.height).toEqual('60px')
    // expect(children[2].style.backgroundImage).toEqual("url(\"data:image/png;base64,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\")")

    graph.destroy()
  })
})