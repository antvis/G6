import React, { useState, useEffect } from 'react';
import G6 from '../../../src';
import { clone } from '@antv/util/lib';
import { IGraph } from '../../../src/interface/graph';

function generateData() {
    let nodeNum = Math.floor(20 + Math.random() * 30);
    let edgeNum = Math.floor(nodeNum + Math.floor(nodeNum + nodeNum * (nodeNum - 3) * Math.random() / 4));

    let nodes = [];
    for (let i = 0; i < nodeNum; i++) {
        nodes.push({
            id: 'node' + i.toString(),
            label: i.toString(),
        })
    }

    let edges = [];
    let edgeIdx = 0;
    while (edgeIdx < nodeNum) {
        edges.push({
            id: 'edge' + edgeIdx.toString(),
            source: 'node' + edgeIdx.toString(),
            target: 'node' + ((edgeIdx + 1) % nodeNum).toString(),
        });
        edgeIdx += 1;
    }

    while (edgeIdx < edgeNum) {
        let s = Math.floor(Math.random() * nodeNum);
        let t = Math.floor(Math.random() * nodeNum);
        edges.push({
            id: 'edge' + edgeIdx.toString(),
            source: 'node' + s.toString(),
            target: 'node' + t.toString(),
        });
        edgeIdx++;
    }

    return {
        nodes: nodes,
        edges: edges,
    };
}

const AutoLayout = () => {
    const container = React.useRef();
    const [recommendedLayout, setRecommendedLayout] = useState("");

    let CANVAS_WIDTH = 1320;
    let CANVAS_HEIGHT = 696;

    const layoutConfigs = [{
        type: 'force',
    }, {
        type: 'grid'
    }, {
        type: 'circular'
    }, {
        type: 'dagre',
        ranksep: 1,
        nodesepFunc: d => 1
    }];
    const containers = [];
    const containerDivs = []
    layoutConfigs.forEach(config => {
        const layoutContainer = React.useRef();
        containers.push(layoutContainer);
        containerDivs.push(
            <>
                <div className={config.type} ref={layoutContainer}></div>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>{config.type}</div>
            </>);
    });

    useEffect(() => {
        if (container && container.current) {
            CANVAS_WIDTH = (container.current as HTMLElement).offsetWidth; // 1320;
            CANVAS_HEIGHT = (container.current as HTMLElement).offsetHeight; // 696;
        }
        const graph = new G6.Graph({
            container: container.current as string | HTMLElement,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT - 20,
            fitView: true,
            modes: {
                default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
            },
        });

        const data = generateData();
        graph.data(data);
        graph.render();
        const aspectRatio = CANVAS_HEIGHT / CANVAS_WIDTH;


        layoutConfigs.map((config, i) => {
            const layoutContainer = containers[i];
            const layoutGraph = new G6.Graph({
                container: layoutContainer.current as string | HTMLElement,
                width: 280,
                height: aspectRatio * 280,
                minZoom: 0.0001,
                fitView: config.type !== 'force',
                layout: config,
            });
            config.type === 'force' && layoutGraph.on('afterlayout', e => {
                graph.fitView();
            });
            const cData = Object.assign({}, data);
            layoutGraph.data(cData)
            layoutGraph.render();
        })
    });



    let describe = `Recommended Layout: ${recommendedLayout}.`;
    return (
        <div style={{ display: 'inline-flex', width: '100%', height: '100vh' }}>
            <div className='left-container' style={{ width: '75%', padding: '8px', border: 'solid 1px #000' }}>
                <div ref={container} style={{ height: '90%', border: 'solid 1px #000' }}></div>
                <div className='description' style={{ textAlign: 'center', marginTop: '8px', lineHeight: '50px', height: '50px', border: 'solid 1px #000' }}>{describe}</div>
            </div>
            <div className='right-container' style={{ width: '25%', border: 'solid 1px #000', overflow: 'scroll' }}>
                {containerDivs}
            </div>
        </div>);
};

export default AutoLayout;