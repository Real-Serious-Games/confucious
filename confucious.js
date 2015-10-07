'use strict';

module.exports = function () {

	var fs = require('fs');
	var argv = require('yargs').argv;
	var extend = require('extend');

	var baseValues = {};
	var valuesStack = [];

	valuesStack.push(baseValues);

	//
	// Debug only function to get the current state of the value stack.
	// NOTE: This deep copies the data so that it cannot be modified externally this
	// ensures the managed configuration is immutable.
	//
	this.getValueStackCopy = function () {
		return extend(true, [], valuesStack);
	};

	//
	// Set a value by key at the top level of the key/value staci.
	//
	this.set = function (key, value) {
		if (typeof(value) === 'object') {
			valuesStack[valuesStack.length-1][key] = extend(true, {}, value);
		}
		else {
			valuesStack[valuesStack.length-1][key] = value;
		}
	};

	//
	// Clear a key from the top level of the key/value stack.
	//
	this.clear = function (key) {
		delete valuesStack[valuesStack.length-1][key];
	};

	//
	// Get a value by key.
	// Key can reference a nested value.
	// Searches all levels in the key/value stack.
	// Returns undefined if the key does not exist anywhere.
	//
	this.get = function (key) {
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
		if (valuesStack.length > 1) {
			valuesStack.pop();
		}
		else {
			// Can't push the base level of the stack.
		}		
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