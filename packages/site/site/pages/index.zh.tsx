import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import './index.less';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  const coverImage = (
    <img
      style={{ width: '115%', marginLeft: '-8%', marginTop: '7%' }}
      src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*j5AqSpmNPdYAAAAAAAAAAABkARQnAQ"
    />
  ); //BannerSVG();

  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0e03c123-031b-48ed-9050-4ee18c903e94.svg',
      title: t('专注关系，完备基建'),
      description: t('G6 是一个专注于关系数据的、完备的图可视化引擎'),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/42d17359-8607-4227-af93-7509eabb3163.svg',
      title: t('领域深钻，顶尖方案'),
      description: t('扎根实际具体业务场景、结合业界领先成果，沉淀顶尖解决方案'),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/acd8d1f3-d256-42b7-8340-27e5d5fde92c.svg',
      title: t('简单易用，扩展灵活'),
      description: t('精心设计的简单、灵活、高可拓展的接口，满足你的无限创意'),
    },
  ];

  const companies = [
    {
      name: '支付宝',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6u3hTpsd7h8AAAAAAAAAAABkARQnAQ',
    },
    {
      name: '阿里云',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Z1NnQ6L4xCIAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '天猫',
      img: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*BQrxRK6oemMAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '菜鸟',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SqmTSqj4FjEAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '网商银行',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Fw8HTbFgUdAAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '盒马',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ePJMQZCb8vkAAAAAAAAAAABkARQnAQ',
    },
    {
      name: 'Geabase',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Vi-pSbxeraIAAAAAAAAAAABkARQnAQ',
    },
    {
      name: '滴滴',
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3UihQLQSrXoAAAAAAAAAAABkARQnAQ',
    },
  ];

  const cases = [
    {
      logo:
        'https://camo.githubusercontent.com/53886f0e306c9f01c96dee2edca3992830b7cbb769118029a7e5d677deb7e67e/68747470733a2f2f67772e616c697061796f626a656374732e636f6d2f7a6f732f616e7466696e63646e2f306234487a4f63454a592f4772617068696e2e737667',
      title: t('Graphin 图可视分析组件'),
      isAppLogo: true,
      description: t(
        'Graphin 是一款基于 G6 封装的 React 分析组件库，专注在关系可视分析领域，简单高效，开箱即用。',
      ),
      link: `https://graphin.antv.vision/${i18n.language}`,
      image:
        'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*LKq7Q5wPA0AAAAAAAAAAAAAAARQnAQ',
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ch6rTrCxb6YAAAAAAAAAAABkARQnAQ',
      title: t('基于 G6 的动态决策树'),
      isAppLogo: true,
      description: t(
        '基于 G6 实现的动态决策树，辅助用户寻找合适的可视化方式。它展示了 G6 强大的自定义节点和动画的能力。',
      ),
      link: `/${i18n.language}/examples/case/decisionBubbles`,
      image:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*10b6R5fkyJ4AAAAAAAAAAABkARQnAQ',
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*95GYRI0zPx8AAAAAAAAAAABkARQnAQ',
      title: t('基于 G6 的图分析应用'),
      isAppLogo: true,
      description: t(
        '社交网络分析是图可视化中一个重要的应用场景。随着社交网络越来越流行，人与人、人与组织之间的关系变得越来越复杂，使用传统的分析手段，已经很难满足我们的分析需求。在这种情况下，图分析及图可视化显得愈发重要。',
      ),
      link: `/${i18n.language}/docs/manual/cases/relations`,
      image:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RYFQSZYewokAAAAAAAAAAABkARQnAQ',
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ',
      title: t('基于 G6 的关系时序分析应用'),
      isAppLogo: true,
      description: t(
        '基于 G6 的关系时序分析应用，解决应急过程中流程、影响面、应急预案等一系列应急决策辅助信息和手段，快速止血以减少和避免故障升级。',
      ),
      link: `/${i18n.language}/docs/manual/cases/sequenceTime`,
      image:
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*m41kSpg17ZkAAAAAAAAAAABkARQnAQ',
    },
  ];

  const bannerButtons = [
    {
      text: t('图表示例'),
      link: `/${i18n.language}/examples/tree/compactBox`,
      type: 'primary',
    },
    {
      text: t('开始使用'),
      link: `/${i18n.language}/docs/manual/introduction`,
    },
  ];

  const insNotifications = [
    {
      type: t('推荐'),
      title: t('图可视分析如此简单'),
      date: '2020.11.22',
      link: 'https://www.yuque.com/antv/g6-blog/zgb5d7',
    },
    {
      type: t('推荐'),
      title: t('G6 4.0: 不仅成长了一点'),
      date: '2020.11.22',
      link: 'https://www.yuque.com/antv/g6-blog/nnmqbk',
    },
  ];

  return (
    <>
      <SEO title={t('G6 图可视化引擎')} titleSuffix="AntV" lang={i18n.language} />
      <Banner
        notifications={insNotifications}
        coverImage={coverImage}
        title={t('G6 图可视化引擎')}
        description={t(
          'G6 是一个简单、易用、完备的图可视化引擎，它在高定制能力的基础上，提供了一系列设计优雅、便于使用的图可视化解决方案。能帮助开发者搭建属于自己的图可视化、图分析、或图编辑器应用。',
        )}
        className="banner"
        buttons={bannerButtons}
      />
      <Features features={features} style={{ width: '100%' }} />
      <Cases cases={cases} />
      <Companies title={t('感谢信赖')} companies={companies} />
    </>
  );
};

export default IndexPage;
