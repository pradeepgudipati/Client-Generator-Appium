'use strict';

const
	path = require('path'),
	fs = require('fs-extra'),
	Mocha = require('mocha'),
	Output = require('./output_helper.js');

class mocha_helper {
	/*****************************************************************************
	 * Runs through the Mocha tests outlined in device_config.js
	 *
	 * @param {String} config - The object containing the test requirements
	 * @param {String} project - The current project being tested
	 ****************************************************************************/
	static mochaTest(config, project) {
		return new Promise((resolve, reject) => {
			Output.info('Starting Tests\n');

			// Create the new Mocha instance
			let mocha = new Mocha({
				fullTrace: false,
				useColors: true,
				timeout: 60000,
				slow: 50000,
				reporter: 'mocha-jenkins-reporter',
				reporterOptions: {
					junit_report_name: 'Tests',
					junit_report_path: path.join(global.projRoot, 'Reports', `${project}_Report.xml`),
					junit_report_stack: 1
				}
			});

			const dir = path.join(global.projRoot, 'Tests', project);

			getTests(dir)
				.then(files => {
					// Add all of the test files one by one
					files.forEach(file => {
						if(!file.includes('.DS_Store')) mocha.addFile(file);
					});

					mocha.run()
						.on('test end', data => {
							if(data.pending) {
								Output.log(`${data.title}: skipped`);
							} else {
								Output.log(`${data.title}: ${data.state}`);
							}
						})
						.on('end', data => {
							resolve();
						});
				})
				.catch(err => reject(err));
		});
	}
}

/*******************************************************************************
 * Collect all test files for the desired platform and test application
 *
 * @param {String} dir - The directory location of the test files
 ******************************************************************************/
function getTests(dir) {
	return new Promise((resolve, reject) => {
		let tests = [];

		fs.readdir(dir, (err, files) => {
			if(err) reject(err);

			files.forEach(file => {
				tests.push(path.join(dir, file));
			});

			resolve(tests);
		});
	});
}

module.exports = mocha_helper;