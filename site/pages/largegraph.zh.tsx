import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import G6 from '../../dist/g6.min.js';
import isArray from '@antv/util/lib/is-array';
import isNumber from '@antv/util/lib/is-number';

const { labelPropagation } = G6.Algorithm;

const duration = 2000;
const animateOpacity = 0.25;
const animateBackOpacity = 0.1;
const realEdgeOapcity = 0.2;
const virtualEdgeOpacity = 0.1;

// Custom super node
G6.registerNode('aggregated-node', {
	draw(cfg, group) {
		let width = 53, height = 27;
		const style = cfg.style || {};

		// halo for hover
		group.addShape('rect', {
			attrs: {
				x: -width * 0.55,
				y: -height * 0.6,
				width: width * 1.1,
				height: height * 1.2,
				fill: style.fill || '#2B384E',
				opacity: 0.9,
				lineWidth: 0,
				radius: ((height / 2) || 13) * 1.2,
			},
			name: 'halo-shape',
			visible: false
		});

		// focus stroke for hover
		group.addShape('rect', {
			attrs: {
				x: -width * 0.55,
				y: -height * 0.6,
				width: width * 1.1,
				height: height * 1.2,
				fill: '#3B4043', // 聚合节点没有颜色含义，用灰色
				stroke: '#AAB7C4',
				lineWidth: 1,
				lineOpacty: 0.85,
				radius: ((height / 2) || 13) * 1.2
			},
			name: 'stroke-shape',
			visible: false
		});

		const keyShape = group.addShape('rect', {
			attrs: {
				...style,
				x: -width / 2,
				y: -height / 2,
				width,
				height,
				fill: '#3B4043', // 聚合节点没有颜色含义，用灰色
				stroke: '#AAB7C4',
				lineWidth: 2,
				cursor: 'pointer',
				radius: (height / 2) || 13,
				lineDash: [2, 2]
			},
			name: 'aggregated-node-keyShape',
		});

		let labelStyle = {};
		if (cfg.labelCfg) {
			labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
		}
		group.addShape('text', {
			attrs: {
				text: `${cfg.count}`,
				x: 0,
				y: 0,
				textAlign: 'center',
				textBaseline: 'middle',
				cursor: 'pointer',
				fontSize: 12,
				fill: '#fff',
				opacity: 0.85,
				fontWeight: 400
			},
			name: 'count-shape',
			className: 'count-shape',
			draggable: true
		});

		// tag for new node
		if (cfg.new) {
			group.addShape('circle', {
				attrs: {
					x: width / 2 - 3,
					y: -height / 2 + 3,
					r: 4,
					fill: '#6DD400',
					lineWidth: 0.5,
					stroke: '#FFFFFF'
				},
				name: 'typeNode-tag-circle',
			});
		}
		return keyShape;
	},
	setState: (name, value, item) => {
		const group = item.get('group');
		if (name === 'layoutEnd' && value) {
			const labelShape = group.find(e => e.get('name') === 'text-shape');
			if (labelShape) labelShape.set('visible', true);
		}
		else if (name === 'hover') {
			if (item.hasState('focus')) {
				return;
			}
			const halo = group.find(e => e.get('name') === 'halo-shape');
			const keyShape = item.getKeyShape();
			if (value) {
				halo && halo.show();
				keyShape.attr('fill', '#676869');
			}
			else {
				halo && halo.hide();
				keyShape.attr('fill', '#3B4043');
			}
		}
		else if (name === 'focus') {
			const stroke = group.find(e => e.get('name') === 'stroke-shape');
			const keyShape = item.getKeyShape();
			const keyShapeStroke = keyShape.attr('stroke');
			if (value) {
				stroke && stroke.show();
				keyShape.attr('fill', keyShapeStroke);
				keyShape.attr('fillOpacity', 0.4);
			}
			else {
				stroke && stroke.hide();
				keyShape.attr('fill', '#3B4043');
				keyShape.attr('fillOpacity', 1);
			}
		}
	},
	update: undefined
}, 'single-node');

