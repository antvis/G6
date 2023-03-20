import { DEFAULT_SHAPE_STYLE, DEFAULT_TEXT_STYLE } from "../../constant";
import { ThemeSpecification } from "../../types/theme";

const subjectColor = 'rgb(95, 149, 255)';
const textColor = 'rgb(0, 0, 0)';

const activeFill = 'rgb(247, 250, 255)';
// const nodeMainFill = 'rgb(239, 244, 255)';
const nodeMainFill = 'rgb(255, 255, 255)';
const comboFill = 'rgb(253, 253, 253)';
const disabledFill = 'rgb(250, 250, 250)';

const edgeMainStroke = 'rgb(224, 224, 224)';
const edgeInactiveStroke = 'rgb(234, 234, 234)';
const edgeDisablesStroke = 'rgb(245, 245, 245)';
const inactiveStroke = 'rgb(191, 213, 255)';

const highlightStroke = '#4572d9';
const highlightFill = 'rgb(223, 234, 255)';


export default {
  node: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          r: 10,
          fill: nodeMainFill,
          stroke: subjectColor,
          lineWidth: 1
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#000',
          position: 'bottom',
          offsetY: 4,
        },
        iconShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#333',
          img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
          width: 15,
          height: 15,
        },
      },
      selected: {
        keyShape: {
          fill: nodeMainFill,
          stroke: subjectColor,
          lineWidth: 4,
          shadowColor: subjectColor,
          shadowBlur: 10,
        },
        labelShape: {
          fontWeight: 500,
        }
      },
      active: {
        keyShape: {
          fill: activeFill,
          stroke: subjectColor,
          shadowColor: subjectColor,
          lineWidth: 2,
          shadowBlur: 10,
        }
      },
      highlight: {
        keyShape: {
          fill: highlightFill,
          stroke: highlightStroke,
          lineWidth: 2,
        },
        labelShape: {
          fontWeight: 500,
        }
      },
      inactive: {
        keyShape: {
          fill: activeFill,
          stroke: inactiveStroke,
          lineWidth: 1,
        }
      },
      disable: {
        keyShape: {
          fill: disabledFill,
          stroke:edgeMainStroke,
          lineWidth: 1,
        }
      },
    }]
  },
  edge: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          lineWidth: 1,
          stroke: edgeMainStroke,
          lineAppendWidth: 2,
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: textColor,
          textAlign: 'center',
          textBaseline: 'middle',
        },
        iconShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#333',
          img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
          width: 15,
          height: 15,
        },
      },
      selected: {
        keyShape: {
          stroke: subjectColor,
          lineWidth: 2,
          shadowColor: subjectColor,
          shadowBlur: 10,
        },
        labelShape: {
          fontWeight: 500,
        }
      },
      active: {
        keyShape: {
          stroke: subjectColor,
          lineWidth: 1,
        }
      },
      highlight: {
        keyShape: {
          stroke: subjectColor,
          lineWidth: 2,
        },
        labelShape: {
          fontWeight: 500,
        }
      },
      inactive: {
        keyShape: {
          stroke: edgeInactiveStroke,
          lineWidth: 1,
        }
      },
      disable: {
        keyShape: {
          stroke: edgeDisablesStroke,
          lineWidth: 1,
        }
      },
    }]
  },
  // TODO
  combo: {
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          fill: comboFill,
          lineWidth: 1,
          stroke: edgeMainStroke,
          r: 5,
          width: 20,
          height: 10,
          padding: [25, 20, 15, 20]
        }
      },
      selected: {
        keyShape: {
          stroke:subjectColor,
          fill: comboFill,
          shadowColor: subjectColor,
          lineWidth: 2,
          shadowBlur: 10,
        },
        labelShape: {
          fontWeight: 500,
        }
      },
      active: {
        keyShape: {
          stroke: subjectColor,
          lineWidth: 1,
          fill: activeFill,
        }
      },
      highlight: {
        keyShape: {
          stroke: highlightStroke,
          fill: comboFill,
          lineWidth: 2,
        },
        labelShape: {
          fontWeight: 500,
        },
      },
      inactive: {
        keyShape: {
          stroke: edgeMainStroke,
          fill: comboFill,
          lineWidth: 1,
        }
      },
      disable: {
        keyShape: {
          stroke: edgeInactiveStroke,
          fill: disabledFill,
          lineWidth: 1,
        }
      },
    }]
  },
  canvas: {
    backgroundColor: '#000'
  }
} as ThemeSpecification;