import { useMemo, useState } from 'react';
import { defaultTheme } from './g6v5-demo-utils';
import './g6v5-demo.less';

const V5Controller = (props) => {
  const { language, graph, zoomLevels, createGraph } = props;
  const [customThemeDisplay, setCustomThemeDisplay] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [customBgColor, setCustomBgColor] = useState('#ffffff');
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  const [renderer, setRenderer] = useState('canvas');

  const zoomLevelCenters = useMemo(() => {
    return zoomLevels.map(({ zoomRange }, i) => {
      if (i === 0) return zoomRange[1] - 0.01;
      if (i === zoomLevels.length - 1) return zoomRange[0] + 0.01;
      return (zoomRange[0] + zoomRange[1]) / 2;
    });
  }, [zoomLevels]);

  const handleFullScreen = () => {
    const canvasEl = graph.canvas.context.config.canvas;
    const requestMethod =
      canvasEl.requestFullScreen ||
      canvasEl.webkitRequestFullScreen ||
      canvasEl.mozRequestFullScreen ||
      canvasEl.msRequestFullScreen;
    if (requestMethod) {
      // Native full screen.
      requestMethod.call(canvasEl);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      // Older IE.
      const wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  };

  const handleZoom = (isIn = true) => {
    let zoomRatio = 1;
    const currentZoom = graph.getZoom();
    let found = false;
    if (isIn) {
      if (currentZoom < 0.15) {
        zoomRatio = 1 / 0.9;
      } else {
        for (let i = 0; i < zoomLevelCenters.length - 1; i++) {
          if (currentZoom <= zoomLevelCenters[i]) {
            zoomRatio = zoomLevelCenters[i + 1] / currentZoom;
            found = true;
            break;
          }
          if (!found) zoomRatio = 1 / 0.9;
        }
      }
    } else {
      if (currentZoom > 2.1) {
        zoomRatio = 0.9;
      } else {
        for (let i = zoomLevelCenters.length - 1; i >= 1; i--) {
          if (currentZoom >= zoomLevelCenters[i]) {
            zoomRatio = zoomLevelCenters[i - 1] / currentZoom;
            found = true;
            break;
          }
        }
        if (!found) zoomRatio = 0.9;
      }
    }
    if (renderer === 'webgl') {
      graph.zoom(zoomRatio);
    } else {
      graph.zoom(zoomRatio, undefined, { duration: 500 });
    }
  };

  const handleRendererChange = (e) => {
    const rendererName = e.target.value;
    setRenderer(rendererName);
    createGraph(rendererName, undefined, undefined, currentTheme);
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setCustomThemeDisplay(false);
    let theme: any = defaultTheme;
    switch (value) {
      case 'light':
      case 'dark':
        theme = {
          ...defaultTheme,
          base: value,
        };
        break;
      case 'blue':
        theme = {
          type: 'spec',
          base: 'light',
          specification: {
            canvas: {
              backgroundColor: '#f3faff',
            },
            node: {
              dataTypeField: 'cluster',
              palette: [
                '#bae0ff',
                '#91caff',
                '#69b1ff',
                '#4096ff',
                '#1677ff',
                '#0958d9',
                '#003eb3',
                '#002c8c',
                '#001d66',
              ],
            },
          },
        };
        break;
      case 'yellow':
        theme = {
          type: 'spec',
          base: 'light',
          specification: {
            canvas: {
              backgroundColor: '#fcf9f1',
            },
            node: {
              dataTypeField: 'cluster',
              palette: [
                '#ffe7ba',
                '#ffd591',
                '#ffc069',
                '#ffa940',
                '#fa8c16',
                '#d46b08',
                '#ad4e00',
                '#873800',
                '#612500',
              ],
            },
          },
        };
        break;
      case 'custom':
        setCustomThemeDisplay(true);
        setCustomColors(['#cccccc']);
        setCurrentTheme(theme);
        return;
    }
    graph.updateTheme(theme);
    setCurrentTheme(theme);
  };

  const handleAddColor = () => {
    setCustomColors((old) => {
      return [...old, '#ccc'];
    });
  };
  const handleRemoveColor = () => {
    setCustomColors((old) => {
      return old.splice(0, old.length - 1);
    });
  };

  const handleColorChange = (e, idx) => {
    setCustomColors((old) => {
      const newColors = [...old];
      newColors[idx] = e.target.value;
      return newColors;
    });
  };

  const handleBgColorChange = (e) => {
    setCustomBgColor(e.target.value);
  };

  const handleApplyCustomTheme = () => {
    graph.updateTheme({
      type: 'spec',
      specification: {
        canvas: {
          backgroundColor: customBgColor || '#ffffff',
        },
        node: {
          dataTypeField: 'cluster',
          palette: customColors,
        },
      },
    });
  };

  const domWidth = language === 'zh' ? '135px' : '226px';

  return (
    <div className='v5-controller'>
      <div className='v5-buttons'>
        <button
          className='v5-button'
          onClick={handleFullScreen}
          style={{ width: '100%', background: 'rgba(34,126,255,0.3)' }}
        >
          {language === 'zh' ? '全屏' : 'Fullscreen'}
        </button>
        {/* <button className='v5-button' onClick={() => handleZoom(true)}>
          {language === 'zh' ? '放大' : 'ZoomIn'}
        </button>
        <button className='v5-button' onClick={() => handleZoom(false)}>
          {language === 'zh' ? '缩小' : 'ZoomOut'}
        </button> */}
      </div>
      <select
        className='v5-select'
        onChange={handleRendererChange}
        style={{ width: domWidth }}
      >
        <option value='canvas'>Canvas</option>
        <option value='webgl'>WebGL</option>
        <option value='webgl-3d'>WebGL-3D</option>
        <option value='svg' disabled>
          SVG(coming soon)
        </option>
      </select>
      <select
        className='v5-select'
        onChange={handleThemeChange}
        style={{ width: domWidth }}
      >
        <option value='light'>
          {language === 'zh' ? '亮色主题' : 'Light Theme'}
        </option>
        <option value='dark'>
          {language === 'zh' ? '暗色主题' : 'Dark Theme'}
        </option>
        <option value='blue'>
          {language === 'zh' ? '蓝色主题' : 'Blue Theme'}
        </option>
        <option value='yellow'>
          {language === 'zh' ? '黄色主题' : 'Yellow Theme'}
        </option>
        <option value='custom'>
          {language === 'zh' ? '自定义主题' : 'Custom Theme'}
        </option>
      </select>
      <div
        className='v5-custom-theme-wrapper'
        style={{ display: customThemeDisplay ? 'block' : 'none' }}
      >
        <div className='v5-custom-colors-wrapper'>
          <a className='v5-custom-colors-btn' onClick={handleAddColor}>
            +
          </a>
          {customColors.map((customColor, i) => (
            <input
              type='color'
              className='v5-custom-color'
              value={customColor}
              onChange={(e) => handleColorChange(e, i)}
            />
          ))}
          <a className='v5-custom-colors-btn' onClick={handleRemoveColor}>
            -
          </a>
        </div>
        <div className='v5-custom-bg-color'>
          {language === 'zh' ? '背景色：' : 'Background: '}
          <input
            type='color'
            className='v5-custom-color v5-custom-bg-color'
            value={customBgColor}
            onChange={(e) => handleBgColorChange(e)}
          />
        </div>
        <button
          onClick={handleApplyCustomTheme}
          className='v5-custom-apply-btn'
        >
          {language === 'zh' ? '应用' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default V5Controller;
