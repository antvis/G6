const {Canvas, Group} = require('@antv/g');
const Shape = require('../../../src/shape/shape');
const Global = require('../../../src/global');
require('../../../src/shape/edge');
const expect = require('chai').expect;
const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'edge-shape',
  width: 500,
  height: 500
});

describe('shape edge test', () => {
	describe('basic method test', () => {
		it('get factory',() => {
			const factory = Shape.getFactory('edge');
			expect(factory).not.eql(undefined);
		});
		it('get default', () => {
			const factory = Shape.getFactory('edge');
			const shape = factory.getShape();
			expect(shape.type).eql('line');
		});
	});

	describe('line test', () => {
		const factory = Shape.getFactory('edge');
		
		it('line without label', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('line', {
				startPoint: {x: 50, y: 50},
				endPoint: {x: 100, y: 100},
				color: 'red'
			}, group);
			canvas.draw();
			const path = shape.attr('path');
			expect(shape.attr('stroke')).eql('red');
			expect(path.length).eql(2);
			expect(path[0]).eqls(['M', 50, 50]);
			expect(group.getCount()).eql(1);
		});

		it('line with label', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('line', {
				startPoint: {x: 150, y: 50},
				endPoint: {x: 100, y: 100},
				color: 'blue',
				label: '这是一条线'
			}, group);
			
			expect(shape.attr('path').length).eql(2);
			const label = group.get('children')[1];
			expect(label.attr('x')).eql((100 + 150) / 2);
			expect(label.attr('y')).eql((100 + 50) / 2);
			expect(group.getCount()).eql(2);
			const item = {
				getContainer: function() {
					return group;
				},
				get(name) {
					return '';
				}
			};
			factory.update('shape', {
				startPoint: {x: 150, y: 50},
				endPoint: {x: 100, y: 100},
				color: 'blue',
				label: '这是一条线',
				labelPosition: 'start'
			}, item);
			canvas.draw();
			expect(label.attr('x')).eql(150);
			expect(label.attr('y')).eql(50);
			factory.update('shape', {
				startPoint: {x: 150, y: 50},
				endPoint: {x: 100, y: 100},
				color: 'blue',
				label: '这是一条线',
				labelPosition: 'end'
			}, item);
			canvas.draw();
			expect(label.attr('x')).eql(100);
			expect(label.attr('y')).eql(100);
		});

		it('update points', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('line', {
				startPoint: {x: 200, y: 200},
				endPoint: {x: 150, y: 100},
				color: 'yellow',
				label: '这是另一条线'
			}, group);
			expect(shape.attr('path')[0]).eqls(['M', 200, 200]);
			expect(group.getCount()).eql(2);
			const item = {
				getContainer: function() {
					return group;
				},
				get(name) {
					return '';
				}
			};
			factory.update('line', {
				startPoint: {x: 300, y: 300},
				endPoint: {x: 250, y: 200},
				color: 'pink',
				label: '这是不是另一条线'
			}, item);

			expect(shape.attr('path')[0]).eqls(['M', 300, 300]);
			const label = group.get('children')[1];
			expect(label.attr('x')).eql((300 + 250) / 2);
			expect(label.attr('y')).eql((300 + 200) / 2);

			canvas.draw();
		});

		it('polyline', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('polyline', {
				startPoint: {x: 200, y: 200},
				endPoint: {x: 150, y: 100},
				controlPoints: [{x: 170, y: 160}],
				color: 'green',
				label: '这是一条折线'
			}, group);
			const path = shape.attr('path');
			expect(path.length).eql(3);
			expect(path[1]).eql(['L', 170, 160]);
		});

		it('quadratic', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('quadratic', {
				startPoint: {x: 200, y: 200},
				endPoint: {x: 150, y: 100},
				controlPoints: [{x: 220, y: 160}],
				color: 'green',
				label: '这是一条曲线'
			}, group);
			const path = shape.attr('path');
			expect(path.length).eql(2);
			expect(path[1]).eql(['Q', 220, 160, 150, 100]);
			canvas.draw();
		});

		it('cubic', () => {
			const group = canvas.addGroup();
			const shape = factory.draw('cubic', {
				startPoint: {x: 200, y: 200},
				endPoint: {x: 150, y: 100},
				controlPoints: [{x: 220, y: 200}, {x: 170, y: 100}],
				color: 'red'
			}, group);
			const path = shape.attr('path');
			expect(path.length).eql(2);
			expect(path[1]).eql(['C', 220, 200, 170, 100, 150, 100]);
			canvas.draw();
		});
	});

});
