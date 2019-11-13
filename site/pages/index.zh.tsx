import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const coverImage = <img src='https://gw.alipayobjects.com/zos/basement_prod/7a3d508b-0dd1-47ec-9de6-a9843c4fa063.svg' />//BannerSVG();

  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0e03c123-031b-48ed-9050-4ee18c903e94.svg',
      title: t('专注关系，完备基建'),
      description: t(
        'G6 是一个专注于关系数据的、完备的图可视化引擎',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/42d17359-8607-4227-af93-7509eabb3163.svg',
      title: t('领域深钻，顶尖方案'),
      description: t(
        '扎根实际具体业务场景、结合业界领先成果，沉淀顶尖解决方案',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/acd8d1f3-d256-42b7-8340-27e5d5fde92c.svg',
      title: t('简单易用，扩展灵活'),
      description: t(
        '精心设计的简单、灵活、高可拓展的接口，满足你的无限创意',
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
      type: t('点线析源远'),
      title: t('G6 3.2.0 全新发布！'),
      date: '2019.11.22',
      link: 'https://github.com/antvis/g6',
    },
    {
      type: t('小试牛刀'),
      title: t('Graphin 1.0.0 全新发布！'),
      date: '2019.11.22',
      link: 'https://github.com/antvis/g6',
    }
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