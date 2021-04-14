
import G6 from '../../src';
import Algorithm from '@antv/algorithm'
import { isNumber } from '@antv/util';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

G6.registerNode('tree-node', {
  draw(cfg, group) {
    const { style = { fill: '#fff', stroke: '#ccc' } } = cfg;
    const r = isNumber(cfg.size) ? cfg.size / 2 : 5;
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r,
        ...style
      },
      name: 'circle-shape',
      draggable: true
    });
    if (cfg.label) {
      this.drawLabel(cfg, group);
    }

    const bbox = group.getBBox();

    const keyShape = group.addShape('rect', {
      attrs: {
        x: bbox.minX - 4,
        y: bbox.minY - 2,
        width: bbox.width + 8,
        height: bbox.height + 2,
        fill: '#fff',
        lineWidth: 0
      },
      draggable: true,
      name: 'tree-node-keyShape'
    })
    keyShape.toBack();
    return keyShape;
  },
  getAnchorPoints(cfg) {
    return cfg.anchorPoints || [[0, 0.5], [1, 0.5], [0.25, 0], [0.75, 0], [0.2, 1], [0.8, 1]];
  },
  update: undefined
}, 'circle');

describe('org', () => {
  it('org', () => {

    const tips = document.createElement('div');
    tips.innerHTML = `Tips:
    <br/>&nbsp; - 'control'+'f'：图内容适应画布大小。
    <br/> &nbsp; - '+'：放大。
    <br/>&nbsp; - '-'：缩小。
    <br/>&nbsp; - 若您正在使用鼠标，
    <br/>&nbsp;&nbsp;&nbsp; - 滚轮：上下滚动画布；
    <br/>&nbsp;&nbsp;&nbsp; - 按住 'shift' 使用滚轮：左右滚动画布。
    <br/>&nbsp;&nbsp;&nbsp; - 按住 'control' 使用滚轮：缩放画布。
    <br/><br/>`;
    div.appendChild(tips);

    const broCheckBox = document.createElement('input');
    broCheckBox.type = 'checkbox';
    broCheckBox.checked = true;
    broCheckBox.name = 'broCheckBox';
    div.appendChild(broCheckBox);
    const broCheckLabel = document.createElement('label');
    broCheckLabel.for = 'brocCheckLabel';
    broCheckLabel.innerHTML = '显示兄弟关系';
    div.appendChild(broCheckLabel);

    const orgCheckBox = document.createElement('input');
    orgCheckBox.type = 'checkbox';
    orgCheckBox.checked = true;
    orgCheckBox.style.marginLeft = '8px';
    div.appendChild(orgCheckBox);
    const orgCheckLabel = document.createElement('label');
    orgCheckLabel.for = 'brocCheckLabel';
    orgCheckLabel.innerHTML = '显示团队关系';
    div.appendChild(orgCheckLabel);

    const wenyaGroupNode = [
      // ---- 问崖 group -----
      {
        id: 'wenya',
        label: '问崖',
        isTL: true,
        index: 1,
        comboId: 'wenya-group',
      },
      {
        id: 'boyu',
        label: '柏愚',
        index: 2,
        comboId: 'wenya-group',
      },
      {
        id: 'wuchen',
        label: '伍沉',
        index: 8,
        comboId: 'wenya-group',
      },
      {
        id: 'yeting',
        label: '烨亭',
        index: 7,
        comboId: 'wenya-group',
      },
      {
        id: 'beidao',
        label: '北岛',
        index: 9,
        comboId: 'wenya-group',
      },
      {
        id: 'wenyu',
        label: '文瑀',
        index: 3,
        comboId: 'wenya-group',
      },
      {
        id: 'canglang',
        label: '沧浪',
        index: 1,
        comboId: 'wenya-group',
      },
      {
        id: 'cangdong',
        label: '沧东',
        index: 6,
        comboId: 'wenya-group',
      },
      {
        id: 'juze',
        label: '聚则',
        index: 11,
        comboId: 'wenya-group',
      },
      {
        id: 'shiwu',
        label: '十吾',
        index: 10,
        comboId: 'wenya-group',
      },
      {
        id: 'shanguo',
        label: '山果',
        index: 5,
        comboId: 'wenya-group',
      },
      {
        id: 'duomu',
        label: '多牧',
        index: 4,
        comboId: 'wenya-group',
      },
    ]

    const guangzhiGroupNode = [
      // ---- 广知 group -----
      {
        id: 'guangzhi',
        label: '广知',
        isTL: true,
        index: 5,
        comboId: 'guangzhi-group',
      },
      {
        id: 'kahun',
        label: '卡魂',
        index: 1,
        comboId: 'guangzhi-group',
      },
      {
        id: 'linyu',
        label: '麟于',
        index: 3,
        comboId: 'guangzhi-group',
      },
      {
        id: 'yanlin',
        label: '言凌',
        index: 5,
        comboId: 'guangzhi-group',
      },
      {
        id: 'jianming',
        label: '涧鸣',
        index: 2,
        comboId: 'guangzhi-group',
      },
      {
        id: 'zimeng',
        label: '子蒙',
        index: 4,
        comboId: 'guangzhi-group',
      }
    ]

    const xuanyuGroupNode = [
      // ---- 轩与 group -----
      {
        id: 'xuanyu',
        label: '轩与',
        isTL: true,
        index: 0,
        comboId: 'xuanyu-group',
      },
      {
        id: 'qingbi',
        label: '青壁',
        index: 1,
        comboId: 'xuanyu-group',
      },
      {
        id: 'jinxin',
        label: '谨欣',
        index: 2,
        comboId: 'xuanyu-group',
      },
      {
        id: 'sishu',
        label: '思澍',
        index: 5,
        comboId: 'xuanyu-group',
      },
      {
        id: 'jiuyao',
        label: '九瑶',
        index: 3,
        comboId: 'xuanyu-group',
      },
      {
        id: 'yifeng',
        label: '依枫',
        index: 2,
        comboId: 'xuanyu-group',
      },
    ]

    const yungangGroupNode = [
      // ---- 云冈 group -----
      {
        id: 'yungang',
        label: '云冈',
        isTL: true,
        index: 7,
        comboId: 'yungang-group',
      },
      {
        id: 'aiyin',
        label: '艾因',
        index: 5,
        comboId: 'yungang-group',
      },
      {
        id: 'feimao',
        label: '飝猫',
        index: 2,
        comboId: 'yungang-group',
      },
      {
        id: 'maosong',
        label: '茂松',
        index: 6,
        comboId: 'yungang-group',
      },
      {
        id: 'yian',
        label: '意安',
        index: 1,
        comboId: 'yungang-group',
      },
      {
        id: 'jili',
        label: '蒺藜',
        index: 3,
        comboId: 'yungang-group',
      },
      {
        id: 'gengsheng',
        label: '更笙',
        index: 7,
        comboId: 'yungang-group',
      },
      {
        id: 'chenyuan',
        label: '宸缘',
        index: 4,
        comboId: 'yungang-group',
      }
    ]

    const qingshengGroupNode = [
      // ---- 轻声 group -----
      {
        id: 'qingsheng',
        label: '轻声',
        isTL: true,
        index: 2,
        comboId: 'qingsheng-group',
      },
      {
        id: 'baihui',
        label: '白绘',
        index: 5,
        comboId: 'qingsheng-group',
      },
      {
        id: 'wanmu',
        label: '万木',
        index: 13,
        comboId: 'qingsheng-group',
      },
      {
        id: 'yingying',
        label: '缨缨',
        index: 7,
        comboId: 'qingsheng-group',
      },
      {
        id: 'yuxi',
        label: '羽熙',
        index: 3,
        comboId: 'qingsheng-group',
      },
      {
        id: 'xiangrong',
        label: '向戎',
        index: 6,
        comboId: 'qingsheng-group',
      },
      {
        id: 'kefu',
        label: '珂甫',
        index: 9,
        comboId: 'qingsheng-group',
      },
      {
        id: 'guji',
        label: '顾己',
        index: 4,
        comboId: 'qingsheng-group',
      },
      {
        id: 'fujin',
        label: '福晋',
        index: 13,
        comboId: 'qingsheng-group',
      },
      {
        id: 'chaokai',
        label: '朝凯',
        index: 12,
        comboId: 'qingsheng-group',
      },
      {
        id: 'buming',
        label: '步茗',
        index: 2,
        comboId: 'qingsheng-group',
      },
      {
        id: 'yuyi',
        label: '羽依',
        index: 8,
        comboId: 'qingsheng-group',
      },
      {
        id: 'yisi',
        label: '一四',
        index: 11,
        comboId: 'qingsheng-group',
      },
      {
        id: 'xinming',
        label: '新茗',
        index: 12,
        comboId: 'qingsheng-group',
      },
      {
        id: 'xiaowei',
        label: '逍为',
        index: 15,
        comboId: 'qingsheng-group',
      },
      {
        id: 'mingshi',
        label: '明是',
        index: 1,
        comboId: 'qingsheng-group',
      },
    ]

    const suboGroupNode = [
      // ---- 苏泊 group -----
      {
        id: 'subo',
        label: '苏泊',
        isTL: true,
        index: 8,
        comboId: 'subo-group',
      },
      {
        id: 'junwen',
        label: '峻文',
        index: 5,
        comboId: 'subo-group',
      },
      {
        id: 'nantao',
        label: '南桃',
        index: 2,
        comboId: 'subo-group',
      },
      {
        id: 'zishang',
        label: '子裳',
        index: 3,
        comboId: 'subo-group',
      },
      {
        id: 'mutu',
        label: '木兔',
        index: 4,
        comboId: 'subo-group',
      },
      {
        id: 'xiandu',
        label: '贤渡',
        index: 6,
        comboId: 'subo-group',
      },
      {
        id: 'jiandong',
        label: '建东',
        index: 7,
        comboId: 'subo-group',
      },
      {
        id: 'qinke',
        label: '卿珂',
        index: 1,
        comboId: 'subo-group',
      }
    ]

    const bojunGroupNode = [
      // ---- 伯骏 group -----
      {
        id: 'bojun',
        label: '伯骏',
        isTL: true,
        index: 6,
        comboId: 'bojun-group',
      },
      {
        id: 'changzhe',
        label: '长哲',
        index: 4,
        comboId: 'bojun-group',
      },
      {
        id: 'xiaojie',
        label: '逍杰',
        index: 7,
        comboId: 'bojun-group',
      },
      {
        id: 'xiaoyao',
        label: '小耀',
        index: 1,
        comboId: 'bojun-group',
      },
      {
        id: 'taotang',
        label: '陶唐',
        index: 5,
        comboId: 'bojun-group',
      },
      {
        id: 'xingyi',
        label: '星翊',
        index: 6,
        comboId: 'bojun-group',
      },
      {
        id: 'guangsheng',
        label: '光生',
        index: 3,
        comboId: 'bojun-group',
      },
      {
        id: 'miaozi',
        label: '妙子',
        index: 2,
        comboId: 'bojun-group',
      }
    ]

    const data = {
      nodes: [
        ...wenyaGroupNode,
        ...qingshengGroupNode,
        ...xuanyuGroupNode,
        ...guangzhiGroupNode,
        ...yungangGroupNode,
        ...suboGroupNode,
        ...bojunGroupNode,
        {
          id: 'yushu',
          label: '御术',
        },
      ],
      edges: [],
      combos: [
        {
          id: 'wenya-group',
          label: 'TL 问崖',
          style: {
            fill: '#C4E3B2',
            stroke: '#C4E3B2',
            opacity: 0.3
          },
        },
        {
          id: 'guangzhi-group',
          label: 'TL 广知',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },
        {
          id: 'xuanyu-group',
          label: 'TL 轩与',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },
        {
          id: 'yungang-group',
          label: 'TL 云冈',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },
        {
          id: 'qingsheng-group',
          label: 'TL 轻声',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },
        {
          id: 'subo-group',
          label: 'TL 苏泊',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },
        {
          id: 'bojun-group',
          label: 'TL 伯骏',
          style: {
            stroke: '#99C0ED',
            fill: '#99C0ED',
            opacity: 0.3
          },
        },

          // {
          //   id: 'other-group',
          //   label: '其他组',
          //   style: {
          //     stroke: '#aaa',
          //     fill: '#aaa',
          //     opacity: 0.3
          //   },
          // },
      ]
    };

    const otherGroupNodes = [
      // ---- 其他 group -----
      {
        id: 'shitiao',
        label: '十条',
        // comboId: 'other-group',
      },
      {
        id: 'bianliu',
        label: '边柳',
        // comboId: 'other-group',
      },
      {
        id: 'shanye',
        label: '善叶',
        // comboId: 'other-group',
      },
      {
        id: 'dongke',
        label: '东科',
        // comboId: 'other-group',
      },
      {
        id: 'jueyun',
        label: '绝云',
        // comboId: 'other-group',
      },
      {
        id: 'yier',
        label: '翳弭',
        // comboId: 'other-group',
      },
      {
        id: 'lingyu',
        label: '灵玉',
        // comboId: 'other-group',
      },
      {
        id: 'lingyi',
        label: '翎一',
        // comboId: 'other-group',
      },
      {
        id: 'wangxiang',
        label: '望乡',
        // comboId: 'other-group',
      },
      {
        id: 'zhiqin',
        label: '之勤',
        // comboId: 'other-group',
      },
      {
        id: 'pianyou',
        label: '偏右',
        // comboId: 'other-group',
      },
      {
        id: 'longcha',
        label: '龙茶',
        // comboId: 'other-group',
      },
      {
        id: 'xiaoqing',
        label: '萧庆',
        // comboId: 'other-group',
      },
      {
        id: 'jiangtianyi',
        label: '姜天意',
        // comboId: 'other-group',
      },
      {
        id: 'qidao',
        label: '祈祷',
        // comboId: 'other-group',
      },
      {
        id: 'daozhu',
        label: '岛煮',
        // comboId: 'other-group',
      },
      {
        id: 'ohuo',
        label: '哦豁',
        // comboId: 'other-group',
      },
      {
        id: 'yuanfeng',
        label: '远峰',
        // comboId: 'other-group',
      },
      {
        id: 'digui',
        label: '递归',
        // comboId: 'other-group',
      },
      {
        id: 'binying',
        label: '兵营',
        isLeave: true,
      },
      {
        id: 'zelu',
        label: '泽鹿',
        isLeave: true,
      },
      {
        id: 'tianzhu',
        label: '恬竹',
        isLeave: true,
      },
    ];

    const broEdges = [
      // wenya
      {
        source: 'jueyun',
        target: 'wenya',
      },
      {
        source: 'wenya',
        target: 'boyu',
      },
      {
        source: 'boyu',
        target: 'wuchen',
      },
      {
        source: 'wenya',
        target: 'yeting',
      },
      {
        source: 'wenya',
        target: 'beidao',
      },
      {
        source: 'boyu',
        target: 'wenyu',
      },
      {
        source: 'qingbi',
        target: 'canglang',
      },
      {
        source: 'bianliu',
        target: 'cangdong',
      },
      {
        source: 'xiaoqing',
        target: 'juze',
      },
      {
        source: 'juze',
        target: 'shiwu',
      },
      {
        source: 'shanye',
        target: 'shanguo',
      },
      {
        source: 'dongke',
        target: 'duomu',
      },

      // guangzhi
      {
        source: 'lingyi',
        target: 'guangzhi',
      },
      {
        source: 'wangxiang',
        target: 'linyu',
      },
      {
        source: 'kahun',
        target: 'jianming',
      },
      {
        source: 'guangzhi',
        target: 'kahun',
      },
      {
        source: 'linyu',
        target: 'zimeng',
      },

      // xuanyu
      {
        source: 'boyu',
        target: 'qingbi',
      },
      {
        source: 'canglang',
        target: 'jinxin',
      },
      {
        source: 'xuanyu',
        target: 'sishu',
      },
      {
        source: 'lingyu',
        target: 'jiuyao',
      },
      {
        source: 'jinxin',
        target: 'yifeng',
      },

      // yungang
      {
        source: 'zhiqin',
        target: 'yungang',
      },
      {
        source: 'yungang',
        target: 'aiyin',
      },
      {
        source: 'yungang',
        target: 'feimao',
      },
      {
        source: 'yungang',
        target: 'maosong',
      },
      {
        source: 'yier',
        target: 'yian',
      },
      {
        source: 'feimao',
        target: 'jili',
      },
      {
        source: 'yungang',
        target: 'gengsheng',
      },
      {
        source: 'feimao',
        target: 'chenyuan',
      },

      // qingsheng
      {
        source: 'jueyun',
        target: 'qingsheng',
      },
      {
        source: 'mingshi',
        target: 'baihui',
      },
      {
        source: 'xiaowei',
        target: 'wanmu',
      },
      {
        source: 'pianyou',
        target: 'yingying',
      },
      {
        source: 'wuchen',
        target: 'yuxi',
      },
      {
        source: 'mingshi',
        target: 'xiangrong',
      },
      {
        source: 'longcha',
        target: 'kefu',
      },
      {
        source: 'juze',
        target: 'guji',
      },
      {
        source: 'shitiao',
        target: 'fujin',
      },
      {
        source: 'yisi',
        target: 'chaokai',
      },
      {
        source: 'xiaoqing',
        target: 'buming',
      },
      {
        source: 'jiangtianyi',
        target: 'yuyi',
      },
      {
        source: 'daozhu',
        target: 'yisi',
      },
      {
        source: 'qingsheng',
        target: 'xinming',
      },
      {
        source: 'qidao',
        target: 'xiaowei',
      },
      {
        source: 'wenya',
        target: 'mingshi',
      },

      // subo
      {
        source: 'qidao',
        target: 'subo',
      },
      {
        source: 'subo',
        target: 'junwen',
      },
      {
        source: 'subo',
        target: 'nantao',
      },
      {
        source: 'nantao',
        target: 'zishang',
      },
      {
        source: 'zishang',
        target: 'mutu',
      },
      {
        source: 'junwen',
        target: 'xiandu',
      },
      {
        source: 'subo',
        target: 'jiandong',
      },
      {
        source: 'ohuo',
        target: 'qinke',
      },

      // bojun
      {
        source: 'binying',
        target: 'bojun',
      },
      {
        source: 'yuanfeng',
        target: 'changzhe',
      },
      {
        source: 'digui',
        target: 'xiaoyao',
      },
      {
        source: 'bojun',
        target: 'xiaojie',
      },
      {
        source: 'bojun',
        target: 'xingyi',
      },
      {
        source: 'changzhe',
        target: 'taotang',
      },
      {
        source: 'zelu',
        target: 'guangsheng',
      },
      {
        source: 'tianzhu',
        target: 'miaozi',
      },
    ];

    const organizationEdges = [
      // TL xuanyu -> members
      {
        source: 'xuanyu',
        target: 'jinxin',
      },
      {
        source: 'xuanyu',
        target: 'yifeng',
      },
      {
        source: 'xuanyu',
        target: 'jiuyao',
      },
      {
        source: 'xuanyu',
        target: 'sishu',
      },
      {
        source: 'xuanyu',
        target: 'qingbi',
      },


      // TL bojun -> members
      {
        source: 'bojun',
        target: 'taotang',
      },
      {
        source: 'bojun',
        target: 'changzhe',
      },
      {
        source: 'bojun',
        target: 'guangsheng',
      },
      {
        source: 'bojun',
        target: 'miaozi',
      },
      {
        source: 'bojun',
        target: 'xiaoyao',
      },
      {
        source: 'bojun',
        target: 'xingyi',
      },
      {
        source: 'bojun',
        target: 'xiaojie',
      },

      // TL qingsheng -> members
      {
        source: 'qingsheng',
        target: 'yisi',
      },
      {
        source: 'qingsheng',
        target: 'mingshi',
      },
      {
        source: 'qingsheng',
        target: 'buming',
      },
      {
        source: 'qingsheng',
        target: 'xiaowei',
      },
      {
        source: 'qingsheng',
        target: 'yingying',
      },
      {
        source: 'qingsheng',
        target: 'yuxi',
      },
      {
        source: 'qingsheng',
        target: 'yuyi',
      },
      {
        source: 'qingsheng',
        target: 'kefu',
      },
      {
        source: 'qingsheng',
        target: 'guji',
      },
      {
        source: 'qingsheng',
        target: 'chaokai',
      },
      {
        source: 'qingsheng',
        target: 'fujin',
      },
      {
        source: 'qingsheng',
        target: 'xinming',
      },
      {
        source: 'qingsheng',
        target: 'wanmu',
      },
      {
        source: 'qingsheng',
        target: 'baihui',
      },
      {
        source: 'qingsheng',
        target: 'xiangrong',
      },

      // TL subo -> members
      {
        source: 'subo',
        target: 'qinke',
      },
      {
        source: 'subo',
        target: 'mutu',
      },
      {
        source: 'subo',
        target: 'zishang',
      },
      {
        source: 'subo',
        target: 'xiandu',
      },
      {
        source: 'subo',
        target: 'junwen',
      },
      {
        source: 'subo',
        target: 'nantao',
      },
      {
        source: 'subo',
        target: 'jiandong',
      },

      // TL wenya -> members
      {
        source: 'wenya',
        target: 'juze',
      },
      {
        source: 'wenya',
        target: 'canglang',
      },
      {
        source: 'wenya',
        target: 'cangdong',
      },
      {
        source: 'wenya',
        target: 'shiwu',
      },
      {
        source: 'wenya',
        target: 'duomu',
      },
      {
        source: 'wenya',
        target: 'shanguo',
      },
      {
        source: 'wenya',
        target: 'boyu',
      },
      {
        source: 'wenya',
        target: 'wuchen',
      },
      {
        source: 'wenya',
        target: 'wenyu',
      },
      {
        source: 'wenya',
        target: 'beidao',
      },
      {
        source: 'wenya',
        target: 'yeting',
      },
      

      // TL yungang -> members
      {
        source: 'yungang',
        target: 'yian',
      },
      {
        source: 'yungang',
        target: 'jili',
      },
      {
        source: 'yungang',
        target: 'chenyuan',
      },
      {
        source: 'yungang',
        target: 'aiyin',
      },
      {
        source: 'yungang',
        target: 'maosong',
      },
      {
        source: 'yungang',
        target: 'gengsheng',
      },
      {
        source: 'yungang',
        target: 'feimao',
      },
      
      // TL guangzhi -> members
      {
        source: 'guangzhi',
        target: 'kahun',
      },
      {
        source: 'guangzhi',
        target: 'linyu',
      },
      {
        source: 'guangzhi',
        target: 'yanlin',
      },
      {
        source: 'guangzhi',
        target: 'jianming',
      },
      {
        source: 'guangzhi',
        target: 'zimeng',
      },

      // yushu -> TL
      {
        source: 'yushu',
        target: 'wenya',
      },
      {
        source: 'yushu',
        target: 'xuanyu',
      },
      {
        source: 'yushu',
        target: 'guangzhi',
      },
      {
        source: 'yushu',
        target: 'qingsheng',
      },
      {
        source: 'yushu',
        target: 'bojun',
      },
      {
        source: 'yushu',
        target: 'subo',
      },
      {
        source: 'yushu',
        target: 'yungang',
      },
    ]

    data.edges = organizationEdges;

    const clusterMap = [];
    data.combos.forEach((cluster, i) => {
      clusterMap[cluster.id] = cluster;
      clusterMap[cluster.id].idx = i;
    })

    const nodeMap = {};
    const clusterPos = {}
    let newPosIdx = 0;
    data.nodes.forEach(node => {
      node.cluster = node.comboId || `random|||${Math.random()}`
      nodeMap[node.id] = node;
      node.indegree = 0;
      node.outdegree = 0;
      node.neighbors = [];
      if (!clusterPos[node.cluster]) {
        clusterPos[node.cluster] = {
          x: (newPosIdx % 5 + 1) * 100,
          y: (Math.round(newPosIdx / 5) + 1) * 100
        }
        newPosIdx += 1;
      }
    })
    data.edges.forEach(edge => {
      nodeMap[edge.source].outdegree ++;
      nodeMap[edge.target].indegree ++;
      nodeMap[edge.source].neighbors.push(edge.target)
      nodeMap[edge.target].neighbors.push(edge.source)
      edge.style = {
        opacity: 0
      }
    })
    const subjectColors = [
      '#ed9b65',
      '#83c4f7',
      '#a055be',
      '#f7cc60',
      '#e36e71',
      '#83c84a',
      '#d8824f'
    ]
    // const subjectColors = [
    //   '#F08BB4',
    //   '#5B63FF',
    //   // '#44E6C1',
    //   '#1BE6B9',
    //   // '#FF5A34',
    //   '#F76C6C',
    //   // '#AE6CFF',
    //   // '#7F86FF',

    //   // '#61DDAA',
    //   '#F6BD16',
    //   // '#7262FD',
    //   // '#78D3F8',
    //   '#9661BC',
    //   '#F6903D',
    //   '#008685',
    //   // '#F08BB4',
    // ];
    const backColor = '#fff';
    const theme = 'default';
    const disableColor = '#777';
    const colorSets = G6.Util.getColorSetsBySubjectColors(
      subjectColors,
      backColor,
      theme,
      disableColor,
    );
    data.nodes.forEach(node => {
      node.size = (node.indegree + node.outdegree) + 5;
      if (node.isLeave) {
        // node.style = {
        //   fill: '#ccc',
        //   stroke:'#ccc',
        // }
        node.subjectColor = '#ccc';
      }
      else if (node.cluster.split('|||')[0] === 'random') {
        // node.style = {
        //   fill: '#999',
        //   stroke: '#999',
        // }
        node.subjectColor = '#999';
      } else {
        const colorSet = colorSets[clusterMap[node.cluster].idx % subjectColors.length]
        // node.style = {
        //   fill: colorSet.mainFill,
        //   stroke: colorSet.mainStroke,
        // }
        node.subjectColor = colorSet.mainStroke;
      }

      // if (node.isTL) {
      //   node.style.fill = node.subjectColor//.style.stroke
      // }
    })

    const { minimumSpanningTree } = Algorithm;

    const treeEdges = minimumSpanningTree(data)
    let tree;
    const establishedNode = {};
    data.nodes.forEach(node => {
      if (node.indegree === 0) {
        tree = {...node};
        establishedNode[node.id] = tree;
      }
    })
    treeEdges.forEach(edge => {
      let node;
      if (!establishedNode[edge.source]) node = {...nodeMap[edge.source]};
      else node = establishedNode[edge.source]

      let targetNode;
      if (!establishedNode[edge.target]) {
        targetNode = {...nodeMap[edge.target]}
      } else targetNode = establishedNode[edge.target]
      
      if (!node.children) node.children = [targetNode];
      else node.children.push(targetNode);
      
      establishedNode[edge.source] = node;
      establishedNode[edge.target] = targetNode;
      // if (!tree) tree = node
    })

    const sortTreeChildren = (tree) => {
      if (tree.children) {
        tree.children.sort((a, b) => {
          return (a.index - b.index)
        });

        tree.children.forEach(child => {
          sortTreeChildren(child);
        })
      }
      return;
    }

    sortTreeChildren(tree);

    const width = 1200, height = 800;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      fitView: true,
      minZoom: 0.00001,
      animate: false,
      // groupByTypes: false,
      // linkCenter: true,
      modes: {
        default: [
          {
            type: 'lasso-select',
            trigger: 'drag',
            selectedState: 'select'
          },
          'scroll-canvas',
          {
            type: 'activate-relations',
            inactiveState: 'dark',
            activeState: 'light'
          },
          {
            type: 'shortcuts-call',
            combinedKey: 'f',
            functionName: 'fitView'
          },
        ],
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 10;
        },
        getWidth: () => {
          return 16;
        },
        getVGap: () => {
          return 6;
        },
        getHGap: () => {
          return 50;
        },
        getSide: (d) => {
          if (d.id === 'wenya' || d.id === 'qingsheng' || d.id === 'xuanyu') {
            return 'right';
          }
          return 'left';
        },
      },
      defaultNode: {
        // size: [60, 30],
        // type: 'rect',
        type: 'tree-node',
        size: 5,
        labelCfg: {
          position: 'right',
          offset: 5,
          style: {
            stroke: '#fff',
            lineWidth: 3,
            fontFamily: 'Arial'
          }
        }
        // anchorPoints: [[0.5, 0], [0.5, 1]]
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#D8D8D8',
          opacity: 0.4
        },
        labelCfg: {
          style: {
            fontFamily: 'Arial'
          }
        }
      },
      nodeStateStyles: {
        light: {
          'text-shape': {
            fontSize: 12
          }
        },
        dark: {
          opacity: 0.3,
          'circle-shape': {
            opacity: 0.3
          },
          'text-shape': {
            opacity: 0.3
          }
        },
        select: {
          shadowBlur: 10
        }
      },
      edgeStateStyles: {
        dark: {
          opacity: 0.1,
        }
      }
    });

    let centerX = 0;
    graph.node(node => {
      if (node.id === 'yushu') {
        centerX = node.x;
        return {
          type: 'rect',
          size: [40, 20],
          style: {
            stroke: '#509FEE',
            fill: '#fff',
            lineWidth: 2,
            radius: 4,
            shadowColor: '#509FEE',
          },
          labelCfg: {
            position: 'center',
            style: {
              stroke: '#fff',
              lineWidth: 3,
              fontFamily: 'Arial',
              fill: '#509FEE',
            }
          },
        }
      }
      let position = 'left';
      if (node.x > centerX && node.isOtherGroup) position = 'right';
      else if (node.x <= centerX && node.isOtherGroup) position = 'left';
      else if (node.x > centerX) position = 'left';
      else if (node.x <= centerX) position = 'right';


      return {
        style: {
          stroke: node.isLeave ? '#eee' : '#d8d8d8',
          fill: node.isTL ? node.subjectColor : node.isLeave ? '#eee' : '#fff',
          lineWidth: node.isTL ?  0 : 2,
          shadowColor: node.subjectColor,
        },
        labelCfg: {
          position,
          style: {
            stroke: '#fff',
            fill: node.isLeave ? '#ccc' : node.subjectColor || '#999',
            lineWidth: 3,
            fontFamily: 'Arial',
            fontSize: node.isTL ? 12 : 10
          }
        },
      };
    });
    
    graph.on('afterlayout', e => {
      const otherGroupNodeMap = {};
      otherGroupNodes.forEach(oNode => {
        oNode.isOtherGroup = true;
        otherGroupNodeMap[oNode.id] = oNode;
      })
      broEdges.forEach(bEdge => {
        bEdge.isBroEdge = true;
        let sourceNode = graph.findDataById(bEdge.source);
        const targetNode = graph.findDataById(bEdge.target);
        if (!sourceNode && graph.findById(bEdge.source)) sourceNode = graph.findById(bEdge.source).getModel();
        
        const newNodeX = targetNode.isTL ? targetNode.x : targetNode.x < centerX ? targetNode.x - 120 : targetNode.x + 120;
        let newNodeY = targetNode.isTL ? targetNode.y - 50 : targetNode.y;
        const sourceNodeData = otherGroupNodeMap[bEdge.source];
        if (!sourceNode) {
          sourceNodeData.type = 'tree-node';
          sourceNodeData.x = newNodeX;
          sourceNodeData.y = newNodeY;
          sourceNodeData.style = {
            stroke: '#ccc',
            fill: '#ccc',
            shadowColor: '#ccc'
          }
          graph.addItem('node', sourceNodeData)
          sourceNode = sourceNodeData
        } else if (sourceNodeData) {
          newNodeY = (sourceNode.y + newNodeY) / 2;
          otherGroupNodes.forEach(oNode => {
            if (oNode.x === sourceNode.x && Math.abs(newNodeY - oNode.y) < 10) newNodeY += 20;
          })

          graph.updateItem(sourceNode.id, {
            y: newNodeY
          })
          // 如果是重复的 isOtherGroup sourceNode，更新相关的边
          const relatedEdges = graph.findById(bEdge.source).getEdges();
          relatedEdges && relatedEdges.forEach(rEdge => {
            const reModel = rEdge.getModel();
            const sn = graph.findById(reModel.source).getModel();
            const tn = graph.findById(reModel.target).getModel();

            let a = 0;
            const xDiff = sn.x - tn.x;
            const yDiff = sn.y - tn.y;
            if (Math.abs(xDiff) < Math.abs(yDiff)) a = yDiff < 0 ? 90 : 270;
            else a = xDiff < 0 ? 0 : 180;

            let sourceAnchor = undefined, targetAnchor = undefined;
            if (!sn.isTL && !tn.isTL) {
              if (sn.isOtherGroup) sourceAnchor = tn.x < centerX ? 1 : 0;
              else sourceAnchor = tn.x < centerX ? 0 : 1;
              targetAnchor = tn.x < centerX ? 0 : 1;
            }
            // else if (tn.isTL) {
            //   sourceAnchor = tn.x < centerX ? 5 : 4;
            //   if (tn.y > sn.y) targetAnchor = tn.x < centerX ? 2 : 3;
            //   else targetAnchor = tn.x < centerX ? 4 : 5;
            // }
            
            graph.updateItem(rEdge, {
              style: {
                stroke: `l(${a}) 0:${sn.subjectColor || '#d8d8d8'} 1:${tn.subjectColor || '#d8d8d8'}`,
              },
              sourceAnchor,
              targetAnchor
            })
          })
        }

        const sourceColor = sourceNode.subjectColor || '#d8d8d8';
        const targetColor = targetNode.subjectColor;
        let angle = 0;
        const xDiff = sourceNode.x - targetNode.x;
        const yDiff = sourceNode.y - targetNode.y;
        if (Math.abs(xDiff) < Math.abs(yDiff)) angle = yDiff < 0 ? 90 : 270;
        else angle = xDiff < 0 ? 0 : 180;
        bEdge.style = {
          lineDash: [2, 2],
          lineWidth: 2,
          opaicty: 0.1,
          stroke: `l(${angle}) 0:${sourceColor} 1:${targetColor}`, // '#5F95FF'
          endArrow: {
            path: G6.Arrow.triangle(6, 8, 0),
            fill: targetColor,
            lineWidth: 0.1,
          },
        }

        if (sourceNode.x === targetNode.x && !targetNode.isTL) {
          bEdge.type = 'quadratic';
          const yDiff = (sourceNode.y - targetNode.y);
          const sign = (yDiff < 0 ? -1 : 1) * (sourceNode.x > centerX ? -1 : 1);
          bEdge.curveOffset = -3.5 * sign * Math.sqrt(Math.abs(yDiff))
        }
        else if (sourceNode.x === targetNode.x && targetNode.isTL) {
          bEdge.type = 'line';
        }

        if (!sourceNode.isTL && !targetNode.isTL) {
          if (sourceNode.isOtherGroup) {
            bEdge.sourceAnchor = targetNode.x < centerX ? 1 : 0;
          } else {
            bEdge.sourceAnchor = targetNode.x < centerX ? 0 : 1;
          }
          bEdge.targetAnchor = targetNode.x < centerX ? 0 : 1;
        }
        // else if (targetNode.isTL) {
        //   bEdge.sourceAnchor = targetNode.x < centerX ? 5 : 4;
        //   if (targetNode.y > sourceNode.y) bEdge.targetAnchor = targetNode.x < centerX ? 2 : 3;
        //   else bEdge.targetAnchor = targetNode.x < centerX ? 4 : 5;
        // }
        
        graph.addItem('edge', bEdge);
      });

      graph.getEdges().forEach(edge => {
        const model = edge.getModel();
        if (model.isBroEdge) return;
        const color = edge.getTarget().getModel().subjectColor;
        graph.updateItem(edge, {
          style: {
            stroke: color
          },
        })
      })
    })

    const moveTree = (tree, dx, dy) => {
      if (!tree) return;
      tree.x += dx;
      tree.y += dy;
      if (tree.children) {
        tree.children.forEach(subTree => {
          moveTree(subTree, dx, dy);
        })
      }
    }
    
    let previousX, previousY
    graph.on('node:dragstart', e => {
      previousX = e.x;
      previousY = e.y;
    });
    graph.on('node:drag', e => {
      const selectedNodes = graph.findAllByState('node', 'select');
      const dx = e.x - previousX;
      const dy = e.y - previousY;
      if (selectedNodes && selectedNodes.length) {
        selectedNodes.forEach(sNode => {
          sNode.getModel().x += dx;
          sNode.getModel().y += dy;
        })
      } else {
        moveTree(e.item.getModel(), dx, dy);
      }
      graph.refreshPositions()
      previousX = e.x;
      previousY = e.y;
    });
    graph.data(tree);
    graph.render();

    let enableBroView = true, enableOrgView = true;
    broCheckBox.addEventListener('click', e => {
      enableBroView = !enableBroView;
      graph.getEdges().forEach(edge => {
        const model = edge.getModel();
        if (!model.isBroEdge) return;
        if (enableBroView) edge.show();
        else edge.hide();
      });
      graph.getNodes().forEach(node => {
        const model = node.getModel();
        if (!model.isOtherGroup) return;
        if (enableBroView) node.show();
        else node.hide();
      })
    });

    orgCheckBox.addEventListener('click', e => {
      enableOrgView = !enableOrgView;
      graph.getEdges().forEach(edge => {
        const model = edge.getModel();
        if (model.isBroEdge) return;
        if (enableOrgView) edge.show();
        else edge.hide();
      });
    });

    // 按键缩放
    document.onkeydown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && (e.key === '+' || e.key === '=')) { 
        graph.zoom(1.1, {x: width / 2, y : height / 2});
      }
      if (e && (e.key === '-' || e.key === '_')) { 
        graph.zoom(0.9, {x: width / 2, y : height / 2});
      }
    };

    // legend
    const rootGroup = graph.getGroup();
    const legendBegin = graph.getPointByCanvas(16, graph.getHeight() - 200);
    
    const legendNodeR = 3;
    const legendLabelMargin = 16;
    const legendItemHeight = 24;

    // 实心节点
    rootGroup.addShape('circle', {
      attrs: {
        x: legendBegin.x + 8,
        y: legendBegin.y,
        fill: '#509FEE',
        lineWidth: 2,
        r: legendNodeR
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 8 + legendLabelMargin,
        y: legendBegin.y,
        text: 'TL 节点',
        fill: '#509FEE',
        textBaseline: 'middle'
      }
    })
    // 空心节点
    rootGroup.addShape('circle', {
      attrs: {
        x: legendBegin.x + 8,
        y: legendBegin.y + legendItemHeight,
        stroke: '#999',
        fill: '#fff',
        lineWidth: 2,
        r: legendNodeR
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 8 + legendLabelMargin,
        y: legendBegin.y + legendItemHeight,
        text: '成员节点',
        fill: '#509FEE',
        textBaseline: 'middle'
      }
    })
    // 灰色空心
    rootGroup.addShape('circle', {
      attrs: {
        x: legendBegin.x + 8,
        y: legendBegin.y + 2 * legendItemHeight,
        stroke: '#999',
        fill: '#fff',
        lineWidth: 2,
        r: legendNodeR
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 8 + legendLabelMargin,
        y: legendBegin.y + 2 * legendItemHeight,
        text: '非本团队成员',
        fill: '#999',
        textBaseline: 'middle'
      }
    })
    // 灰色实心
    rootGroup.addShape('circle', {
      attrs: {
        x: legendBegin.x + 8,
        y: legendBegin.y + 3 * legendItemHeight,
        stroke: '#ccc',
        fill: '#ccc',
        lineWidth: 2,
        r: legendNodeR
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 8 + legendLabelMargin,
        y: legendBegin.y + 3 * legendItemHeight,
        text: '已离职',
        fill: '#ccc',
        textBaseline: 'middle'
      }
    })
    
    // 实线边
    rootGroup.addShape('line', {
      attrs: {
        x1: legendBegin.x,
        y1: legendBegin.y + 4 * legendItemHeight,
        x2: legendBegin.x + 16,
        y2: legendBegin.y + 4 * legendItemHeight,
        stroke: '#509FEE',
        lineWidth: 2,
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 16 + legendLabelMargin,
        y: legendBegin.y + 4 * legendItemHeight,
        text: '组织架构边',
        fill: '#509FEE',
        textBaseline: 'middle'
      }
    })

    // 虚线边
    rootGroup.addShape('line', {
      attrs: {
        x1: legendBegin.x,
        y1: legendBegin.y + 5 * legendItemHeight,
        x2: legendBegin.x + 16,
        y2: legendBegin.y + 5 * legendItemHeight,
        stroke: '#509FEE',
        lineWidth: 2,
        lineDash: [2, 2],
        endArrow: {
          path: G6.Arrow.triangle(4, 6, 0),
          lineWidth: 0.1,
          fill: '#509FEE'
        }
      }
    })
    rootGroup.addShape('text', {
      attrs: {
        x: legendBegin.x + 16 + legendLabelMargin,
        y: legendBegin.y + 5 * legendItemHeight,
        text: '师兄 -> 师弟',
        fill: '#509FEE',
        textBaseline: 'middle'
      }
    })

  })
})