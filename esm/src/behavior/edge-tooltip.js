import base from './tooltip-base';
export default Object.assign({
    getDefaultCfg: function () {
        return {
            item: 'edge',
            formatText: function (model) { return 'source:' + model.source + ' target:' + model.target; }
        };
    },
    getEvents: function () {
        return {
            'edge:mouseenter': 'onMouseEnter',
            'edge:mouseleave': 'onMouseLeave',
            'edge:mousemove': 'onMouseMove'
        };
    }
}, base);
//# sourceMappingURL=edge-tooltip.js.map