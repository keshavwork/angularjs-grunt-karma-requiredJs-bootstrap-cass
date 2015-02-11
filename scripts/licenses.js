#!/usr/bin/env node

var appPath = './..';
var appName = 'CLM-WEB-UI';

var tools = {
	'Node': {
		url: 'http://nodejs.org/',
		license: 'MIT'
	},
	'NPM': {
		url: 'http://nodejs.org/',
		license: 'MIT'
	},
	'Ruby': {
		url: 'http://www.ruby-lang.org/',
		license: 'BSD'
	},
	'Sass': {
		url: 'http://sass-lang.com/',
		license: 'MIT'
	},
	'Compass': {
		url: 'http://compass-style.org/',
		license: 'Apache 2.0'
	},

	'angular': {
		license: 'MIT'
	},

	'angular-cookies': {
		license: 'MIT'
	}
};

var exec = require('child_process').exec;

var components = [];

function execute(tool, command, callback) {
	var options = {
		timeout: 0,
		maxBuffer: 1024 * 1024
	};

	exec(command, options, function(error, stdout, stderr) {
		callback(tool, stdout);
	});
}

function getLicense(name, pkgJson) {
	var license = null;

	if (tools[name]) {
		license = tools[name].license;
	}
	else if (pkgJson.license) {
		license = pkgJson.license;
	}
	else if (pkgJson.licenses) {
		license = Array.isArray(pkgJson.licenses) ? pkgJson.licenses[0].type : pkgJson.licenses.type;
	}

	return license;
}

function npmCallback(tool, data) {
	var json = JSON.parse(data);

	for (var pkgName in json.dependencies) {
		var pkg = require(appPath+'/node_modules/'+pkgName+'/package.json');

		components.push({
			name:    pkg.name,
			version: pkg.version,
			license: getLicense(pkg.name, pkg),
			url:     pkg.homepage
		});
	}

	done();
};

function bowerCallback(tool, data) {
	var json = JSON.parse(data);

	for (var pkgName in json.dependencies) {
		var pkg = json.dependencies[pkgName];
		var jsonPkg;

		try {
			jsonPkg = require(pkg.canonicalDir+'/package.json');
		}
		catch (e) {};

		var name = pkg.pkgMeta.name;

		components.push({
			name:    name,
			version: pkg.pkgMeta.version || pkg.pkgMeta._release,
			license: getLicense(name, pkg.pkgMeta) || (jsonPkg ? getLicense(name, jsonPkg) : null),
			url:     pkg.pkgMeta.homepage || pkg.pkgMeta._source
		});
	}

	done();
}

function toolVersion(tool, data) {
	var version = data.match(/([0-9]+\.[0-9]+\.[0-9]+[a-z0-9\.]*)/).pop();

	components.push({
		name:    tool,
		version: version,
		license: tools[tool].license,
		url:     tools[tool].url
	});

	done();
}

var commands = [
	{
		tool: 'Node',
		cmd: 'cd '+appPath+' && node --version',
		callback: toolVersion
	},
	{
		tool: 'NPM',
		cmd: 'cd '+appPath+' && npm --version',
		callback: toolVersion
	},
	{
		tool: 'Ruby',
		cmd: 'cd '+appPath+' && ruby --version',
		callback: toolVersion
	},
	{
		tool: 'Sass',
		cmd: 'cd '+appPath+' && sass --version',
		callback: toolVersion
	},
	{
		tool: 'Compass',
		cmd: 'cd '+appPath+' && compass --version',
		callback: toolVersion
	},
	{
		tool: 'Grunt',
		cmd: 'cd '+appPath+' && npm list --depth 0 --json',
		callback: npmCallback
	},
	{
		tool: 'Bower',
		cmd: 'cd '+appPath+' && bower list --json',
		callback: bowerCallback
	}
];

function finish() {
	var args = process.argv.slice(2);

	var useJson = true;
	var useTabs = false;

	args.forEach(function(arg) {
		arg = arg.replace(/^([\-]+)/, '');

		if (arg === 'json') {
			useJson = true;
			useTabs = false;
		}
		else if (arg === 'tabs') {
			useTabs = true;
			useJson = false;
		}
	});

	if (useJson) {
		console.log(JSON.stringify(components));
	}
	else if (useTabs) {
		components.forEach(function(component) {
			console.log([
				component.name,
				component.version,
				component.license,
				component.url,
				appName
			].join('  '));
		});
	}
}

function doDone(callback, list) {
	var num = list.length;

	return function() {
		num--;

		if (num)  {
			return;
		}

		callback();
	};
};

// Run
var done = doDone(finish, commands);

commands.forEach(function(command) {
	execute(command.tool, command.cmd, command.callback);
});