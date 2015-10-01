'use strict';

var Confy = require('./confy');
var expect = require('chai').expect;

describe('confy', function () {

	var testObject;

	beforeEach(function () {
		testObject = new Confy();
	});

	it('attempting to get unset value returns undefined', function () {

		expect(testObject.get('some-key')).to.be.undefined;
	});

	describe('overrides', function () {

		it('can get override that was just set', function () {

			testObject.set('some-key', 'smeg');
		
			expect(testObject.get('some-key')).to.equal('smeg');	
		});

		it('can set an object value as an override', function () {

			var obj = {
				'something': 'smeg',
			};

			testObject.set('some-key', obj);
		
			expect(testObject.get('some-key').something).to.equal('smeg');	
		});

		it('an override object value cannot be changed externally', function () {

			var obj = {
				'something': 'smeg',
			};

			testObject.set('some-key', obj);

			obj.something = 'what?';
		
			expect(testObject.get('some-key').something).to.equal('smeg');	
		});

		it('setting one override leaves another unset', function () {

			testObject.set('some-key', 'smeg');
		
			expect(testObject.get('some-other-key')).to.be.undefined;
		});

		it('can clear override that was just set', function () {

			testObject.set('some-key', 'smeg');

			testObject.clear('some-key');
		
			expect(testObject.get('some-key')).to.be.undefined;
		});

		it ('can change override that was just set', function () {

			testObject.set('some-key', 'smeg1');

			testObject.set('some-key', 'smeg2');
		
			expect(testObject.get('some-key')).to.equal('smeg2');	
		});

		it ('can set override that was cleared', function () {

			testObject.set('some-key', 'smeg');

			testObject.clear('some-key');

			testObject.set('some-key', 'smeg');
		
			expect(testObject.get('some-key')).to.equal('smeg');	
		});
	});

	describe('values stack', function () {

		it('can push key/value', function () {

			testObject.push({
				'some-key': 'smeg',
			});

			expect(testObject.get('some-key')).to.equal('smeg');	
		});

		it('cannot change pushed key/value externally', function () {

			var values = {
				'some-key': 'smeg',
			};

			testObject.push(values);

			values['some-key'] = 'something-else';

			expect(testObject.get('some-key')).to.equal('smeg');	
		});

		it('can override pushed key/value', function () {

			testObject.push({
				'some-key': 'smeg1',
			});

			testObject.set('some-key', 'smeg2');

			expect(testObject.get('some-key')).to.equal('smeg2');	
		});

		it('can override pushed key/value before it is even pushed', function () {

			testObject.set('some-key', 'smeg2');

			testObject.push({
				'some-key': 'smeg1',
			});

			expect(testObject.get('some-key')).to.equal('smeg2');	
		});

		it('can clear override and expose pushed key/value', function () {

			testObject.push({
				'some-key': 'smeg1',
			});

			testObject.set('some-key', 'smeg2');

			testObject.clear('some-key');

			expect(testObject.get('some-key')).to.equal('smeg1');	
		});

		it('pushing key/value overrides underlying key/value', function () {

			testObject.push({
				'some-key': 'smeg1',
			});

			testObject.push({
				'some-key': 'smeg2',
			});

			expect(testObject.get('some-key')).to.equal('smeg2');	
		});

		it('pushing a different key doesnt change different underlying key', function () {

			testObject.push({
				'some-key1': 'smeg1',
			});

			testObject.push({
				'some-key2': 'smeg2',
			});

			expect(testObject.get('some-key1')).to.equal('smeg1');	
		});

		it('can pop key/value to expose underlying key/value', function () {

			testObject.push({
				'some-key': 'smeg1',
			});

			testObject.push({
				'some-key': 'smeg2',
			});

			testObject.pop();

			expect(testObject.get('some-key')).to.equal('smeg1');	
		});

		it('poping only single key/value leaves key undefined', function () {

			testObject.push({
				'some-key': 'smeg',
			});

			testObject.pop();

			expect(testObject.get('some-key')).to.be.undefined;
		});

		it('can pop empty stack', function () {

			testObject.pop();
		});
	});
});


//todo: should clone passed in json!! make it immutable.

//todo: set should really set the top level in the stack!!
//todo: maybe have a separate override function that overrides all values!