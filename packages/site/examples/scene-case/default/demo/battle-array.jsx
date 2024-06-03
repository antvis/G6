import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import styled from 'styled-components';

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

const PlayerNode = ({ playerInfo }) => {
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

const data = {
  nodes: [
    {
      id: '50251337',
      x: 50,
      y: 68,
      isTeamA: '1',
      player_id: '50251337',
      player_shirtnumber: '19',
      player_enName: 'Justin Kluivert',
      player_name: '尤斯廷-克鲁伊维特',
    },
    {
      id: '50436685',
      x: 25,
      y: 68,
      isTeamA: '1',
      player_id: '50436685',
      player_shirtnumber: '24',
      player_enName: 'Antoine Semenyo',
      player_name: '塞门约',
    },
    {
      id: '50204813',
      x: 50,
      y: 89,
      isTeamA: '1',
      player_id: '50204813',
      player_shirtnumber: '9',
      player_enName: 'Dominic Solanke',
      player_name: '索兰克',
    },
    {
      id: '50250175',
      x: 75,
      y: 68,
      isTeamA: '1',
      player_id: '50250175',
      player_shirtnumber: '16',
      player_enName: 'Marcus Tavernier',
      player_name: '塔韦尼耶',
    },
    {
      id: '50213675',
      x: 65,
      y: 48,
      isTeamA: '1',
      player_id: '50213675',
      player_shirtnumber: '4',
      player_enName: 'Lewis Cook',
      player_name: '刘易斯-库克',
    },
    {
      id: '50186648',
      x: 35,
      y: 48,
      isTeamA: '1',
      player_id: '50186648',
      player_shirtnumber: '10',
      player_enName: 'Ryan Christie',
      player_name: '克里斯蒂',
    },
    {
      id: '50279448',
      x: 38,
      y: 28,
      isTeamA: '1',
      player_id: '50279448',
      player_shirtnumber: '6',
      player_enName: 'Chris Mepham',
      player_name: '迈帕姆',
    },
    {
      id: '50061646',
      x: 15,
      y: 28,
      isTeamA: '1',
      player_id: '50061646',
      player_shirtnumber: '15',
      player_enName: 'Adam Smith',
      player_name: '亚当-史密斯',
    },
    {
      id: '50472140',
      x: 62,
      y: 28,
      isTeamA: '1',
      player_id: '50472140',
      player_shirtnumber: '27',
      player_enName: 'Ilya Zabarnyi',
      player_name: '扎巴尔尼',
    },
    {
      id: '50544346',
      x: 85,
      y: 28,
      isTeamA: '1',
      player_id: '50544346',
      player_shirtnumber: '3',
      player_enName: 'Milos Kerkez',
      player_name: '科尔克兹',
    },
    {
      id: '50062598',
      x: 50,
      y: 7,
      isTeamA: '1',
      player_id: '50062598',
      player_shirtnumber: '1',
      player_enName: 'Neto',
      player_name: '内托',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  animation: false,
  x: 10,
  y: 50,
  width: 480,
  height: 720,
  node: {
    type: 'react',
    style: {
      size: [120, 60],
      ports: [{ placement: 'center' }],
      x: (d) => d.x * 3.5,
      y: (d) => d.y * 3.5,
      fill: 'transparent',
      component: (data) => <PlayerNode playerInfo={data} />,
    },
  },
  plugins: [
    {
      type: 'background',
      width: '480px',
      height: '720px',
      backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EmPXQLrX2xIAAAAAAAAAAAAADmJ7AQ/original)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      opacity: 1,
    }
  ],
});

graph.render();