// Custom real node
G6.registerNode('real-node', {
	draw(cfg, group) {
		const attribute = cfg.data.extendedAttribute || {};
		let r = 30;
		if (isNumber(cfg.size)) {
			r = cfg.size / 2;
		} else if (isArray(cfg.size)) {
			r = cfg.size[0] / 2;
		}
		const style = cfg.style || {};

		// halo for hover
		group.addShape('circle', {
			attrs: {
				x: 0,
				y: 0,
				r: r + 5,
				fill: style.fill || '#2B384E',
				opacity: 0.9,
				lineWidth: 0
			},
			name: 'halo-shape',
			visible: false
		});

		// focus stroke for hover
		group.addShape('circle', {
			attrs: {
				x: 0,
				y: 0,
				r: r + 5,
				fill: style.fill || '#2B384E',
				stroke: '#fff',
				strokeOpacity: 0.85,
				lineWidth: 1
			},
			name: 'stroke-shape',
			visible: false
		});

		const keyShape = group.addShape('circle', {
			attrs: {
				...style,
				x: 0,
				y: 0,
				r,
				fill: style.fill || '#2B384E',
				stroke: attribute.color || '#5B8FF9',
				lineWidth: 2,
				cursor: 'pointer',
			},
			name: 'aggregated-node-keyShape',
		});

		let labelStyle = {};
		if (cfg.labelCfg) {
			labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
		}

		if (cfg.label) {
			const text = cfg.label;
			let labelStyle: any = {};
			let refY = 0;
			if (cfg.labelCfg) {
				labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
				refY += cfg.labelCfg.refY || 0;
			}
			let offsetY = 0;
			const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
			const lineNum = cfg.labelLineNum || 1;
			offsetY = lineNum * (fontSize || 12);
			group.addShape('text', {
				attrs: {
					text,
					x: 0,
					y: r + refY + offsetY + 5,
					textAlign: 'center',
					textBaseLine: 'alphabetic',
					cursor: 'pointer',
					fontSize,
					fill: '#fff',
					opacity: 0.85,
					fontWeight: 400
				},
				name: 'text-shape',
				className: 'text-shape',
			});
		}

		// tag for new node
		if (cfg.new) {
			group.addShape('circle', {
				attrs: {
					x: r - 3,
					y: -r + 3,
					r: 4,
					fill: '#6DD400',
					lineWidth: 0.5,
					stroke: '#FFFFFF'
				},
				name: 'typeNode-tag-circle',
			});
		}

		return keyShape;
	},
	setState: (name, value, item) => {
		const group = item.get('group');
		if (name === 'layoutEnd' && value) {
			const labelShape = group.find(e => e.get('name') === 'text-shape');
			if (labelShape) labelShape.set('visible', true);
		}
		else if (name === 'hover') {
			if (item.hasState('focus')) {
				return;
			}
			const halo = group.find(e => e.get('name') === 'halo-shape');
			const keyShape = item.getKeyShape();
			if (value) {
				halo && halo.show();
				keyShape.attr('fill', '#314264');
			}
			else {
				halo && halo.hide();
				keyShape.attr('fill', '#2B384E');
			}
		}
		else if (name === 'focus') {
			const stroke = group.find(e => e.get('name') === 'stroke-shape');
			const label = group.find(e => e.get('name') === 'text-shape');
			const keyShape = item.getKeyShape();
			const keyShapeStroke = keyShape.attr('stroke');
			if (value) {
				stroke && stroke.show();
				keyShape.attr('fill', keyShapeStroke);
				keyShape.attr('fillOpacity', 0.4);
				label && label.attr('fontWeight', 800);
			}
			else {
				stroke && stroke.hide();
				keyShape.attr('fill', '#2B384E');
				keyShape.attr('fillOpacity', 1);
				label && label.attr('fontWeight', 400);
			}
		}
	},
	update: undefined
}, 'aggregated-node'); // 这样可以继承 aggregated-node 的 setState

