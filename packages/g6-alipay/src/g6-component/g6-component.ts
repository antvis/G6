Component({
  data: {
    supportNative: !!my._createCanvas,
  },
  props: {
    style: '',
    width: 100,
    height: 100,
    forceMini: false,
    pixelRatio: 1,
    onTouchEvent: () => {},
    onInit: () => {},
    onError: () => {},
  },
  didMount() {
    if (!this.data.supportNative || this.props.forceMini) {
      this.onCanvasReady();
    }
  },
  methods: {
    onCanvasReady() {
      my.createSelectorQuery()
        .select('#canvas')
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            this.rect = ret[0];
          } else {
            this.rect = {
              bottom: 0,
              height: 0,
              left: 0,
              right: 0,
              top: 0,
              width: 0,
            };
            this.props.onError && this.props.onError(ret);
          }
          if (this.data.supportNative && !this.props.forceMini) {
            console.log('native support');
            my._createCanvas({
              id: 'canvas',
              success: (canvas) => {
                this.ctx = canvas.getContext('2d');
                this.ctx.scale(this.props.pixelRatio, this.props.pixelRatio);
                this.props.onInit(this.ctx, ret[0], canvas, 'mini-native');
              },
            });
          } else {
            console.log('web support');
            this.ctx = my.createCanvasContext('canvas');
            this.ctx.scale(this.props.pixelRatio, this.props.pixelRatio);
            this.props.onInit(this.ctx, ret[0], null, 'mini');
          }
        });
    },
    ontouch(e) {
      const { target } = e;

      const ev: any = {
        ...e,
        changedTouches: [],
        touches: [],
      };

      e.touches.forEach((touchEvent) => {
        ev.touches.push(modifyEvent(touchEvent, target, this.rect));
      });

      e.changedTouches.forEach((touchEvent) => {
        // 真实的x的位置为client的位置 + rect的位置 +
        ev.changedTouches.push(modifyEvent(touchEvent, target, this.rect));
      });
      this.props.onTouchEvent(ev);
    },
  },
});

function modifyEvent(touchEvent, target, rect) {
  const x = touchEvent.pageX - rect.left; // target.offsetLeft;
  const y = touchEvent.pageY - rect.top; // target.offsetTop;
  return {
    x,
    y,
    identifier: touchEvent.identifier,
    clientX: x,
    clientY: y,
    pageX: x,
    pageY: y,
  };
}
