'use strict';

module.exports = function () {

	var fs = require('fs');
	var argv = require('yargs');
	var extend = require('extend');

	var overrides = {};
	var valuesStack = [];

	//
	// Set a value by key.
	// This overrides all other values.
	//
	this.set = function (key, value) {
		if (typeof(value) === 'object') {
			overrides[key] = extend(true, {}, value);
		}
		else {
			overrides[key] = value;
		}
	};

	//
	// Clear an overridden key.
	//
	this.clear = function (key) {
		delete overrides[key];
	};

	//
	// Get a value by key.
	// Value can be nested.
	// Returns undefined if the key does not exist.
	//
	this.get = function (key) {
		var value = overrides[key];
		if (typeof(value) !== 'undefined') {
			return value;
		}

		for (var i = valuesStack.length-1; i >= 0; --i) {
			var value = valuesStack[i][key];
			if (typeof(value) !== 'undefined') {
				return value;
			}
		}

		return undefined;
	};

	//
	// Push a set of key/values on the key/value stack.
	//
	this.push = function (values) {
		valuesStack.push(extend(true, {}, values));
	};

	//
	// Pop a set of values from the stack.
	//
	this.pop = function () {
		valuesStack.pop();
	};

	//
	// Load a json file and push it on the key/value stack.
	//
	this.pushJsonFile = function (filePath) {
		this.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
	};

	//
	// Push arguments onto the key/value stack.
	//
	this.pushArgv = function () {
		this.push(argv);
	};

	//
	// Push environment variables onto the key/value stack.
	//
	this.pushEnv = function () {
		this.push(process.env);
	};
};