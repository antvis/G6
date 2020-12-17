import React, { useState, useEffect } from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import { Toast } from 'antd-mobile';
import { VisCanvas } from '../components/D2Chart/D2Chart';
import 'antd-mobile/dist/antd-mobile.css';
import './d2.less';
// import * as module from 'https://g.alicdn.com/mtb/lib-windvane/3.0.6/windvane.js';
// import 'https://g.alicdn.com/mtb/lib-windvane/3.0.6/windvane.js';

const DAILY_SCHEDULE_COLOR = [
  'l(0) 0:#6232B4 1:#81CCEA',
  'l(0) 0:#C0F08B 1:#A7E8EA',
  'l(0) 0:#FBD215 1:#B3E79A',
  'l(0) 0:#F8BF39 1:#E26AC4',
  'l(0) 0:#F262BD 1:#4D35AB',
];

interface Answer {
  id: string;
  main: string;
  sub?: string;
}

interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

interface UserAnswer {
  keyboard: string;
  symbol: string;
  shirt: string;
  framework: string;
  ide: string;
  worktime: string;
  music: string;
  [key: string]: string;
}

interface FinalPageConfigStyle {
  colors: {
    light: {
      [key: string]: string;
    };
    dark: {
      [key: string]: string;
    };
  };
  stickers: {
    [key: string]: {
      light: string;
      dark: string;
    };
  };
  footers: {
    share: {
      light: string;
      dark: string;
    };
    gift: {
      light: string;
      dark: string;
    };
  };
}

interface FinalPageConfigText {
  title: string;
  description1: string;
  description2: string;
  libDes: string;
}

interface FinalPageConfig {
  styles: {
    [key: string]: FinalPageConfigStyle;
  };
  texts: {
    [key: string]: FinalPageConfigText;
  };
}

interface NextButton {
  unpressed: string;
  pressed: string;
}

interface NextButtons {
  [key: string]: NextButton;
}

// const TITLE = '测一测你是那种工程🦁️';
const COVER_IMG =
  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*i39RSoKkjXUAAAAAAAAAAAAAARQnAQ';
const COVER_IMG_PRESSED =
  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*pXByTp61hUsAAAAAAAAAAAAAARQnAQ';
const OPTION_BUTTON =
  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Qc05QInHidIAAAAAAAAAAAAAARQnAQ';
const OPTION_BUTTON_PRESSED =
  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fl59QruT1ngAAAAAAAAAAAAAARQnAQ';

const NEXT_BUTTONS: NextButtons = {
  default: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*AnAlTqDOWpcAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ku58SpbyQPgAAAAAAAAAAAAAARQnAQ',
  },
  cyan: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-VtmTqrq0ekAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*98TWTr9ji4YAAAAAAAAAAAAAARQnAQ',
  },
  red: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GJM3SZpzxToAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zhmzTLiTvQEAAAAAAAAAAAAAARQnAQ',
  },
  tawny: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Nup8T4jkHk0AAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*88fhQawjZsgAAAAAAAAAAAAAARQnAQ',
  },
  black: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*27xmTbBk6JEAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*17LJRoADQUYAAAAAAAAAAAAAARQnAQ',
  },
};

const CALCULATE_BUTTONS: NextButtons = {
  cyan: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*aXXmQZ0nLowAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zS-JTamSFIYAAAAAAAAAAAAAARQnAQ',
  },
  red: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*S2qBS5hEaxMAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*PXh6Rqi1tkcAAAAAAAAAAAAAARQnAQ',
  },
  tawny: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1JPPSq1PYLoAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*t0PPTLvLmlAAAAAAAAAAAAAAARQnAQ',
  },
  black: {
    unpressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*GUUSTKLoBlcAAAAAAAAAAAAAARQnAQ',
    pressed:
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3jquQZom1q4AAAAAAAAAAAAAARQnAQ',
  },
};

const QR_CODE =
  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ms2LSZO1AT0AAAAAAAAAAAAAARQnAQ';
