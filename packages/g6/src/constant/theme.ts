import { ItemThemeSpecifications, ThemeSpecification } from "../types/theme";
import { DEFAULT_SHAPE_STYLE, DEFAULT_TEXT_STYLE } from "./shape";

const LightTheme: ThemeSpecification = {
  node: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          fill: '#666',
          stroke: '#333',
          lineWidth: 2
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#333',
          position: 'bottom',
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
          fill: '#abc'
        },
        labelShape: {
          fill: '#aff'
        }
      }
    }]
  },
  edge: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          lineWidth: 1,
          stroke: '#666',
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#333',
        },
        iconShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#333',
          img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
          width: 15,
          height: 15,
        },
      }
    }]
  },
  // TODO
  combo: {
    styles: []
  },
  canvas: {
    backgroundColor: '#fff'
  }
}
const DarkTheme: ThemeSpecification = {
  node: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          fill: '#ccc',
          stroke: '#fff',
          lineWidth: 2
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#fff',
          position: 'bottom',
        },
        iconShape: {
          ...DEFAULT_TEXT_STYLE,
          fill: '#fff',
          img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
          width: 15,
          height: 15,
        },
      }
    }]
  },
  edge: {
    palette: [],
    styles: [{
      default: {
        keyShape: {
          ...DEFAULT_SHAPE_STYLE,
          lineWidth: 1,
          stroke: '#ccc',
        },
        labelShape: {
          ...DEFAULT_TEXT_STYLE,
          stroke: '#fff',
        },
        iconShape: {
          ...DEFAULT_TEXT_STYLE,
          stroke: '#fff',
          img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ',
          width: 15,
          height: 15,
        },
      }
    }]
  },
  // TODO
  combo: {
    styles: []
  },
  canvas: {
    backgroundColor: '#000'
  }
}

export const BuiltinTheme = {
  light: LightTheme,
  dark: DarkTheme,
}
