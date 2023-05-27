import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultTheme } from './g6v5-demo-utils';
import './g6v5-demo.less'

const V5Controller = (props) => {
  const { graph, zoomLevels, createGraph } = props
  const [customThemeDisplay, setCustomThemeDisplay] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [customBgColor, setCustomBgColor] = useState('#ffffff');

  const zoomLevelCenters = useMemo(() => {
    return zoomLevels.map(({ zoomRange }, i) => {
      if (i === 0) return zoomRange[1] - 0.01;
      if (i === zoomLevels.length - 1) return zoomRange[0] + 0.01;
      return (zoomRange[0] + zoomRange[1]) / 2;
    })
  }, [zoomLevels])

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
  }

  const handleZoom = (isIn = true) => {
    let zoomRatio = 1;
    const currentZoom = graph.getZoom();
    let found = false;
    if (isIn) {
      if (currentZoom < 0.15) {
        zoomRatio = (1 / 0.9);
      } else {
        for (let i = 0; i < zoomLevelCenters.length - 1; i++) {
          if (currentZoom <= zoomLevelCenters[i]) {
            zoomRatio = zoomLevelCenters[i + 1] / currentZoom;
            found =  true;
            break;
          }
          if (!found) zoomRatio = 1 / 0.9;
        }
      }
    } else {
      if (currentZoom > 2.1) {
        zoomRatio = 0.9
      } else {
        for (let i = zoomLevelCenters.length - 1; i >= 1; i--) {
          if (currentZoom >= zoomLevelCenters[i]) {
            zoomRatio = zoomLevelCenters[i - 1] / currentZoom;
            found =  true;
            break;
          }
        }
        if (!found) zoomRatio = 0.9;
      }
    }
    // { x: 2194, y: -1347 }
    graph.zoom(zoomRatio, undefined, { duration: 500 });
  };

  const handleRendererChange = (e) => {
    const rendererName = e.target.value;
    createGraph(rendererName);
  }

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setCustomThemeDisplay(false);
    switch (value) {
      case 'light':
      case 'dark':
        graph.updateTheme({
          ...defaultTheme,
          base: value
        });
        return;
      case 'blue':
        graph.updateTheme({
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
        });
        return;
      case 'yellow':
        graph.updateTheme({
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
        });
        return;
      case 'custom':
        setCustomThemeDisplay(true);
        setCustomColors(['#cccccc'])
        return;
    }
  }

  const handleAddColor = () => {
    setCustomColors(old => {
      return [...old, '#ccc'];
    });
  }
  const handleRemoveColor = () => {
    setCustomColors(old => {
      return old.splice(0, old.length - 1);
    });
  }

  const handleColorChange = (e, idx) => {
    setCustomColors(old => {
      const newColors = [...old];
      newColors[idx] = e.target.value;
      return newColors;
    })
  }

  const handleBgColorChange = (e) => {
    setCustomBgColor(e.target.value);
  }

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
  }

  const { t, i18n } = useTranslation();

  if (!i18n.language || i18n.language === 'zh') {
    return (
      <div className="v5-controller">
        <div className='v5-buttons'>
          <button className="v5-button" onClick={handleFullScreen}>全屏</button>
          <button className="v5-button" onClick={() => handleZoom(true)}>放大</button>
          <button className="v5-button" onClick={() => handleZoom(false)}>缩小</button>
        </div>
        <select className='v5-select' onChange={handleRendererChange}>
          <option value="canvas">Canvas</option>
          <option value="webgl">WebGL</option>
          <option value="webgl-3d">WebGL-3D</option>
          <option value="svg" disabled>SVG(coming soon)</option>
        </select>
        <select className='v5-select' onChange={handleThemeChange}>
          <option value="light">亮色主题</option>
          <option value="dark">暗色主题</option>
          <option value="blue">蓝色主题</option>
          <option value="yellow">黄色主题</option>
          <option value="custom">自定义主题</option>
        </select>
        <div className='v5-custom-theme-wrapper' style={{display: customThemeDisplay ? 'block' : 'none'}}>
          <div className='v5-custom-colors-wrapper'>
            <a className='v5-custom-colors-btn' onClick={handleAddColor}>+</a>
            {customColors.map((customColor, i) => <input type="color" className='v5-custom-color' value={customColor} onChange={(e) => handleColorChange(e, i)} />)}
            <a className='v5-custom-colors-btn'onClick={handleRemoveColor}>-</a>
          </div>
          <div className='v5-custom-bg-color'>
            背景色：
            <input type="color" className='v5-custom-color v5-custom-bg-color' value={customBgColor} onChange={(e) => handleBgColorChange(e)} />
          </div>
          <button onClick={handleApplyCustomTheme} className='v5-custom-apply-btn'>应用</button>
        </div>
      </div>
    );
  }

  return (
    <div className="v5-controller">
    </div>
  );
};

export default V5Controller;
