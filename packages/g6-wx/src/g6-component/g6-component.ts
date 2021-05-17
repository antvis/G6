Component({
  data: {},
  properties: {
    style: {
      type: String,
      value: '',
    },
    width: {
      type: Number,
      value: 100,
    },
    height: {
      type: Number,
      value: 100,
    },
    onInit: {
      type: Function,
      value: () => {},
    },
    onTouchEvent: {
      type: Function,
      value: () => {},
    },
    onError: {
      type: Function,
      value: () => {},
    },
    pixelRatio: {
      type: Number,
      value: 1,
    },
  },
  ready() {
    const query = wx.createSelectorQuery().in(this);
    query
      .select('#g6-canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec((ret) => {
        console.log('ret', ret);
        const { node: canvas } = ret[0];

        canvas.width = this.data.width * this.data.pixelRatio;
        canvas.height = this.data.height * this.data.pixelRatio;
        this.rect = {
          width: this.data.width * this.data.pixelRatio,
          height: this.data.height * this.data.pixelRatio,
          left: canvas._left,
          top: canvas._top,
        };
        console.log('rect', this.rect);
        this.ctx = canvas.getContext('2d');
        this.data.onInit(this.ctx, this.rect, canvas, 'mini-native');
      });
  },
  methods: {
    error(e) {
      this.data.onError(e);
    },
    ontouch(e) {
      let i = 0;
      for (i = 0; i < e.touches.length; i++) {
        modifyEvent(e.touches[i], this.data.pixelRatio);
      }
      for (i = 0; i < e.changedTouches.length; i++) {
        modifyEvent(e.changedTouches[i], this.data.pixelRatio);
      }
      this.data.onTouchEvent(e);
    },
  },
});

function modifyEvent(touchEvent, pixelRatio) {
  touchEvent.clientX = touchEvent.x * pixelRatio;
  touchEvent.clientY = touchEvent.y * pixelRatio;
  touchEvent.pageX = touchEvent.x * pixelRatio;
  touchEvent.pageY = touchEvent.y * pixelRatio;
}
