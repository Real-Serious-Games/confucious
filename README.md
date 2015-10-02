# confucious

A simple, stack-based, key/value configuration manager. 

Kind of like nconf, but easier to use, predicable and more flexible.

## Installation

	npm install --sav confucious

## Usage

### Setup

	var conf = require('confucious');

### Setting a key/value

	conf.set("key", "some-value");

### Getting a key/value

	var value = conf.get("key");

### Stack based storage

	conf.push({
		"key": "some-value",
	});

	var value = conf.get("key"); // Search stack for a value for "key"

	conf.set("key", "some-other-value"); // Set values on top of the stack.

	conf.pop(); // Revert to stack level underneath.

### Load a file

	conf.pushJsonFile("path/to/file.json");

### Load environment variables

	conf.pushEnv();

### Load command line arguments

	conf.pushArgv();

	


