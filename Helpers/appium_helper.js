'use strict';

const
	path = require('path'),
	ps = require('ps-node'),
	spawn = require('child_process').spawn,
	Output = require('./output_helper.js');

class appium_helper {
	constructor() {
		this.wd = require('wd');
		this.chai = require('chai');
		this.chaiAsPromised = require('chai-as-promised');
		this.colors = require('colors');

		// enabling chai assertion style: https://www.npmjs.com/package/chai-as-promised#node
		this.chai.use(this.chaiAsPromised);
		this.chai.should();
		// enables chai assertion chaining
		this.chaiAsPromised.transferPromiseness = this.wd.transferPromiseness;

		this.driver = null;

		this.logOn = false;
	}

	appiumServer(config) {
		this.driver = this.wd.promiseChainRemote(config);
		return this.driver;
	}

	startClient(project, cap, wLogs) {
		return new Promise((resolve, reject) => {
			Output.info('Starting WebDriver Instance... ');

			// Fill in the rest of the capabilities
			cap.noReset = false;
			cap.deviceReadyTimeout = 20;
			if (project.toLowerCase().includes('android')) {
				cap.fullReset = true;
				cap.platformName = 'Android';
				cap.automationName = 'Appium';
			} else if (project.toLowerCase().includes('ios')) {
				cap.platformName = 'iOS';
				cap.automationName = 'XCUITest';
			}
			// if logging is enabled, just need to call _logging once i.e. register logging events once
			if (wLogs && !this.logOn) {
				this.logOn = true;
				_logging(this.driver);
			}

			this.driver.init(cap, err => {
				(err) ? reject(err) : Output.finish(resolve, null);
			});
		});
	}

	stopClient() {
		return new Promise((resolve, reject) => {
			Output.info('Stopping WebDriver Instance... ');

			this.driver.quit(err => {
				(err) ? reject(err) : Output.finish(resolve, null);
			});
		});
	}

	// returns web driver module
	getWd() {
		return this.wd;
	}

	// prints out driver logging
	logging(driver) {
		// See whats going on
		driver.on('status', info => {
			console.log(this.colors.cyan(info));
		});
		driver.on('command', (meth, path, data) => {
			console.log(` > ${this.colors.yellow(meth)} ${this.colors.grey(path)} ${data || ''}`);
		});
		driver.on('http', (meth, path, data) => {
			console.log(` > ${this.colors.magenta(meth)} ${path} ${this.colors.grey(data || '')}`);
		});
	}

	/** *****************************************************************************
	 * Starts a local Appium server running as a child process
	 *
	 * @param {Object} server - the server property from test_config.js
	 ******************************************************************************/
	runAppium(server) {
		return new Promise((resolve, reject) => {
			Output.info('Starting Appium Server... ');

			let
				appiumExe = path.join(__dirname, '..', 'node_modules', '.bin', 'appium'),
				flags = [ '--log-no-colors' ];

			const prc = spawn(appiumExe, flags);

			prc.stdout.on('data', output => {
				Output.debug(output);
				const line = output.toString().trim();

				const
					regStr = `started on (0\\.0\\.0\\.0|${server.host})\\:${server.port}$`,
					isRunning = new RegExp(regStr, 'g').test(line);
				if (isRunning) {
					Output.finish(resolve, null);
				}
			});
			prc.stderr.on('data', output => {
				Output.debug(output);
				reject(output.toString());
			});
			prc.on('error', err => {
				reject(err.stack);
			});
			return prc;
		});
	}

	quitServ() {
		return new Promise((resolve, reject) => {
			Output.info('Stopping Appium Server... ');

			const data = {
				command: 'node',
				arguments: '--log-no-colors'
			};

			ps.lookup(data, (lookupErr, results) => {
				if (lookupErr) {
					reject(lookupErr);
				} else {
					let settings = {
						timeout: 120 // Investigate cause of slow process exit
					};
					if (results.length > 0) {
						ps.kill(results[0].pid, settings, killErr => {
							(killErr) ? reject(killErr) : Output.finish(resolve, null);
						});
					} else {
						Output.skip(resolve, null);
					}
				}
			});
		});
	}
}

module.exports = appium_helper;
