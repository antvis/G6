import { ThemeSpecification } from '../../types/theme';

const subjectColor = 'rgb(34,126,255)';
const textColor = 'rgba(0,0,0,0.85)';

const nodeColor = 'rgb(34,126,255)';
const edgeColor = 'rgb(153, 173, 209)';
const comboFill = 'rgb(253, 253, 253)';
const disabledFill = 'rgb(240, 240, 240)';

const edgeMainStroke = 'rgb(153, 173, 209)';
const edgeDisableStroke = 'rgb(217, 217, 217)';
const edgeInactiveStroke = 'rgb(210, 218, 233)';

const nodeStroke = 'rgba(0,0,0,0.85)';
const comboStroke = 'rgba(153,173,209,1)';
const comboSelectedStroke = 'rgba(27,50,79,1)';
const disabledStroke = 'rgba(153,173,209,1)';

export const LightTheme = {
  node: {
    palette: [
      '#1783FF',
      '#00C9C9',
      '#F08F56',
      '#D580FF',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  },
  edge: {
    palette: [
      '#99ADD1',
      '#1783FF',
      '#00C9C9',
      '#F08F56',
      '#D580FF',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  },
  combo: {},
  canvas: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
} as ThemeSpecification;
