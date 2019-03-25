const expect = require('chai').expect;
const G6 = require('../../src/');

const div = document.createElement('div');
div.id = 'issue-659';
document.body.appendChild(div);

const Util = G6.Util;
const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    shape: 'circle-animate',
    size: 20,
    label: '图形动画',
    labelCfg: {
      position: 'bottom'
    }
  }, {
    id: 'node2',
    x: 300,
    y: 200,
    shape: 'background-animate',
    color: '#b5b5b5',
    size: 20,
    label: '背景动画',
    labelCfg: {
      position: 'bottom'
    }
  }, {
    id: 'node3',
    x: 400,
    y: 100,
    size: [ 40, 40 ],
    shape: 'inner-animate',
    img: 'data:image/webp;base64,UklGRq4FAABXRUJQVlA4IKIFAABwHwCdASo8ADwAPiEMhEGhhv6rQAYAgS2NHsdCq/4D8AOoA64OEUAj/XPxVwyvRGvyO/gGxN/t3oK/1X6zesX3L/p/RP/2HCgKAB9AGeAbCB+AGwAbQBtA/8c/m/4PYHTonm+SzRH6B9sv2i/rOZC+G/ln9l/ML/GdoD7APcA/TD+09QDzAfrX+vHYM9AD+Uf0zrAPQA/bH0vv2t+CH9qf2R+A39e6X098/I7IAcLcs8Gjmc/9T7gPbX9H+wJ+rPVV9En9ZmBI5oUiYhkYHIVjRr9hzCTPcV5Rs/wjjIHkxPgtr/3ALZSuUm146HHwqQVA23hnnqH/4aJ/k4v4hU6RBZ0AAAD+//8ARPyL9yWIlAbWBAD0oKSqlYWreuRa3Oj02u+TvSQS8iwMYewUYTWLDNp9wOlFJaWnqE+za35UwUXuDAT6T0I4fwY+u+qrRVhl+S1ir4X7BQiNswug5AX+MjQcXEeUwfSIEUT+DFPCr+BUiwTbFxLni7fv61vRbmXoauLz4tiqOFTzEGP8tNXP5+H7mZVGfNjIxapT3FGUtqBdp/SD5cTOYOkn2fawkpqpCSqf2+CfiGWtIF673fEzlk/hIbWDhQ81C/ddxLn609d/5efckbdZ8HZbhhVmM82/Uat7CFmw1SH5xCxRxEEhjpf1EP1Xn5q9VZfm1+OFTab/MN67Xha8K//5oVBlMgZALE653X0fas/+2xMqiyCu5Wa7PHsCwbBwqROfNmzi4LPOTjkFPHVKDD1Nfj4/sul6cANdF68rf2jszlyZsUUoLTP7H3swSroc3ssNXSRVAcYd7+iBZpfoAYWvKgnr+Hv62fHZX5ZbjYbYzVjq6fsXkubto858NuUx4+ILb5y7dP6W3/IYVeUSF0yZseKIZhOMs9BBf5uB2Y3Ott//+1OG7hYINzcqigrzWAOJbSmVw3G0ULywkobx+rvfk8VmZFzQGgP/+4T74mp/vsZyM1NLguiTO2gNO05tcpXwveq5mrcweXrJ/bRZDmU2KBrnXhkXq+735c+UHTFq4h4jMOPm5shKioB6XaqhUf3DJlMg8937g/SKjrgD0H5sNm0/k4FfilBbcrsjc3dd6cwEYJo3CNhe3SpNJ2geNXyV4/hq/BZXZ1kiVknjmf5cUx7Tv/9Sb+fQ/DgAsRNSz1wiVodiLjP7aVrkxbWx5gJ8U/j0o1Ipm/nyDZRPrQXmbPAcy1eDDejxTDBKe42ElHpC2QlFdhOedsp4i9QVjt8EqWGy1YzPaGqZhCVg/LWt8/+4BmiCzNGtpR21MGJf4kI/n/1sbe36e1QBCBAx4EVfTM82ZM2lh0P189e7eY0A3NzXWVrUek8SEn+DYYCQeEaC5hDHGreFHT1baY6KyrFx3G9oMm3fLrCqmNjFRnZa3LB/5m8FgCpq9B/1OCLRE5GzVTZnVzj/4V38PgCIpX16Kznijf01+MkDeS9oCF2hEXQ9tr+mPLrjGy4Cg5fyLgyCj1fUq33nMf79Svli2h83m3gqkoxJcXvBetFQP8V/gRjBNGmFXK5TfwLhbolWEjDqUGK3n+hxzQLif9zreYO88EIRTUNbzE1/Sn7rBEtjB0uawNje5OubWsB62SOlMZoZpxrDbMb4UvQrODPhSafmhcYe9zm/dHxssMfUthhDKjyMhoRhngPjbzfGXmIV2Omgrn/zbefK/PawUGSH6x4Qk4HCN4/X8S+XCf51JJtOQeHST/yfwg69uMkE07SONnhGUrL6j5oQn6JI+zkaH/H/P/Ti/pfOTfAWxQNiMvWX08mqbuUweFSQ/G5YUP/uCvZAXutf1+Nhl2jj/n4/fPOihPjwvfFnnjOaQvs9PSpF33d+396LASZ3IID/4UP4pf9eOMXw82ccoUUUHX6MfBWyBDvARCrdPmerUwKwW+lBIAe1dsAAAA==',
    label: 'rect',
    labelCfg: {
      position: 'bottom'
    }
  }, {
    id: 'node4',
    x: 300,
    y: 400,
    shape: 'rect',
    label: 'rect',
    labelCfg: {
      position: 'bottom'
    }
  }],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    },
    {
      source: 'node3',
      target: 'node2'
    },
    {
      source: 'node2',
      target: 'node4'
    }
  ] };

