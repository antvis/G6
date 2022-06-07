import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Tools = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />

      <div
        style={{
          margin: '20px auto',
          padding: '0',
          width: 'calc(100vw - 96px)',
        }}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Card
              title={'低代码搭建平台：GraphInsight'}
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    window.open('https://graphinsight.antgroup.com/', '_blank');
                  }}
                >
                  点击进入
                </Button>
              }
            >
              GraphInsight 是 AntV 团队于 2022.06.06
              对外开放的一款图分析应用的低代码搭建平台。用户无需代码开发，即可在线完成关系数据的通道映射，自主布局，探索分析。基于
              G6 强大图可视分析能力，以及 Graphin
              的组件组合能力，用户还可一键导出配置代码，生成SDK，集成到业务系统中，大大降
              低初始研发门槛 与 后续维护成本。
              <img
                style={{
                  display: 'block',
                }}
                width="100%"
                src="https://gw.alipayobjects.com/mdn/rms_0d75e8/afts/img/A*eXL9T6xqPlUAAAAAAAAAAAAAARQnAQ"
                alt=""
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="交互式文档工具：GraphMaker"
              extra={
                <Button
                  onClick={() => {
                    window.open('https://render.mybank.cn/p/c/17sfi50vhu80', '_blank');
                  }}
                >
                  点击进入
                </Button>
              }
            >
              GraphMaker 是 2020.11.22 开放的一款交互式文档，用户可以在该网站上，所见即所得地配置 G6
              的节点，边，布局等参数的配置，并支持一键导出代码，极大提高了 G6 的研发效率。
              <img
                style={{
                  display: 'block',
                }}
                width="100%"
                src="https://gw.alipayobjects.com/mdn/rms_0d75e8/afts/img/A*zseJQJAnvJQAAAAAAAAAAAAAARQnAQ"
                alt=""
              />
            </Card>
          </Col>
        </Row>

        {/* <iframe
          src="https://graphinsight.antgroup.com"
          title="Tools"
          style={{
            width: '100%',
            height: '80%',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-downloads allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        ></iframe> */}
        {/* <iframe
          src="https://render.mybank.cn/p/c/17sfi50vhu80"
          title="Tools"
          style={{
            width: '100%',
            height: '50%',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-downloads allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        /> */}
      </div>
    </>
  );
};

export default Tools;
