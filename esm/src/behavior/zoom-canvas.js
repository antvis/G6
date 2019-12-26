var DELTA = 0.05;
export default {
    getDefaultCfg: function () {
        return {
            sensitivity: 2,
            minZoom: 0.1,
            maxZoom: 10
        };
    },
    getEvents: function () {
        return {
            wheel: 'onWheel'
        };
    },
    onWheel: function (e) {
        e.preventDefault();
        if (!this.shouldUpdate.call(this, e)) {
            return;
        }
        var graph = this.graph;
        var canvas = graph.get('canvas');
        var point = canvas.getPointByClient(e.clientX, e.clientY);
        var pixelRatio = canvas.get('pixelRatio');
        var sensitivity = this.get('sensitivity');
        var ratio = graph.getZoom();
        // 兼容IE、Firefox及Chrome
        if (e.wheelDelta < 0) {
            ratio = 1 - DELTA * sensitivity;
        }
        else {
            ratio = 1 + DELTA * sensitivity;
        }
        var zoom = ratio * graph.getZoom();
        if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
            return;
        }
        graph.zoom(ratio, { x: point.x / pixelRatio, y: point.y / pixelRatio });
        graph.paint();
        graph.emit('wheelzoom', e);
    }
};
//# sourceMappingURL=zoom-canvas.js.map