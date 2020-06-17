import G6 from '@antv/g6';

const data = { "nodes": [{ id: 'd1' }, { id: 'd2' }, { id: 'd3' }, { id: 'd4' }, { "x": 72.4593956315343, "y": 62.500580986434755, "id": "0", "label": "0", "cluster": "a" }, { "x": 175.1600873958553, "y": 86.05370537028077, "id": "1", "label": "1", "cluster": "a" }, { "x": 344.9769062055303, "y": 346.0034481446168, "id": "2", "label": "2", "cluster": "a" }, { "x": 81.6566555038367, "y": 449.54521190792946, "id": "3", "label": "3", "cluster": "a" }, { "x": 216.88282150662286, "y": 154.6366915677718, "id": "4", "label": "4", "cluster": "a" }, { "x": 607.4192016090308, "y": 29.68981871724924, "id": "5", "label": "5", "cluster": "a" }, { "x": 608.1952294163268, "y": 346.0504788285849, "id": "6", "label": "6", "cluster": "a" }, { "x": 452.20735149164864, "y": 44.41509530420839, "id": "7", "label": "7", "cluster": "a" }, { "x": 385.8029314535722, "y": 345.77605366469146, "id": "8", "label": "8", "cluster": "a" }, { "x": 221.9577525643851, "y": 314.49923076828685, "id": "9", "label": "9", "cluster": "a" }, { "x": 476.3993667720199, "y": 324.90015915221954, "id": "10", "label": "10", "cluster": "a" }, { "x": 285.856260625802, "y": 478.7175936401358, "id": "11", "label": "11", "cluster": "a" }, { "x": 454.0091937006662, "y": 244.40185112543793, "id": "12", "label": "12", "cluster": "a" }, { "x": 85.85356888467777, "y": 202.4891680926948, "id": "13", "label": "13", "cluster": "b" }, { "x": 178.43553862412497, "y": 248.0194739727555, "id": "14", "label": "14", "cluster": "b" }, { "x": 83.56438018013918, "y": 354.8762429461217, "id": "15", "label": "15", "cluster": "b" }, { "x": 282.627196085794, "y": 455.5720951259284, "id": "16", "label": "16", "cluster": "b" }, { "x": 242.3547537166361, "y": 98.66129908712844, "id": "17", "label": "17", "cluster": "b" }, { "x": 602.1167288184395, "y": 269.168861245467, "id": "18", "label": "18", "cluster": "c" }, { "x": 483.79272921167114, "y": 450.6376205219211, "id": "19", "label": "19", "cluster": "c" }, { "x": 297.187609794337, "y": 457.588179255913, "id": "20", "label": "20", "cluster": "c" }, { "x": 460.9705509891003, "y": 40.428685184792954, "id": "21", "label": "21", "cluster": "c" }, { "x": 160.6332922414413, "y": 120.21023271187795, "id": "22", "label": "22", "cluster": "c" }, { "x": 512.008587934917, "y": 418.6500912111135, "id": "23", "label": "23", "cluster": "c" }, { "x": 520.0165179629071, "y": 27.93522012918939, "id": "24", "label": "24", "cluster": "c" }, { "x": 86.3930775510143, "y": 151.71498826445242, "id": "25", "label": "25", "cluster": "c" }, { "x": 69.5835581684608, "y": 51.79679194816802, "id": "26", "label": "26", "cluster": "c" }, { "x": 290.3934620883672, "y": 33.385661601435174, "id": "27", "label": "27", "cluster": "c" }, { "x": 162.64554141115855, "y": 210.26903302812224, "id": "28", "label": "28", "cluster": "c" }, { "x": 360.8317809241701, "y": 91.48175269950366, "id": "29", "label": "29", "cluster": "c" }, { "x": 47.240097508368194, "y": 145.50344892493422, "id": "30", "label": "30", "cluster": "c" }, { "x": 327.2099811985623, "y": 92.12781674932864, "id": "31", "label": "31", "cluster": "d" }, { "x": 241.12704982623336, "y": 337.86999370236475, "id": "32", "label": "32", "cluster": "d" }, { "x": 205.79508596449074, "y": 102.31474420745676, "id": "33", "label": "33", "cluster": "d" }], "edges": [{ "source": "0", "target": "1" }, { "source": "0", "target": "2" }, { "source": "0", "target": "3" }, { "source": "0", "target": "4" }, { "source": "0", "target": "5" }, { "source": "0", "target": "7" }, { "source": "0", "target": "8" }, { "source": "0", "target": "9" }, { "source": "0", "target": "10" }, { "source": "0", "target": "11" }, { "source": "0", "target": "13" }, { "source": "0", "target": "14" }, { "source": "0", "target": "15" }, { "source": "0", "target": "16" }, { "source": "2", "target": "3" }, { "source": "4", "target": "5" }, { "source": "4", "target": "6" }, { "source": "5", "target": "6" }, { "source": "7", "target": "13" }, { "source": "8", "target": "14" }, { "source": "9", "target": "10" }, { "source": "10", "target": "22" }, { "source": "10", "target": "14" }, { "source": "10", "target": "12" }, { "source": "10", "target": "24" }, { "source": "10", "target": "21" }, { "source": "10", "target": "20" }, { "source": "11", "target": "24" }, { "source": "11", "target": "22" }, { "source": "11", "target": "14" }, { "source": "12", "target": "13" }, { "source": "16", "target": "17" }, { "source": "16", "target": "18" }, { "source": "16", "target": "21" }, { "source": "16", "target": "22" }, { "source": "17", "target": "18" }, { "source": "17", "target": "20" }, { "source": "18", "target": "19" }, { "source": "19", "target": "20" }, { "source": "19", "target": "33" }, { "source": "19", "target": "22" }, { "source": "19", "target": "23" }, { "source": "20", "target": "21" }, { "source": "21", "target": "22" }, { "source": "22", "target": "24" }, { "source": "22", "target": "25" }, { "source": "22", "target": "26" }, { "source": "22", "target": "23" }, { "source": "22", "target": "28" }, { "source": "22", "target": "30" }, { "source": "22", "target": "31" }, { "source": "22", "target": "32" }, { "source": "22", "target": "33" }, { "source": "23", "target": "28" }, { "source": "23", "target": "27" }, { "source": "23", "target": "29" }, { "source": "23", "target": "30" }, { "source": "23", "target": "31" }, { "source": "23", "target": "33" }, { "source": "32", "target": "33" }] };

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  animate: true,
  defaultNode: {
    size: 30,
    style: {
      lineWidth: 2,
      stroke: '#5B8FF9',
      fill: '#C6E5FF',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2'
      },
    },
  },
});

graph.data(data);
graph.render();

const gpuLayout = new G6.Layout['graphinForceGPU']({
  canvasEl: graph.get('canvas').get('el'),
  width,
  height,
  maxIteration: 2,
  linkDistance: e => {
    if (e.source === '0') return 100;
    return 1;
  },
  onLayoutEnd: () => {
    graph.refreshPositions();
  }
})
gpuLayout.init(data);
gpuLayout.execute();
