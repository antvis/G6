import G6 from '../../../src';
import React, { useEffect } from 'react';
import { IGraph } from '../../../src/interface/graph';


const data = {
    nodes: [{
        id: 'xx',
        type: 'task-node',
        x: 200,
        y: 200
    }]
}
G6.registerBehavior("active-node", {
    getEvents() {
        return {
            "canvas:mousedown": "clearSelectedNode",
            "node:mouseenter": "onMouseEnter",
            "node:mouseleave": "onMouseLeave",
            "node:mousedown": "onMouseDown"
        };
    },
    onMouseEnter(evt) {
        const item = evt.item;
        if (item.hasState("select")) {
            return false;
        }
        this.graph.setItemState(item, "hover", true);
    },
    onMouseLeave(evt) {
        const item = evt.item;
        if (item.hasState("select")) {
            return false;
        }
        this.graph.setItemState(item, "hover", false);
    },
    onMouseDown(evt) {
        const item = evt.item;
        if (item.hasState("select")) {
            return item.setState("select", false);
        }
        this.graph.find("node", node => {
            if (node !== item) {
                node.setState("select", false);
            } else {
                node.setState("select", true);
            }
        });
    },
    clearSelectedNode(evt) {
        this.graph.find("node", node => {
            this.graph.clearItemStates(node, ["select", "hover"]);
        });
    }
});

G6.registerNode(
    "task-node",
    {
        options: {
            style: {
                fill: "#fff",
                fillOpacity: 0,
                stroke: "#333",
                lineWidth: 2,
                radius: 5
            },
            stateStyles: {
                select: {
                    "anchor-shape": {
                        opacity: 1
                    }
                },
                hover: {
                    "anchor-shape": {
                        opacity: 1
                    }
                }
            }
        },
        getAnchorPoints() {
            return [[1, 0.5]];
        },
        draw(cfg, group) {
            console.log('drawing');
            const width = 200;
            const height = 120;
            // 外框
            const keyShape = group.addShape("rect", {
                attrs: {
                    x: 0,
                    y: 0,
                    width,
                    height,
                    ...this.options.style
                },
                name: "rect-key-shape",
                draggable: true
            });
            // 锚点
            group.addShape("circle", {
                attrs: {
                    x: width,
                    y: height / 2,
                    r: 4,
                    fill: "#fff",
                    stroke: "#333",
                    opacity: 0,
                    lineWidth: 2,
                    isPoint: true
                },
                name: "anchor-shape"
            });

            return keyShape;
        }
    },
    "single-node"
);
let graph: IGraph = null;

const RegisterNodeState = () => {
    const container = React.useRef();
    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: container.current as string | HTMLElement,
                width: 800,
                height: 800,
                fitView: false,
                defaultNode: {
                    style: {
                        fill: "green",
                        stroke: "red"
                    }
                },
                defaultEdge: {
                    style: {
                        stroke: "#b5b5b5"
                    }
                },
                modes: {
                    default: ["active-node"]
                }
            });
            graph.data(data);
            graph.render();
        }
    });
}

export default RegisterNodeState;
