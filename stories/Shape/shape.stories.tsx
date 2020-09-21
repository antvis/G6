// import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';
import React from 'react';
import DefaultShape from './component/default-shape';
import Image from './component/image';
import CustomNode from './component/custom-node';
import Polyline from './component/polyline';
import Image2 from './component/image2';
import Quadratic from './component/quadratic';
import HideItem from './component/hide-item';
import Arc from './component/arc';
import CustomCardNode from './component/card-node';
import ExtendNode from './component/extend-node';
import LostStateStyle from './component/loseStateStyle';
import HideInData from './component/hide-in-data';
import IntervalChart from './component/interval-chart';
import LineChart from './component/line-chart';
import PointChart from './component/point-chart';
import PieChart from './component/pie-chart';
import MultiChart from './component/multi-chart';
import StateOpacity from './component/state-opacity';
import PolylineCombo from './component/polyline-combo';
import XML from './component/xml';

export default { title: 'Shape' };

storiesOf('Shape', module)
  .add('default node', () => (
    // 一个 add 表示添加一个 story
    <DefaultShape />
  ))
  .add('image node', () => (
    // 一个 add 表示添加一个 story
    <Image />
  ))
  .add('image node 2', () => (
    // 一个 add 表示添加一个 story
    <Image2 />
  ))
  .add('custom node', () => <CustomNode />)
  .add('polyline', () => <Polyline />)
  .add('quadratic', () => <Quadratic />)
  .add('arc', () => <Arc />)
  .add('hide item', () => <HideItem />)
  .add('card-node', () => <CustomCardNode />)
  .add('extend-node', () => <ExtendNode />)
  .add('lose state style', () => <LostStateStyle />)
  .add('hide by data', () => <HideInData />)
  .add('IntervalChart', () => <IntervalChart />)
  .add('LineChart', () => <LineChart />)
  .add('PointChart', () => <PointChart />)
  .add('PieChart', () => <PieChart />)
  .add('MultiChart', () => <MultiChart />)
  .add('xml node', () => <XML />)
  .add('state opacity', () => <StateOpacity />)
  .add('polyline with combo', () => <PolylineCombo />);
