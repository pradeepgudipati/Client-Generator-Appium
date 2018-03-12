'use strict';

const
	os = require('os'),
	path = require('path'),
	ps = require('ps-node'),
	fs = require('fs-extra'),
	spawn = require('child_process').spawn,
	Output = require('./output_helper.js');

class device_helper {
	/*****************************************************************************
	 * Launch the emulator specified in the device_config.js for the current test
	 *
	 * @param {String} devName - The name of the AVD emulator used for testing
	 * @param {String} project - The current project being tested
	 ****************************************************************************/
	static launchEmu(devName, project) {
		return new Promise((resolve, reject) => {
			// If the current test isn't Android, then exit here
			if(!project.toLowerCase().includes('android')) return resolve();

			Output.info(`Launching Android device '${devName}'... `);

			getDevice(devName)
				.then(pid => {
					if(pid) {
						return Output.skip(resolve);
					} else {
						const
							cmd = `${process.env.ANDROID_HOME}/tools/emulator`,
							args = ['-avd', devName, '-skin', '1080x1920', '-logcat', '*:v', '-no-snapshot-save', '-no-snapshot-load', '-no-boot-anim'];

						const prc = spawn(cmd, args);
						prc.stdout.on('data', data => {
							if(data.toString().includes('Boot is finished')) {
								return Output.finish(resolve);
							}
						});
						prc.stderr.on('data', data => {
							Output.debug(data.toString());
						});
					}
				})
				.catch(err => reject(err));
		});
	}

	/*****************************************************************************
	 * Kill all the Android emulators. To do this, first the PID of the simulator
	 * is found, then the PID is used to kill the AVD instance
	 ****************************************************************************/
	static killEmu() {
		return new Promise((resolve, reject) => {
			Output.info('Shutting Down Android Emulators... ');

			getDevices().then(PIDs => {
				let p = Promise.resolve();
				PIDs.forEach(pid => {
					p = p
						.then(() => killPID(pid))
						.catch(err => reject(err));
				});

				p.then(() => Output.finish(resolve, null));
			});
		});
	}

	/*****************************************************************************
	 * Kill all the iOS simulators using the killall command
	 ****************************************************************************/
	static killSim() {
		return new Promise(resolve => {

			Output.info('Shutting Down iOS Simulators... ');

			const
				cmd = 'killall',
				args = ['Simulator'];

			spawn(cmd, args)
				.on('exit', code => {
					Output.finish(resolve, null);
				});
		});
	}
}

/*******************************************************************************
 * Use the name of an AVD device to find out what its pid is.
 *
 * @param {String} device - The name of the AVD emulator we're looking for
 ******************************************************************************/
function getDevice(device) {
	return new Promise((resolve, reject) => {
		const data = {
			command: 'qemu-system-i386',
			arguments: ['-avd', device, '-skin', '1080x1920', '-logcat', 'log']
		};

		ps.lookup(data, (err, results) => {
			if(err) return reject(err);
			// Search the array for an index that matches the device that needs to be killed
			let result = results.indexOf(results.find(x => x.arguments.toString() === data.arguments.toString()));
			// Return the PID of the found process
			(result >= 0) ? resolve(results[result].pid): resolve();
		});
	});
}

/*******************************************************************************
 * Return an array of all the PIDs for the AVD emulators
 ******************************************************************************/
function getDevices() {
	return new Promise((resolve, reject) => {
		const data = {
			command: 'qemu-system-i386',
			arguments: []
		};

		let PIDs = [];

		ps.lookup(data, (err, results) => {
			if(err) return reject(err);
			results.forEach(result => {
				PIDs.push(result.pid);
			});

			resolve(PIDs);
		});
	});
}

/*******************************************************************************
 * Kill a process by its PID, returns an error if there is an issue
 *
 * @param {String} pid - The Process ID that we want to kill
 ******************************************************************************/
function killPID(pid) {
	return new Promise((resolve, reject) => {
		ps.kill(pid, 'SIGKILL', err => {
			(err) ? reject(err): resolve();
		});
	});
}

module.exports = device_helper;