Page({
  data: {
    width: 500,
    height: 500,
  },
  onLoad() {
    const { windowWidth, windowHeight } = my.getSystemInfoSync();
    this.setData({
      width: windowWidth,
      height: windowHeight,
    });
  },
  onCanvasInit(ctx, rect, canvas, renderer) {
    // ctx.fillStyle = '#000';
    console.log(ctx, rect, canvas);
    ctx.fillStyle = `rgb(${12}, ${255}, ${44})`;

    ctx.beginPath();
    ctx.arc(100, 100, 20, 0, 2 * Math.PI);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#108ee9';
    ctx.rect(25, 25, 50, 50);
    ctx.stroke();

    ctx.scale(2, 2);

    ctx.beginPath();
    ctx.rect(25, 25, 50, 50);
    ctx.stroke();
    ctx.restore();

    if (renderer === 'mini') {
      ctx.draw();
    }
  },
  onTouch(e) {
    console.log('canvas on touch', e);
  },
});