// 放大、变小动画
G6.registerNode('circle-animate', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    shape.animate({
      repeat: true,
      onFrame(ratio) {
        const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
        return {
          r: cfg.size / 2 + diff
        };
      }
    }, 3000, 'easeCubic');
  }
}, 'circle');

G6.registerNode('background-animate', {
  afterDraw(cfg, group) {
    const r = cfg.size / 2;
    const back1 = group.addShape('circle', {
      zIndex: -3,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color,
        opacity: 0.6
      }
    });
    const back2 = group.addShape('circle', {
      zIndex: -2,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color, // 为了显示清晰，随意设置了颜色
        opacity: 0.6
      }
    });

    const back3 = group.addShape('circle', {
      zIndex: -1,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color,
        opacity: 0.6
      }
    });
    group.sort(); // 排序，根据zIndex 排序
    back1.animate({ // 逐渐放大，并消失
      r: r + 10,
      opacity: 0.1,
      repeat: true // 循环
    }, 3000, 'easeCubic', null, 0); // 无延迟

    back2.animate({ // 逐渐放大，并消失
      r: r + 10,
      opacity: 0.1,
      repeat: true // 循环
    }, 3000, 'easeCubic', null, 1000); // 1 秒延迟

    back3.animate({ // 逐渐放大，并消失
      r: r + 10,
      opacity: 0.1,
      repeat: true // 循环
    }, 3000, 'easeCubic', null, 2000); // 2 秒延迟
  }
}, 'circle');

G6.registerNode('inner-animate', {
  afterDraw(cfg, group) {
    const size = cfg.size;
    const width = size[0] - 12;
    const height = size[1] - 12;
    const image = group.addShape('image', {
      attrs: {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        img: cfg.img
      }
    });
    image.animate({
      onFrame(ratio) {
        const matrix = Util.mat3.create();
        const toMatrix = Util.transform(matrix, [
          [ 'r', ratio * Math.PI * 2 ]
        ]);
        return {
          matrix: toMatrix
        };
      },
      repeat: true
    }, 3000, 'easeCubic');
  }
}, 'rect');
G6.Global.nodeStateStyle.hover = {
  stroke: '#d9d9d9',
  fill: '#5394ef'
};
const graph = new G6.Graph({
  container: 'issue-659',
  width: 1000,
  height: 600,
  modes: {
    default: [ 'drag-canvas', 'drag-node', 'zoom-canvas', 'click-select' ]
  }
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', ev => {
  const { item } = ev;
  graph.setItemState(item, 'hover', true);
});
graph.on('node:mouseleave', ev => {
  const { item } = ev;
  graph.setItemState(item, 'hover', false);
});

describe('#659', () => {
  const node = graph.findById('node1');
  const keyShape = node.getKeyShape();
  graph.emit('node:mouseenter', { item: node });
  expect(keyShape.attr('fill')).to.equal('#5394ef');
  expect(keyShape.attr('stroke')).to.equal('#d9d9d9');
  graph.emit('node:dragstart', { item: node, x: 200, y: 200 });
  graph.emit('node:dragend', { item: node, x: 500, y: 500 });
  expect(node.get('model').x).to.equal(400);
  expect(node.get('model').y).to.equal(400);
  expect(keyShape.attr('fill')).to.equal('#5394ef');
  expect(keyShape.attr('stroke')).to.equal('#d9d9d9');
  graph.emit('node:mouseleave', { item: node });
  expect(keyShape.attr('fill')).to.equal('#fff');
  expect(keyShape.attr('stroke')).to.equal('#333');
});
