'use strict';

const
	path = require('path'),
	program = require('commander'),
	spawn = require('child_process').spawn,
	Git = require('../Helpers/git_helper.js'),
	Build = require('../Helpers/build_helper.js'),
	Mocha = require('../Helpers/mocha_helper.js'),
	Output = require('../Helpers/output_helper.js'),
	Appium = require('../Helpers/appium_helper.js'),
	Device = require('../Helpers/device_helper.js');

program
	.option('-p, --platforms <platform1,platform2>', 'List the platforms that you want to run the suite for. Defaults to \'iOS_Xcode\' and \'Android_Studio\'.', 'iOS_Xcode,Android_Studio')
	.option('-l, --logging <level>', 'Set the amount of output returned by the process, options are \'debug\' and \'basic\'. Defaults to \'basic\'.', 'basic')
	.parse(process.argv);

const
	server = require(path.join(__dirname, '..', 'Config', 'server_config.js')),
	projects = require(path.join(__dirname, '..', 'Config', 'device_config.js')),
	platforms = program.platforms.split(',');

let appium = new Appium();

// Validate that the platforms passed are valid
platforms.forEach(platform => {
	const notSupported =
		platform !== 'iOS_Xcode' &&
		platform !== 'Android_Studio';
	if(notSupported) {
		Output.error(`'${platform}' is not a valid platform.`);
		process.exit(1);
	}
});

// These will be accessed in the appium mocha tests
global.driver = appium.appiumServer(server);
global.webdriver = appium.getWd();
// A timestamp for labelling screen shots and naming log directorys
global.timestamp = Output.generateTimestamp(new Date(), true);
// Logging option for output helper
global.logging = program.logging;
// The root of the project
global.projRoot = path.join(__dirname, '..');

// The promise chain for setting up suite services
let startup = Promise.resolve()
	// Create the log directory
	.then(() => Output.setupLogDir())
	// Log that the suite is starting up
	.then(() => Output.banner('Starting and Configuring Suite Services'))
	// Start an Appium server
	.then(() => appium.runAppium(server))
	.catch(err => {
		Output.error(err);
		// Shutdown the Appium server, as process.exit() will leave it running
		return appium.quitServ()
			.then(() => process.exit(1));
	});

// Iterate through each application specified
platforms.forEach(project => {

	let config = projects[project];

	startup = startup
		// Output when beginning suite for a new application
		.then(() => Output.banner(`Beginning suite for '${project}'`))
		// Git clone the repo from the appcelerator org
		.then(() => Git.cloneRepo(config.git))
		// Build the application
		.then(() => Build.buildApp(project, config))
		.then(appPath => config.appium.app = appPath)
		// Launch an Android device if required
		.then(() => Device.launchEmu(config.appium.deviceName, project))
		// Start the client using the specified config
		.then(() => appium.startClient(project, config.appium, false))
		// Run the Mocha test suite with the specified test file
		.then(() => Mocha.mochaTest(config, project))
		// Alert that the test stage has finished
		.then(() => Output.banner('Tests run, stopping temporary services'))
		// Stop the test client
		.then(() => appium.stopClient())
		.catch(err => Output.error(err))
		// Delete the local copy of the repo
		.then(() => Git.removeRepo(config))
		.catch(err => Output.error(err));
});

startup
	// Notify that the suite is finished
	.then(() => Output.banner('All Tests Run, Closing Down Services'))
	// Kill all the running Android emulators
	.then(() => Device.killEmu())
	.catch(err => Output.error(err))
	// Shut down all iOS simulators
	.then(() => Device.killSim())
	.catch(err => Output.error(err))
	// Kill the Appium server
	.then(() => appium.quitServ())
	.catch(err => Output.error(err));
