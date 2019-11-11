import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import BannerSVG from '@antv/gatsby-theme-antv/site/components/BannerSVG';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const coverImage = BannerSVG();

  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
      title: t('简单方便'),
      description: t(
        '从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
      title: t('方便可靠'),
      description: t(
        '大量产品实践之上，提供绘图引擎、完备图形语法，专业设计规范。',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
      title: t('无限可能'),
      description: t(
        '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。',
      ),
    },
  ];

  const companies = [
    {
      name: '公司1',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Z1NnQ6L4xCIAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '公司2',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6u3hTpsd7h8AAAAAAAAAAABkARQnAQ',
    },
    {
      name: '公司3',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Fw8HTbFgUdAAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '公司4',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lUdjTqQix48AAAAAAAAAAABkARQnAQ',
    },
    {
      name: '公司5',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1q8NQZ9GaN0AAAAAAAAAAABkARQnAQ',
    },
    {
      name: '公司6',
      img:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SqmTSqj4FjEAAAAAAAAAAABkARQnAQ',
    },
  ];

  const notifications = [
    {
      type: t('测试'),
      title: t('G6 3.2 全新上线！'),
      date: '2019.12.04',
      link: '#',
    },
  ];

  const cases = [
    {
      logo:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*2Ij9T76DyCcAAAAAAAAAAABkARQnAQ',
      title: '灯塔专业版',
      description:
        '深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金',
      link: '#',
      image:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*oCd7Sq3N-QEAAAAAAAAAAABkARQnAQ',
    },
    {
      logo:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*ekkhR7ISzUsAAAAAAAAAAABkARQnAQ',
      title: '灯塔专业版2',
      description:
        '深2222222入金融的基金深入金融的基金深2222222入金融的基金深入金融的基金深2222222入金融的基金深入金融的基金',
      image:
        'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*oCd7Sq3N-QEAAAAAAAAAAABkARQnAQ',
    },
  ];

  const downloadButton = {
    text: '下载使用',
    link: 'https://antv.alipay.com/zh-cn/index.html',
  };
  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <Banner
        coverImage={coverImage}
        title={t('G6 图可视化引擎')}
        description={t(
          'G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图 图分析 应用或是 图编辑器 应用。',
        )}
        buttonText={t('继续了解')}
        buttonHref={'#products'}
        notifications={notifications}
        className="banner"
        // video="https://mdn.alipayobjects.com/afts/file/A*qmPlRYhAlBkAAAAAAAAAAABjAQAAAQ?bz=antv_site"
        // githubStarLink="https://ghbtns.com/github-btn.html?user=antvis&repo=g2&type=star&count=true&size=large"
        // downloadButton={downloadButton}
        // style={{ height: '600px' }}
      />
      <Features
        features={features}
        // className="features"
        style={{ width: '100%' }}
      />
      <Cases cases={cases} />
      <Companies
        title={t('感谢一路的合作伙伴')}
        companies={companies}
        // className="companies"
        // style={{ width: '100%' }}
      />
    </>
  );
};

export default IndexPage;