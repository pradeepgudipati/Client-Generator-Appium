'use strict';

const
	path = require('path'),
	Mocha = require('mocha'),
	Output = require('./output_helper.js');

class mocha_helper {
	/** ***************************************************************************
	 * Runs through the Mocha tests outlined in device_config.js
	 *
	 * @param {String} config - The object containing the test requirements
	 * @param {String} project - The current project being tested
	 ****************************************************************************/
	static mochaTest(config, project) {
		return new Promise(resolve => {
			Output.info('Starting Tests\n');

			// Create the new Mocha instance
			let mocha = new Mocha({
				fullTrace: false,
				useColors: true,
				timeout: 50000,
				slow: 25000,
				reporter: 'mocha-jenkins-reporter',
				reporterOptions: {
					junit_report_name: 'Tests',
					junit_report_path: path.join(global.projRoot, 'Reports', `${project}_Report.xml`),
					junit_report_stack: 1
				}
			});

			const
				dir = path.join(global.projRoot, 'Tests', project),
				files = require(`${global.projRoot}/Tests/${project}/TestOrder.js`).tests;

			// Add all of the test files one by one
			files.forEach(file => {
				mocha.addFile(path.join(dir, file));
			});

			// Start the Mocha execution
			mocha.run()
				.on('test end', data => {
					if (data.pending) {
						Output.log(`${data.title}: skipped`);
					} else {
						Output.log(`${data.title}: ${data.state}`);
					}
				})
				.on('end', () => {
					resolve();
				});
		});
	}
}

module.exports = mocha_helper;
