# confucious

A simple, stack-based, key/value configuration manager. 

Kind of like nconf, but easier to use, predicable and more flexible.

## Installation

	npm install --sav confy

## Usage

### Setup

	var confy = require('confy');

### Setting a key/value

	confy.set("key", "some-value");

### Getting a key/value

	var value = confy.get("key");

### Stack based storage

	confy.push({
		"key": "some-value",
	});

	var value = confy.get("key"); // Search stack for a value for "key"

	confy.set("key", "some-other-value"); // Set values on top of the stack.

	confy.pop(); // Revert to stack level underneath.

### Load a file

	confy.pushJsonFile("path/to/file.json");

### Load environment variables

	confy.pushEnv();

### Load command line arguments

	confy.pushArgv();

	