const SELECTED_COLOR = '#A58AFF';
const UNSELECTED_COLOR = '#fff';
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const LOGOS = {
  dark:
    'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1qtSTJCaIC8AAAAAAAAAAAAAARQnAQ',
  light:
    'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*24XUTo1_wssAAAAAAAAAAAAAARQnAQ',
};

//_back
const userAnswers_back: UserAnswer = {
  keyboard: '',
  symbol: '',
  shirt: '',
  framework: '',
  ide: '',
  worktime: '',
  music: '',
};

const userAnswers: UserAnswer = {
  keyboard: 'black', // red cyon tawn black none
  framework: 'bymyself', // vue react angular bymyself
  worktime: 'morning', // morning afternoon dawn night midnight
  symbol: '...', // :? => ; ...
  shirt: 'fashion', // smile fashion cool style
  ide: 'vscode', // vscode vim atom webstorm
  music: 'electronic', // classic metal electronic pop
};

let startTime = Infinity;
let tipTimer = -1;
let finalPageScreenShotBase64: any;
let randomRecommandLib: string;

const D2 = () => {
  const { t, i18n } = useTranslation();

  const element = React.useRef<HTMLDivElement>(null);
  const plotRef = React.useRef<any>(null);

  const [pageIdx, setPageIdx] = useState(-1); // -1
  const [selectedOption, setSelectedOption] = useState('');
  const [keyboardType, setKeybordType] = useState('default');
  const [pressedNext, setPressedNext] = useState(false);
  const [questionOpacity, setQuestionOpacity] = useState(1);
  const [shared, setShared] = useState(false);
  const [horizontal, setHorizontal] = useState(false);

  const questions: Question[] = [
    {
      id: 'keyboard',
      question: '你喜欢用哪种机械键盘？',
      answers: [
        { main: '青轴', id: 'keyboard-cyan' },
        { main: '黑轴', id: 'keyboard-black' },
        { main: '红轴', id: 'keyboard-red' },
        { main: '茶轴', id: 'keyboard-tawny' },
        { main: '都不用', id: 'keyboard-none' },
      ],
    },
    {
      id: 'framework',
      question: '你最常用的前端框架是？',
      answers: [
        { main: 'React', id: 'framework-react' },
        { main: 'Vue', id: 'framework-vue' },
        { main: 'Angular', id: 'framework-angular' },
        { main: '我自己写', id: 'framework-bymyself' },
      ],
    },
    {
      id: 'worktime',
      question: '你平时在哪段时间工作效率最高？',
      answers: [
        { main: '上午', id: 'worktime-morning' },
        { main: '下午', id: 'worktime-afternoon' },
        { main: '傍晚', id: 'worktime-dawn' },
        { main: '深夜', id: 'worktime-night' },
        { main: '凌晨', id: 'worktime-midnight' },
      ],
    },
    {
      id: 'symbol',
      question: '你最喜欢的符号是？',
      answers: [
        { main: '?:', sub: '三目运算符', id: 'symbol-?:' },
        { main: '=>', sub: '箭头函数', id: 'symbol-=>' },
        { main: '...', sub: '扩展运算符', id: 'symbol-...' },
        { main: ';', sub: '快结束这一行吧', id: 'symbol-;' },
      ],
    },
    {
      id: 'shirt',
      question: '你最常穿什么类型的衣服上班？',
      answers: [
        { main: '当然格子衫', id: 'shirt-fashion' },
        { main: '各种卫衣', id: 'shirt-cool' },
        { main: '公司文化衫', id: 'shirt-smile' },
        { main: '我有我 style', id: 'shirt-style' },
      ],
    },
    {
      id: 'ide',
      question: '你平时最常使用哪种编辑器？',
      answers: [
        { main: 'vscode', id: 'ide-vscode' },
        { main: 'webstorm', id: 'ide-webstorm' },
        { main: 'vim', id: 'ide-vim' },
        { main: 'atom', id: 'ide-atom' },
      ],
    },
    {
      id: 'music',
      question: '写代码时，你最喜欢听什么音乐？',
      answers: [
        { main: '抒情古典乐', id: 'music-classic' },
        { main: '暴躁重金属', id: 'music-metal' },
        { main: '迷幻电子乐', id: 'music-electronic' },
        { main: '时尚流行乐', id: 'music-pop' },
      ],
    },
  ];

  const darkTipColor = 'rgba(255, 255, 255, 0.45)';
  const lightTipColor = 'rgba(0, 0, 0, 0.45)';
  const finalPageConfigs: FinalPageConfig = {
    styles: {
      webstorm: {
        footers: {
          share: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Wg52SJjnK48AAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Jn5-TY29mpUAAAAAAAAAAAAAARQnAQ',
          },
          gift: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*J0gsRoZ4n4MAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qoiAQofwSX0AAAAAAAAAAAAAARQnAQ',
          },
        },
        colors: {
          light: {
            mainBack: '#F9FAFB',
            chartContainerBack: '#F1F2F3',
            mainText: '#2B2C2D',
            subText: '#72124F',
            tipText: lightTipColor,
          },
          dark: {
            mainBack: '#292B2C',
            chartContainerBack: '#3B4041',
            mainText: '#fff',
            subText: '#FFD576',
            tipText: darkTipColor,
          },
        },
        stickers: {
          fashion: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_bPiRqtXBmEAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*NFIaRbKyWQIAAAAAAAAAAAAAARQnAQ',
          },
          cool: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*JPwaQpkqn2EAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lpRLR7UgIoUAAAAAAAAAAAAAARQnAQ',
          },
          smile: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8cCuQJvS2MwAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rNGORaLCLwQAAAAAAAAAAAAAARQnAQ',
          },
          style: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*BxjUTZMBlvMAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_OT4Qpo0eYQAAAAAAAAAAAAAARQnAQ',
          },
        },
      },
      vscode: {
        footers: {
          share: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UjZLTIeRkoEAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7OJQSLpc5K0AAAAAAAAAAAAAARQnAQ',
          },
          gift: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*hZKBRKmts8AAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*I8HCTqfsYAcAAAAAAAAAAAAAARQnAQ',
          },
        },
        colors: {
          light: {
            mainBack: '#FEFFFF',
            chartContainerBack: '#EBECED',
            mainText: '#2B2C2D',
            subText: '#6D2453',
            tipText: lightTipColor,
          },
          dark: {
            mainBack: '#202122',
            chartContainerBack: '#242830',
            mainText: '#fff',
            subText: '#1F96F3',
            tipText: darkTipColor,
          },
        },
        stickers: {
          fashion: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-sLSTasWY6MAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XcvJTodCPKUAAAAAAAAAAAAAARQnAQ',
          },
          cool: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*c1CKR7j9HuoAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G-jRRKYttusAAAAAAAAAAAAAARQnAQ',
          },
          smile: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vUVwR5DAqmYAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VYUyQb46jJYAAAAAAAAAAAAAARQnAQ',
          },
          style: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*M8DySI1EqMQAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*rOs5S6bbhsYAAAAAAAAAAAAAARQnAQ',
          },
        },
      },
      vim: {
        footers: {
          share: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*iR50QL0uvVwAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Tf3aRaUXpEcAAAAAAAAAAAAAARQnAQ',
          },
          gift: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*euZHRbdWYqAAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SJELTpw2Jm0AAAAAAAAAAAAAARQnAQ',
          },
        },
        colors: {
          light: {
            mainBack: '#F0EBD8',
            chartContainerBack: '#D2CAB7',
            mainText: '#403A33',
            subText: '#B2286D',
            tipText: lightTipColor,
          },
          dark: {
            mainBack: '#002D37',
            chartContainerBack: '#00181E',
            mainText: '#4FD6E9',
            subText: '#FFBB22',
            tipText: darkTipColor,
          },
        },
        stickers: {
          fashion: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*L70oSoc5sfkAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*m2_ATqkrD_YAAAAAAAAAAAAAARQnAQ',
          },
          cool: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9P6mRZVTSmwAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Frx2RZn4oe4AAAAAAAAAAAAAARQnAQ',
          },
          smile: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lQx9QZjsgEYAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*__-6RacawKgAAAAAAAAAAAAAARQnAQ',
          },
          style: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dbzsR6F5TYgAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Sx-8Q5G8K4cAAAAAAAAAAAAAARQnAQ',
          },
        },
      },
      atom: {
        footers: {
          share: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XDT-QoHNGj8AAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*gGCeRrkUum8AAAAAAAAAAAAAARQnAQ',
          },
          gift: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*nQFUQK3iErgAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*uja3R4TODawAAAAAAAAAAAAAARQnAQ',
          },
        },
        colors: {
          light: {
            mainBack: '#F9FAFB',
            chartContainerBack: '#E9EAEC',
            mainText: '#252426',
            subText: '#AA3FAA',
            tipText: lightTipColor,
          },
          dark: {
            mainBack: '#262D36',
            chartContainerBack: '#323842',
            mainText: '#fff',
            subText: '#31CFD3',
            tipText: darkTipColor,
          },
        },
        stickers: {
          fashion: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*jdhQQpYSsGIAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7L6yTaH6NP8AAAAAAAAAAAAAARQnAQ',
          },
          cool: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*N1XZQJ0xow4AAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eul8Tb7MaTMAAAAAAAAAAAAAARQnAQ',
          },
          smile: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5STzR6JSf2AAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0-nES4J0R9IAAAAAAAAAAAAAARQnAQ',
          },
          style: {
            light:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RN52Trgrl0MAAAAAAAAAAAAAARQnAQ',
            dark:
              'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ai8fR7aaOrkAAAAAAAAAAAAAARQnAQ',
          },
        },
      },
    },

    texts: {
      morning: {
        title: '早起奋斗者',
        description1:
          '今早起床了，看屏幕里的我，忽然发现天气有点适合来创造，一点点改变，有很大的差别，每一行代码都能改变世界。新一代的',
        description2: '，叫上朋友一起感受数据超能力。',
        libDes: '数据神器',
      },
      afternoon: {
        title: '社会主义打工人',
        description1:
          '太阳当空照，我又上班辽，不迟到，不早退，立志要为人民立功劳。社会人社会魂，社会主义打工人，为您推荐',
        description2: '，一起迈向社会主义数字化新时代。',
        libDes: '数字化利器',
      },
      dawn: {
        title: '车间划水人',
        description1:
          '再给我两分钟，让我把代码写成诗，不过才过饭点，要我怎么忍心就这么回家？下班不积极，思想有问题，为您特别推荐',
        description2: '，快速生成数据图表，按时下班没烦恼！',
        libDes: '效率神器',
      },
      night: {
        title: '凡尔赛社畜',
        description1:
          '啊～黑夜给了我黑色的眼睛，我却用它寻找光明，汗水凝结成时光胶囊，我独自在黑夜里拼杀。试试新一代',
        description2: '，快速生成数据图表，释放你被压缩的睡眠时光。',
        libDes: '时光压缩器',
      },
      midnight: {
        title: '通宵爆肝王',
        description1:
          '月亮不睡你不睡，你是夜晚小宝贝，熬夜搬砖不会累，咖啡眼圈才更配。特为您推荐',
        description2: '，快速生成图表，释放你的夜生活。',
        libDes: '防秃利器',
      },
    },
  };

  const recommandLibFontSize: any = {
    F2: 45,
    G2: 45,
    G2Plot: 45,
    G6: 45,
    X6: 45,
    L7: 45,
  };

  const recommandLib = ['F2', 'G2', 'G2Plot', 'G6', 'X6', 'L7'];

  const handleClickNext = () => {
    const newIdx = pageIdx + 1;
    if (selectedOption === '' && pageIdx > -1 && pageIdx < questions.length) {
      Toast.info('大佬，选一个再继续吧！', 1);
      setPressedNext(true);
      setTimeout(() => {
        setPressedNext(false);
      }, 100);
      return;
    }
    setQuestionOpacity(0);
    setPressedNext(true);

    setTimeout(() => {
      setPageIdx(newIdx);
      setSelectedOption('');
      setQuestionOpacity(1);
      setPressedNext(false);
    }, 100);
  };

  const handleClickOption = (answerId: string) => {
    const strs = answerId.split('-');
    const prefix: string = strs[0];
    const suffix: string = strs[1];
    if (prefix === 'keyboard') {
      setKeybordType(suffix);
    }
    userAnswers[prefix] = suffix;
    setSelectedOption(answerId);
  };

  const renderImgDom = (
    url: string,
    targetDom: HTMLDivElement,
    crossOrigin?: string,
  ) => {
    const img = new Image();
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
    img.style.opacity = '0';
    img.id = 'finalImage';
    img.onload = () => {
      targetDom.querySelector(`#${img.id}`)?.remove();
      // 添加图片到预览
      // targetDom.style.padding = '0';
      targetDom.appendChild(img);

      // img.addEventListener('click', (e) => {
      //   startTime = Infinity;
      //   window.clearTimeout(tipTimer);
      // });
      // img.addEventListener('wheel', (e) => {
      //   startTime = Infinity;
      //   window.clearTimeout(tipTimer);
      // });
      // img.addEventListener('touchstart', (e) => {
      //   startTime = +new Date();
      //   tipTimer = window.setTimeout(() => {
      //     setShared(true);
      //   }, 2000);
      // });
      // img.addEventListener('touchend', (e) => {
      //   const endTime = +new Date();
      //   if (endTime - startTime > 700) {
      //     // 展示抽奖码
      //     setShared(true);
      //   }
      // });
    };
    // 将 canvas 导出成 base64
    crossOrigin && img.setAttribute('crossOrigin', crossOrigin);
    img.src = url;
  };

  const backingScale = () => {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      return window.devicePixelRatio;
    }
    return 1;
  };

  const parsePixelValue = (value: string) => {
    return parseInt(value, 10);
  };

  const getScreenShot = () => {
    if (finalPageScreenShotBase64) return;
    const plot = plotRef.current;
    if (plot && plot.chart) {
      const chart = plot.chart;
      // convert g2plot canvas to a img
      const g2canvas = chart.canvas.get('el');
      const data = g2canvas.toDataURL('image/png', 1);
      const img = new Image();
      img.style.display = 'block';
      img.style.width = '100%';
      img.style.height = '100%';
      img.setAttribute('crossOrigin', '*');

      // 将图表从 canvas 转换为 img
      img.onload = () => {
        // const domtoimage = require('dom-to-image');
        const html2canvas = require('html2canvas');
        // let self: any = this;
        // console.log('going to get screen shot', self)
        // if (!self) return;
        // 获取dom结构
        let targetDom: any = element.current as HTMLDivElement;
        // domtoimage.toPng(targetDom).then((dataUrl: any) => {
        //   //andriod
        //   if (dataUrl != 'error') {
        //     console.log('android')
        //     // alert("domtoimage");
        //     // self.setState({
        //     //   imgUrl: dataUrl,
        //     //   isDownloadImg: true,
        //     // })
        //     // console.log('output the screenshot as b641')
        //     // console.log(dataUrl);
        //     renderImgDom(dataUrl, targetDom, '*');
        //   }
        //   // ios
        //   else {
        let b64: any;
        const finalCanvas = document.createElement('canvas');
        const scaleBy = backingScale();
        const box = window.getComputedStyle(targetDom);
        const w = parsePixelValue(box.width);
        const h = parsePixelValue(box.height);
        finalCanvas.width = w * scaleBy;
        finalCanvas.height = h * scaleBy;
        finalCanvas.style.width = w + 'px';
        finalCanvas.style.height = h + 'px';

        // 将整个页面转换为 canvas
        html2canvas(targetDom, {
          useCORS: true,
          canvas: finalCanvas, // 把canvas传进去
          // onrendered: function(canvas: any) {
          //   try {
          //     b64 = canvas.toDataURL('image/png');
          //     renderImgDom(b64, targetDom, '*');
          //   } catch (err) {
          //     console.log(err);
          //   }
          // },
          // logging: true,
          // onclone: function(doc: any) {
          //   const image = doc.getElementById('finalImage');
          //   image.style.display = 'block';
          // }
        })
          .then(function (canvas: any) {
            try {
              b64 = canvas.toDataURL('image/png');
              finalPageScreenShotBase64 = b64;

              // 将 canvas 转换为 img
              renderImgDom(b64, targetDom, '*');
            } catch (err) {
              console.log(err);
              // alert(err)
            }
            // self.setState({
            //   imgUrl: b64,
            //   isDownloadImg: true,
            // })
            // console.log('output the screenshot as b64')
            // console.log(b64);
          })
          .catch(function onRejected(error: any) { });
        //   }
        // });
      };
      img.src = data;
    }
  };

  function afterChartRender() {
    // 图表渲染完成，并在动画即完成（600ms）后执行生成一层透明的 img 操作
    setTimeout(() => {
      getScreenShot();
    }, 800);
  }

  const getFinalPage = (
    ide: string,
    worktime: string,
    shirt: string,
    favoriteFramework: string,
    music: string,
  ) => {
    const gide = ide ? ide : 'vim';
    const gworktime = worktime ? worktime : 'night';
    const gshirt = shirt ? shirt : 'fashion';

    const styles: FinalPageConfigStyle = finalPageConfigs.styles[gide];
    const texts: FinalPageConfigText = finalPageConfigs.texts[gworktime];

    let theme: 'dark' | 'light' = 'dark';
    // if (
    //   worktime === 'morning' ||
    //   worktime === 'forenoon' ||
    //   worktime === 'afternoon'
    // )
    //   theme = 'light';
    const colors = styles.colors[theme];
    if (!randomRecommandLib) {
      const randomIdx = Math.floor(Math.random() * recommandLib.length);
      randomRecommandLib = recommandLib[randomIdx];
    }
    const stickerSrc = styles.stickers[gshirt][theme];
    const footerShare = styles.footers.share[theme];
    const footerGift = styles.footers.gift[theme];

    return (
      <div
        className="d2-finalpage"
        style={{
          backgroundColor: colors.mainBack,
          color: colors.mainText,
        }}
        ref={element}
      >
        <div className="d2-finalpage-header">
          {/* onClick={() => getScreenShot()} */}
          <div className="d2-finalpage-title">AntV</div>
          {/* <img className="d2-finalpage-title" src={LOGOS[theme]} /> */}
          <div className="d2-finalpage-symbol">{userAnswers.symbol}</div>
        </div>
        <div className="d2-chart-container">
          <VisCanvas
            ref={plotRef}
            theme={{
              backgroundColor: colors.mainBack,
              textColor: colors.mainText,
              subTextColor: colors.subText,
              dailySchedule: {
                data: [
                  { x: 'midnight', y: 8 },
                  { x: 'morning', y: 14 },
                  { x: 'afternoon', y: 10 },
                  { x: 'dawn', y: 8 },
                  { x: 'night', y: 8 },
                ],
                color: DAILY_SCHEDULE_COLOR,
                customStyle: {
                  fontFill: colors.mainText,
                },
                style: {
                  stroke: colors.mainBack,
                  strokeWidth: 1,
                },
                annotations: [
                  {
                    content: randomRecommandLib,
                    fontSize: recommandLibFontSize[randomRecommandLib],
                  },
                ],
              },
              // 工作效率：vis-bar（5个时间段🕛：清晨 / 上午 / 下午 / 夜晚 / 凌晨）
              // 写代码，喜欢听的音乐：vis-line（4种🎵，古典乐：4个声部，重金属：3个声部，摇滚音乐：4个声部+曲线，迷幻音乐：2个声部+曲线）
            }}
            favoriteFramework={favoriteFramework}
            afterChartRender={afterChartRender}
            efficientWorktime={worktime as any}
            favoriteIDE={gide as any}
            themeMode={theme as any}
            music={music as any}
          />
        </div>
        <div className="d2-finalpage-text-container">
          <div className="d2-finalpage-result-pre">测算结果显示，你是…</div>
          <div className="d2-finalpage-result-title">{texts.title}</div>
          <img
            className="d2-finalpage-sticker"
            style={{ marginLeft: texts.title.length > 5 ? '190px' : '130px' }}
            src={stickerSrc}
          />{' '}
          <span className="d2-finalpage-result-des d2-finalpage-result-des1">
            {texts.description1}
          </span>
          <span
            className="d2-finalpage-result-recommand"
            style={{ color: colors.subText }}
          >
            「{texts.libDes} — {randomRecommandLib}」
          </span>
          <span className="d2-finalpage-result-des">{texts.description2}</span>
        </div>
        {/* <div className="d2-finalpage-footer-left">
          <span className="d2-footer-tip" style={{ color: colors.subText }}>
            {tip}
          </span>
          <br />
          <span className="d2-footer-address">antv.vision/</span>
        </div>
        <img className="d2-finalpage-fcode" src={QR_CODE} /> */}
        <div className="d2-finalpage-footer">
          <img
            className="d2-finalpage-footer-img"
            src={shared ? footerGift : footerShare}
          />
        </div>
      </div>
    );
  };

  const orientationChangeListener = () => {
    // 竖屏
    if (window.orientation === 180 || window.orientation === 0) {
      setHorizontal(false);
    }
    // 横屏
    if (window.orientation === 90 || window.orientation === -90) {
      setHorizontal(true);
    }
  };

  useEffect(() => {
    // 判断端
    const os = (function () {
      const ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
          /(?:iPad|PlayBook)/.test(ua) ||
          (isAndroid && !/(?:Mobile)/.test(ua)) ||
          (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
      };
    })();
    if (os.isAndroid || os.isPhone) {
      // 手机
    } else if (os.isTablet) {
      // 平板
      setHorizontal(true);
      return;
    } else if (os.isPc) {
      // pc
      setHorizontal(true);
      return;
    }

    // 竖屏
    if (window.orientation === 180 || window.orientation === 0) {
    } else if (window.orientation === 90 || window.orientation === -90) {
      // 横屏
      setHorizontal(true);
    }
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      orientationChangeListener,
      false,
    );

    return window.removeEventListener(
      'onorientationchange',
      orientationChangeListener,
      false,
    );
  });

  if (horizontal) {
    return (
      <div className="d2-horizontal-container">
        <img className="d2-horizontal-qrcode" src={QR_CODE} />
        <div className="d2-horizontal-des">
          手机扫码开启旅程
        </div>
        <div className="d2-horizontal-des2">
          若您已经在测验中，请将手机返回竖屏继续哦
        </div>
      </div>
    );
  }

  return (
    <div className="d2-container">
      <SEO title={t('D2')} lang={i18n.language} />
      <div
        className="d2-antv-logo-container"
        style={{ display: pageIdx > -1 ? 'none' : 'block' }}
      >
        <img
          className="d2-antv-logo"
          src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3zCaQL5EgmIAAAAAAAAAAAAAARQnAQ"
          alt="antv-logo"
        />
      </div>
      {pageIdx > -1 && pageIdx < questions.length && (
        <>
          <div
            className="d2-question-back"
            style={{ opacity: questionOpacity }}
          >
            <div className="d2-question-container">
              <div className="d2-question-header">
                <div
                  className="circle"
                  style={{ right: '88px', backgroundColor: '#AAFF90' }}
                ></div>
                <div
                  className="circle"
                  style={{ right: '64px', backgroundColor: '#FFC461' }}
                ></div>
                <div
                  className="circle"
                  style={{ right: '40px', backgroundColor: '#F55050' }}
                ></div>
              </div>
              <div className="d2-question-content">
                <div className="question-title">Q{pageIdx + 1}</div>
                <div className="question-content">
                  {questions[pageIdx].question}
                </div>
              </div>
              <div className="d2-question-pagination-container">
                <div className="d2-question-pagination">{`${pageIdx + 1}/${questions.length
                  }`}</div>
              </div>
            </div>
          </div>
          <div
            className="d2-answers-container"
            style={{ opacity: questionOpacity }}
          >
            {questions[pageIdx].answers.map((answer, i) => (
              <div
                className="d2-answer-block"
                style={{
                  color:
                    selectedOption === answer.id
                      ? SELECTED_COLOR
                      : UNSELECTED_COLOR,
                }}
                onClick={() => handleClickOption(answer.id)}
                key={answer.id}
              >
                <div
                  className="d2-answer-button"
                  style={{
                    backgroundImage:
                      selectedOption === answer.id
                        ? `url(${OPTION_BUTTON_PRESSED})`
                        : `url(${OPTION_BUTTON})`,
                    color: UNSELECTED_COLOR,
                  }}
                >
                  <span className="d2-answer-letter">{LETTERS[i]}</span>
                </div>
                <span className="d2-answer-main">{answer.main}</span>
                {answer.sub && (
                  <span className="d2-answer-sub">{answer.sub}</span>
                )}
              </div>
            ))}
          </div>
          {pageIdx === questions.length - 1 ? (
            <div className="d2-button-container" onClick={handleClickNext}>
              {pressedNext ? (
                <img
                  className="next-button"
                  src={
                    CALCULATE_BUTTONS[keyboardType]
                      ? CALCULATE_BUTTONS[keyboardType].pressed
                      : CALCULATE_BUTTONS['red'].pressed
                  }
                  alt="button"
                  style={{
                    width: '32vw',
                    right: 'calc(8.5vw + 2vw)',
                    bottom: 'calc(6.14vh + 1.4vh)',
                  }}
                />
              ) : (
                  <img
                    className="next-button"
                    src={
                      CALCULATE_BUTTONS[keyboardType]
                        ? CALCULATE_BUTTONS[keyboardType].unpressed
                        : CALCULATE_BUTTONS['red'].unpressed
                    }
                    alt="button"
                    style={{ width: '36vw', right: '8.5vw', bottom: '6.14vh' }}
                  />
                )}
            </div>
          ) : (
              <div className="d2-button-container" onClick={handleClickNext}>
                {pressedNext ? (
                  <img
                    className="next-button"
                    src={
                      NEXT_BUTTONS[keyboardType]
                        ? NEXT_BUTTONS[keyboardType].pressed
                        : NEXT_BUTTONS['default'].pressed
                    }
                    alt="button"
                    style={{
                      width: '30vw',
                      right: 'calc(8.5vw + 2.95vw)',
                      bottom: 'calc(6.14vh + 1.3vh)',
                    }}
                  />
                ) : (
                    <img
                      className="next-button"
                      src={
                        NEXT_BUTTONS[keyboardType]
                          ? NEXT_BUTTONS[keyboardType].unpressed
                          : NEXT_BUTTONS['default'].unpressed
                      }
                      alt="button"
                      style={{ width: '36vw', right: '8.5vw', bottom: '6.14vh' }}
                    />
                  )}
              </div>
            )}
        </>
      )}
      {pageIdx === -1 && (
        <div className="d2-title-container">
          <img
            className="d2-cover-img"
            src={pressedNext ? COVER_IMG_PRESSED : COVER_IMG}
            onClick={handleClickNext}
          />
        </div>
      )}
      {pageIdx >= questions.length &&
        getFinalPage(
          userAnswers.ide,
          userAnswers.worktime,
          userAnswers.shirt,
          userAnswers.framework,
          userAnswers.music,
        )}
    </div>
  );
};

D2.noLayout = true;
export default D2;
