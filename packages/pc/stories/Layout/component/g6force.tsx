import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const G6Force = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'g6force',
          linkDistance: 50,
          // preventOverlap: true
          maxIteration: 10
        },
        defaultNode: {
          size: 15,
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas']
        }
      });

      const data = {
        nodes: [{ "id": "0", "x": 420.0, "y": 231.0 }, { "id": "1", "x": 398.0, "y": 431.0 }, { "id": "2", "x": 86.0, "y": 480.0 }, { "id": "3", "x": 33.0, "y": 189.0 }, { "id": "4", "x": 207.0, "y": 38.0 }, { "id": "5", "x": 148.0, "y": 436.0 }, { "id": "6", "x": 375.0, "y": 424.0 }, { "id": "7", "x": 90.0, "y": 354.0 }, { "id": "8", "x": 441.0, "y": 93.0 }, { "id": "9", "x": 418.0, "y": 313.0 }, { "id": "10", "x": 499.0, "y": 95.0 }, { "id": "11", "x": 208.0, "y": 326.0 }, { "id": "12", "x": 27.0, "y": 77.0 }, { "id": "13", "x": 498.0, "y": 478.0 }, { "id": "14", "x": 413.0, "y": 372.0 }, { "id": "15", "x": 194.0, "y": 129.0 }, { "id": "16", "x": 431.0, "y": 141.0 }, { "id": "17", "x": 339.0, "y": 94.0 }, { "id": "18", "x": 439.0, "y": 94.0 }, { "id": "19", "x": 492.0, "y": 393.0 }, { "id": "20", "x": 452.0, "y": 377.0 }, { "id": "21", "x": 456.0, "y": 293.0 }, { "id": "22", "x": 424.0, "y": 286.0 }, { "id": "23", "x": 472.0, "y": 494.0 }, { "id": "24", "x": 290.0, "y": 303.0 }, { "id": "25", "x": 68.0, "y": 405.0 }, { "id": "26", "x": 483.0, "y": 455.0 }, { "id": "27", "x": 466.0, "y": 218.0 }, { "id": "28", "x": 188.0, "y": 307.0 }, { "id": "29", "x": 341.0, "y": 117.0 }, { "id": "30", "x": 135.0, "y": 414.0 }, { "id": "31", "x": 339.0, "y": 72.0 }, { "id": "32", "x": 204.0, "y": 319.0 }, { "id": "33", "x": 234.0, "y": 385.0 }, { "id": "34", "x": 404.0, "y": 311.0 }, { "id": "35", "x": 411.0, "y": 221.0 }, { "id": "36", "x": 326.0, "y": 18.0 }, { "id": "37", "x": 478.0, "y": 86.0 }, { "id": "38", "x": 9.0, "y": 492.0 }, { "id": "39", "x": 318.0, "y": 100.0 }, { "id": "40", "x": 114.0, "y": 274.0 }, { "id": "41", "x": 40.0, "y": 71.0 }, { "id": "42", "x": 342.0, "y": 367.0 }, { "id": "43", "x": 11.0, "y": 444.0 }, { "id": "44", "x": 345.0, "y": 251.0 }, { "id": "45", "x": 270.0, "y": 67.0 }, { "id": "46", "x": 179.0, "y": 402.0 }, { "id": "47", "x": 321.0, "y": 123.0 }, { "id": "48", "x": 382.0, "y": 26.0 }, { "id": "49", "x": 482.0, "y": 373.0 }, { "id": "50", "x": 445.0, "y": 48.0 }, { "id": "51", "x": 286.0, "y": 193.0 }, { "id": "52", "x": 65.0, "y": 494.0 }, { "id": "53", "x": 413.0, "y": 17.0 }, { "id": "54", "x": 45.0, "y": 417.0 }, { "id": "55", "x": 190.0, "y": 216.0 }, { "id": "56", "x": 111.0, "y": 227.0 }, { "id": "57", "x": 66.0, "y": 365.0 }, { "id": "58", "x": 357.0, "y": 414.0 }, { "id": "59", "x": 25.0, "y": 65.0 }, { "id": "60", "x": 89.0, "y": 453.0 }, { "id": "61", "x": 314.0, "y": 346.0 }, { "id": "62", "x": 171.0, "y": 303.0 }, { "id": "63", "x": 258.0, "y": 198.0 }, { "id": "64", "x": 472.0, "y": 243.0 }, { "id": "65", "x": 244.0, "y": 297.0 }, { "id": "66", "x": 4.0, "y": 3.0 }, { "id": "67", "x": 496.0, "y": 440.0 }, { "id": "68", "x": 458.0, "y": 366.0 }, { "id": "69", "x": 225.0, "y": 362.0 }],
        edges: [{ "source": "0", "target": "69", "value": 1 }, { "source": "1", "target": "67", "value": 1 }, { "source": "2", "target": "54", "value": 1 }, { "source": "3", "target": "12", "value": 1 }, { "source": "4", "target": "26", "value": 1 }, { "source": "5", "target": "57", "value": 1 }, { "source": "6", "target": "37", "value": 1 }, { "source": "7", "target": "60", "value": 1 }, { "source": "8", "target": "35", "value": 1 }, { "source": "9", "target": "21", "value": 1 }, { "source": "0", "target": "25", "value": 1 }, { "source": "1", "target": "58", "value": 1 }, { "source": "2", "target": "69", "value": 1 }, { "source": "3", "target": "12", "value": 1 }, { "source": "4", "target": "25", "value": 1 }, { "source": "5", "target": "7", "value": 1 }, { "source": "6", "target": "45", "value": 1 }, { "source": "7", "target": "12", "value": 1 }, { "source": "8", "target": "48", "value": 1 }, { "source": "9", "target": "8", "value": 1 }, { "source": "0", "target": "56", "value": 1 }, { "source": "1", "target": "57", "value": 1 }, { "source": "2", "target": "48", "value": 1 }, { "source": "3", "target": "62", "value": 1 }, { "source": "4", "target": "12", "value": 1 }, { "source": "5", "target": "29", "value": 1 }, { "source": "6", "target": "30", "value": 1 }, { "source": "7", "target": "55", "value": 1 }, { "source": "8", "target": "39", "value": 1 }, { "source": "9", "target": "20", "value": 1 }, { "source": "0", "target": "4", "value": 1 }, { "source": "1", "target": "19", "value": 1 }, { "source": "2", "target": "26", "value": 1 }, { "source": "3", "target": "41", "value": 1 }, { "source": "4", "target": "33", "value": 1 }, { "source": "5", "target": "58", "value": 1 }, { "source": "6", "target": "67", "value": 1 }, { "source": "7", "target": "64", "value": 1 }, { "source": "8", "target": "21", "value": 1 }, { "source": "9", "target": "65", "value": 1 }, { "source": "0", "target": "9", "value": 1 }, { "source": "1", "target": "26", "value": 1 }, { "source": "2", "target": "48", "value": 1 }, { "source": "3", "target": "41", "value": 1 }, { "source": "4", "target": "43", "value": 1 }, { "source": "5", "target": "24", "value": 1 }, { "source": "6", "target": "36", "value": 1 }, { "source": "7", "target": "28", "value": 1 }, { "source": "8", "target": "22", "value": 1 }, { "source": "9", "target": "28", "value": 1 }, { "source": "0", "target": "56", "value": 1 }, { "source": "1", "target": "52", "value": 1 }, { "source": "2", "target": "38", "value": 1 }, { "source": "3", "target": "49", "value": 1 }, { "source": "4", "target": "25", "value": 1 }, { "source": "5", "target": "52", "value": 1 }, { "source": "6", "target": "59", "value": 1 }, { "source": "7", "target": "61", "value": 1 }, { "source": "8", "target": "65", "value": 1 }, { "source": "9", "target": "66", "value": 1 }, { "source": "0", "target": "31", "value": 1 }, { "source": "1", "target": "49", "value": 1 }, { "source": "2", "target": "57", "value": 1 }, { "source": "3", "target": "66", "value": 1 }, { "source": "4", "target": "12", "value": 1 }, { "source": "5", "target": "17", "value": 1 }, { "source": "6", "target": "23", "value": 1 }, { "source": "7", "target": "14", "value": 1 }, { "source": "8", "target": "47", "value": 1 }, { "source": "9", "target": "47", "value": 1 }]
      };
      graph.data(data);

      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default G6Force;
