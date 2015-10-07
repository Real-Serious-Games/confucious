# confucious

A simple, stack-based, key/value configuration manager. 

Kind of like nconf, but easier to use, predicable and more flexible.

## Installation

	npm install --save confucious

## Usage

### Setup

	var conf = require('confucious');

### Setting a key/value

	conf.set("key", "some-value");

### Getting a key/value

	var value = conf.get("key");

### Stack based storage

A hash of keys/values can be pushed on top of the 'key/value stack'. 

	conf.push({
		"key": "some-value",
	});

When you get a value that is defined higher in the stack, that value overrides underlying values.

	var value = conf.get("key"); // Search stack for a value for "key"

When you set a key/value, the value is setup

	conf.set("key", "some-other-value"); // Set values on top of the stack.

The last hash that was pushed can be popped.

	conf.pop(); // Revert to stack level underneath.

### Nested key values

Similar to nconf, Confucious supports the colon key (:) as a separator for getting, setting and clearing nested key/values.

	conf.push({
		"some-key": {
			"some-nested-key": "some-value",
		}
	});

	var value = conf.get("some-key:some-nested-key"); // == "some-value"

	conf.set("some-key:some-nested-key", "some-other-value");

	conf.clear("some-key:some-nested-key");	

### Load a file

	conf.pushJsonFile("path/to/file.json");

### Load environment variables

	conf.pushEnv();

### Load command line arguments

	conf.pushArgv();

	


