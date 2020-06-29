import Base, { IPluginBaseConfig } from '../base';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDom from '@antv/dom-util/lib/create-dom';
import insertCss from 'insert-css';

import { LegendDataCfg, ColorMapCfg, SelectedStatusCfg } from '../../types'
import { CATE_20 } from './defaultColor'

interface LegendConfig extends IPluginBaseConfig {
  nodeAttr?: string;
  edgeAttr?: string;
  nodeLegendData?: LegendDataCfg[] | string[] | number[];
  edgeLegendData?: LegendDataCfg[] | string[] | number[];
  nodeColorMap?: ColorMapCfg | [];
  edgeColorMap?: ColorMapCfg | [];
  nodeSelectedStatus?: SelectedStatusCfg;
  edgeSelectedStatus?: SelectedStatusCfg;
  handleLegendChange?: (evt: Event, type: string) => void;
}

insertCss(`
  .g6-component-legend{
    max-width: 500px;
  }
  .g6-legend-item{
      cursor: pointer;
      display: inline-block;
      padding: 8px;
  }
  .g6-legend-item-rect{
      width: 12px;
      height: 12px;
      display: inline-block;
  }
  .g6-legend-tab-head-list{
    border-bottom: 1px solid lightgray;
  }
  .g6-legend-tab-head{
      cursor: pointer;
      display: inline-block;
      padding: 5px;
  }
  .g6-legend-tab-head.active{
    color: #1890ff;
    font-weight: 500;
    border-bottom: 2px solid #1890ff;
  }
  .g6-legend-tab-content{
    display: none;
  }
  .g6-legend-tab-content.active{
    display: inline-block;
  }
  `
)

export default class Legend extends Base {
  constructor(cfg: LegendConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): LegendConfig {
    const self = this;
    return {
      container: null, // container of searchbox. default: the container of graph
      className: 'g6-component-legend',
      nodeAttr: null,
      edgeAttr: null,
      nodeLegendData: null,
      edgeLegendData: null,
      nodeSelectedStatus: {}, // 初始状态下的legend状态。默认为全没有选中
      edgeSelectedStatus: {},
      nodeColorMap: null,
      edgeColorMap: null,
      handleLegendChange(evt, type) { // 点击legend的行为。默认情况下，为隐藏被选中节点/边，淡化被选中legend
        self.toggleSelectedItems(type)
        self.toggleSelectedLegends(evt)
      },
    };
  }

  private onClickLegend(cate, legendType, evt) {
    this.toggleSelectedCat(cate, legendType)
    this.get('handleLegendChange')(evt, legendType)
  }

  // 更新selectedCatStatus
  private toggleSelectedCat(cat, legendType) {
    let selected = this.get('nodeSelectedStatus');
    if (legendType === 'edge') {
      selected = this.get('edgeSelectedStatus')
    }
    selected[cat.val] = !selected[cat.val]
    this.set('selected', selected)
  }

  // 隐藏选中的点/边
  public toggleSelectedItems(legendType) {
    const graph = this.get('graph')
    if (legendType === 'node') {
      const selected = this.get('nodeSelectedStatus')
      const serieName = this.get('nodeAttr')
      graph.getNodes().forEach(n => {
        if (selected[n.getModel()[serieName]]) graph.hideItem(n)
        else graph.showItem(n)
      })
    } else if (legendType === "edge") {
      const selected = this.get('edgeSelectedStatus')
      const serieName = this.get('edgeAttr')
      graph.getEdges().forEach(edge => {
        if (selected[edge.getModel()[serieName]]) graph.hideItem(edge)
        else graph.showItem(edge)
      })
    }
  }

  // 选中的legend淡化，并添加selected class
  public toggleSelectedLegends(e) {
    const legendItem = e.currentTarget
    legendItem.classList.toggle('selected');
    if (legendItem.classList.contains('selected')) {
      modifyCSS(legendItem, { opacity: 0.4 })
    } else {
      modifyCSS(legendItem, { opacity: 1 })
    }
  }

  // 设置渲染legend items所需的数据
  private initLegendData(type) {
    const cateCfg = type === 'edge' ? 'edgeLegendData' : 'nodeLegendData'
    const attrName = type === 'edge' ? this.get('edgeAttr') : this.get('nodeAttr')
    let legendData = this.get(cateCfg)

    if (!legendData || legendData.length === 0) {
      // 如果没有指定nodeLegendData，通过指定的attr获得该attr所有可能取值
      const graph = this.get('graph')
      let allCats;
      legendData = []
      if (type === 'node') {
        allCats = new Set(graph.getNodes().map(node => node.getModel()[attrName]))
      } else {
        allCats = new Set(graph.getEdges().map(edge => edge.getModel()[attrName]))
      }
      allCats.forEach(cat => {
        legendData.push({ 'val': cat, 'label': cat })
      })
      legendData.sort((a, b) => a.val - b.val)
    } else if (typeof (legendData[0]) !== 'object') {
      legendData = legendData.map(cat => {
        return {
          val: cat,
          label: cat,
        }
      })
    }
    this.set(cateCfg, legendData)
    return legendData
  }