// Custom the quadratic edge for multiple edges between one node pair
G6.registerEdge('quadratic', {
	setState: (name, value, item) => {
		console.log('quadratic_state', name, value, item)
		const group = item.get('group');
		const model = item.getModel();
		if (name === 'focus') {
			const back = group.find(ele => ele.get('name') === 'back-line');
			if (back) {
				back.stopAnimate();
				back.remove();
				back.destroy();
			}
			const keyShape = group.find(ele => ele.get('name') === 'edge-shape');
			const arrow = model.style.endArrow;
			if (value) {
				if (keyShape.cfg.animation) {
					keyShape.stopAnimate(true);
				}
				keyShape.attr({
					strokeOpacity: animateOpacity,
					opacity: animateOpacity,
					stroke: '#fff',
					endArrow: {
						...arrow,
						stroke: '#fff',
						fill: '#fff',
					}
				});
				if (model.isReal) {
					const { lineWidth, path, endArrow, stroke } = keyShape.attr();
					const back = group.addShape('path', {
						attrs: {
							lineWidth, path, stroke, endArrow,
							opacity: animateBackOpacity
						},
						name: 'back-line'
					});
					back.toBack();
					const length = keyShape.getTotalLength();
					keyShape.animate(
						(ratio) => {
							// the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
							const startLen = ratio * length;
							// Calculate the lineDash
							const cfg = {
								lineDash: [startLen, length - startLen],
							};
							return cfg;
						},
						{
							repeat: true, // Whether executes the animation repeatly
							duration, // the duration for executing once
						},
					);
				} else {
					let index = 0;
					const lineDash = keyShape.attr('lineDash');
					const totalLength = lineDash[0] + lineDash[1];
					keyShape.animate(
						() => {
							index++;
							if (index > totalLength) {
								index = 0;
							}
							const res = {
								lineDash,
								lineDashOffset: -index,
							};
							// returns the modified configurations here, lineDash and lineDashOffset here
							return res;
						},
						{
							repeat: true, // whether executes the animation repeatly
							duration, // the duration for executing once
						},
					);
				}
			} else {
				keyShape.stopAnimate();
				const stroke = '#acaeaf';
				const opacity = model.isReal ? realEdgeOapcity : virtualEdgeOpacity;
				keyShape.attr({
					stroke,
					strokeOpacity: opacity,
					opacity,
					endArrow: {
						...arrow,
						stroke,
						fill: stroke,
					}
				});
			}
		}
	},
}, 'quadratic');

// Custom the line edge for single edge between one node pair
G6.registerEdge('line', {
	setState: (name, value, item) => {
		const group = item.get('group');
		const model = item.getModel();
		if (name === 'focus') {
			const keyShape = group.find(ele => ele.get('name') === 'edge-shape');
			const back = group.find(ele => ele.get('name') === 'back-line');
			if (back) {
				back.stopAnimate();
				back.remove();
				back.destroy();
			}
			const arrow = model.style.endArrow;
			if (value) {
				if (keyShape.cfg.animation) {
					keyShape.stopAnimate(true);
				}
				keyShape.attr({
					strokeOpacity: animateOpacity,
					opacity: animateOpacity,
					stroke: '#fff',
					endArrow: {
						...arrow,
						stroke: '#fff',
						fill: '#fff',
					}
				});
				if (model.isReal) {
					const { path, stroke, lineWidth } = keyShape.attr();
					const back = group.addShape('path', {
						attrs: {
							path,
							stroke,
							lineWidth,
							opacity: animateBackOpacity
						},
						name: 'back-line'
					});
					back.toBack();
					const length = keyShape.getTotalLength();
					keyShape.animate(
						(ratio) => {
							// the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
							const startLen = ratio * length;
							// Calculate the lineDash
							const cfg = {
								lineDash: [startLen, length - startLen],
							};
							return cfg;
						},
						{
							repeat: true, // Whether executes the animation repeatly
							duration, // the duration for executing once
						},
					);
				} else {
					const lineDash = keyShape.attr('lineDash');
					const totalLength = lineDash[0] + lineDash[1];
					let index = 0;
					keyShape.animate(
						() => {
							index++;
							if (index > totalLength) {
								index = 0;
							}
							const res = {
								lineDash,
								lineDashOffset: -index,
							};
							// returns the modified configurations here, lineDash and lineDashOffset here
							return res;
						},
						{
							repeat: true, // whether executes the animation repeatly
							duration, // the duration for executing once
						},
					);
				}
			} else {
				keyShape.stopAnimate();
				const stroke = '#acaeaf';
				const opacity = model.isReal ? realEdgeOapcity : virtualEdgeOpacity;
				keyShape.attr({
					stroke,
					strokeOpacity: opacity,
					opacity: opacity,
					endArrow: {
						...arrow,
						stroke,
						fill: stroke,
					}
				});
			}
		}
	},
}, 'single-edge');

