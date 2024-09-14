import { ExtensionCategory, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import styled from 'styled-components';
import data from '../dataset/euro-cup.json';
import { Graph } from '../graph';

const Player = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Shirt = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 40px;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const Number = styled.div`
  color: #fff;
  font-family: 'DingTalk-JinBuTi';
  font-size: 10px;
  top: 20px;
  left: 15px;
  z-index: 1;
  margin-top: 16px;
  margin-left: -2px;
`;

const Label = styled.div`
  max-width: 120px;
  padding: 0 8px;
  color: #fff;
  font-size: 10px;
  background-image: url('https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*s2csQ48M0AkAAAAAAAAAAAAADsvfAQ/original');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayerNode = ({ playerInfo }: any) => {
  const { isTeamA, player_shirtnumber, player_name } = playerInfo;
  return (
    <Player>
      <Shirt>
        <img
          src={
            isTeamA
              ? 'https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*0oAaS42vqWcAAAAAAAAAAAAADsvfAQ/original'
              : 'https://mdn.alipayobjects.com/huamei_92awrc/afts/img/A*BYH5SauBNecAAAAAAAAAAAAADsvfAQ/original'
          }
        />
        <Number>{player_shirtnumber}</Number>
      </Shirt>
      <Label>{player_name}</Label>
    </Player>
  );
};

register(ExtensionCategory.NODE, 'react', ReactNode);

export const EuroCup = () => {
  return (
    <div>
      <Graph
        options={{
          data,
          animation: false,
          x: 10,
          y: 50,
          width: 480,
          height: 720,
          node: {
            type: 'react',
            style: {
              size: [100, 60],
              ports: [{ placement: 'center' }],
              x: (d: any) => d.x * 3.5,
              y: (d: any) => d.y * 3.5,
              fill: 'transparent',
              component: (data: any) => <PlayerNode playerInfo={data} />,
            },
          },
          plugins: [
            {
              type: 'background',
              width: '480px',
              height: '720px',
              backgroundImage:
                'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EmPXQLrX2xIAAAAAAAAAAAAADmJ7AQ/original)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              opacity: 1,
            },
          ],
        }}
      />
    </div>
  );
};
