import React, { useState, useEffect } from 'react';
import G6 from '../../../src';
import {
  createFromIconfontCN,
  EyeOutlined,
  VideoCameraAddOutlined,
  EyeInvisibleOutlined,
  NodeIndexOutlined,
  LayoutOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  TagOutlined,
  SearchOutlined,
  HighlightOutlined
} from '@ant-design/icons';
import insertCss from 'insert-css';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import { findAllPath } from '../../../src/algorithm';

const selectedColor = 'rgba(85, 115, 224, 1)';
const defaultColor = 'rgba(255, 255, 255, 0.45)';

insertCss(`
  #canvas-menu {
    position: absolute;
    z-index: 2;
    left: 16px;
    top: 16px;
    width: fit-content;
    padding: 8px 16px;
    background-color: rgba(54, 59, 64, 0);
    border-radius: 24px;
    box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0);
    font-family: PingFangSC-Semibold;
    transition: all 0.2s linear;
  }
  #canvas-menu:hover {
    background-color: rgba(54, 59, 64, 1);
    box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
  }
  .icon-span {
    padding-left: 8px;
    padding-right: 8px;
    cursor: pointer;
  }
  #search-node-input {
    background-color: rgba(60, 60, 60, 0.95);
    border-radius: 21px;
    width: 100px;
    border-color: rgba(80, 80, 80, 0.95);
    border-style: solid;
    color: rgba(255, 255, 255, 0.85);
  }
  #submit-button {
    background-color: rgba(82, 115, 224, 0.2);
    border-radius: 21px;
    border-color: rgb(82, 115, 224);
    border-style: solid;
    color: rgba(152, 165, 254, 1);
    margin-left: 4px;
  }
  .menu-tip {
    position: absolute;
    right: 32px;
    width: fit-content;
    height: 40px;
    line-height: 40px;
    top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: rgba(54, 59, 64, 0.5);
    color: rgba(255, 255, 255, 0.65);
    border-radius: 8px;
    transition: all 0.2s linear;
    font-family: PingFangSC-Semibold;
  }
  #g6-canavs-menu-item-tip {
    position: absolute;
    background-color: rgba(0,0,0, 0.65);
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 10px;
    width: fit-content;
    color: #fff;
    border-radius: 8px;
    font-size: 12px;
    height: fit-content;
    font-family: PingFangSC-Semibold;
    transition: all 0.2s linear;
  }
`);


interface IProps {
  graph: any;
  // filter: (checkedTypeList: { node: string[]; edge: string[] }) => void;
  // configLabel: (checkedList: {
  //   node: {
  //     [key: string]: string[];
  //   };
  //   edge: {
  //     [key: string]: string[];
  //   };
  // }) => void;
  // typeList?: {
  //   node: string[];
  //   edge: string[];
  // };
  // typePropertyList?: {
  //   node: {
  //     [key: string]: string[];
  //   };
  //   edge: {
  //     [key: string]: string[];
  //   };
  // };
  // resetFilterMapping: number;
  // selectedItem?: string;
  // clickFilterIcon: () => void;
  clickFisheyeIcon: (onlyDisable?: boolean) => void;
  // clickLabelMappingIcon: () => void;
  clickLassoIcon: (onlyDisable?: boolean) => void;
  // filterPanelVisible: boolean;
  // labelMappingPanelVisible: boolean;
  fisheyeEnabled: boolean;
  lassoEnabled: boolean;
  // enableLayoutConfig: boolean;
  edgeLabelVisible: boolean;
  setEdgeLabelVisible: (vis: boolean) => void;
  searchNode: (id: string) => boolean;
  handleFindPath: () => void;
  stopLayout: () => void;
}


let fishEye = null;

