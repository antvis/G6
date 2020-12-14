import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';

const GraphMarker = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <div
        style={{
          margin: '0 auto',
          padding: '0',
          height: 'calc(100vh - 64px)',
          background:
            'url(https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*ZW9RSYTyEDcAAAAAAAAAAABkARQnAQ) center center no-repeat',
        }}
      >
        <iframe
          src="https://render.mybank.cn/p/c/17sfi50vhu80"
          title="GraphMarker"
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
          sandbox="allow-downloads allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </div>
    </>
  );
};

export default GraphMarker;
