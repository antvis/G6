import React, { useState } from 'react';
import LargeDemoPage from '../../pages/g6v5-demo';
import SmallDemoPage from '../../pages/g6v5-demo-small';
import { Header } from '@antv/dumi-theme-antv/dist/slots/Header';
import { Footer } from '@antv/dumi-theme-antv/dist/slots/Footer';

const LargeGraph: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('demo1');
  const handleChangeDemo = (e) => {
    setActiveDemo(e.target.value || 'demo1');
  }
  return (
    <>
      <Header />
      { activeDemo === 'demo1' ? <LargeDemoPage language='zh' /> : <SmallDemoPage language='zh' />}
      <a
        style={{ position: 'absolute', top: '86px', right: '24px', width: '135px', textAlign: 'center' }}
        href='http://github.com/antvis/g6'
        target='_blank'
      >
        {'GitHub Star 鼓励 ❤️'}
      </a>
      <select
        className='v5-demos'
        onChange={handleChangeDemo}
        style={{ position: 'absolute', top: '120px', right: '24px', width: '135px' }}
      >
        <option value="demo1">大图 DEMO(7167 nodes)</option>
        <option value="demo2">小图 DEMO</option>
      </select>
      <Footer />
    </>
  );
};

export default LargeGraph;