  private createItemDom(cat: LegendDataCfg, legendType: string) {
    const colorMap = legendType === 'edge' ? this.get('edgeColorMap') : this.get('nodeColorMap')
    const borderR = legendType === 'edge' ? 0 : '50%'
    const itemDom = createDom(
      `<div class="g6-legend-item">
        <div 
        class="g6-legend-item-rect" 
        style="background-color: ${colorMap[cat.val]}; 
        border-radius: ${borderR};">
        </div>
        <span class="g6-legend-item-text">${cat.label}</span>
      </div>`
    )
    itemDom.addEventListener('click', this.onClickLegend.bind(this, cat, legendType))
    return itemDom
  }

  private createLegendItems(type) {
    const legendData = this.initLegendData(type)
    this.setColorMap(`${type}ColorMap`, legendData)
    this.initSelectedStatus(legendData, `${type}SelectedStatus`)

    const itemDoms = legendData.map((cate, i) => {
      return this.createItemDom(cate, type)
    })
    const fragment = document.createDocumentFragment();
    itemDoms.forEach(c => fragment.appendChild(c));
    return fragment
  }

  private createTab() {
    const tabDom = createDom(
      `<div class="g6-legend-tab-container">
        <div class="g6-legend-tab-head-list">
          <div class="g6-legend-tab-head active">Node</div>
          <div class="g6-legend-tab-head">Edge</div>
        </div>
        <div class="g6-legend-tab-content-list">
          <div class="g6-legend-tab-content active"></div>
          <div class="g6-legend-tab-content"></div>
        </div>
      </div>
      `
    )

    const tabHeadList = tabDom.getElementsByClassName('g6-legend-tab-head')
    const tabContentList = tabDom.getElementsByClassName('g6-legend-tab-content');
    const showTab = (evt) => {
      for (let i = 0, len = tabHeadList.length; i < len; i++) {
        if (tabHeadList[i] === evt.target) {
          tabHeadList[i].classList.add('active');
          tabContentList[i].classList.add('active');
        } else {
          tabHeadList[i].classList.remove('active');
          tabContentList[i].classList.remove('active');
        }
      }
    }
    for (const item of tabHeadList) {
      item.addEventListener('click', showTab)
    }
    return tabDom
  }

  // 设置每个category的初始选择状态，和用户传入的参数合并
  private initSelectedStatus(series, statusName) {
    const selectedStatus = this.get(statusName)
    series.forEach((serie) => {
      selectedStatus[serie] = serie in selectedStatus ? selectedStatus[serie] : false
    })
    this.set(statusName, selectedStatus)
  }

  private setColorMap(attrName, cats) {
    let colorMap = this.get(attrName)
    // if no config colorMap, use default color
    if (!colorMap || Object.keys(colorMap).length === 0) {
      colorMap = {}
      cats.forEach((cat, i) => {
        colorMap[cat.val] = CATE_20[i % 20]
      })
      this.set(attrName, colorMap)
    }
    return colorMap
  }

  private setGraphColor() {
    const graph = this.get('graph')
    const nodeAttr = this.get('nodeAttr')
    const edgeAttr = this.get('edgeAttr')
    if (nodeAttr) {
      const nodeColorMap = this.get('nodeColorMap')
      graph.node(n => {
        return {
          style: {
            fill: nodeColorMap[n[nodeAttr]],
          }
        }
      })
    }
    if (edgeAttr) {
      const edgeColorMap = this.get('edgeColorMap')
      graph.edge(e => {
        return {
          style: {
            stroke: edgeColorMap[e[edgeAttr]],
          }
        }
      })
    }
    graph.render()
  }

  public init() {
    // create legend div
    const graph = this.get('graph')
    const legend = createDom(`<div class=${this.get('className')}>`)
    modifyCSS(legend, { 'position': 'absolute', 'left': 0, 'top': 0 })
    this.set('legend', legend)

    // append legend to its container 
    let container = this.get('container');
    if (!container) {
      container = graph.get('container');
    }
    container!.appendChild(legend);

    // graph渲染完成后，绘制legend
    const renderLegend = () => {
      this.render()
      graph.off('afterrender', renderLegend)

      // 为nodes & edges设置和legend相同的color map
      this.setGraphColor()
    }
    graph.on('afterrender', renderLegend)
  }

  public render() {
    if (!this.get('nodeAttr') && !this.get('edgeAttr')) {
      return
    }
    const legendElem = this.get('legend')
    legendElem.innerHTML = '' // remove old legend items 
    const nodeFragment = this.createLegendItems('node')
    const edgeFragment = this.createLegendItems('edge')

    // add Legend items: 如果node和edge legend都存在则渲染tab，否则直接渲染
    if (this.get('nodeAttr') === null) {
      legendElem.appendChild(edgeFragment)
    } else if (this.get('edgeAttr') === null) {
      legendElem.appendChild(nodeFragment)
    } else {
      const tabElem = this.createTab()
      tabElem.getElementsByClassName('g6-legend-tab-content')[0].appendChild(nodeFragment)
      tabElem.getElementsByClassName('g6-legend-tab-content')[1].appendChild(edgeFragment)
      legendElem.appendChild(tabElem)
    }
  }

  public destroy() {
    const legend = this.get('legend');

    for (const itemDom of legend.getElementsByClassName('g6-legend-item')) {
      itemDom.removeEventListener('click', this.onClickLegend)
    }

    if (legend) {
      legend.parentNode.removeChild(legend);
    }
  }
}