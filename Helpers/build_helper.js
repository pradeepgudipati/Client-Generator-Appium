'use strict';

const
	path = require('path'),
	fs = require('fs-extra'),
	spawn = require('child_process').spawn,
	Output = require('./output_helper.js');

class build_helper {
	/** ***************************************************************************
	 * Build the application for a given platform, and return the built
	 * applications path to the main process
	 *
	 * @param {String} project - The current project being tested
	 * @param {String} config - The settings for the current project
	 ****************************************************************************/
	static buildApp(project, config) {
		return new Promise((resolve, reject) => {
			Output.info('Building Application... ');

			const
				devName = config.appium.deviceName,
				devVers = config.appium.platformVersion,
				// Build up the paths to the app project and build files
				dir = config.git.split('/').pop(),
				projRoot = path.join(global.projRoot, dir),
				projPath = path.join(projRoot, `${config.appName}.xcodeproj`);

			let
				cmd,
				args,
				appPath,
				error = false;

			switch (project) {
				case 'iOS_Xcode':
					cmd = 'xcodebuild';
					args = [ 'build', '-project', projPath, '-destination', `platform=iOS Simulator,name=${devName},OS=${devVers}`, '-sdk', 'iphonesimulator' ];
					appPath = path.join(projRoot, 'build', 'Release-iphonesimulator', `${config.appName}.app`);
					break;
				case 'Android_Studio':
					// Path to Gradle build package
					let gradle = path.join(projRoot, 'gradlew');
					// Generate the built application path
					appPath = path.join(projRoot, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
					// Make sure we can execute the Gradle build
					fs.chmodSync(gradle, '0755');
					// Specify command and arguments
					cmd = path.join('bash');
					args = [ gradle, 'assembleDebug', '-p', projRoot ];
					break;
			}

			const prc = spawn(cmd, args);
			prc.stdout.on('data', data => {
				Output.debug(data);
			});
			prc.stderr.on('data', data => {
				Output.debug(data);
				// Appc CLI doesn't provide an error code on fail, so need to monitor the output and look for issues manully
				// If statement is there so that [WARN] flags are ignored on stderr
				if (data.toString().includes('[ERROR]')) {
					error = true;
				}
			});
			prc.on('exit', code => {
				(code !== 0 || error === true) ? reject('Failed on application build') : Output.finish(resolve, appPath);
			});
		});
	}
}

module.exports = build_helper;