const colorArray = [
	'rgb(91, 143, 249)',
	'rgb(90, 216, 166)',
	'rgb(93, 112, 146)',
	'rgb(246, 189, 22)',
	'rgb(232, 104, 74)',
	'rgb(109, 200, 236)',
	'rgb(146, 112, 202)',
	'rgb(255, 157, 77)',
	'rgb(38, 154, 153)',
	'rgb(227, 137, 163)',
];

const bindListener = (graph) => {
	// click node to show the detail drawer
	graph.on('node:click', (evt: any) => {
		const { item } = evt;

		// highlight the clicked node
		graph.setItemState(item, 'focus', true);
		// 将相关边也高亮
		const relatedEdges = item.getEdges();
		relatedEdges.forEach(edge => {
			graph.setItemState(edge, 'focus', true);
		})

	});

	// click edge to show the detail of integrated edge drawer
	graph.on('edge:click', (evt: any) => {
		const { item } = evt;
		// highlight the clicked edge
		graph.setItemState(item, 'focus', true);
	});

	// click canvas to cancel all the focus state
	graph.on('canvas:click', (evt: any) => {
		clearFocusItemState(graph);
	});
}

const clearFocusItemState = (graph) => {
	if (!graph) return;
	clearFocusNodeState(graph);
	clearFocusEdgeState(graph);
}

// 清除图上所有节点的 focus 状态及相应样式
const clearFocusNodeState = (graph) => {
	const focusNodes = graph.findAllByState('node', 'focus');
	focusNodes.forEach((fnode) => {
		graph.setItemState(fnode, 'focus', false); // false
	});
};

// 清除图上所有边的 focus 状态及相应样式
const clearFocusEdgeState = (graph) => {
	const focusEdges = graph.findAllByState('edge', 'focus');
	focusEdges.forEach((fedge) => {
		graph.setItemState(fedge, 'focus', false);
	});
};



let graph = null;

const LargeGraph = () => {
	const { t, i18n } = useTranslation();

	const element = React.useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!graph || graph.destroyed) {
			graph = new G6.Graph({
				container: element.current as HTMLElement,
				width: 800,
				height: 800,
				layout: {
					type: 'force'
				}
			});
			fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
				.then((res) => res.json())
				.then((data) => {
					const clusteredData = G6.Algorithm.labelPropagation(data, false, 'weight');
					console.log(clusteredData);
					const aggregatedData = { nodes: [], edges: [] };
					clusteredData.clusters.forEach((cluster, i) => {
						cluster.nodes.forEach(node => {
							node.style = {
								fill: colorArray[i % colorArray.length]
							}
						});
						const cnode = {
							id: cluster.id,
							type: 'aggregated-node',
							count: cluster.nodes.length,
							style: {
								fill: colorArray[i % colorArray.length]
							}
						};
						aggregatedData.nodes.push(cnode);
					});
					clusteredData.clusterEdges.forEach(clusterEdge => {
						const cedge = {
							...clusterEdge,
							size: Math.log(clusterEdge.count),
						}
						if (cedge.source === cedge.target) {
							cedge.type = 'loop';
							cedge.loopCfg = {
								dist: 20,
							}
							return;
						} else cedge.type = 'line';
						aggregatedData.edges.push(cedge);
					});

					bindListener(graph);
					graph.data(aggregatedData);
					graph.render();
				});
		}
	}, []);
	return (
		<>
			<SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
			<div ref={element} style={{ backgroundColor: '#000', width: '100%', height: '100%' }} />
		</>
	);
};

export default LargeGraph;
