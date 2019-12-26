import base from './tooltip-base';
export default Object.assign({
    getDefaultCfg: function () {
        return {
            item: 'node',
            formatText: function (model) { return model.label; }
        };
    },
    getEvents: function () {
        return {
            'node:mouseenter': 'onMouseEnter',
            'node:mouseleave': 'onMouseLeave',
            'node:mousemove': 'onMouseMove'
        };
    }
}, base);
//# sourceMappingURL=tooltip.js.map