const CanvasMenu: React.FC<IProps> = ({
  graph,
  // filter,
  // configLabel,
  // typeList,
  // typePropertyList,
  // resetFilterMapping,
  // selectedItem,
  // clickFilterIcon,
  clickFisheyeIcon,
  // clickLabelMappingIcon,
  clickLassoIcon,
  // filterPanelVisible,
  // labelMappingPanelVisible,
  fisheyeEnabled,
  lassoEnabled,
  stopLayout,
  edgeLabelVisible,
  setEdgeLabelVisible,
  searchNode,
  handleFindPath
}) => {
  // filte
  const [filtered, setFiltered] = useState(false);

  // label mapping
  const [labelConfigured, setLabelConfigured] = useState(false)

  // menu tip, 例如 “按下 ESC 退出鱼眼”
  const [menuTip, setMenuTip] = useState({
    text: '',
    display: 'none',
    opacity: 0
  });

  // menu item tip
  const [menuItemTip, setMenuItemTip] = useState({
    text: '',
    display: 'none',
    opacity: 0
  });

  const [enableSearch, setEnableSearch] = useState(false);

  const [enableSelectPathEnd, setEnableSelectPathEnd] = useState(false);

  const clickEdgeLabelController = () => {
    setEdgeLabelVisible(!edgeLabelVisible);
  }
  // 放大
  const handleZoomOut = () => {
    if (!graph || graph.destroyed) return;
    const current = graph.getZoom();
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    const pixelRatio = canvas.get('pixelRatio') || 1;
    const ratio = 1 + 0.05 * 5;
    if (ratio * current > 5) {
      return;
    }
    graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
  };

  // 缩小
  const handleZoomIn = () => {
    if (!graph || graph.destroyed) return;

    const current = graph.getZoom();
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    const pixelRatio = canvas.get('pixelRatio') || 1;
    const ratio = 1 - 0.05 * 5;
    if (ratio * current < 0.3) {
      return;
    }
    graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
  };

  const handleFitViw = () => {
    if (!graph || graph.destroyed) return;
    graph.fitView(16);
  }

  // 实际大小
  const handleRealZoom = () => {
    if (!graph || graph.destroyed) return;
    const current = graph.getZoom();
    graph.zoom(1 / current);
    graph.fitCenter();
  };

  // 自适应canvas大小
  const handleAutoZoom = () => {
    if (!graph || graph.destroyed) return;
    const nodes = graph.getNodes();
    if (nodes.length > 0) {
      graph.fitView([20, 20]);
    }
  };

  const handleChangeZoom = (text, ratio) => {
    if (!graph || graph.destroyed) return;

    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    const pixelRatio = canvas.get('pixelRatio') || 1;
    graph.zoomTo(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
  };

  const handleEnableSearch = () => {
    // 关闭 lasso 框选
    if (lassoEnabled) clickLassoIcon(true)
    // 关闭选择路径端点
    if (enableSelectPathEnd) setEnableSelectPathEnd(false);
    // 关闭搜索节点框
    if (enableSearch) setEnableSearch(false);
    // 关闭 fisheye
    if (fisheyeEnabled && fishEye) {
      graph.removePlugin(fishEye);
      clickFisheyeIcon(true);
    }
    setEnableSearch(!enableSearch);
  }

  const handleSearchNode = () => {
    const value = (document.getElementById('search-node-input') as HTMLInputElement).value;
    const found = searchNode(value);
    if (!found) setMenuTip({
      text: `Did not find the node with id ${value}`,
      display: 'block',
      opacity: 1
    });
  }

  const showItemTip = (e, text) => {
    const { clientX: x, clientY: y } = e;
    setMenuItemTip({
      text,
      display: 'block',
      opacity: 1
    });
    const tipDom = document.getElementById('g6-canavs-menu-item-tip')
    modifyCSS(tipDom, {
      top: `${60}px`,
      left: `${x - 20}px`,
      zIndex: 100,
    });
  };

  const hideItemTip = () => {
    setMenuItemTip({
      text: '',
      display: 'none',
      opacity: 0
    });
    const tipDom = document.getElementById('g6-canavs-menu-item-tip')
    modifyCSS(tipDom, {
      zIndex: -100,
    });
  }
  /**
   * 打开或关闭鱼眼放大功能
   */
  const toggleFishEye = () => {

    if (!graph || graph.destroyed) return;

    // 设置鼠标样式为默认
    graph.get('canvas').setCursor('default');

    // 关闭 FishEye
    if (fisheyeEnabled && fishEye) {
      graph.removePlugin(fishEye);
      graph.setMode('default')

      // 设置 menuTip
      setMenuTip({
        text: 'Press Esc to Exit the Fisheye Mode',
        display: 'none',
        opacity: 0
      });
    } else {
      // 停止布局
      stopLayout();

      // 关闭 lasso 框选
      if (lassoEnabled) clickLassoIcon(true)
      // 关闭选择路径端点
      if (enableSelectPathEnd) setEnableSelectPathEnd(false);
      // 关闭搜索节点框
      if (enableSearch) setEnableSearch(false);

      // 设置 menuTip
      setMenuTip({
        text: 'Press Esc to Exit the Fisheye Mode',
        display: 'block',
        opacity: 1
      });

      // 将交互模式切换到鱼眼只读模式，即不能缩放画布、框选节点、拉索选择节点等可能和鱼眼有冲突的操作
      graph.setMode('fisheyeMode');
      // 开启 FishEye
      fishEye = new G6.Fisheye({
        r: 249,
        scaleRByWheel: true,
        minR: 100,
        maxR: 500
        // showLabel: true,
      });

      graph.addPlugin(fishEye);
    }
    clickFisheyeIcon();
  };

  // 开启 lasso select 功能
  const enabledLassoSelect = () => {
    if (!graph || graph.destroyed) return;
    clickLassoIcon();
    if (!lassoEnabled) {
      graph.setMode('lassoSelect');

      // 设置鼠标样式为十字形
      graph.get('canvas').setCursor('crosshair');

      // 关闭 fisheye
      if (fisheyeEnabled && fishEye) {
        graph.removePlugin(fishEye);
        clickFisheyeIcon(true);
      }
      // 关闭选择路径端点
      if (enableSelectPathEnd) setEnableSelectPathEnd(false);
      // 关闭搜索节点框
      if (enableSearch) setEnableSearch(false);

      // 设置 menuTip
      setMenuTip({
        text: 'Press Esc to Exit the Lasso Select Mode',
        display: 'block',
        opacity: 1
      });

    } else {
      graph.setMode('default');

      // 设置鼠标样式为默认
      graph.get('canvas').setCursor('default');

      // 设置 menuTip
      setMenuTip({
        text: 'Press Esc to Exit the Lasso Select Mode',
        display: 'none',
        opacity: 0
      });
    }
  }

  // 开启选择两个节点显示最短路径
  const handleEnableSelectPathEnd = () => {
    setEnableSelectPathEnd(old => {
      if (!old) {
        graph.setMode('default');
        // 关闭 fisheye
        if (fishEye) {
          graph.removePlugin(fishEye);
          clickFisheyeIcon(true);
        }
        // 关闭 lasso 框选
        if (lassoEnabled) clickLassoIcon(true)

        // 关闭搜索节点框
        if (enableSearch) setEnableSearch(false);

        // 设置 menuTip
        setMenuTip({
          text: 'Press SHIFT and Select Two Nodes as Ends of the Path',
          display: 'block',
          opacity: 1
        });
        return true;
      }
      return false;
    })
  }

  const escListener = e => {
    if (!graph || graph.destroyed) return;
    if (e.key !== 'Escape') return;
    if (fishEye) {
      graph.removePlugin(fishEye);
      clickFisheyeIcon(true);
    }
    // 关闭 lasso 框选
    graph.setMode('default');
    // 关闭搜索节点框
    setEnableSearch(false);
    // 关闭选择路径端点
    setEnableSelectPathEnd(false);

    // 设置鼠标样式为默认
    graph.get('canvas').setCursor('default');
    clickLassoIcon(true);

    // 设置 menuTip
    setMenuTip({
      text: 'Press Esc to Exit the Mode',
      display: 'none',
      opacity: 0
    });
  }

  useEffect(() => {
    window.addEventListener("keydown", escListener.bind(this));
    return window.removeEventListener("keydown", escListener.bind(this));
  }, []);


  const zoomMenu = (
    <span>
      <span key="level1">
        <a rel="noopener noreferrer" onClick={() => handleChangeZoom('20%', 0.2)}>
          20%
        </a>
      </span>
      <span key="level2">
        <a rel="noopener noreferrer" onClick={() => handleChangeZoom('50%', 0.5)}>
          50%
        </a>
      </span>
      <span key="level3">
        <a rel="noopener noreferrer" onClick={() => handleChangeZoom('75%', 0.75)}>
          75%
        </a>
      </span>
      <span key="level4">
        <a rel="noopener noreferrer" onClick={() => handleChangeZoom('100%', 1)}>
          100%
        </a>
      </span>
      <span key="level5">
        <a rel="noopener noreferrer" onClick={handleAutoZoom}>
          适应画布
        </a>
      </span>
      <span key="level6">
        <a rel="noopener noreferrer" onClick={handleRealZoom}>
          实际大小
        </a>
      </span>
    </span>
  );

  const iconStyle = {
    disable: { color: 'rgba(255, 255, 255, 0.85)' },
    enable: { color: 'rgba(82, 115, 224, 1)' },
  };

  return (
    <>
      <div id='canvas-menu'>
        <div className='icon-container'>
          <span className='icon-span'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            onClick={clickEdgeLabelController}
            onMouseEnter={e => showItemTip(e, edgeLabelVisible ? 'Hide the Edge Label' : 'Show the Edge Label')}
            onMouseLeave={hideItemTip}
          >
            {edgeLabelVisible ? <DisconnectOutlined style={iconStyle.enable} /> : <TagOutlined style={iconStyle.disable} />}
          </span>
          {/* <div className='icon-span'  style={{backgroundColor: selectedItem==='filter' ? '#272A2D' : 'rgba(0, 0, 0, 0)'}}>
            <IconFont
              type="iconhuabugongjulan-shaixuan"
              onClick={clickFilterIcon}
              style={{ color: filterPanelVisible ? 'rgba(82, 115, 224, 1)' : 'rgba(255,255,255,0.65)' }}
            />
          </div> */}
          {/* <div className='icon-span'  style={{backgroundColor: selectedItem==='layoutConfig' ? '#272A2D' : 'rgba(0, 0, 0, 0)'}}>
            <LayoutOutlined
              onClick={clickLayoutConfig}
              style={{ color: enableLayoutConfig ? 'rgba(82, 115, 224, 1)' : 'rgba(255,255,255,0.65)' }} />
          </div> */}
          <span className='icon-span'
            onClick={toggleFishEye}
            onMouseEnter={e => showItemTip(e, fisheyeEnabled ? 'Disable Fisheye Lens' : 'Enable Fisheye Lens')}
            onMouseLeave={hideItemTip}
          >
            {fisheyeEnabled ? <EyeInvisibleOutlined style={iconStyle.enable} /> : <EyeOutlined style={iconStyle.disable} />}
          </span>
          <span className='icon-span'
            onClick={enabledLassoSelect}
            onMouseEnter={e => showItemTip(e, lassoEnabled ? 'Disable Lasso Select Mode' : 'Enable Lasso Select Mode')}
            onMouseLeave={hideItemTip}
          >
            <HighlightOutlined style={lassoEnabled ? iconStyle.enable : iconStyle.disable} />
          </span>
          <span className='icon-span'
            onClick={handleEnableSelectPathEnd}
            onMouseEnter={e => showItemTip(e, 'Find the Shortest Path')}
            onMouseLeave={hideItemTip}
          >
            <NodeIndexOutlined style={enableSelectPathEnd ? iconStyle.enable : iconStyle.disable} />
          </span>
          <span className='icon-span' style={{ width: 'fit-content', ...iconStyle.disable }} >
            <span className='zoom-icon'
              onClick={handleZoomIn}
              onMouseEnter={e => showItemTip(e, 'Zoom out')}
              onMouseLeave={hideItemTip}
            >
              -
            </span>
            <span className='zoom-icon'
              onClick={handleFitViw}
              onMouseEnter={e => showItemTip(e, 'Fit View, Shortcuts: ctrl+1')}
              onMouseLeave={hideItemTip}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              FIT
            </span>
            <span className='zoom-icon'
              onClick={handleZoomOut}
              onMouseEnter={e => showItemTip(e, 'Zoom in')}
              onMouseLeave={hideItemTip}
            >
              +
            </span>
          </span>
          <span className='icon-span'
            onClick={handleEnableSearch}
            onMouseEnter={e => showItemTip(e, 'Input the ID to Search Node')}
            onMouseLeave={hideItemTip}
          >
            <SearchOutlined style={enableSearch ? iconStyle.enable : iconStyle.disable} />
          </span>
          {enableSearch &&
            <span
              onMouseEnter={e => showItemTip(e, 'Input the ID of the Interested Node and Click \'Submit\'')}
              onMouseLeave={hideItemTip}
            >
              <input type="text" id="search-node-input" />
              <button id="submit-button" onClick={handleSearchNode}>Submit</button>
            </span>
          }
          {enableSelectPathEnd &&
            <span
              onMouseEnter={e => showItemTip(e, 'Select Only Two Nodes as Ends and Click `Find Path`')}
              onMouseLeave={hideItemTip}
            >
              <button id="submit-button" onClick={handleFindPath}>Find Path</button>
            </span>}
        </div>
      </div>
      <div className='menu-tip' style={{ opacity: menuTip.opacity }}>
        {menuTip.text}
      </div>
      <div id='g6-canavs-menu-item-tip' style={{ opacity: menuItemTip.opacity }}>
        {menuItemTip.text}
      </div>
      {/* <FilterDrawer
        visible={filterPanelVisible}
        setVisible={clickFilterIcon}
        setFiltered={setFiltered}
        typeList={typeList}
        filter={filter}
        resetFilterMapping={resetFilterMapping}
        draggable={true}
        />
      <LabelMappingDrawer
        visible={labelMappingPanelVisible}
        setVisible={clickLabelMappingIcon}
        setConfigured={setLabelConfigured}
        typePropertyList={typePropertyList}
        resetFilterMapping={resetFilterMapping}
        configLabel={configLabel}
        draggable={true}
      />
      {
        enableLayoutConfig &&
        <LayoutConfig 
          visible={enableLayoutConfig}
          graph={graph}
          close={clickLayoutConfig}
          updateLayout={updateLayout}
        />
      } */}
    </>
  );
};

export default CanvasMenu;
