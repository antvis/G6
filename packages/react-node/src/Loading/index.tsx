import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        margin: 'auto',
        marginTop: 120,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div>
        <img src="https://gw.alipayobjects.com/zos/antfincdn/cfg5jFqgVt/DiceGraph.png" />
        <h3>L o a d i n g . . . </h3>
      </div>
    </div>
  );
}
